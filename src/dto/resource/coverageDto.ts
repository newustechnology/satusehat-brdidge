import { DtoCore } from "../core/DtoCore";
import { CreateCoverageInput, ExistingCoverage, FhirCoverage, PatchCoverageInput, FhirPatchCoverage } from "../../types/dto/resource/coverage";

export class CoverageDto extends DtoCore {
  formatCreatePayload(data: CreateCoverageInput): FhirCoverage {
    return {
      resourceType: "Coverage",
      meta: {
        profile: [`https://fhir.kemkes.go.id/r4/StructureDefinition/Coverage`]
      },
      ...data
    } as FhirCoverage;
  }

  fromatPatchPayload(data: PatchCoverageInput, existingData: ExistingCoverage): FhirPatchCoverage[] {
    if (!data || !existingData) {
      throw new Error("Data baru dan data lama wajib disediakan untuk PATCH penuh.");
    }

    const patchOps: FhirPatchCoverage[] = [];
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
