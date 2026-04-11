import { DtoCore } from "../core/DtoCore";
import { CreateObservationInput, ExistingObservation, FhirObservation, PatchObservationInput, FhirPatchObservation } from "../../types/dto/resource/observation";

export class ObservationDto extends DtoCore {
  formatCreatePayload(data: CreateObservationInput): FhirObservation {
    return {
      resourceType: "Observation",
      meta: {
        profile: [`https://fhir.kemkes.go.id/r4/StructureDefinition/Observation`]
      },
      ...data
    } as FhirObservation;
  }

  fromatPatchPayload(data: PatchObservationInput, existingData: ExistingObservation): FhirPatchObservation[] {
    if (!data || !existingData) {
      throw new Error("Data baru dan data lama wajib disediakan untuk PATCH penuh.");
    }

    const patchOps: FhirPatchObservation[] = [];
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
