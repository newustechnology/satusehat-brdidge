import { maritalStatus } from "../../constan";
import {
  FhirCodeableConcept,
  FhirHumanName,
  FhirIdentifier,
} from "../../types/dto/core";
import {
  CreatePatientInput,
  ExistingPatient,
  FhirPatchPatient,
  FhirPatient,
  MariedStatusIdentifier,
  MaritalStatusCode,
  PatchPatientInput,
} from "../../types/dto/resource/patient";
import { DtoCore } from "../core/DtoCore";

export class PatientDto extends DtoCore {
  /**
   *  Build Identifier
   * @param data
   * @param newBorn // default false
   * @returns Array<FhirIdentifier>
   */
  private buildIdentifier(
    data: {
      nik: string;
      kk?: string;
      ihs?: string;
    },
    newBorn: boolean = false,
  ): Array<FhirIdentifier> {
    const identifiers: Array<FhirIdentifier> = [];

    if (data.nik) {
      if (newBorn) {
        identifiers.push({
          system: "https://fhir.kemkes.go.id/id/nik-ibu",
          use: "official",
          value: data.nik,
        });
      } else {
        identifiers.push({
          system: "https://fhir.kemkes.go.id/id/nik",
          use: "official",
          value: data.nik,
        });
      }
    }

    if (data.kk) {
      identifiers.push({
        system: "https://fhir.kemkes.go.id/id/kk",
        use: "official",
        value: data.kk,
      });
    }

    if (data.ihs) {
      identifiers.push({
        system: "https://fhir.kemkes.go.id/id/ihs-number",
        use: "official",
        value: data.ihs,
      });
    }

    return identifiers;
  }

  /**
   * Build Name
   * @param name
   * @returns
   */
  private buildName(name: string): Array<FhirHumanName> | undefined {
    if (!name) return undefined;

    const nameParts = name.split(/\s+/);
    const family = nameParts.length > 1 ? nameParts.slice(-1)[0] : undefined;
    const given =
      nameParts.length > 1 ? nameParts.slice(0, -1) : [nameParts[0]];
    return [
      {
        use: "official",
        text: name,
        family: family,
        given: given.length > 0 ? given : undefined,
      },
    ];
  }

  /**
   * Build Marital Status
   * @param maritalStatusIdentifier
   * @returns
   */
  private buildMaritalStatus(
    maritalStatusIdentifier: MariedStatusIdentifier,
  ): FhirCodeableConcept<MaritalStatusCode> {
    const status = maritalStatus.find(
      (status) => status.identifier === maritalStatusIdentifier,
    );

    return {
      coding: [
        {
          system: "http://terminology.hl7.org/CodeSystem/v3-MaritalStatus",
          code: status?.code || "U",
          display: status?.display || "Unknown",
        },
      ],
      text: status?.display || "Unknown",
    };
  }

  /**
   *  Build Extensions
   * @param data
   * @returns
   */
  private buildExtensions(data: { birthPlace?: { city: string } }): Array<{
    url: string;
    valueAddress?: { city: string; country: string };
    valueCode?: string;
  }> {
    const ext = [];
    if (data.birthPlace?.city) {
      ext.push({
        url: "https://fhir.kemkes.go.id/r4/StructureDefinition/birthPlace",
        valueAddress: { city: data.birthPlace.city, country: "ID" },
      });
    }
    ext.push({
      url: "https://fhir.kemkes.go.id/r4/StructureDefinition/citizenshipStatus",
      valueCode: "WNI",
    });
    return ext;
  }

  /**
   * Format Create Patient Payload
   * @param createBy "nik" | "mother_nik"
   * @param data CreatePatientInput
   * @returns  FhirCreatePatient
   */
  formatCreatePayload(
    createBy: "nik" | "mother_nik",
    data: CreatePatientInput,
  ): FhirPatient {
    return {
      resourceType: "Patient",
      meta: {
        profile: ["https://fhir.kemkes.go.id/r4/StructureDefinition/Patient"],
      },
      active: true,

      identifier: this.buildIdentifier(
        {
          nik: data.nik,
          kk: data.kk,
        },
        createBy === "mother_nik",
      ),

      name: this.buildName(data.name),
      telecom: this.buildTelecom({
        phone: data.phone ? data.phone : undefined,
        email: data.email ? data.email : undefined,
        url: data.url ? data.url : undefined,
      }),
      gender: data.gender,
      birthDate: data.birthDate,
      deceasedBoolean: data.deceased,
      deceasedDateTime: data.deceasedDateTime,

      address: this.buildAddress({
        use: "home",
        type: "both",
        ...data.address,
      }),

      maritalStatus: data.maritalStatus
        ? this.buildMaritalStatus(data.maritalStatus)
        : undefined,

      multipleBirthBoolean:
        data.multipleBirthInteger && data.multipleBirthInteger > 0
          ? true
          : false,
      multipleBirthInteger: data.multipleBirthInteger
        ? data.multipleBirthInteger
        : 0,
      contact: this.buildContact(data.contact),

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
      extension: this.buildExtensions({ birthPlace: data.birthPlace }),
    };
  }

  /**
   * Format Patch Patient Payload
   * @param data
   * @param existingData
   * @returns
   */
  fromatPatchPayload(
    data: PatchPatientInput,
    existingData: ExistingPatient,
  ): FhirPatchPatient[] {
    if (!data || !existingData) {
      throw new Error(
        "⚠️ Data baru dan data lama wajib disediakan untuk PATCH penuh.",
      );
    }

    const patchOps: FhirPatchPatient[] = [];

    if (data.name) {
      const newName = this.buildName(data.name);

      patchOps.push({
        op: "test",
        path: "/name",
        value: existingData.name,
      });

      patchOps.push({
        op: "replace",
        path: "/name",
        value: newName,
      });
    }

    // 🔹 Gender
    if (data.gender) {
      patchOps.push({
        op: "test",
        path: "/gender",
        value: existingData.gender,
      });

      patchOps.push({
        op: "replace",
        path: "/gender",
        value: data.gender,
      });
    }

    // 🔹 Identifier
    if (data.nik || data.ihs) {
      if (!existingData.identifier) {
        throw new Error(
          "⚠️ Field 'identifier' lama tidak ditemukan. PATCH dibatalkan.",
        );
      }

      const newIdentifiers: ExistingPatient["identifier"] = [];

      if (data.nik) {
        newIdentifiers.push({
          system: "https://fhir.kemkes.go.id/id/nik",
          use: "official",
          value: data.nik,
        });
      }

      if (data.ihs) {
        newIdentifiers.push({
          system: "https://fhir.kemkes.go.id/id/ihs-number",
          use: "official",
          value: data.ihs,
        });
      }

      patchOps.push({
        op: "test",
        path: "/identifier",
        value: existingData.identifier,
      });

      patchOps.push({
        op: "replace",
        path: "/identifier",
        value: newIdentifiers,
      });
    }

    // 🔹 Marital Status
    if (data.maritalStatus) {
      const mapped = this.buildMaritalStatus(data.maritalStatus);

      patchOps.push({
        op: "replace",
        path: "/maritalStatus",
        value: mapped,
      });
    }

    // 🔹 Address
    if (data.address) {
      if (!existingData.address) {
        throw new Error(
          "⚠️ Field 'address' lama tidak ditemukan. PATCH dibatalkan.",
        );
      }

      const newAddress = this.buildAddress({
        use: "home",
        type: "both",
        ...data.address,
      });

      patchOps.push({
        op: "test",
        path: "/address",
        value: existingData.address,
      });
      patchOps.push({
        op: "replace",
        path: "/address",
        value: newAddress,
      });
    }

    if (patchOps.length === 0) {
      throw new Error("⚠️ Tidak ada field yang bisa diubah.");
    }

    return patchOps;
  }
}
