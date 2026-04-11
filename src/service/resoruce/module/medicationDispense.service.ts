import { MedicationDispenseDto } from "../../../dto/resource/medicationDispenseDto";
import { DataArray } from "../../../types/dto/core";
import { CreateMedicationDispenseInput, ExistingMedicationDispense, FhirMedicationDispense, PatchMedicationDispenseInput } from "../../../types/dto/resource/medicationDispense";
import { ResourceService } from "../resource.service";

export class MedicationDispenseService {
  private dto: MedicationDispenseDto;

  constructor(private parentService: ResourceService) {
    this.dto = new MedicationDispenseDto();
  }

  async create(data: CreateMedicationDispenseInput): Promise<any> {
    const payload = this.dto.formatCreatePayload(data);
    const response = await this.parentService.callEndpoint<FhirMedicationDispense>(
      "/MedicationDispense",
      "POST",
      payload,
      { "Content-Type": "application/json" }
    );
    return response.data;
  }

  async searchBy(params: Record<string, string>): Promise<DataArray<FhirMedicationDispense>> {
    const queryParams = new URLSearchParams(params);
    const response = await this.parentService.callEndpoint<DataArray<FhirMedicationDispense>>(
      `/MedicationDispense?${queryParams.toString()}`,
      "GET",
      undefined,
      { "Content-Type": "application/json" }
    );
    return response.data;
  }

  async getById(id: string): Promise<FhirMedicationDispense> {
    const response = await this.parentService.callEndpoint<FhirMedicationDispense>(
      `/MedicationDispense/${id}`,
      "GET",
      undefined,
      { "Content-Type": "application/json" }
    );
    return response.data;
  }

  async update(id: string, data: FhirMedicationDispense): Promise<any> {
    const response = await this.parentService.callEndpoint<FhirMedicationDispense>(
      `/MedicationDispense/${id}`,
      "PUT",
      data,
      { "Content-Type": "application/json" }
    );
    return response.data;
  }

  async patch(id: string, data: PatchMedicationDispenseInput, existingData: ExistingMedicationDispense): Promise<any> {
    const payload = this.dto.fromatPatchPayload(data, existingData);
    const response = await this.parentService.callEndpoint<FhirMedicationDispense>(
      `/MedicationDispense/${id}`,
      "PATCH",
      payload,
      { "Content-Type": "application/json-patch+json" }
    );
    return response.data;
  }
}
