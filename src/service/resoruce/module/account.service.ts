import { AccountDto } from "../../../dto/resource/accountDto";
import { DataArray } from "../../../types/dto/core";
import { CreateAccountInput, ExistingAccount, FhirAccount, PatchAccountInput } from "../../../types/dto/resource/account";
import { ResourceService } from "../resource.service";

export class AccountService {
  private dto: AccountDto;

  constructor(private parentService: ResourceService) {
    this.dto = new AccountDto();
  }

  async create(data: CreateAccountInput): Promise<any> {
    const payload = this.dto.formatCreatePayload(data);
    const response = await this.parentService.callEndpoint<FhirAccount>(
      "/Account",
      "POST",
      payload,
      { "Content-Type": "application/json" }
    );
    return response.data;
  }

  async searchBy(params: Record<string, string>): Promise<DataArray<FhirAccount>> {
    const queryParams = new URLSearchParams(params);
    const response = await this.parentService.callEndpoint<DataArray<FhirAccount>>(
      `/Account?${queryParams.toString()}`,
      "GET",
      undefined,
      { "Content-Type": "application/json" }
    );
    return response.data;
  }

  async getById(id: string): Promise<FhirAccount> {
    const response = await this.parentService.callEndpoint<FhirAccount>(
      `/Account/${id}`,
      "GET",
      undefined,
      { "Content-Type": "application/json" }
    );
    return response.data;
  }

  async update(id: string, data: FhirAccount): Promise<any> {
    const response = await this.parentService.callEndpoint<FhirAccount>(
      `/Account/${id}`,
      "PUT",
      data,
      { "Content-Type": "application/json" }
    );
    return response.data;
  }

  async patch(id: string, data: PatchAccountInput, existingData: ExistingAccount): Promise<any> {
    const payload = this.dto.fromatPatchPayload(data, existingData);
    const response = await this.parentService.callEndpoint<FhirAccount>(
      `/Account/${id}`,
      "PATCH",
      payload,
      { "Content-Type": "application/json-patch+json" }
    );
    return response.data;
  }
}
