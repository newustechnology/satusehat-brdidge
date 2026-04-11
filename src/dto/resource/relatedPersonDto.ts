import { DtoCore } from "../core/DtoCore";
import { CreateRelatedPersonInput, ExistingRelatedPerson, FhirRelatedPerson, PatchRelatedPersonInput, FhirPatchRelatedPerson } from "../../types/dto/resource/relatedPerson";

export class RelatedPersonDto extends DtoCore {
  formatCreatePayload(data: CreateRelatedPersonInput): FhirRelatedPerson {
    return {
      resourceType: "RelatedPerson",
      meta: {
        profile: [`https://fhir.kemkes.go.id/r4/StructureDefinition/RelatedPerson`]
      },
      ...data
    } as FhirRelatedPerson;
  }

  fromatPatchPayload(data: PatchRelatedPersonInput, existingData: ExistingRelatedPerson): FhirPatchRelatedPerson[] {
    if (!data || !existingData) {
      throw new Error("Data baru dan data lama wajib disediakan untuk PATCH penuh.");
    }

    const patchOps: FhirPatchRelatedPerson[] = [];
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
