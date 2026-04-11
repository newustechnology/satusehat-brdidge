import { ProcedureDto } from "../../../dto/resource/procedureDto";
import { DataArray } from "../../../types/dto/core";
import { CreateProcedureInput, ExistingProcedure, FhirProcedure, PatchProcedureInput } from "../../../types/dto/resource/procedure";
import { ResourceService } from "../resource.service";

export class ProcedureService {
  private dto: ProcedureDto;

  constructor(private parentService: ResourceService) {
    this.dto = new ProcedureDto();
  }

  async create(data: CreateProcedureInput): Promise<any> {
    const payload = this.dto.formatCreatePayload(data);
    const response = await this.parentService.callEndpoint<FhirProcedure>(
      "/Procedure",
      "POST",
      payload,
      { "Content-Type": "application/json" }
    );
    return response.data;
  }

  async searchBy(params: Record<string, string>): Promise<DataArray<FhirProcedure>> {
    const queryParams = new URLSearchParams(params);
    const response = await this.parentService.callEndpoint<DataArray<FhirProcedure>>(
      `/Procedure?${queryParams.toString()}`,
      "GET",
      undefined,
      { "Content-Type": "application/json" }
    );
    return response.data;
  }

  async getById(id: string): Promise<FhirProcedure> {
    const response = await this.parentService.callEndpoint<FhirProcedure>(
      `/Procedure/${id}`,
      "GET",
      undefined,
      { "Content-Type": "application/json" }
    );
    return response.data;
  }

  async update(id: string, data: FhirProcedure): Promise<any> {
    const response = await this.parentService.callEndpoint<FhirProcedure>(
      `/Procedure/${id}`,
      "PUT",
      data,
      { "Content-Type": "application/json" }
    );
    return response.data;
  }

  async patch(id: string, data: PatchProcedureInput, existingData: ExistingProcedure): Promise<any> {
    const payload = this.dto.fromatPatchPayload(data, existingData);
    const response = await this.parentService.callEndpoint<FhirProcedure>(
      `/Procedure/${id}`,
      "PATCH",
      payload,
      { "Content-Type": "application/json-patch+json" }
    );
    return response.data;
  }
}
