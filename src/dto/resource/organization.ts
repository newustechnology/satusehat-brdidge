import { contactPurpose, organizationTypes } from "../../constan";
import { DtoCore } from "../core/DtoCore";

export class OrganizationDto extends DtoCore {
  /* =========================
   * helper function
   * ========================= */

  private buildOrganization(
    data: OrganizationInput | OrganizationUpdateInput,
    withId = false
  ): FhirOrganization {
    return {
      resourceType: "Organization",
      ...(withId && "id" in data ? { id: data.id } : {}),
      active: data.active ?? true,

      identifier: [
        {
          use: "official",
          system: `http://sys-ids.kemkes.go.id/organization/${data.partOf}`,
          value: data.identifier_value,
        },
      ],

      type: [
        {
          coding: [
            {
              system: "http://terminology.hl7.org/CodeSystem/organization-type",
              code: data.type_code,
              display: organizationTypes[data.type_code].coding_display,
            },
          ],
        },
      ],

      name: data.name,
      telecom: this.buildTelecom({
        phone: data.phone ? [data.phone] : undefined,
        email: data.email ? [data.email] : undefined,
        url: data.url ? [data.url] : undefined,
      }),
      address: this.buildAddress(data),
      partOf: data.partOf
        ? { reference: `Organization/${data.partOf}` }
        : undefined,
      contact: this.buildContact(data.contact),
    };
  }

  /* =========================
   * PUBLIC API
   * ========================= */
  formatOrganizationData(data: OrganizationInput): FhirOrganization {
    return this.buildOrganization(data);
  }

  formatOrganizationDataUpdate(
    data: OrganizationUpdateInput
  ): FhirOrganization {
    return this.buildOrganization(data, true);
  }
}
