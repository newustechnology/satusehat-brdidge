import { EncounterDto } from "../../../dto/resource/encounterDto";
import { DataArray } from "../../../types/dto/core";
import { CreateEncounterInput, ExistingEncounter, FhirEncounter, PatchEncounterInput } from "../../../types/dto/resource/encounter";
import { ResourceService } from "../resource.service";

export class EncounterService {
  private dto: EncounterDto;

  constructor(private parentService: ResourceService) {
    this.dto = new EncounterDto();
  }

  async create(data: CreateEncounterInput): Promise<any> {
    const payload = this.dto.formatCreatePayload(data);
    const response = await this.parentService.callEndpoint<FhirEncounter>(
      "/Encounter",
      "POST",
      payload,
      { "Content-Type": "application/json" }
    );
    return response.data;
  }

  async searchBy(params: Record<string, string>): Promise<DataArray<FhirEncounter>> {
    const queryParams = new URLSearchParams(params);
    const response = await this.parentService.callEndpoint<DataArray<FhirEncounter>>(
      `/Encounter?${queryParams.toString()}`,
      "GET",
      undefined,
      { "Content-Type": "application/json" }
    );
    return response.data;
  }

  async getById(id: string): Promise<FhirEncounter> {
    const response = await this.parentService.callEndpoint<FhirEncounter>(
      `/Encounter/${id}`,
      "GET",
      undefined,
      { "Content-Type": "application/json" }
    );
    return response.data;
  }

  async update(id: string, data: FhirEncounter): Promise<any> {
    const response = await this.parentService.callEndpoint<FhirEncounter>(
      `/Encounter/${id}`,
      "PUT",
      data,
      { "Content-Type": "application/json" }
    );
    return response.data;
  }

  async patch(id: string, data: PatchEncounterInput, existingData: ExistingEncounter): Promise<any> {
    const payload = this.dto.fromatPatchPayload(data, existingData);
    const response = await this.parentService.callEndpoint<FhirEncounter>(
      `/Encounter/${id}`,
      "PATCH",
      payload,
      { "Content-Type": "application/json-patch+json" }
    );
    return response.data;
  }
}
