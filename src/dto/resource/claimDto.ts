import { DtoCore } from "../core/DtoCore";
import { CreateClaimInput, ExistingClaim, FhirClaim, PatchClaimInput, FhirPatchClaim } from "../../types/dto/resource/claim";

export class ClaimDto extends DtoCore {
  formatCreatePayload(data: CreateClaimInput): FhirClaim {
    return {
      resourceType: "Claim",
      meta: {
        profile: [`https://fhir.kemkes.go.id/r4/StructureDefinition/Claim`]
      },
      ...data
    } as FhirClaim;
  }

  fromatPatchPayload(data: PatchClaimInput, existingData: ExistingClaim): FhirPatchClaim[] {
    if (!data || !existingData) {
      throw new Error("Data baru dan data lama wajib disediakan untuk PATCH penuh.");
    }

    const patchOps: FhirPatchClaim[] = [];
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
