import { DtoCore } from "../core/DtoCore";
import { CreateCarePlanInput, ExistingCarePlan, FhirCarePlan, PatchCarePlanInput, FhirPatchCarePlan } from "../../types/dto/resource/carePlan";

export class CarePlanDto extends DtoCore {
  formatCreatePayload(data: CreateCarePlanInput): FhirCarePlan {
    return {
      resourceType: "CarePlan",
      meta: {
        profile: [`https://fhir.kemkes.go.id/r4/StructureDefinition/CarePlan`]
      },
      ...data
    } as FhirCarePlan;
  }

  fromatPatchPayload(data: PatchCarePlanInput, existingData: ExistingCarePlan): FhirPatchCarePlan[] {
    if (!data || !existingData) {
      throw new Error("Data baru dan data lama wajib disediakan untuk PATCH penuh.");
    }

    const patchOps: FhirPatchCarePlan[] = [];
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
