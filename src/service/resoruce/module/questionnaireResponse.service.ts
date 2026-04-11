import { QuestionnaireResponseDto } from "../../../dto/resource/questionnaireResponseDto";
import { DataArray } from "../../../types/dto/core";
import { CreateQuestionnaireResponseInput, ExistingQuestionnaireResponse, FhirQuestionnaireResponse, PatchQuestionnaireResponseInput } from "../../../types/dto/resource/questionnaireResponse";
import { ResourceService } from "../resource.service";

export class QuestionnaireResponseService {
  private dto: QuestionnaireResponseDto;

  constructor(private parentService: ResourceService) {
    this.dto = new QuestionnaireResponseDto();
  }

  async create(data: CreateQuestionnaireResponseInput): Promise<any> {
    const payload = this.dto.formatCreatePayload(data);
    const response = await this.parentService.callEndpoint<FhirQuestionnaireResponse>(
      "/QuestionnaireResponse",
      "POST",
      payload,
      { "Content-Type": "application/json" }
    );
    return response.data;
  }

  async searchBy(params: Record<string, string>): Promise<DataArray<FhirQuestionnaireResponse>> {
    const queryParams = new URLSearchParams(params);
    const response = await this.parentService.callEndpoint<DataArray<FhirQuestionnaireResponse>>(
      `/QuestionnaireResponse?${queryParams.toString()}`,
      "GET",
      undefined,
      { "Content-Type": "application/json" }
    );
    return response.data;
  }

  async getById(id: string): Promise<FhirQuestionnaireResponse> {
    const response = await this.parentService.callEndpoint<FhirQuestionnaireResponse>(
      `/QuestionnaireResponse/${id}`,
      "GET",
      undefined,
      { "Content-Type": "application/json" }
    );
    return response.data;
  }

  async update(id: string, data: FhirQuestionnaireResponse): Promise<any> {
    const response = await this.parentService.callEndpoint<FhirQuestionnaireResponse>(
      `/QuestionnaireResponse/${id}`,
      "PUT",
      data,
      { "Content-Type": "application/json" }
    );
    return response.data;
  }

  async patch(id: string, data: PatchQuestionnaireResponseInput, existingData: ExistingQuestionnaireResponse): Promise<any> {
    const payload = this.dto.fromatPatchPayload(data, existingData);
    const response = await this.parentService.callEndpoint<FhirQuestionnaireResponse>(
      `/QuestionnaireResponse/${id}`,
      "PATCH",
      payload,
      { "Content-Type": "application/json-patch+json" }
    );
    return response.data;
  }
}
