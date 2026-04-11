import { PaymentReconciliationDto } from "../../../dto/resource/paymentReconciliationDto";
import { DataArray } from "../../../types/dto/core";
import { CreatePaymentReconciliationInput, ExistingPaymentReconciliation, FhirPaymentReconciliation, PatchPaymentReconciliationInput } from "../../../types/dto/resource/paymentReconciliation";
import { ResourceService } from "../resource.service";

export class PaymentReconciliationService {
  private dto: PaymentReconciliationDto;

  constructor(private parentService: ResourceService) {
    this.dto = new PaymentReconciliationDto();
  }

  async create(data: CreatePaymentReconciliationInput): Promise<any> {
    const payload = this.dto.formatCreatePayload(data);
    const response = await this.parentService.callEndpoint<FhirPaymentReconciliation>(
      "/PaymentReconciliation",
      "POST",
      payload,
      { "Content-Type": "application/json" }
    );
    return response.data;
  }

  async searchBy(params: Record<string, string>): Promise<DataArray<FhirPaymentReconciliation>> {
    const queryParams = new URLSearchParams(params);
    const response = await this.parentService.callEndpoint<DataArray<FhirPaymentReconciliation>>(
      `/PaymentReconciliation?${queryParams.toString()}`,
      "GET",
      undefined,
      { "Content-Type": "application/json" }
    );
    return response.data;
  }

  async getById(id: string): Promise<FhirPaymentReconciliation> {
    const response = await this.parentService.callEndpoint<FhirPaymentReconciliation>(
      `/PaymentReconciliation/${id}`,
      "GET",
      undefined,
      { "Content-Type": "application/json" }
    );
    return response.data;
  }

  async update(id: string, data: FhirPaymentReconciliation): Promise<any> {
    const response = await this.parentService.callEndpoint<FhirPaymentReconciliation>(
      `/PaymentReconciliation/${id}`,
      "PUT",
      data,
      { "Content-Type": "application/json" }
    );
    return response.data;
  }

  async patch(id: string, data: PatchPaymentReconciliationInput, existingData: ExistingPaymentReconciliation): Promise<any> {
    const payload = this.dto.fromatPatchPayload(data, existingData);
    const response = await this.parentService.callEndpoint<FhirPaymentReconciliation>(
      `/PaymentReconciliation/${id}`,
      "PATCH",
      payload,
      { "Content-Type": "application/json-patch+json" }
    );
    return response.data;
  }
}
