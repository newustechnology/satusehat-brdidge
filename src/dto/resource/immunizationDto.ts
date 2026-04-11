import { DtoCore } from "../core/DtoCore";
import { CreateImmunizationInput, ExistingImmunization, FhirImmunization, PatchImmunizationInput, FhirPatchImmunization } from "../../types/dto/resource/immunization";

export class ImmunizationDto extends DtoCore {
  formatCreatePayload(data: CreateImmunizationInput): FhirImmunization {
    return {
      resourceType: "Immunization",
      meta: {
        profile: [`https://fhir.kemkes.go.id/r4/StructureDefinition/Immunization`]
      },
      ...data
    } as FhirImmunization;
  }

  fromatPatchPayload(data: PatchImmunizationInput, existingData: ExistingImmunization): FhirPatchImmunization[] {
    if (!data || !existingData) {
      throw new Error("Data baru dan data lama wajib disediakan untuk PATCH penuh.");
    }

    const patchOps: FhirPatchImmunization[] = [];
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
