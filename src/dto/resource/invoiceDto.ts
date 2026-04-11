import { DtoCore } from "../core/DtoCore";
import { CreateInvoiceInput, ExistingInvoice, FhirInvoice, PatchInvoiceInput, FhirPatchInvoice } from "../../types/dto/resource/invoice";

export class InvoiceDto extends DtoCore {
  formatCreatePayload(data: CreateInvoiceInput): FhirInvoice {
    return {
      resourceType: "Invoice",
      meta: {
        profile: [`https://fhir.kemkes.go.id/r4/StructureDefinition/Invoice`]
      },
      ...data
    } as FhirInvoice;
  }

  fromatPatchPayload(data: PatchInvoiceInput, existingData: ExistingInvoice): FhirPatchInvoice[] {
    if (!data || !existingData) {
      throw new Error("Data baru dan data lama wajib disediakan untuk PATCH penuh.");
    }

    const patchOps: FhirPatchInvoice[] = [];
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
