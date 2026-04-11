import { DtoCore } from "../core/DtoCore";
import { CreateEncounterInput, ExistingEncounter, FhirEncounter, PatchEncounterInput, FhirPatchEncounter } from "../../types/dto/resource/encounter";

export class EncounterDto extends DtoCore {
  formatCreatePayload(data: CreateEncounterInput): FhirEncounter {
    return {
      resourceType: "Encounter",
      meta: {
        profile: [`https://fhir.kemkes.go.id/r4/StructureDefinition/Encounter`]
      },
      ...data
    } as FhirEncounter;
  }

  fromatPatchPayload(data: PatchEncounterInput, existingData: ExistingEncounter): FhirPatchEncounter[] {
    if (!data || !existingData) {
      throw new Error("Data baru dan data lama wajib disediakan untuk PATCH penuh.");
    }

    const patchOps: FhirPatchEncounter[] = [];
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
