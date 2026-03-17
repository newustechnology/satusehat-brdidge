import { OrganizationDto } from "../../../dto/resource/organization";
import { DataArray } from "../../../types/dto/core";
import {
  FhirOrganization,
  OrganizationInput,
} from "../../../types/dto/resource/organization";
import { ResourceService } from "../resource.service";

export class OrganizationService {
  private dto: OrganizationDto;

  constructor(private parentService: ResourceService) {
    this.dto = new OrganizationDto();
  }

  // Create Organization
  async createOrganization(data: OrganizationInput): Promise<FhirOrganization> {
    const dto = this.dto.formatOrganizationData(data);

    const response = await this.parentService.callEndpoint<FhirOrganization>(
      "/Organization",
      "POST",
      dto,
      {
        "Content-Type": "application/json",
      },
    );

    return response.data;
  }

  /**
   * Search Organization By
   * @param data
   * @returns
   */
  async serchOrganizationBy(data: {
    name?: string;
    partOf?: string;
  }): Promise<DataArray<FhirOrganization>> {
    const params = new URLSearchParams();

    if (data.name) {
      params.append("name", data.name);
    }

    if (data.partOf) {
      params.append("partof", data.partOf);
    }

    const response = await this.parentService.callEndpoint<
      DataArray<FhirOrganization>
    >(`/Organization?${params.toString()}`, "GET", undefined, {
      "Content-Type": "application/json",
    });

    console.log(response.data);

    return response.data;
  }

  async getById(id: string): Promise<FhirOrganization> {
    const response = await this.parentService.callEndpoint<FhirOrganization>(
      `/Organization/${id}`,
      "GET",
      undefined,
      {
        "Content-Type": "application/json",
      },
    );

    return response.data;
  }

  async updateOrganization(
    data: OrganizationInput & { id: string },
  ): Promise<FhirOrganization> {
    const dto = this.dto.formatOrganizationDataUpdate(data);

    const response = await this.parentService.callEndpoint<FhirOrganization>(
      `/Organization/${data.id}`,
      "PUT",
      dto,
      {
        "Content-Type": "application/json",
      },
    );

    return response.data;
  }
}
