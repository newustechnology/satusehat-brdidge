import { ClaimResponseDto } from "../../../dto/resource/claimResponseDto";
import { DataArray } from "../../../types/dto/core";
import { CreateClaimResponseInput, ExistingClaimResponse, FhirClaimResponse, PatchClaimResponseInput } from "../../../types/dto/resource/claimResponse";
import { ResourceService } from "../resource.service";

export class ClaimResponseService {
  private dto: ClaimResponseDto;

  constructor(private parentService: ResourceService) {
    this.dto = new ClaimResponseDto();
  }

  async create(data: CreateClaimResponseInput): Promise<any> {
    const payload = this.dto.formatCreatePayload(data);
    const response = await this.parentService.callEndpoint<FhirClaimResponse>(
      "/ClaimResponse",
      "POST",
      payload,
      { "Content-Type": "application/json" }
    );
    return response.data;
  }

  async searchBy(params: Record<string, string>): Promise<DataArray<FhirClaimResponse>> {
    const queryParams = new URLSearchParams(params);
    const response = await this.parentService.callEndpoint<DataArray<FhirClaimResponse>>(
      `/ClaimResponse?${queryParams.toString()}`,
      "GET",
      undefined,
      { "Content-Type": "application/json" }
    );
    return response.data;
  }

  async getById(id: string): Promise<FhirClaimResponse> {
    const response = await this.parentService.callEndpoint<FhirClaimResponse>(
      `/ClaimResponse/${id}`,
      "GET",
      undefined,
      { "Content-Type": "application/json" }
    );
    return response.data;
  }

  async update(id: string, data: FhirClaimResponse): Promise<any> {
    const response = await this.parentService.callEndpoint<FhirClaimResponse>(
      `/ClaimResponse/${id}`,
      "PUT",
      data,
      { "Content-Type": "application/json" }
    );
    return response.data;
  }

  async patch(id: string, data: PatchClaimResponseInput, existingData: ExistingClaimResponse): Promise<any> {
    const payload = this.dto.fromatPatchPayload(data, existingData);
    const response = await this.parentService.callEndpoint<FhirClaimResponse>(
      `/ClaimResponse/${id}`,
      "PATCH",
      payload,
      { "Content-Type": "application/json-patch+json" }
    );
    return response.data;
  }
}
