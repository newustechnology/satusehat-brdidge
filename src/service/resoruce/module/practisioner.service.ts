import { DataArray } from "../../../types/dto/core";
import { FhirPractisioner } from "../../../types/dto/resource/practisioner";
import { SatuSehatParamsError } from "../../../types/globalErrorModule";
import { ResourceService } from "../resource.service";

export class PractisionerService {
  constructor(private parentService: ResourceService) {}

  async searchPractisionerBy(
    data: {
      name?: string;
      nik?: string;
      gender?: "male" | "female" | "other" | "unknown";
      birthDate?: string;
    },
    searchBy: "name_nik" | "nik" | "name_gender_birthDate",
  ): Promise<DataArray<FhirPractisioner>> {
    const params = new URLSearchParams();

    if (searchBy === "name_nik") {
      if (!data.name || !data.nik) {
        throw new SatuSehatParamsError(
          'name and nik are required for searchBy "name_nik"',
          ["name", "nik"],
        );
      }
      params.append("name", data.name);
      params.append(
        "identifier",
        `https://fhir.kemkes.go.id/id/nik|${data.nik}`,
      );
    }

    if (searchBy === "nik") {
      if (!data.nik) {
        throw new SatuSehatParamsError('nik is required for searchBy "nik"', [
          "nik",
        ]);
      }
      params.append(
        "identifier",
        `https://fhir.kemkes.go.id/id/nik|${data.nik}`,
      );
    }

    if (searchBy === "name_gender_birthDate") {
      if (!data.name || !data.gender || !data.birthDate) {
        throw new SatuSehatParamsError(
          'name, gender, and birthDate are required for searchBy "name_gender_birthDate"',
          ["name", "gender", "birthDate"],
        );
      }
      params.append("name", data.name);
      params.append("gender", data.gender);
      params.append("birthdate", data.birthDate);
    }

    const response = await this.parentService.callEndpoint<
      DataArray<FhirPractisioner>
    >(`/Practitioner?${params.toString()}`, "GET", undefined, {
      "Content-Type": "application/json",
    });

    return response.data;
  }
}
