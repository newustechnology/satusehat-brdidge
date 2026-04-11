import { MedicationRequestDto } from "../../../dto/resource/medicationRequestDto";
import { DataArray } from "../../../types/dto/core";
import { CreateMedicationRequestInput, ExistingMedicationRequest, FhirMedicationRequest, PatchMedicationRequestInput } from "../../../types/dto/resource/medicationRequest";
import { ResourceService } from "../resource.service";

export class MedicationRequestService {
  private dto: MedicationRequestDto;

  constructor(private parentService: ResourceService) {
    this.dto = new MedicationRequestDto();
  }

  async create(data: CreateMedicationRequestInput): Promise<any> {
    const payload = this.dto.formatCreatePayload(data);
    const response = await this.parentService.callEndpoint<FhirMedicationRequest>(
      "/MedicationRequest",
      "POST",
      payload,
      { "Content-Type": "application/json" }
    );
    return response.data;
  }

  async searchBy(params: Record<string, string>): Promise<DataArray<FhirMedicationRequest>> {
    const queryParams = new URLSearchParams(params);
    const response = await this.parentService.callEndpoint<DataArray<FhirMedicationRequest>>(
      `/MedicationRequest?${queryParams.toString()}`,
      "GET",
      undefined,
      { "Content-Type": "application/json" }
    );
    return response.data;
  }

  async getById(id: string): Promise<FhirMedicationRequest> {
    const response = await this.parentService.callEndpoint<FhirMedicationRequest>(
      `/MedicationRequest/${id}`,
      "GET",
      undefined,
      { "Content-Type": "application/json" }
    );
    return response.data;
  }

  async update(id: string, data: FhirMedicationRequest): Promise<any> {
    const response = await this.parentService.callEndpoint<FhirMedicationRequest>(
      `/MedicationRequest/${id}`,
      "PUT",
      data,
      { "Content-Type": "application/json" }
    );
    return response.data;
  }

  async patch(id: string, data: PatchMedicationRequestInput, existingData: ExistingMedicationRequest): Promise<any> {
    const payload = this.dto.fromatPatchPayload(data, existingData);
    const response = await this.parentService.callEndpoint<FhirMedicationRequest>(
      `/MedicationRequest/${id}`,
      "PATCH",
      payload,
      { "Content-Type": "application/json-patch+json" }
    );
    return response.data;
  }
}
