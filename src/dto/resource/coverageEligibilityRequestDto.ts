import { DtoCore } from "../core/DtoCore";
import { CreateCoverageEligibilityRequestInput, ExistingCoverageEligibilityRequest, FhirCoverageEligibilityRequest, PatchCoverageEligibilityRequestInput, FhirPatchCoverageEligibilityRequest } from "../../types/dto/resource/coverageEligibilityRequest";

export class CoverageEligibilityRequestDto extends DtoCore {
  formatCreatePayload(data: CreateCoverageEligibilityRequestInput): FhirCoverageEligibilityRequest {
    return {
      resourceType: "CoverageEligibilityRequest",
      meta: {
        profile: [`https://fhir.kemkes.go.id/r4/StructureDefinition/CoverageEligibilityRequest`]
      },
      ...data
    } as FhirCoverageEligibilityRequest;
  }

  fromatPatchPayload(data: PatchCoverageEligibilityRequestInput, existingData: ExistingCoverageEligibilityRequest): FhirPatchCoverageEligibilityRequest[] {
    if (!data || !existingData) {
      throw new Error("Data baru dan data lama wajib disediakan untuk PATCH penuh.");
    }

    const patchOps: FhirPatchCoverageEligibilityRequest[] = [];
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
