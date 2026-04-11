import { DiagnosticReportDto } from "../../../dto/resource/diagnosticReportDto";
import { DataArray } from "../../../types/dto/core";
import { CreateDiagnosticReportInput, ExistingDiagnosticReport, FhirDiagnosticReport, PatchDiagnosticReportInput } from "../../../types/dto/resource/diagnosticReport";
import { ResourceService } from "../resource.service";

export class DiagnosticReportService {
  private dto: DiagnosticReportDto;

  constructor(private parentService: ResourceService) {
    this.dto = new DiagnosticReportDto();
  }

  async create(data: CreateDiagnosticReportInput): Promise<any> {
    const payload = this.dto.formatCreatePayload(data);
    const response = await this.parentService.callEndpoint<FhirDiagnosticReport>(
      "/DiagnosticReport",
      "POST",
      payload,
      { "Content-Type": "application/json" }
    );
    return response.data;
  }

  async searchBy(params: Record<string, string>): Promise<DataArray<FhirDiagnosticReport>> {
    const queryParams = new URLSearchParams(params);
    const response = await this.parentService.callEndpoint<DataArray<FhirDiagnosticReport>>(
      `/DiagnosticReport?${queryParams.toString()}`,
      "GET",
      undefined,
      { "Content-Type": "application/json" }
    );
    return response.data;
  }

  async getById(id: string): Promise<FhirDiagnosticReport> {
    const response = await this.parentService.callEndpoint<FhirDiagnosticReport>(
      `/DiagnosticReport/${id}`,
      "GET",
      undefined,
      { "Content-Type": "application/json" }
    );
    return response.data;
  }

  async update(id: string, data: FhirDiagnosticReport): Promise<any> {
    const response = await this.parentService.callEndpoint<FhirDiagnosticReport>(
      `/DiagnosticReport/${id}`,
      "PUT",
      data,
      { "Content-Type": "application/json" }
    );
    return response.data;
  }

  async patch(id: string, data: PatchDiagnosticReportInput, existingData: ExistingDiagnosticReport): Promise<any> {
    const payload = this.dto.fromatPatchPayload(data, existingData);
    const response = await this.parentService.callEndpoint<FhirDiagnosticReport>(
      `/DiagnosticReport/${id}`,
      "PATCH",
      payload,
      { "Content-Type": "application/json-patch+json" }
    );
    return response.data;
  }
}
