import { DtoCore } from "../core/DtoCore";
import { CreateClaimResponseInput, ExistingClaimResponse, FhirClaimResponse, PatchClaimResponseInput, FhirPatchClaimResponse } from "../../types/dto/resource/claimResponse";

export class ClaimResponseDto extends DtoCore {
  formatCreatePayload(data: CreateClaimResponseInput): FhirClaimResponse {
    return {
      resourceType: "ClaimResponse",
      meta: {
        profile: [`https://fhir.kemkes.go.id/r4/StructureDefinition/ClaimResponse`]
      },
      ...data
    } as FhirClaimResponse;
  }

  fromatPatchPayload(data: PatchClaimResponseInput, existingData: ExistingClaimResponse): FhirPatchClaimResponse[] {
    if (!data || !existingData) {
      throw new Error("Data baru dan data lama wajib disediakan untuk PATCH penuh.");
    }

    const patchOps: FhirPatchClaimResponse[] = [];
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
