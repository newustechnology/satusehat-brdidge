import { DtoCore } from "../core/DtoCore";
import { CreateChargeItemInput, ExistingChargeItem, FhirChargeItem, PatchChargeItemInput, FhirPatchChargeItem } from "../../types/dto/resource/chargeItem";

export class ChargeItemDto extends DtoCore {
  formatCreatePayload(data: CreateChargeItemInput): FhirChargeItem {
    return {
      resourceType: "ChargeItem",
      meta: {
        profile: [`https://fhir.kemkes.go.id/r4/StructureDefinition/ChargeItem`]
      },
      ...data
    } as FhirChargeItem;
  }

  fromatPatchPayload(data: PatchChargeItemInput, existingData: ExistingChargeItem): FhirPatchChargeItem[] {
    if (!data || !existingData) {
      throw new Error("Data baru dan data lama wajib disediakan untuk PATCH penuh.");
    }

    const patchOps: FhirPatchChargeItem[] = [];
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
