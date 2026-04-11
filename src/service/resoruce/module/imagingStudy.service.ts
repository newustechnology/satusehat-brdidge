import { ImagingStudyDto } from "../../../dto/resource/imagingStudyDto";
import { DataArray } from "../../../types/dto/core";
import { CreateImagingStudyInput, ExistingImagingStudy, FhirImagingStudy, PatchImagingStudyInput } from "../../../types/dto/resource/imagingStudy";
import { ResourceService } from "../resource.service";

export class ImagingStudyService {
  private dto: ImagingStudyDto;

  constructor(private parentService: ResourceService) {
    this.dto = new ImagingStudyDto();
  }

  async create(data: CreateImagingStudyInput): Promise<any> {
    const payload = this.dto.formatCreatePayload(data);
    const response = await this.parentService.callEndpoint<FhirImagingStudy>(
      "/ImagingStudy",
      "POST",
      payload,
      { "Content-Type": "application/json" }
    );
    return response.data;
  }

  async searchBy(params: Record<string, string>): Promise<DataArray<FhirImagingStudy>> {
    const queryParams = new URLSearchParams(params);
    const response = await this.parentService.callEndpoint<DataArray<FhirImagingStudy>>(
      `/ImagingStudy?${queryParams.toString()}`,
      "GET",
      undefined,
      { "Content-Type": "application/json" }
    );
    return response.data;
  }

  async getById(id: string): Promise<FhirImagingStudy> {
    const response = await this.parentService.callEndpoint<FhirImagingStudy>(
      `/ImagingStudy/${id}`,
      "GET",
      undefined,
      { "Content-Type": "application/json" }
    );
    return response.data;
  }

  async update(id: string, data: FhirImagingStudy): Promise<any> {
    const response = await this.parentService.callEndpoint<FhirImagingStudy>(
      `/ImagingStudy/${id}`,
      "PUT",
      data,
      { "Content-Type": "application/json" }
    );
    return response.data;
  }

  async patch(id: string, data: PatchImagingStudyInput, existingData: ExistingImagingStudy): Promise<any> {
    const payload = this.dto.fromatPatchPayload(data, existingData);
    const response = await this.parentService.callEndpoint<FhirImagingStudy>(
      `/ImagingStudy/${id}`,
      "PATCH",
      payload,
      { "Content-Type": "application/json-patch+json" }
    );
    return response.data;
  }
}
