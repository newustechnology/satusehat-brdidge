import { DtoCore } from "../core/DtoCore";
import { CreateProcedureInput, ExistingProcedure, FhirProcedure, PatchProcedureInput, FhirPatchProcedure } from "../../types/dto/resource/procedure";

export class ProcedureDto extends DtoCore {
  formatCreatePayload(data: CreateProcedureInput): FhirProcedure {
    return {
      resourceType: "Procedure",
      meta: {
        profile: [`https://fhir.kemkes.go.id/r4/StructureDefinition/Procedure`]
      },
      ...data
    } as FhirProcedure;
  }

  fromatPatchPayload(data: PatchProcedureInput, existingData: ExistingProcedure): FhirPatchProcedure[] {
    if (!data || !existingData) {
      throw new Error("Data baru dan data lama wajib disediakan untuk PATCH penuh.");
    }

    const patchOps: FhirPatchProcedure[] = [];
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
