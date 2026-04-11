import { DtoCore } from "../core/DtoCore";
import { CreateImagingStudyInput, ExistingImagingStudy, FhirImagingStudy, PatchImagingStudyInput, FhirPatchImagingStudy } from "../../types/dto/resource/imagingStudy";

export class ImagingStudyDto extends DtoCore {
  formatCreatePayload(data: CreateImagingStudyInput): FhirImagingStudy {
    return {
      resourceType: "ImagingStudy",
      meta: {
        profile: [`https://fhir.kemkes.go.id/r4/StructureDefinition/ImagingStudy`]
      },
      ...data
    } as FhirImagingStudy;
  }

  fromatPatchPayload(data: PatchImagingStudyInput, existingData: ExistingImagingStudy): FhirPatchImagingStudy[] {
    if (!data || !existingData) {
      throw new Error("Data baru dan data lama wajib disediakan untuk PATCH penuh.");
    }

    const patchOps: FhirPatchImagingStudy[] = [];
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
