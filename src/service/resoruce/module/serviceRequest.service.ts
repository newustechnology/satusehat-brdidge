import { ServiceRequestDto } from "../../../dto/resource/serviceRequestDto";
import { DataArray } from "../../../types/dto/core";
import { CreateServiceRequestInput, ExistingServiceRequest, FhirServiceRequest, PatchServiceRequestInput } from "../../../types/dto/resource/serviceRequest";
import { ResourceService } from "../resource.service";

export class ServiceRequestService {
  private dto: ServiceRequestDto;

  constructor(private parentService: ResourceService) {
    this.dto = new ServiceRequestDto();
  }

  async create(data: CreateServiceRequestInput): Promise<any> {
    const payload = this.dto.formatCreatePayload(data);
    const response = await this.parentService.callEndpoint<FhirServiceRequest>(
      "/ServiceRequest",
      "POST",
      payload,
      { "Content-Type": "application/json" }
    );
    return response.data;
  }

  async searchBy(params: Record<string, string>): Promise<DataArray<FhirServiceRequest>> {
    const queryParams = new URLSearchParams(params);
    const response = await this.parentService.callEndpoint<DataArray<FhirServiceRequest>>(
      `/ServiceRequest?${queryParams.toString()}`,
      "GET",
      undefined,
      { "Content-Type": "application/json" }
    );
    return response.data;
  }

  async getById(id: string): Promise<FhirServiceRequest> {
    const response = await this.parentService.callEndpoint<FhirServiceRequest>(
      `/ServiceRequest/${id}`,
      "GET",
      undefined,
      { "Content-Type": "application/json" }
    );
    return response.data;
  }

  async update(id: string, data: FhirServiceRequest): Promise<any> {
    const response = await this.parentService.callEndpoint<FhirServiceRequest>(
      `/ServiceRequest/${id}`,
      "PUT",
      data,
      { "Content-Type": "application/json" }
    );
    return response.data;
  }

  async patch(id: string, data: PatchServiceRequestInput, existingData: ExistingServiceRequest): Promise<any> {
    const payload = this.dto.fromatPatchPayload(data, existingData);
    const response = await this.parentService.callEndpoint<FhirServiceRequest>(
      `/ServiceRequest/${id}`,
      "PATCH",
      payload,
      { "Content-Type": "application/json-patch+json" }
    );
    return response.data;
  }
}
