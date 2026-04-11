import { PaymentNoticeDto } from "../../../dto/resource/paymentNoticeDto";
import { DataArray } from "../../../types/dto/core";
import { CreatePaymentNoticeInput, ExistingPaymentNotice, FhirPaymentNotice, PatchPaymentNoticeInput } from "../../../types/dto/resource/paymentNotice";
import { ResourceService } from "../resource.service";

export class PaymentNoticeService {
  private dto: PaymentNoticeDto;

  constructor(private parentService: ResourceService) {
    this.dto = new PaymentNoticeDto();
  }

  async create(data: CreatePaymentNoticeInput): Promise<any> {
    const payload = this.dto.formatCreatePayload(data);
    const response = await this.parentService.callEndpoint<FhirPaymentNotice>(
      "/PaymentNotice",
      "POST",
      payload,
      { "Content-Type": "application/json" }
    );
    return response.data;
  }

  async searchBy(params: Record<string, string>): Promise<DataArray<FhirPaymentNotice>> {
    const queryParams = new URLSearchParams(params);
    const response = await this.parentService.callEndpoint<DataArray<FhirPaymentNotice>>(
      `/PaymentNotice?${queryParams.toString()}`,
      "GET",
      undefined,
      { "Content-Type": "application/json" }
    );
    return response.data;
  }

  async getById(id: string): Promise<FhirPaymentNotice> {
    const response = await this.parentService.callEndpoint<FhirPaymentNotice>(
      `/PaymentNotice/${id}`,
      "GET",
      undefined,
      { "Content-Type": "application/json" }
    );
    return response.data;
  }

  async update(id: string, data: FhirPaymentNotice): Promise<any> {
    const response = await this.parentService.callEndpoint<FhirPaymentNotice>(
      `/PaymentNotice/${id}`,
      "PUT",
      data,
      { "Content-Type": "application/json" }
    );
    return response.data;
  }

  async patch(id: string, data: PatchPaymentNoticeInput, existingData: ExistingPaymentNotice): Promise<any> {
    const payload = this.dto.fromatPatchPayload(data, existingData);
    const response = await this.parentService.callEndpoint<FhirPaymentNotice>(
      `/PaymentNotice/${id}`,
      "PATCH",
      payload,
      { "Content-Type": "application/json-patch+json" }
    );
    return response.data;
  }
}
