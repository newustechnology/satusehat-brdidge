import { MedicationDto } from "../../../dto/resource/medicationDto";
import { DataArray } from "../../../types/dto/core";
import { CreateMedicationInput, ExistingMedication, FhirMedication, PatchMedicationInput } from "../../../types/dto/resource/medication";
import { ResourceService } from "../resource.service";

export class MedicationService {
  private dto: MedicationDto;

  constructor(private parentService: ResourceService) {
    this.dto = new MedicationDto();
  }

  async create(data: CreateMedicationInput): Promise<any> {
    const payload = this.dto.formatCreatePayload(data);
    const response = await this.parentService.callEndpoint<FhirMedication>(
      "/Medication",
      "POST",
      payload,
      { "Content-Type": "application/json" }
    );
    return response.data;
  }

  async searchBy(params: Record<string, string>): Promise<DataArray<FhirMedication>> {
    const queryParams = new URLSearchParams(params);
    const response = await this.parentService.callEndpoint<DataArray<FhirMedication>>(
      `/Medication?${queryParams.toString()}`,
      "GET",
      undefined,
      { "Content-Type": "application/json" }
    );
    return response.data;
  }

  async getById(id: string): Promise<FhirMedication> {
    const response = await this.parentService.callEndpoint<FhirMedication>(
      `/Medication/${id}`,
      "GET",
      undefined,
      { "Content-Type": "application/json" }
    );
    return response.data;
  }

  async update(id: string, data: FhirMedication): Promise<any> {
    const response = await this.parentService.callEndpoint<FhirMedication>(
      `/Medication/${id}`,
      "PUT",
      data,
      { "Content-Type": "application/json" }
    );
    return response.data;
  }

  async patch(id: string, data: PatchMedicationInput, existingData: ExistingMedication): Promise<any> {
    const payload = this.dto.fromatPatchPayload(data, existingData);
    const response = await this.parentService.callEndpoint<FhirMedication>(
      `/Medication/${id}`,
      "PATCH",
      payload,
      { "Content-Type": "application/json-patch+json" }
    );
    return response.data;
  }
}
