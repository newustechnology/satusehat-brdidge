import { DtoCore } from "../core/DtoCore";
import { CreateMedicationRequestInput, ExistingMedicationRequest, FhirMedicationRequest, PatchMedicationRequestInput, FhirPatchMedicationRequest } from "../../types/dto/resource/medicationRequest";

export class MedicationRequestDto extends DtoCore {
  formatCreatePayload(data: CreateMedicationRequestInput): FhirMedicationRequest {
    return {
      resourceType: "MedicationRequest",
      meta: {
        profile: [`https://fhir.kemkes.go.id/r4/StructureDefinition/MedicationRequest`]
      },
      ...data
    } as FhirMedicationRequest;
  }

  fromatPatchPayload(data: PatchMedicationRequestInput, existingData: ExistingMedicationRequest): FhirPatchMedicationRequest[] {
    if (!data || !existingData) {
      throw new Error("Data baru dan data lama wajib disediakan untuk PATCH penuh.");
    }

    const patchOps: FhirPatchMedicationRequest[] = [];
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
