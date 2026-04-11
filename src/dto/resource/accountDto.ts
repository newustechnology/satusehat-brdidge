import { DtoCore } from "../core/DtoCore";
import { CreateAccountInput, ExistingAccount, FhirAccount, PatchAccountInput, FhirPatchAccount } from "../../types/dto/resource/account";

export class AccountDto extends DtoCore {
  formatCreatePayload(data: CreateAccountInput): FhirAccount {
    return {
      resourceType: "Account",
      meta: {
        profile: [`https://fhir.kemkes.go.id/r4/StructureDefinition/Account`]
      },
      ...data
    } as FhirAccount;
  }

  fromatPatchPayload(data: PatchAccountInput, existingData: ExistingAccount): FhirPatchAccount[] {
    if (!data || !existingData) {
      throw new Error("Data baru dan data lama wajib disediakan untuk PATCH penuh.");
    }

    const patchOps: FhirPatchAccount[] = [];
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
