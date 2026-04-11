import { ConditionDto } from "../../../dto/resource/conditionDto";
import { DataArray } from "../../../types/dto/core";
import { CreateConditionInput, ExistingCondition, FhirCondition, PatchConditionInput } from "../../../types/dto/resource/condition";
import { ResourceService } from "../resource.service";

export class ConditionService {
  private dto: ConditionDto;

  constructor(private parentService: ResourceService) {
    this.dto = new ConditionDto();
  }

  async create(data: CreateConditionInput): Promise<any> {
    const payload = this.dto.formatCreatePayload(data);
    const response = await this.parentService.callEndpoint<FhirCondition>(
      "/Condition",
      "POST",
      payload,
      { "Content-Type": "application/json" }
    );
    return response.data;
  }

  async searchBy(params: Record<string, string>): Promise<DataArray<FhirCondition>> {
    const queryParams = new URLSearchParams(params);
    const response = await this.parentService.callEndpoint<DataArray<FhirCondition>>(
      `/Condition?${queryParams.toString()}`,
      "GET",
      undefined,
      { "Content-Type": "application/json" }
    );
    return response.data;
  }

  async getById(id: string): Promise<FhirCondition> {
    const response = await this.parentService.callEndpoint<FhirCondition>(
      `/Condition/${id}`,
      "GET",
      undefined,
      { "Content-Type": "application/json" }
    );
    return response.data;
  }

  async update(id: string, data: FhirCondition): Promise<any> {
    const response = await this.parentService.callEndpoint<FhirCondition>(
      `/Condition/${id}`,
      "PUT",
      data,
      { "Content-Type": "application/json" }
    );
    return response.data;
  }

  async patch(id: string, data: PatchConditionInput, existingData: ExistingCondition): Promise<any> {
    const payload = this.dto.fromatPatchPayload(data, existingData);
    const response = await this.parentService.callEndpoint<FhirCondition>(
      `/Condition/${id}`,
      "PATCH",
      payload,
      { "Content-Type": "application/json-patch+json" }
    );
    return response.data;
  }
}
