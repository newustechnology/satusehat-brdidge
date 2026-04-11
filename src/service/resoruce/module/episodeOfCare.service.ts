import { EpisodeOfCareDto } from "../../../dto/resource/episodeOfCareDto";
import { DataArray } from "../../../types/dto/core";
import { CreateEpisodeOfCareInput, ExistingEpisodeOfCare, FhirEpisodeOfCare, PatchEpisodeOfCareInput } from "../../../types/dto/resource/episodeOfCare";
import { ResourceService } from "../resource.service";

export class EpisodeOfCareService {
  private dto: EpisodeOfCareDto;

  constructor(private parentService: ResourceService) {
    this.dto = new EpisodeOfCareDto();
  }

  async create(data: CreateEpisodeOfCareInput): Promise<any> {
    const payload = this.dto.formatCreatePayload(data);
    const response = await this.parentService.callEndpoint<FhirEpisodeOfCare>(
      "/EpisodeOfCare",
      "POST",
      payload,
      { "Content-Type": "application/json" }
    );
    return response.data;
  }

  async searchBy(params: Record<string, string>): Promise<DataArray<FhirEpisodeOfCare>> {
    const queryParams = new URLSearchParams(params);
    const response = await this.parentService.callEndpoint<DataArray<FhirEpisodeOfCare>>(
      `/EpisodeOfCare?${queryParams.toString()}`,
      "GET",
      undefined,
      { "Content-Type": "application/json" }
    );
    return response.data;
  }

  async getById(id: string): Promise<FhirEpisodeOfCare> {
    const response = await this.parentService.callEndpoint<FhirEpisodeOfCare>(
      `/EpisodeOfCare/${id}`,
      "GET",
      undefined,
      { "Content-Type": "application/json" }
    );
    return response.data;
  }

  async update(id: string, data: FhirEpisodeOfCare): Promise<any> {
    const response = await this.parentService.callEndpoint<FhirEpisodeOfCare>(
      `/EpisodeOfCare/${id}`,
      "PUT",
      data,
      { "Content-Type": "application/json" }
    );
    return response.data;
  }

  async patch(id: string, data: PatchEpisodeOfCareInput, existingData: ExistingEpisodeOfCare): Promise<any> {
    const payload = this.dto.fromatPatchPayload(data, existingData);
    const response = await this.parentService.callEndpoint<FhirEpisodeOfCare>(
      `/EpisodeOfCare/${id}`,
      "PATCH",
      payload,
      { "Content-Type": "application/json-patch+json" }
    );
    return response.data;
  }
}
