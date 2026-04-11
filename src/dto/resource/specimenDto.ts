import { DtoCore } from "../core/DtoCore";
import { CreateSpecimenInput, ExistingSpecimen, FhirSpecimen, PatchSpecimenInput, FhirPatchSpecimen } from "../../types/dto/resource/specimen";

export class SpecimenDto extends DtoCore {
  formatCreatePayload(data: CreateSpecimenInput): FhirSpecimen {
    return {
      resourceType: "Specimen",
      meta: {
        profile: [`https://fhir.kemkes.go.id/r4/StructureDefinition/Specimen`]
      },
      ...data
    } as FhirSpecimen;
  }

  fromatPatchPayload(data: PatchSpecimenInput, existingData: ExistingSpecimen): FhirPatchSpecimen[] {
    if (!data || !existingData) {
      throw new Error("Data baru dan data lama wajib disediakan untuk PATCH penuh.");
    }

    const patchOps: FhirPatchSpecimen[] = [];
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
