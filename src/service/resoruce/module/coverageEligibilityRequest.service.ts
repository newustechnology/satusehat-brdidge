import { CoverageEligibilityRequestDto } from "../../../dto/resource/coverageEligibilityRequestDto";
import { DataArray } from "../../../types/dto/core";
import { CreateCoverageEligibilityRequestInput, ExistingCoverageEligibilityRequest, FhirCoverageEligibilityRequest, PatchCoverageEligibilityRequestInput } from "../../../types/dto/resource/coverageEligibilityRequest";
import { ResourceService } from "../resource.service";

export class CoverageEligibilityRequestService {
  private dto: CoverageEligibilityRequestDto;

  constructor(private parentService: ResourceService) {
    this.dto = new CoverageEligibilityRequestDto();
  }

  async create(data: CreateCoverageEligibilityRequestInput): Promise<any> {
    const payload = this.dto.formatCreatePayload(data);
    const response = await this.parentService.callEndpoint<FhirCoverageEligibilityRequest>(
      "/CoverageEligibilityRequest",
      "POST",
      payload,
      { "Content-Type": "application/json" }
    );
    return response.data;
  }

  async searchBy(params: Record<string, string>): Promise<DataArray<FhirCoverageEligibilityRequest>> {
    const queryParams = new URLSearchParams(params);
    const response = await this.parentService.callEndpoint<DataArray<FhirCoverageEligibilityRequest>>(
      `/CoverageEligibilityRequest?${queryParams.toString()}`,
      "GET",
      undefined,
      { "Content-Type": "application/json" }
    );
    return response.data;
  }

  async getById(id: string): Promise<FhirCoverageEligibilityRequest> {
    const response = await this.parentService.callEndpoint<FhirCoverageEligibilityRequest>(
      `/CoverageEligibilityRequest/${id}`,
      "GET",
      undefined,
      { "Content-Type": "application/json" }
    );
    return response.data;
  }

  async update(id: string, data: FhirCoverageEligibilityRequest): Promise<any> {
    const response = await this.parentService.callEndpoint<FhirCoverageEligibilityRequest>(
      `/CoverageEligibilityRequest/${id}`,
      "PUT",
      data,
      { "Content-Type": "application/json" }
    );
    return response.data;
  }

  async patch(id: string, data: PatchCoverageEligibilityRequestInput, existingData: ExistingCoverageEligibilityRequest): Promise<any> {
    const payload = this.dto.fromatPatchPayload(data, existingData);
    const response = await this.parentService.callEndpoint<FhirCoverageEligibilityRequest>(
      `/CoverageEligibilityRequest/${id}`,
      "PATCH",
      payload,
      { "Content-Type": "application/json-patch+json" }
    );
    return response.data;
  }
}
