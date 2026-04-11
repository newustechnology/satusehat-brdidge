import { DtoCore } from "../core/DtoCore";
import { CreateCoverageEligibilityResponseInput, ExistingCoverageEligibilityResponse, FhirCoverageEligibilityResponse, PatchCoverageEligibilityResponseInput, FhirPatchCoverageEligibilityResponse } from "../../types/dto/resource/coverageEligibilityResponse";

export class CoverageEligibilityResponseDto extends DtoCore {
  formatCreatePayload(data: CreateCoverageEligibilityResponseInput): FhirCoverageEligibilityResponse {
    return {
      resourceType: "CoverageEligibilityResponse",
      meta: {
        profile: [`https://fhir.kemkes.go.id/r4/StructureDefinition/CoverageEligibilityResponse`]
      },
      ...data
    } as FhirCoverageEligibilityResponse;
  }

  fromatPatchPayload(data: PatchCoverageEligibilityResponseInput, existingData: ExistingCoverageEligibilityResponse): FhirPatchCoverageEligibilityResponse[] {
    if (!data || !existingData) {
      throw new Error("Data baru dan data lama wajib disediakan untuk PATCH penuh.");
    }

    const patchOps: FhirPatchCoverageEligibilityResponse[] = [];
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
