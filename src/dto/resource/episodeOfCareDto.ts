import { DtoCore } from "../core/DtoCore";
import { CreateEpisodeOfCareInput, ExistingEpisodeOfCare, FhirEpisodeOfCare, PatchEpisodeOfCareInput, FhirPatchEpisodeOfCare } from "../../types/dto/resource/episodeOfCare";

export class EpisodeOfCareDto extends DtoCore {
  formatCreatePayload(data: CreateEpisodeOfCareInput): FhirEpisodeOfCare {
    return {
      resourceType: "EpisodeOfCare",
      meta: {
        profile: [`https://fhir.kemkes.go.id/r4/StructureDefinition/EpisodeOfCare`]
      },
      ...data
    } as FhirEpisodeOfCare;
  }

  fromatPatchPayload(data: PatchEpisodeOfCareInput, existingData: ExistingEpisodeOfCare): FhirPatchEpisodeOfCare[] {
    if (!data || !existingData) {
      throw new Error("Data baru dan data lama wajib disediakan untuk PATCH penuh.");
    }

    const patchOps: FhirPatchEpisodeOfCare[] = [];
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
