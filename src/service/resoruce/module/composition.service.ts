import { CompositionDto } from "../../../dto/resource/compositionDto";
import { DataArray } from "../../../types/dto/core";
import { CreateCompositionInput, ExistingComposition, FhirComposition, PatchCompositionInput } from "../../../types/dto/resource/composition";
import { ResourceService } from "../resource.service";

export class CompositionService {
  private dto: CompositionDto;

  constructor(private parentService: ResourceService) {
    this.dto = new CompositionDto();
  }

  async create(data: CreateCompositionInput): Promise<any> {
    const payload = this.dto.formatCreatePayload(data);
    const response = await this.parentService.callEndpoint<FhirComposition>(
      "/Composition",
      "POST",
      payload,
      { "Content-Type": "application/json" }
    );
    return response.data;
  }

  async searchBy(params: Record<string, string>): Promise<DataArray<FhirComposition>> {
    const queryParams = new URLSearchParams(params);
    const response = await this.parentService.callEndpoint<DataArray<FhirComposition>>(
      `/Composition?${queryParams.toString()}`,
      "GET",
      undefined,
      { "Content-Type": "application/json" }
    );
    return response.data;
  }

  async getById(id: string): Promise<FhirComposition> {
    const response = await this.parentService.callEndpoint<FhirComposition>(
      `/Composition/${id}`,
      "GET",
      undefined,
      { "Content-Type": "application/json" }
    );
    return response.data;
  }

  async update(id: string, data: FhirComposition): Promise<any> {
    const response = await this.parentService.callEndpoint<FhirComposition>(
      `/Composition/${id}`,
      "PUT",
      data,
      { "Content-Type": "application/json" }
    );
    return response.data;
  }

  async patch(id: string, data: PatchCompositionInput, existingData: ExistingComposition): Promise<any> {
    const payload = this.dto.fromatPatchPayload(data, existingData);
    const response = await this.parentService.callEndpoint<FhirComposition>(
      `/Composition/${id}`,
      "PATCH",
      payload,
      { "Content-Type": "application/json-patch+json" }
    );
    return response.data;
  }
}
