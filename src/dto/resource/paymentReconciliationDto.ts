import { DtoCore } from "../core/DtoCore";
import { CreatePaymentReconciliationInput, ExistingPaymentReconciliation, FhirPaymentReconciliation, PatchPaymentReconciliationInput, FhirPatchPaymentReconciliation } from "../../types/dto/resource/paymentReconciliation";

export class PaymentReconciliationDto extends DtoCore {
  formatCreatePayload(data: CreatePaymentReconciliationInput): FhirPaymentReconciliation {
    return {
      resourceType: "PaymentReconciliation",
      meta: {
        profile: [`https://fhir.kemkes.go.id/r4/StructureDefinition/PaymentReconciliation`]
      },
      ...data
    } as FhirPaymentReconciliation;
  }

  fromatPatchPayload(data: PatchPaymentReconciliationInput, existingData: ExistingPaymentReconciliation): FhirPatchPaymentReconciliation[] {
    if (!data || !existingData) {
      throw new Error("Data baru dan data lama wajib disediakan untuk PATCH penuh.");
    }

    const patchOps: FhirPatchPaymentReconciliation[] = [];
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
