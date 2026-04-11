import { RelatedPersonDto } from "../../../dto/resource/relatedPersonDto";
import { DataArray } from "../../../types/dto/core";
import { CreateRelatedPersonInput, ExistingRelatedPerson, FhirRelatedPerson, PatchRelatedPersonInput } from "../../../types/dto/resource/relatedPerson";
import { ResourceService } from "../resource.service";

export class RelatedPersonService {
  private dto: RelatedPersonDto;

  constructor(private parentService: ResourceService) {
    this.dto = new RelatedPersonDto();
  }

  async create(data: CreateRelatedPersonInput): Promise<any> {
    const payload = this.dto.formatCreatePayload(data);
    const response = await this.parentService.callEndpoint<FhirRelatedPerson>(
      "/RelatedPerson",
      "POST",
      payload,
      { "Content-Type": "application/json" }
    );
    return response.data;
  }

  async searchBy(params: Record<string, string>): Promise<DataArray<FhirRelatedPerson>> {
    const queryParams = new URLSearchParams(params);
    const response = await this.parentService.callEndpoint<DataArray<FhirRelatedPerson>>(
      `/RelatedPerson?${queryParams.toString()}`,
      "GET",
      undefined,
      { "Content-Type": "application/json" }
    );
    return response.data;
  }

  async getById(id: string): Promise<FhirRelatedPerson> {
    const response = await this.parentService.callEndpoint<FhirRelatedPerson>(
      `/RelatedPerson/${id}`,
      "GET",
      undefined,
      { "Content-Type": "application/json" }
    );
    return response.data;
  }

  async update(id: string, data: FhirRelatedPerson): Promise<any> {
    const response = await this.parentService.callEndpoint<FhirRelatedPerson>(
      `/RelatedPerson/${id}`,
      "PUT",
      data,
      { "Content-Type": "application/json" }
    );
    return response.data;
  }

  async patch(id: string, data: PatchRelatedPersonInput, existingData: ExistingRelatedPerson): Promise<any> {
    const payload = this.dto.fromatPatchPayload(data, existingData);
    const response = await this.parentService.callEndpoint<FhirRelatedPerson>(
      `/RelatedPerson/${id}`,
      "PATCH",
      payload,
      { "Content-Type": "application/json-patch+json" }
    );
    return response.data;
  }
}
