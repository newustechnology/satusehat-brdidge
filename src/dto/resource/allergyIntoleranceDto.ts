import { DtoCore } from "../core/DtoCore";
import { CreateAllergyIntoleranceInput, ExistingAllergyIntolerance, FhirAllergyIntolerance, PatchAllergyIntoleranceInput, FhirPatchAllergyIntolerance } from "../../types/dto/resource/allergyIntolerance";

export class AllergyIntoleranceDto extends DtoCore {
  formatCreatePayload(data: CreateAllergyIntoleranceInput): FhirAllergyIntolerance {
    return {
      resourceType: "AllergyIntolerance",
      meta: {
        profile: [`https://fhir.kemkes.go.id/r4/StructureDefinition/AllergyIntolerance`]
      },
      ...data
    } as FhirAllergyIntolerance;
  }

  fromatPatchPayload(data: PatchAllergyIntoleranceInput, existingData: ExistingAllergyIntolerance): FhirPatchAllergyIntolerance[] {
    if (!data || !existingData) {
      throw new Error("Data baru dan data lama wajib disediakan untuk PATCH penuh.");
    }

    const patchOps: FhirPatchAllergyIntolerance[] = [];
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
