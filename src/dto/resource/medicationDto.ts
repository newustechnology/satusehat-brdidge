import { DtoCore } from "../core/DtoCore";
import { CreateMedicationInput, ExistingMedication, FhirMedication, PatchMedicationInput, FhirPatchMedication } from "../../types/dto/resource/medication";

export class MedicationDto extends DtoCore {
  formatCreatePayload(data: CreateMedicationInput): FhirMedication {
    return {
      resourceType: "Medication",
      meta: {
        profile: [`https://fhir.kemkes.go.id/r4/StructureDefinition/Medication`]
      },
      ...data
    } as FhirMedication;
  }

  fromatPatchPayload(data: PatchMedicationInput, existingData: ExistingMedication): FhirPatchMedication[] {
    if (!data || !existingData) {
      throw new Error("Data baru dan data lama wajib disediakan untuk PATCH penuh.");
    }

    const patchOps: FhirPatchMedication[] = [];
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
