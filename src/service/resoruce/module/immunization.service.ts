import { ImmunizationDto } from "../../../dto/resource/immunizationDto";
import { DataArray } from "../../../types/dto/core";
import { CreateImmunizationInput, ExistingImmunization, FhirImmunization, PatchImmunizationInput } from "../../../types/dto/resource/immunization";
import { ResourceService } from "../resource.service";

export class ImmunizationService {
  private dto: ImmunizationDto;

  constructor(private parentService: ResourceService) {
    this.dto = new ImmunizationDto();
  }

  async create(data: CreateImmunizationInput): Promise<any> {
    const payload = this.dto.formatCreatePayload(data);
    const response = await this.parentService.callEndpoint<FhirImmunization>(
      "/Immunization",
      "POST",
      payload,
      { "Content-Type": "application/json" }
    );
    return response.data;
  }

  async searchBy(params: Record<string, string>): Promise<DataArray<FhirImmunization>> {
    const queryParams = new URLSearchParams(params);
    const response = await this.parentService.callEndpoint<DataArray<FhirImmunization>>(
      `/Immunization?${queryParams.toString()}`,
      "GET",
      undefined,
      { "Content-Type": "application/json" }
    );
    return response.data;
  }

  async getById(id: string): Promise<FhirImmunization> {
    const response = await this.parentService.callEndpoint<FhirImmunization>(
      `/Immunization/${id}`,
      "GET",
      undefined,
      { "Content-Type": "application/json" }
    );
    return response.data;
  }

  async update(id: string, data: FhirImmunization): Promise<any> {
    const response = await this.parentService.callEndpoint<FhirImmunization>(
      `/Immunization/${id}`,
      "PUT",
      data,
      { "Content-Type": "application/json" }
    );
    return response.data;
  }

  async patch(id: string, data: PatchImmunizationInput, existingData: ExistingImmunization): Promise<any> {
    const payload = this.dto.fromatPatchPayload(data, existingData);
    const response = await this.parentService.callEndpoint<FhirImmunization>(
      `/Immunization/${id}`,
      "PATCH",
      payload,
      { "Content-Type": "application/json-patch+json" }
    );
    return response.data;
  }
}
