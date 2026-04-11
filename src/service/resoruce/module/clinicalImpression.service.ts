import { ClinicalImpressionDto } from "../../../dto/resource/clinicalImpressionDto";
import { DataArray } from "../../../types/dto/core";
import { CreateClinicalImpressionInput, ExistingClinicalImpression, FhirClinicalImpression, PatchClinicalImpressionInput } from "../../../types/dto/resource/clinicalImpression";
import { ResourceService } from "../resource.service";

export class ClinicalImpressionService {
  private dto: ClinicalImpressionDto;

  constructor(private parentService: ResourceService) {
    this.dto = new ClinicalImpressionDto();
  }

  async create(data: CreateClinicalImpressionInput): Promise<any> {
    const payload = this.dto.formatCreatePayload(data);
    const response = await this.parentService.callEndpoint<FhirClinicalImpression>(
      "/ClinicalImpression",
      "POST",
      payload,
      { "Content-Type": "application/json" }
    );
    return response.data;
  }

  async searchBy(params: Record<string, string>): Promise<DataArray<FhirClinicalImpression>> {
    const queryParams = new URLSearchParams(params);
    const response = await this.parentService.callEndpoint<DataArray<FhirClinicalImpression>>(
      `/ClinicalImpression?${queryParams.toString()}`,
      "GET",
      undefined,
      { "Content-Type": "application/json" }
    );
    return response.data;
  }

  async getById(id: string): Promise<FhirClinicalImpression> {
    const response = await this.parentService.callEndpoint<FhirClinicalImpression>(
      `/ClinicalImpression/${id}`,
      "GET",
      undefined,
      { "Content-Type": "application/json" }
    );
    return response.data;
  }

  async update(id: string, data: FhirClinicalImpression): Promise<any> {
    const response = await this.parentService.callEndpoint<FhirClinicalImpression>(
      `/ClinicalImpression/${id}`,
      "PUT",
      data,
      { "Content-Type": "application/json" }
    );
    return response.data;
  }

  async patch(id: string, data: PatchClinicalImpressionInput, existingData: ExistingClinicalImpression): Promise<any> {
    const payload = this.dto.fromatPatchPayload(data, existingData);
    const response = await this.parentService.callEndpoint<FhirClinicalImpression>(
      `/ClinicalImpression/${id}`,
      "PATCH",
      payload,
      { "Content-Type": "application/json-patch+json" }
    );
    return response.data;
  }
}
