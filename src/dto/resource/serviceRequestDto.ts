import { DtoCore } from "../core/DtoCore";
import { CreateServiceRequestInput, ExistingServiceRequest, FhirServiceRequest, PatchServiceRequestInput, FhirPatchServiceRequest } from "../../types/dto/resource/serviceRequest";

export class ServiceRequestDto extends DtoCore {
  formatCreatePayload(data: CreateServiceRequestInput): FhirServiceRequest {
    return {
      resourceType: "ServiceRequest",
      meta: {
        profile: [`https://fhir.kemkes.go.id/r4/StructureDefinition/ServiceRequest`]
      },
      ...data
    } as FhirServiceRequest;
  }

  fromatPatchPayload(data: PatchServiceRequestInput, existingData: ExistingServiceRequest): FhirPatchServiceRequest[] {
    if (!data || !existingData) {
      throw new Error("Data baru dan data lama wajib disediakan untuk PATCH penuh.");
    }

    const patchOps: FhirPatchServiceRequest[] = [];
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
