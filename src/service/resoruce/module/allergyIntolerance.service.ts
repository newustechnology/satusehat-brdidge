import { AllergyIntoleranceDto } from "../../../dto/resource/allergyIntoleranceDto";
import { DataArray } from "../../../types/dto/core";
import { CreateAllergyIntoleranceInput, ExistingAllergyIntolerance, FhirAllergyIntolerance, PatchAllergyIntoleranceInput } from "../../../types/dto/resource/allergyIntolerance";
import { ResourceService } from "../resource.service";

export class AllergyIntoleranceService {
  private dto: AllergyIntoleranceDto;

  constructor(private parentService: ResourceService) {
    this.dto = new AllergyIntoleranceDto();
  }

  async create(data: CreateAllergyIntoleranceInput): Promise<any> {
    const payload = this.dto.formatCreatePayload(data);
    const response = await this.parentService.callEndpoint<FhirAllergyIntolerance>(
      "/AllergyIntolerance",
      "POST",
      payload,
      { "Content-Type": "application/json" }
    );
    return response.data;
  }

  async searchBy(params: Record<string, string>): Promise<DataArray<FhirAllergyIntolerance>> {
    const queryParams = new URLSearchParams(params);
    const response = await this.parentService.callEndpoint<DataArray<FhirAllergyIntolerance>>(
      `/AllergyIntolerance?${queryParams.toString()}`,
      "GET",
      undefined,
      { "Content-Type": "application/json" }
    );
    return response.data;
  }

  async getById(id: string): Promise<FhirAllergyIntolerance> {
    const response = await this.parentService.callEndpoint<FhirAllergyIntolerance>(
      `/AllergyIntolerance/${id}`,
      "GET",
      undefined,
      { "Content-Type": "application/json" }
    );
    return response.data;
  }

  async update(id: string, data: FhirAllergyIntolerance): Promise<any> {
    const response = await this.parentService.callEndpoint<FhirAllergyIntolerance>(
      `/AllergyIntolerance/${id}`,
      "PUT",
      data,
      { "Content-Type": "application/json" }
    );
    return response.data;
  }

  async patch(id: string, data: PatchAllergyIntoleranceInput, existingData: ExistingAllergyIntolerance): Promise<any> {
    const payload = this.dto.fromatPatchPayload(data, existingData);
    const response = await this.parentService.callEndpoint<FhirAllergyIntolerance>(
      `/AllergyIntolerance/${id}`,
      "PATCH",
      payload,
      { "Content-Type": "application/json-patch+json" }
    );
    return response.data;
  }
}
