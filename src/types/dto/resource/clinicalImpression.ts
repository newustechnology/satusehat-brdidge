import { FhirCore } from "../core";

export interface CreateClinicalImpressionInput {
  identifier?: Array<{
    system?: string;
    use?: string;
    value?: string;
  }>;
  status?: string;
  description?: string;
  subject?: {
    reference?: string;
    display?: string;
  };
  encounter?: {
    reference?: string;
    display?: string;
  };
  effectiveDateTime?: string;
  date?: string;
  assessor?: {
    reference?: string;
  };
  problem?: Array<{
    reference?: string;
  }>;
  investigation?: Array<{
    code?: {
      text?: string;
    };
    item?: Array<{
      reference?: string;
    }>;
  }>;
  summary?: string;
  finding?: Array<{
    itemCodeableConcept?: {
      coding?: Array<{
        system?: string;
        code?: string;
        display?: string;
      }>;
    };
    itemReference?: {
      reference?: string;
    };
  }>;
  prognosisCodeableConcept?: Array<{
    coding?: Array<{
      system?: string;
      code?: string;
      display?: string;
    }>;
  }>;

}

export interface PatchClinicalImpressionInput {
  identifier?: Array<{
    system?: string;
    use?: string;
    value?: string;
  }>;
  status?: string;
  description?: string;
  subject?: {
    reference?: string;
    display?: string;
  };
  encounter?: {
    reference?: string;
    display?: string;
  };
  effectiveDateTime?: string;
  date?: string;
  assessor?: {
    reference?: string;
  };
  problem?: Array<{
    reference?: string;
  }>;
  investigation?: Array<{
    code?: {
      text?: string;
    };
    item?: Array<{
      reference?: string;
    }>;
  }>;
  summary?: string;
  finding?: Array<{
    itemCodeableConcept?: {
      coding?: Array<{
        system?: string;
        code?: string;
        display?: string;
      }>;
    };
    itemReference?: {
      reference?: string;
    };
  }>;
  prognosisCodeableConcept?: Array<{
    coding?: Array<{
      system?: string;
      code?: string;
      display?: string;
    }>;
  }>;

}

export interface ExistingClinicalImpression {
  id?: string;
  identifier?: Array<{
    system?: string;
    use?: string;
    value?: string;
  }>;
  status?: string;
  description?: string;
  subject?: {
    reference?: string;
    display?: string;
  };
  encounter?: {
    reference?: string;
    display?: string;
  };
  effectiveDateTime?: string;
  date?: string;
  assessor?: {
    reference?: string;
  };
  problem?: Array<{
    reference?: string;
  }>;
  investigation?: Array<{
    code?: {
      text?: string;
    };
    item?: Array<{
      reference?: string;
    }>;
  }>;
  summary?: string;
  finding?: Array<{
    itemCodeableConcept?: {
      coding?: Array<{
        system?: string;
        code?: string;
        display?: string;
      }>;
    };
    itemReference?: {
      reference?: string;
    };
  }>;
  prognosisCodeableConcept?: Array<{
    coding?: Array<{
      system?: string;
      code?: string;
      display?: string;
    }>;
  }>;

}

export interface FhirPatchClinicalImpression {
  op: "replace" | "test";
  path: string;
  value: any;
}

export interface FhirClinicalImpression extends FhirCore {
  resourceType: "ClinicalImpression";
  meta?: {
    profile: string[];
  };
  identifier?: Array<{
    system?: string;
    use?: string;
    value?: string;
  }>;
  status?: string;
  description?: string;
  subject?: {
    reference?: string;
    display?: string;
  };
  encounter?: {
    reference?: string;
    display?: string;
  };
  effectiveDateTime?: string;
  date?: string;
  assessor?: {
    reference?: string;
  };
  problem?: Array<{
    reference?: string;
  }>;
  investigation?: Array<{
    code?: {
      text?: string;
    };
    item?: Array<{
      reference?: string;
    }>;
  }>;
  summary?: string;
  finding?: Array<{
    itemCodeableConcept?: {
      coding?: Array<{
        system?: string;
        code?: string;
        display?: string;
      }>;
    };
    itemReference?: {
      reference?: string;
    };
  }>;
  prognosisCodeableConcept?: Array<{
    coding?: Array<{
      system?: string;
      code?: string;
      display?: string;
    }>;
  }>;

}
