import { CoverageDto } from "../../../dto/resource/coverageDto";
import { DataArray } from "../../../types/dto/core";
import { CreateCoverageInput, ExistingCoverage, FhirCoverage, PatchCoverageInput } from "../../../types/dto/resource/coverage";
import { ResourceService } from "../resource.service";

export class CoverageService {
  private dto: CoverageDto;

  constructor(private parentService: ResourceService) {
    this.dto = new CoverageDto();
  }

  async create(data: CreateCoverageInput): Promise<any> {
    const payload = this.dto.formatCreatePayload(data);
    const response = await this.parentService.callEndpoint<FhirCoverage>(
      "/Coverage",
      "POST",
      payload,
      { "Content-Type": "application/json" }
    );
    return response.data;
  }

  async searchBy(params: Record<string, string>): Promise<DataArray<FhirCoverage>> {
    const queryParams = new URLSearchParams(params);
    const response = await this.parentService.callEndpoint<DataArray<FhirCoverage>>(
      `/Coverage?${queryParams.toString()}`,
      "GET",
      undefined,
      { "Content-Type": "application/json" }
    );
    return response.data;
  }

  async getById(id: string): Promise<FhirCoverage> {
    const response = await this.parentService.callEndpoint<FhirCoverage>(
      `/Coverage/${id}`,
      "GET",
      undefined,
      { "Content-Type": "application/json" }
    );
    return response.data;
  }

  async update(id: string, data: FhirCoverage): Promise<any> {
    const response = await this.parentService.callEndpoint<FhirCoverage>(
      `/Coverage/${id}`,
      "PUT",
      data,
      { "Content-Type": "application/json" }
    );
    return response.data;
  }

  async patch(id: string, data: PatchCoverageInput, existingData: ExistingCoverage): Promise<any> {
    const payload = this.dto.fromatPatchPayload(data, existingData);
    const response = await this.parentService.callEndpoint<FhirCoverage>(
      `/Coverage/${id}`,
      "PATCH",
      payload,
      { "Content-Type": "application/json-patch+json" }
    );
    return response.data;
  }
}
