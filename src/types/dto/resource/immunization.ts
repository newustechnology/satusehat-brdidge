import { FhirCore } from "../core";

export interface CreateImmunizationInput {
  status?: string;
  vaccineCode?: {
    coding?: Array<{
      system?: string;
      code?: string;
      display?: string;
    }>;
  };
  patient?: {
    reference?: string;
    display?: string;
  };
  occurrenceDateTime?: string;
  recorded?: string;
  primarySource?: boolean;
  reportOrigin?: {
    coding?: Array<{
      system?: string;
      code?: string;
      display?: string;
    }>;
  };
  performer?: Array<{
    function?: {
      coding?: Array<{
        system?: string;
        code?: string;
        display?: string;
      }>;
    };
    actor?: {
      reference?: string;
      display?: string;
    };
  }>;
  reasonCode?: Array<{
    coding?: Array<{
      system?: string;
      code?: string;
      display?: string;
    }>;
  }>;
  location?: {
    display?: string;
  };
  protocolApplied?: Array<{
    doseNumberPositiveInt?: number;
  }>;

}

export interface PatchImmunizationInput {
  status?: string;
  vaccineCode?: {
    coding?: Array<{
      system?: string;
      code?: string;
      display?: string;
    }>;
  };
  patient?: {
    reference?: string;
    display?: string;
  };
  occurrenceDateTime?: string;
  recorded?: string;
  primarySource?: boolean;
  reportOrigin?: {
    coding?: Array<{
      system?: string;
      code?: string;
      display?: string;
    }>;
  };
  performer?: Array<{
    function?: {
      coding?: Array<{
        system?: string;
        code?: string;
        display?: string;
      }>;
    };
    actor?: {
      reference?: string;
      display?: string;
    };
  }>;
  reasonCode?: Array<{
    coding?: Array<{
      system?: string;
      code?: string;
      display?: string;
    }>;
  }>;
  location?: {
    display?: string;
  };
  protocolApplied?: Array<{
    doseNumberPositiveInt?: number;
  }>;

}

export interface ExistingImmunization {
  id?: string;
  status?: string;
  vaccineCode?: {
    coding?: Array<{
      system?: string;
      code?: string;
      display?: string;
    }>;
  };
  patient?: {
    reference?: string;
    display?: string;
  };
  occurrenceDateTime?: string;
  recorded?: string;
  primarySource?: boolean;
  reportOrigin?: {
    coding?: Array<{
      system?: string;
      code?: string;
      display?: string;
    }>;
  };
  performer?: Array<{
    function?: {
      coding?: Array<{
        system?: string;
        code?: string;
        display?: string;
      }>;
    };
    actor?: {
      reference?: string;
      display?: string;
    };
  }>;
  reasonCode?: Array<{
    coding?: Array<{
      system?: string;
      code?: string;
      display?: string;
    }>;
  }>;
  location?: {
    display?: string;
  };
  protocolApplied?: Array<{
    doseNumberPositiveInt?: number;
  }>;

}

export interface FhirPatchImmunization {
  op: "replace" | "test";
  path: string;
  value: any;
}

export interface FhirImmunization extends FhirCore {
  resourceType: "Immunization";
  meta?: {
    profile: string[];
  };
  status?: string;
  vaccineCode?: {
    coding?: Array<{
      system?: string;
      code?: string;
      display?: string;
    }>;
  };
  patient?: {
    reference?: string;
    display?: string;
  };
  occurrenceDateTime?: string;
  recorded?: string;
  primarySource?: boolean;
  reportOrigin?: {
    coding?: Array<{
      system?: string;
      code?: string;
      display?: string;
    }>;
  };
  performer?: Array<{
    function?: {
      coding?: Array<{
        system?: string;
        code?: string;
        display?: string;
      }>;
    };
    actor?: {
      reference?: string;
      display?: string;
    };
  }>;
  reasonCode?: Array<{
    coding?: Array<{
      system?: string;
      code?: string;
      display?: string;
    }>;
  }>;
  location?: {
    display?: string;
  };
  protocolApplied?: Array<{
    doseNumberPositiveInt?: number;
  }>;

}
