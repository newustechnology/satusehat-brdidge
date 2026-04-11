import { DtoCore } from "../core/DtoCore";
import { CreateConditionInput, ExistingCondition, FhirCondition, PatchConditionInput, FhirPatchCondition } from "../../types/dto/resource/condition";

export class ConditionDto extends DtoCore {
  formatCreatePayload(data: CreateConditionInput): FhirCondition {
    return {
      resourceType: "Condition",
      meta: {
        profile: [`https://fhir.kemkes.go.id/r4/StructureDefinition/Condition`]
      },
      ...data
    } as FhirCondition;
  }

  fromatPatchPayload(data: PatchConditionInput, existingData: ExistingCondition): FhirPatchCondition[] {
    if (!data || !existingData) {
      throw new Error("Data baru dan data lama wajib disediakan untuk PATCH penuh.");
    }

    const patchOps: FhirPatchCondition[] = [];
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
