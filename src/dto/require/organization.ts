import { organizationTypes } from "../../constan";

export class OrganizationDto {
  static formatOrganizationData(data: OrganizationInput): FhirOrganization {
    return {
      resourceType: "Organization",
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

      telecom: [
        ...(data.phone
          ? [
              {
                system: "phone" as const,
                value: data.phone,
                use: "work" as const,
              },
            ]
          : []),
        ...(data.email
          ? [
              {
                system: "email" as const,
                value: data.email,
                use: "work" as const,
              },
            ]
          : []),
        ...(data.url
          ? [{ system: "url" as const, value: data.url, use: "work" as const }]
          : []),
      ],

      address:
        data.street && data.city && data.postalCode
          ? [
              {
                use: "work",
                type: "both",
                line: [data.street],
                city: data.city,
                postalCode: data.postalCode,
                country: "ID",
                extension: [
                  {
                    url: "https://fhir.kemkes.go.id/r4/StructureDefinition/administrativeCode",
                    extension: [
                      ...(data.provincecode
                        ? [{ url: "province", valueCode: data.provincecode }]
                        : []),
                      ...(data.citycode
                        ? [{ url: "city", valueCode: data.citycode }]
                        : []),
                      ...(data.districtcode
                        ? [{ url: "district", valueCode: data.districtcode }]
                        : []),
                      ...(data.villagecode
                        ? [{ url: "village", valueCode: data.villagecode }]
                        : []),
                    ],
                  },
                ],
              },
            ]
          : [],

      partOf: data.partOf
        ? { reference: `Organization/${data.partOf}` }
        : undefined,
    };
  }
}
