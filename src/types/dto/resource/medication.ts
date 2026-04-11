import { FhirCore } from "../core";

export interface CreateMedicationInput {
  identifier?: Array<{
    system?: string;
    use?: string;
    value?: string;
  }>;
  code?: {
    coding?: Array<{
      system?: string;
      code?: string;
      display?: string;
    }>;
  };
  status?: string;
  manufacturer?: {
    reference?: string;
  };
  form?: {
    coding?: Array<{
      system?: string;
      code?: string;
      display?: string;
    }>;
  };
  ingredient?: Array<{
    itemCodeableConcept?: {
      coding?: Array<{
        system?: string;
        code?: string;
        display?: string;
      }>;
    };
    isActive?: boolean;
    strength?: {
      numerator?: {
        value?: number;
        system?: string;
        code?: string;
      };
      denominator?: {
        value?: number;
        system?: string;
        code?: string;
      };
    };
  }>;
  extension?: Array<{
    url?: string;
    valueCodeableConcept?: {
      coding?: Array<{
        system?: string;
        code?: string;
        display?: string;
      }>;
    };
  }>;

}

export interface PatchMedicationInput {
  identifier?: Array<{
    system?: string;
    use?: string;
    value?: string;
  }>;
  code?: {
    coding?: Array<{
      system?: string;
      code?: string;
      display?: string;
    }>;
  };
  status?: string;
  manufacturer?: {
    reference?: string;
  };
  form?: {
    coding?: Array<{
      system?: string;
      code?: string;
      display?: string;
    }>;
  };
  ingredient?: Array<{
    itemCodeableConcept?: {
      coding?: Array<{
        system?: string;
        code?: string;
        display?: string;
      }>;
    };
    isActive?: boolean;
    strength?: {
      numerator?: {
        value?: number;
        system?: string;
        code?: string;
      };
      denominator?: {
        value?: number;
        system?: string;
        code?: string;
      };
    };
  }>;
  extension?: Array<{
    url?: string;
    valueCodeableConcept?: {
      coding?: Array<{
        system?: string;
        code?: string;
        display?: string;
      }>;
    };
  }>;

}

export interface ExistingMedication {
  id?: string;
  identifier?: Array<{
    system?: string;
    use?: string;
    value?: string;
  }>;
  code?: {
    coding?: Array<{
      system?: string;
      code?: string;
      display?: string;
    }>;
  };
  status?: string;
  manufacturer?: {
    reference?: string;
  };
  form?: {
    coding?: Array<{
      system?: string;
      code?: string;
      display?: string;
    }>;
  };
  ingredient?: Array<{
    itemCodeableConcept?: {
      coding?: Array<{
        system?: string;
        code?: string;
        display?: string;
      }>;
    };
    isActive?: boolean;
    strength?: {
      numerator?: {
        value?: number;
        system?: string;
        code?: string;
      };
      denominator?: {
        value?: number;
        system?: string;
        code?: string;
      };
    };
  }>;
  extension?: Array<{
    url?: string;
    valueCodeableConcept?: {
      coding?: Array<{
        system?: string;
        code?: string;
        display?: string;
      }>;
    };
  }>;

}

export interface FhirPatchMedication {
  op: "replace" | "test";
  path: string;
  value: any;
}

export interface FhirMedication extends FhirCore {
  resourceType: "Medication";
  meta?: {
    profile: string[];
  };
  identifier?: Array<{
    system?: string;
    use?: string;
    value?: string;
  }>;
  code?: {
    coding?: Array<{
      system?: string;
      code?: string;
      display?: string;
    }>;
  };
  status?: string;
  manufacturer?: {
    reference?: string;
  };
  form?: {
    coding?: Array<{
      system?: string;
      code?: string;
      display?: string;
    }>;
  };
  ingredient?: Array<{
    itemCodeableConcept?: {
      coding?: Array<{
        system?: string;
        code?: string;
        display?: string;
      }>;
    };
    isActive?: boolean;
    strength?: {
      numerator?: {
        value?: number;
        system?: string;
        code?: string;
      };
      denominator?: {
        value?: number;
        system?: string;
        code?: string;
      };
    };
  }>;
  extension?: Array<{
    url?: string;
    valueCodeableConcept?: {
      coding?: Array<{
        system?: string;
        code?: string;
        display?: string;
      }>;
    };
  }>;

}
