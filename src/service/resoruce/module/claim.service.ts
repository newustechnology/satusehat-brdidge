import { ClaimDto } from "../../../dto/resource/claimDto";
import { DataArray } from "../../../types/dto/core";
import { CreateClaimInput, ExistingClaim, FhirClaim, PatchClaimInput } from "../../../types/dto/resource/claim";
import { ResourceService } from "../resource.service";

export class ClaimService {
  private dto: ClaimDto;

  constructor(private parentService: ResourceService) {
    this.dto = new ClaimDto();
  }

  async create(data: CreateClaimInput): Promise<any> {
    const payload = this.dto.formatCreatePayload(data);
    const response = await this.parentService.callEndpoint<FhirClaim>(
      "/Claim",
      "POST",
      payload,
      { "Content-Type": "application/json" }
    );
    return response.data;
  }

  async searchBy(params: Record<string, string>): Promise<DataArray<FhirClaim>> {
    const queryParams = new URLSearchParams(params);
    const response = await this.parentService.callEndpoint<DataArray<FhirClaim>>(
      `/Claim?${queryParams.toString()}`,
      "GET",
      undefined,
      { "Content-Type": "application/json" }
    );
    return response.data;
  }

  async getById(id: string): Promise<FhirClaim> {
    const response = await this.parentService.callEndpoint<FhirClaim>(
      `/Claim/${id}`,
      "GET",
      undefined,
      { "Content-Type": "application/json" }
    );
    return response.data;
  }

  async update(id: string, data: FhirClaim): Promise<any> {
    const response = await this.parentService.callEndpoint<FhirClaim>(
      `/Claim/${id}`,
      "PUT",
      data,
      { "Content-Type": "application/json" }
    );
    return response.data;
  }

  async patch(id: string, data: PatchClaimInput, existingData: ExistingClaim): Promise<any> {
    const payload = this.dto.fromatPatchPayload(data, existingData);
    const response = await this.parentService.callEndpoint<FhirClaim>(
      `/Claim/${id}`,
      "PATCH",
      payload,
      { "Content-Type": "application/json-patch+json" }
    );
    return response.data;
  }
}
