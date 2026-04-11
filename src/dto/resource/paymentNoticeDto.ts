import { DtoCore } from "../core/DtoCore";
import { CreatePaymentNoticeInput, ExistingPaymentNotice, FhirPaymentNotice, PatchPaymentNoticeInput, FhirPatchPaymentNotice } from "../../types/dto/resource/paymentNotice";

export class PaymentNoticeDto extends DtoCore {
  formatCreatePayload(data: CreatePaymentNoticeInput): FhirPaymentNotice {
    return {
      resourceType: "PaymentNotice",
      meta: {
        profile: [`https://fhir.kemkes.go.id/r4/StructureDefinition/PaymentNotice`]
      },
      ...data
    } as FhirPaymentNotice;
  }

  fromatPatchPayload(data: PatchPaymentNoticeInput, existingData: ExistingPaymentNotice): FhirPatchPaymentNotice[] {
    if (!data || !existingData) {
      throw new Error("Data baru dan data lama wajib disediakan untuk PATCH penuh.");
    }

    const patchOps: FhirPatchPaymentNotice[] = [];
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
