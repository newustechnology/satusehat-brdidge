import { ObservationDto } from "../../../dto/resource/observationDto";
import { DataArray } from "../../../types/dto/core";
import { CreateObservationInput, ExistingObservation, FhirObservation, PatchObservationInput } from "../../../types/dto/resource/observation";
import { ResourceService } from "../resource.service";

export class ObservationService {
  private dto: ObservationDto;

  constructor(private parentService: ResourceService) {
    this.dto = new ObservationDto();
  }

  async create(data: CreateObservationInput): Promise<any> {
    const payload = this.dto.formatCreatePayload(data);
    const response = await this.parentService.callEndpoint<FhirObservation>(
      "/Observation",
      "POST",
      payload,
      { "Content-Type": "application/json" }
    );
    return response.data;
  }

  async searchBy(params: Record<string, string>): Promise<DataArray<FhirObservation>> {
    const queryParams = new URLSearchParams(params);
    const response = await this.parentService.callEndpoint<DataArray<FhirObservation>>(
      `/Observation?${queryParams.toString()}`,
      "GET",
      undefined,
      { "Content-Type": "application/json" }
    );
    return response.data;
  }

  async getById(id: string): Promise<FhirObservation> {
    const response = await this.parentService.callEndpoint<FhirObservation>(
      `/Observation/${id}`,
      "GET",
      undefined,
      { "Content-Type": "application/json" }
    );
    return response.data;
  }

  async update(id: string, data: FhirObservation): Promise<any> {
    const response = await this.parentService.callEndpoint<FhirObservation>(
      `/Observation/${id}`,
      "PUT",
      data,
      { "Content-Type": "application/json" }
    );
    return response.data;
  }

  async patch(id: string, data: PatchObservationInput, existingData: ExistingObservation): Promise<any> {
    const payload = this.dto.fromatPatchPayload(data, existingData);
    const response = await this.parentService.callEndpoint<FhirObservation>(
      `/Observation/${id}`,
      "PATCH",
      payload,
      { "Content-Type": "application/json-patch+json" }
    );
    return response.data;
  }
}
