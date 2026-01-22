import { LocationDto } from "../../../dto/resource/locationDto";
import { DataArray } from "../../../types/dto/core";
import { FhirLocation } from "../../../types/dto/resource/location";
import { SatuSehatParamsError } from "../../../types/globalErrorModule";
import { ResourceService } from "../resource.service";

export class LocationService {
  private dto: LocationDto;

  constructor(private parentService: ResourceService) {
    this.dto = new LocationDto();
  }

  async searchLocationBy(
    data: {
      idParentLocation?: string;
      identificationNumber?: string;
      name?: string;
      organization?: string;
    },
    searchBy: "identificationNumber" | "name" | "organization",
  ): Promise<DataArray<FhirLocation>> {
    const params = new URLSearchParams();

    if (searchBy === "identificationNumber") {
      if (!data.identificationNumber || !data.idParentLocation) {
        throw new SatuSehatParamsError(
          'identificationNumber and idParentLocation are required for searchBy "identificationNumber"',
          ["identificationNumber", "idParentLocation"],
        );
      }

      params.append(
        "identifier",
        `http://sys-ids.kemkes.go.id/location/${data.idParentLocation}|${data.identificationNumber}`,
      );
    }

    if (searchBy === "name") {
      if (!data.name) {
        throw new SatuSehatParamsError(
          'name are required for searchBy "name"',
          ["name"],
        );
      }
      params.append("name", data.name);
    }

    if (searchBy === "organization") {
      if (!data.organization) {
        throw new SatuSehatParamsError(
          'organization are required for searchBy "organization"',
          ["organization"],
        );
      }
      params.append("organization", data.organization);
    }

    const response = await this.parentService.callEndpoint<
      DataArray<FhirLocation>
    >(`/Location?${params.toString()}`, "GET", undefined, {
      "Content-Type": "application/json",
    });

    return response.data;
  }

  async getById(id: string): Promise<FhirLocation> {
    const response = await this.parentService.callEndpoint<FhirLocation>(
      `/Location/${id}`,
      "GET",
      undefined,
      {
        "Content-Type": "application/json",
      },
    );

    return response.data;
  }
}
