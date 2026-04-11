import { SpecimenDto } from "../../../dto/resource/specimenDto";
import { DataArray } from "../../../types/dto/core";
import { CreateSpecimenInput, ExistingSpecimen, FhirSpecimen, PatchSpecimenInput } from "../../../types/dto/resource/specimen";
import { ResourceService } from "../resource.service";

export class SpecimenService {
  private dto: SpecimenDto;

  constructor(private parentService: ResourceService) {
    this.dto = new SpecimenDto();
  }

  async create(data: CreateSpecimenInput): Promise<any> {
    const payload = this.dto.formatCreatePayload(data);
    const response = await this.parentService.callEndpoint<FhirSpecimen>(
      "/Specimen",
      "POST",
      payload,
      { "Content-Type": "application/json" }
    );
    return response.data;
  }

  async searchBy(params: Record<string, string>): Promise<DataArray<FhirSpecimen>> {
    const queryParams = new URLSearchParams(params);
    const response = await this.parentService.callEndpoint<DataArray<FhirSpecimen>>(
      `/Specimen?${queryParams.toString()}`,
      "GET",
      undefined,
      { "Content-Type": "application/json" }
    );
    return response.data;
  }

  async getById(id: string): Promise<FhirSpecimen> {
    const response = await this.parentService.callEndpoint<FhirSpecimen>(
      `/Specimen/${id}`,
      "GET",
      undefined,
      { "Content-Type": "application/json" }
    );
    return response.data;
  }

  async update(id: string, data: FhirSpecimen): Promise<any> {
    const response = await this.parentService.callEndpoint<FhirSpecimen>(
      `/Specimen/${id}`,
      "PUT",
      data,
      { "Content-Type": "application/json" }
    );
    return response.data;
  }

  async patch(id: string, data: PatchSpecimenInput, existingData: ExistingSpecimen): Promise<any> {
    const payload = this.dto.fromatPatchPayload(data, existingData);
    const response = await this.parentService.callEndpoint<FhirSpecimen>(
      `/Specimen/${id}`,
      "PATCH",
      payload,
      { "Content-Type": "application/json-patch+json" }
    );
    return response.data;
  }
}
