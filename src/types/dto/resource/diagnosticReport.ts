import { FhirCore } from "../core";

export interface CreateDiagnosticReportInput {
  identifier?: Array<{
    system?: string;
    use?: string;
    value?: string;
  }>;
  status?: string;
  category?: Array<{
    coding?: Array<{
      system?: string;
      code?: string;
      display?: string;
    }>;
  }>;
  code?: {
    coding?: Array<{
      system?: string;
      code?: string;
      display?: string;
    }>;
  };
  subject?: {
    reference?: string;
  };
  encounter?: {
    reference?: string;
  };
  effectiveDateTime?: string;
  issued?: string;
  performer?: Array<{
    reference?: string;
  }>;
  result?: Array<{
    reference?: string;
  }>;
  specimen?: Array<{
    reference?: string;
  }>;
  conclusionCode?: Array<{
    coding?: Array<{
      system?: string;
      code?: string;
      display?: string;
    }>;
  }>;

}

export interface PatchDiagnosticReportInput {
  identifier?: Array<{
    system?: string;
    use?: string;
    value?: string;
  }>;
  status?: string;
  category?: Array<{
    coding?: Array<{
      system?: string;
      code?: string;
      display?: string;
    }>;
  }>;
  code?: {
    coding?: Array<{
      system?: string;
      code?: string;
      display?: string;
    }>;
  };
  subject?: {
    reference?: string;
  };
  encounter?: {
    reference?: string;
  };
  effectiveDateTime?: string;
  issued?: string;
  performer?: Array<{
    reference?: string;
  }>;
  result?: Array<{
    reference?: string;
  }>;
  specimen?: Array<{
    reference?: string;
  }>;
  conclusionCode?: Array<{
    coding?: Array<{
      system?: string;
      code?: string;
      display?: string;
    }>;
  }>;

}

export interface ExistingDiagnosticReport {
  id?: string;
  identifier?: Array<{
    system?: string;
    use?: string;
    value?: string;
  }>;
  status?: string;
  category?: Array<{
    coding?: Array<{
      system?: string;
      code?: string;
      display?: string;
    }>;
  }>;
  code?: {
    coding?: Array<{
      system?: string;
      code?: string;
      display?: string;
    }>;
  };
  subject?: {
    reference?: string;
  };
  encounter?: {
    reference?: string;
  };
  effectiveDateTime?: string;
  issued?: string;
  performer?: Array<{
    reference?: string;
  }>;
  result?: Array<{
    reference?: string;
  }>;
  specimen?: Array<{
    reference?: string;
  }>;
  conclusionCode?: Array<{
    coding?: Array<{
      system?: string;
      code?: string;
      display?: string;
    }>;
  }>;

}

export interface FhirPatchDiagnosticReport {
  op: "replace" | "test";
  path: string;
  value: any;
}

export interface FhirDiagnosticReport extends FhirCore {
  resourceType: "DiagnosticReport";
  meta?: {
    profile: string[];
  };
  identifier?: Array<{
    system?: string;
    use?: string;
    value?: string;
  }>;
  status?: string;
  category?: Array<{
    coding?: Array<{
      system?: string;
      code?: string;
      display?: string;
    }>;
  }>;
  code?: {
    coding?: Array<{
      system?: string;
      code?: string;
      display?: string;
    }>;
  };
  subject?: {
    reference?: string;
  };
  encounter?: {
    reference?: string;
  };
  effectiveDateTime?: string;
  issued?: string;
  performer?: Array<{
    reference?: string;
  }>;
  result?: Array<{
    reference?: string;
  }>;
  specimen?: Array<{
    reference?: string;
  }>;
  conclusionCode?: Array<{
    coding?: Array<{
      system?: string;
      code?: string;
      display?: string;
    }>;
  }>;

}
