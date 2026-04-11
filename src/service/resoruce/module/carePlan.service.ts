import { CarePlanDto } from "../../../dto/resource/carePlanDto";
import { DataArray } from "../../../types/dto/core";
import { CreateCarePlanInput, ExistingCarePlan, FhirCarePlan, PatchCarePlanInput } from "../../../types/dto/resource/carePlan";
import { ResourceService } from "../resource.service";

export class CarePlanService {
  private dto: CarePlanDto;

  constructor(private parentService: ResourceService) {
    this.dto = new CarePlanDto();
  }

  async create(data: CreateCarePlanInput): Promise<any> {
    const payload = this.dto.formatCreatePayload(data);
    const response = await this.parentService.callEndpoint<FhirCarePlan>(
      "/CarePlan",
      "POST",
      payload,
      { "Content-Type": "application/json" }
    );
    return response.data;
  }

  async searchBy(params: Record<string, string>): Promise<DataArray<FhirCarePlan>> {
    const queryParams = new URLSearchParams(params);
    const response = await this.parentService.callEndpoint<DataArray<FhirCarePlan>>(
      `/CarePlan?${queryParams.toString()}`,
      "GET",
      undefined,
      { "Content-Type": "application/json" }
    );
    return response.data;
  }

  async getById(id: string): Promise<FhirCarePlan> {
    const response = await this.parentService.callEndpoint<FhirCarePlan>(
      `/CarePlan/${id}`,
      "GET",
      undefined,
      { "Content-Type": "application/json" }
    );
    return response.data;
  }

  async update(id: string, data: FhirCarePlan): Promise<any> {
    const response = await this.parentService.callEndpoint<FhirCarePlan>(
      `/CarePlan/${id}`,
      "PUT",
      data,
      { "Content-Type": "application/json" }
    );
    return response.data;
  }

  async patch(id: string, data: PatchCarePlanInput, existingData: ExistingCarePlan): Promise<any> {
    const payload = this.dto.fromatPatchPayload(data, existingData);
    const response = await this.parentService.callEndpoint<FhirCarePlan>(
      `/CarePlan/${id}`,
      "PATCH",
      payload,
      { "Content-Type": "application/json-patch+json" }
    );
    return response.data;
  }
}
