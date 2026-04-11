import { CoverageEligibilityResponseDto } from "../../../dto/resource/coverageEligibilityResponseDto";
import { DataArray } from "../../../types/dto/core";
import { CreateCoverageEligibilityResponseInput, ExistingCoverageEligibilityResponse, FhirCoverageEligibilityResponse, PatchCoverageEligibilityResponseInput } from "../../../types/dto/resource/coverageEligibilityResponse";
import { ResourceService } from "../resource.service";

export class CoverageEligibilityResponseService {
  private dto: CoverageEligibilityResponseDto;

  constructor(private parentService: ResourceService) {
    this.dto = new CoverageEligibilityResponseDto();
  }

  async create(data: CreateCoverageEligibilityResponseInput): Promise<any> {
    const payload = this.dto.formatCreatePayload(data);
    const response = await this.parentService.callEndpoint<FhirCoverageEligibilityResponse>(
      "/CoverageEligibilityResponse",
      "POST",
      payload,
      { "Content-Type": "application/json" }
    );
    return response.data;
  }

  async searchBy(params: Record<string, string>): Promise<DataArray<FhirCoverageEligibilityResponse>> {
    const queryParams = new URLSearchParams(params);
    const response = await this.parentService.callEndpoint<DataArray<FhirCoverageEligibilityResponse>>(
      `/CoverageEligibilityResponse?${queryParams.toString()}`,
      "GET",
      undefined,
      { "Content-Type": "application/json" }
    );
    return response.data;
  }

  async getById(id: string): Promise<FhirCoverageEligibilityResponse> {
    const response = await this.parentService.callEndpoint<FhirCoverageEligibilityResponse>(
      `/CoverageEligibilityResponse/${id}`,
      "GET",
      undefined,
      { "Content-Type": "application/json" }
    );
    return response.data;
  }

  async update(id: string, data: FhirCoverageEligibilityResponse): Promise<any> {
    const response = await this.parentService.callEndpoint<FhirCoverageEligibilityResponse>(
      `/CoverageEligibilityResponse/${id}`,
      "PUT",
      data,
      { "Content-Type": "application/json" }
    );
    return response.data;
  }

  async patch(id: string, data: PatchCoverageEligibilityResponseInput, existingData: ExistingCoverageEligibilityResponse): Promise<any> {
    const payload = this.dto.fromatPatchPayload(data, existingData);
    const response = await this.parentService.callEndpoint<FhirCoverageEligibilityResponse>(
      `/CoverageEligibilityResponse/${id}`,
      "PATCH",
      payload,
      { "Content-Type": "application/json-patch+json" }
    );
    return response.data;
  }
}
