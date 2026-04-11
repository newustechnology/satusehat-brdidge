import { DtoCore } from "../core/DtoCore";
import { CreateClinicalImpressionInput, ExistingClinicalImpression, FhirClinicalImpression, PatchClinicalImpressionInput, FhirPatchClinicalImpression } from "../../types/dto/resource/clinicalImpression";

export class ClinicalImpressionDto extends DtoCore {
  formatCreatePayload(data: CreateClinicalImpressionInput): FhirClinicalImpression {
    return {
      resourceType: "ClinicalImpression",
      meta: {
        profile: [`https://fhir.kemkes.go.id/r4/StructureDefinition/ClinicalImpression`]
      },
      ...data
    } as FhirClinicalImpression;
  }

  fromatPatchPayload(data: PatchClinicalImpressionInput, existingData: ExistingClinicalImpression): FhirPatchClinicalImpression[] {
    if (!data || !existingData) {
      throw new Error("Data baru dan data lama wajib disediakan untuk PATCH penuh.");
    }

    const patchOps: FhirPatchClinicalImpression[] = [];
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
