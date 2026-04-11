import { InvoiceDto } from "../../../dto/resource/invoiceDto";
import { DataArray } from "../../../types/dto/core";
import { CreateInvoiceInput, ExistingInvoice, FhirInvoice, PatchInvoiceInput } from "../../../types/dto/resource/invoice";
import { ResourceService } from "../resource.service";

export class InvoiceService {
  private dto: InvoiceDto;

  constructor(private parentService: ResourceService) {
    this.dto = new InvoiceDto();
  }

  async create(data: CreateInvoiceInput): Promise<any> {
    const payload = this.dto.formatCreatePayload(data);
    const response = await this.parentService.callEndpoint<FhirInvoice>(
      "/Invoice",
      "POST",
      payload,
      { "Content-Type": "application/json" }
    );
    return response.data;
  }

  async searchBy(params: Record<string, string>): Promise<DataArray<FhirInvoice>> {
    const queryParams = new URLSearchParams(params);
    const response = await this.parentService.callEndpoint<DataArray<FhirInvoice>>(
      `/Invoice?${queryParams.toString()}`,
      "GET",
      undefined,
      { "Content-Type": "application/json" }
    );
    return response.data;
  }

  async getById(id: string): Promise<FhirInvoice> {
    const response = await this.parentService.callEndpoint<FhirInvoice>(
      `/Invoice/${id}`,
      "GET",
      undefined,
      { "Content-Type": "application/json" }
    );
    return response.data;
  }

  async update(id: string, data: FhirInvoice): Promise<any> {
    const response = await this.parentService.callEndpoint<FhirInvoice>(
      `/Invoice/${id}`,
      "PUT",
      data,
      { "Content-Type": "application/json" }
    );
    return response.data;
  }

  async patch(id: string, data: PatchInvoiceInput, existingData: ExistingInvoice): Promise<any> {
    const payload = this.dto.fromatPatchPayload(data, existingData);
    const response = await this.parentService.callEndpoint<FhirInvoice>(
      `/Invoice/${id}`,
      "PATCH",
      payload,
      { "Content-Type": "application/json-patch+json" }
    );
    return response.data;
  }
}
