import { ChargeItemDto } from "../../../dto/resource/chargeItemDto";
import { DataArray } from "../../../types/dto/core";
import { CreateChargeItemInput, ExistingChargeItem, FhirChargeItem, PatchChargeItemInput } from "../../../types/dto/resource/chargeItem";
import { ResourceService } from "../resource.service";

export class ChargeItemService {
  private dto: ChargeItemDto;

  constructor(private parentService: ResourceService) {
    this.dto = new ChargeItemDto();
  }

  async create(data: CreateChargeItemInput): Promise<any> {
    const payload = this.dto.formatCreatePayload(data);
    const response = await this.parentService.callEndpoint<FhirChargeItem>(
      "/ChargeItem",
      "POST",
      payload,
      { "Content-Type": "application/json" }
    );
    return response.data;
  }

  async searchBy(params: Record<string, string>): Promise<DataArray<FhirChargeItem>> {
    const queryParams = new URLSearchParams(params);
    const response = await this.parentService.callEndpoint<DataArray<FhirChargeItem>>(
      `/ChargeItem?${queryParams.toString()}`,
      "GET",
      undefined,
      { "Content-Type": "application/json" }
    );
    return response.data;
  }

  async getById(id: string): Promise<FhirChargeItem> {
    const response = await this.parentService.callEndpoint<FhirChargeItem>(
      `/ChargeItem/${id}`,
      "GET",
      undefined,
      { "Content-Type": "application/json" }
    );
    return response.data;
  }

  async update(id: string, data: FhirChargeItem): Promise<any> {
    const response = await this.parentService.callEndpoint<FhirChargeItem>(
      `/ChargeItem/${id}`,
      "PUT",
      data,
      { "Content-Type": "application/json" }
    );
    return response.data;
  }

  async patch(id: string, data: PatchChargeItemInput, existingData: ExistingChargeItem): Promise<any> {
    const payload = this.dto.fromatPatchPayload(data, existingData);
    const response = await this.parentService.callEndpoint<FhirChargeItem>(
      `/ChargeItem/${id}`,
      "PATCH",
      payload,
      { "Content-Type": "application/json-patch+json" }
    );
    return response.data;
  }
}
