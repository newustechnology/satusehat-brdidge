import { physicalType } from "../../constan";
import { DtoCore } from "../core/DtoCore";

export class LocationDto extends DtoCore {
  private buildIdentifier(data: {
    organizationIhsNumber: string;
    locationCode: string;
  }): Array<FhirIdentifier> {
    return [
      {
        system: `http://sys-ids.kemkes.go.id/location/${data.organizationIhsNumber}`,
        value: data.locationCode,
      },
    ];
  }

  private buildPhysicalType(code: FhirPhysicalTypeCode): {
    coding: Array<FhirCoding<FhirPhysicalTypeCode>>;
  } {
    const e = physicalType.find((pt) => pt.code === code);
    return {
      coding: [
        {
          system: "http://terminology.hl7.org/CodeSystem/v3-RoleCode",
          code: e?.code || code,
          display: e?.display || "",
        },
      ],
    };
  }

  private buildLocationData(
    data: LocationDtoInput,
    withId: boolean = false
  ): FhirLocation {
    return {
      resourceType: "Location",
      ...(withId && data.id ? { id: data.id } : {}),
      identifier: this.buildIdentifier({
        organizationIhsNumber: data.organizationIhsNumber,
        locationCode: data.locationCode,
      }),
      status: data.status,
      telecom: data.telecom ? this.buildTelecom(data.telecom) : undefined,
      address: data.address ? this.buildAddress(data.address)[0] : undefined,
      physicalType: this.buildPhysicalType(data.physicalType),
      position: data.position,
      managingOrganization: {
        reference: `Organization/${data.organizationIhsNumber}`,
      },
    };
  }

  fromartCreateLocationData(data: LocationDtoInput): FhirLocation {
    return this.buildLocationData(data);
  }

  formatUpdateLocationData(data: LocationDtoInput): FhirLocation {
    return this.buildLocationData(data, true);
  }
}
