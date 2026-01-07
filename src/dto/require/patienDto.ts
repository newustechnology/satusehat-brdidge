import { v4 as uuidV4 } from "uuid";
import { mariedStatus } from "../../constan";

export class PatientDto {
  formatCreate(
    createBy: "nik" | "mother_nik",
    data: CreatePatientInput
  ): FhirCreatePatient {
    const mariedData = mariedStatus.find(
      (item) => item.indentifire === data.maritalStatus
    )!;
    return {
      resourceType: "Patient",
      meta: {
        profile: ["https://fhir.kemkes.go.id/r4/StructureDefinition/Patient"],
      },
      identifier: [
        {
          use: "official",
          system:
            createBy === "nik"
              ? "https://fhir.kemkes.go.id/id/nik"
              : "https://fhir.kemkes.go.id/id/nik-ibu",
          value: data.nik,
        },
      ],
      active: true,
      name: [
        {
          use: "official",
          text: data.name,
        },
      ],
      telecom: data.contact
        ? data.contact.flatMap((contact) => ({
            system: contact.type,
            value: contact.value,
            use: contact.type === "phone" ? "mobile" : "home",
          }))
        : undefined,
      gender: data.gender,
      birthDate: data.birthDate,
      deceasedBoolean: data.deceasedBoolean,
      address: [
        {
          use: "home",
          line: [data.addressLine],
          city: data.city,
          postalCode: data.postalCode,
          country: data.country,
          extension: [
            {
              url: "https://fhir.kemkes.go.id/r4/StructureDefinition/administrativeCode",
              extension: [
                {
                  url: "province",
                  valueCode: data.provinceCode,
                },
                {
                  url: "city",
                  valueCode: data.cityCode,
                },
                {
                  url: "district",
                  valueCode: data.districtCode,
                },
                {
                  url: "village",
                  valueCode: data.villageCode,
                },
                {
                  url: "rw",
                  valueCode: data.rw,
                },
                {
                  url: "rt",
                  valueCode: data.rt,
                },
              ],
            },
          ],
        },
      ],
      maritalStatus: {
        coding: [
          {
            system: "http://terminology.hl7.org/CodeSystem/v3-MaritalStatus",
            code: mariedData.code,
            display: mariedData.display,
          },
        ],
        text: mariedData.display,
      },
      multipleBirthInteger: data.multipleBirthInteger,
      contact: [
        {
          relationship: [
            {
              coding: [
                {
                  system: "http://terminology.hl7.org/CodeSystem/v2-0131",
                  code: "C",
                },
              ],
            },
          ],
          name: {
            use: "official",
            text: data.contactName,
          },
          telecom: [
            {
              system: "phone",
              value: data.contactPhone,
              use: "mobile",
            },
          ],
        },
      ],
      communication: [
        {
          language: {
            coding: [
              {
                system: "urn:ietf:bcp:47",
                code: "id-ID",
                display: "Indonesian",
              },
            ],
            text: "Indonesian",
          },
          preferred: true,
        },
      ],
    };
  }

  formatPatch(data: any) {
    return {
      resourceType: "Patient",
    };
  }
}
