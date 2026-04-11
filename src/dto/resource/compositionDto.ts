import { DtoCore } from "../core/DtoCore";
import { CreateCompositionInput, ExistingComposition, FhirComposition, PatchCompositionInput, FhirPatchComposition } from "../../types/dto/resource/composition";

export class CompositionDto extends DtoCore {
  formatCreatePayload(data: CreateCompositionInput): FhirComposition {
    return {
      resourceType: "Composition",
      meta: {
        profile: [`https://fhir.kemkes.go.id/r4/StructureDefinition/Composition`]
      },
      ...data
    } as FhirComposition;
  }

  fromatPatchPayload(data: PatchCompositionInput, existingData: ExistingComposition): FhirPatchComposition[] {
    if (!data || !existingData) {
      throw new Error("Data baru dan data lama wajib disediakan untuk PATCH penuh.");
    }

    const patchOps: FhirPatchComposition[] = [];
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
