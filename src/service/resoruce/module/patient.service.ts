import { PatientDto } from "../../../dto/resource/patienDto";
import { DataArray } from "../../../types/dto/core";
import { FhirPatient } from "../../../types/dto/resource/patient";
import { SatuSehatParamsError } from "../../../types/globalErrorModule";
import { ResourceService } from "../resource.service";

export class PatientService {
  private dto: PatientDto;

  constructor(private parentService: ResourceService) {
    this.dto = new PatientDto();
  }

  async searchPatientBy(
    data: {
      name?: string;
      ihs?: string;
      nik?: string;
      motherNik?: string;
      birthdate?: string;
      gender?: "female" | "male" | "other" | "unknown";
    },
    searchBy:
      | "mother-nik"
      | "nik"
      | "name-nik"
      | "name-birthDate-nik"
      | "name-birthDate-gender",
  ): Promise<DataArray<FhirPatient>> {
    const params = new URLSearchParams();

    if (searchBy === "nik") {
      if (!data.nik) {
        throw new SatuSehatParamsError('nik is required for searchBy "nik"', [
          "nik",
        ]);
      }
    }

    if (searchBy === "mother-nik") {
      if (!data.motherNik) {
        throw new SatuSehatParamsError(
          'motherNik is required for searchBy "mother-nik"',
          ["motherNik"],
        );
      }
    }

    if (searchBy === "name-nik") {
      if (!data.name || !data.nik) {
        throw new SatuSehatParamsError(
          'name and nik are required for searchBy "name-nik"',
          ["name", "nik"],
        );
      }
    }

    if (searchBy === "name-birthDate-nik") {
      if (!data.name || !data.birthdate || !data.nik) {
        throw new SatuSehatParamsError(
          'name, birthdate, and nik are required for searchBy "name-birthDate-nik"',
          ["name", "birthdate", "nik"],
        );
      }
    }

    if (searchBy === "name-birthDate-gender") {
      if (!data.name || !data.birthdate || !data.gender) {
        throw new SatuSehatParamsError(
          'name, birthdate, and gender are required for searchBy "name-birthDate-gender"',
          ["name", "birthdate", "gender"],
        );
      }
    }

    if (data.name) {
      params.append("name", data.name);
    }
    if (data.ihs) {
      params.append(
        "identifier",
        `https://fhir.kemkes.go.id/id/ihs|${data.ihs}`,
      );
    }
    if (data.nik) {
      params.append(
        "identifier",
        `https://fhir.kemkes.go.id/id/nik|${data.nik}`,
      );
    }
    if (data.motherNik) {
      params.append(
        "identifier",
        `https://fhir.kemkes.go.id/id/nik-ibu|${data.motherNik}`,
      );
    }
    if (data.birthdate) {
      params.append("birthdate", data.birthdate);
    }
    if (data.gender) {
      params.append("gender", data.gender);
    }

    const response = await this.parentService.callEndpoint<
      DataArray<FhirPatient>
    >(`/Patient?${params.toString()}`, "GET", undefined, {
      "Content-Type": "application/json",
    });

    return response.data;
  }

  async getById(id: string): Promise<FhirPatient> {
    const response = await this.parentService.callEndpoint<FhirPatient>(
      `/Patient/${id}`,
      "GET",
      undefined,
      {
        "Content-Type": "application/json",
      },
    );

    return response.data;
  }
}
