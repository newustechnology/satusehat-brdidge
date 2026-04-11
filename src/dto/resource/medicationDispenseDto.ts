import { DtoCore } from "../core/DtoCore";
import { CreateMedicationDispenseInput, ExistingMedicationDispense, FhirMedicationDispense, PatchMedicationDispenseInput, FhirPatchMedicationDispense } from "../../types/dto/resource/medicationDispense";

export class MedicationDispenseDto extends DtoCore {
  formatCreatePayload(data: CreateMedicationDispenseInput): FhirMedicationDispense {
    return {
      resourceType: "MedicationDispense",
      meta: {
        profile: [`https://fhir.kemkes.go.id/r4/StructureDefinition/MedicationDispense`]
      },
      ...data
    } as FhirMedicationDispense;
  }

  fromatPatchPayload(data: PatchMedicationDispenseInput, existingData: ExistingMedicationDispense): FhirPatchMedicationDispense[] {
    if (!data || !existingData) {
      throw new Error("Data baru dan data lama wajib disediakan untuk PATCH penuh.");
    }

    const patchOps: FhirPatchMedicationDispense[] = [];
    const _existingData = existingData as any; // Fixing TS indexing error

    for (const [key, value] of Object.entries(data)) {
        if (value !== undefined) {
            patchOps.push({
                op: "test",
                path: `/${key}`,
                value: _existingData[key] || ""
            });
            patchOps.push({
                op: "replace",
                path: `/${key}`,
                value: value
            });
        }
    }

    if (patchOps.length === 0) {
      throw new Error("Tidak ada field yang bisa diubah.");
    }

    return patchOps;
  }
}
