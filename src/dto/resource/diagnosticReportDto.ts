import { DtoCore } from "../core/DtoCore";
import { CreateDiagnosticReportInput, ExistingDiagnosticReport, FhirDiagnosticReport, PatchDiagnosticReportInput, FhirPatchDiagnosticReport } from "../../types/dto/resource/diagnosticReport";

export class DiagnosticReportDto extends DtoCore {
  formatCreatePayload(data: CreateDiagnosticReportInput): FhirDiagnosticReport {
    return {
      resourceType: "DiagnosticReport",
      meta: {
        profile: [`https://fhir.kemkes.go.id/r4/StructureDefinition/DiagnosticReport`]
      },
      ...data
    } as FhirDiagnosticReport;
  }

  fromatPatchPayload(data: PatchDiagnosticReportInput, existingData: ExistingDiagnosticReport): FhirPatchDiagnosticReport[] {
    if (!data || !existingData) {
      throw new Error("Data baru dan data lama wajib disediakan untuk PATCH penuh.");
    }

    const patchOps: FhirPatchDiagnosticReport[] = [];
    const _existingData = existingData as any; // Fixing TS indexing error

    for (const [key, value] of Object.entries(data)) {
        if (value !== undefined) {
            patchOps.push({
                op: "test",
                path: `/${key}`,
                value: _existingData[key] || ""
            });
            patchOps.push({
                op: "replace",
                path: `/${key}`,
                value: value
            });
        }
    }

    if (patchOps.length === 0) {
      throw new Error("Tidak ada field yang bisa diubah.");
    }

    return patchOps;
  }
}
