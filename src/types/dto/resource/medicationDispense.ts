import { FhirCore } from "../core";

export interface CreateMedicationDispenseInput {
  identifier?: Array<{
    system?: string;
    use?: string;
    value?: string;
  }>;
  status?: string;
  category?: {
    coding?: Array<{
      system?: string;
      code?: string;
      display?: string;
    }>;
  };
  medicationReference?: {
    reference?: string;
    display?: string;
  };
  subject?: {
    reference?: string;
    display?: string;
  };
  context?: {
    reference?: string;
  };
  performer?: Array<{
    actor?: {
      reference?: string;
      display?: string;
    };
  }>;
  location?: {
    reference?: string;
    display?: string;
  };
  authorizingPrescription?: Array<{
    reference?: string;
  }>;
  quantity?: {
    system?: string;
    code?: string;
    value?: number;
  };
  daysSupply?: {
    value?: number;
    unit?: string;
    system?: string;
    code?: string;
  };
  whenPrepared?: string;
  whenHandedOver?: string;
  dosageInstruction?: Array<{
    sequence?: number;
    text?: string;
    timing?: {
      repeat?: {
        frequency?: number;
        period?: number;
        periodUnit?: string;
      };
    };
    doseAndRate?: Array<{
      type?: {
        coding?: Array<{
          system?: string;
          code?: string;
          display?: string;
        }>;
      };
      doseQuantity?: {
        value?: number;
        unit?: string;
        system?: string;
        code?: string;
      };
    }>;
  }>;

}

export interface PatchMedicationDispenseInput {
  identifier?: Array<{
    system?: string;
    use?: string;
    value?: string;
  }>;
  status?: string;
  category?: {
    coding?: Array<{
      system?: string;
      code?: string;
      display?: string;
    }>;
  };
  medicationReference?: {
    reference?: string;
    display?: string;
  };
  subject?: {
    reference?: string;
    display?: string;
  };
  context?: {
    reference?: string;
  };
  performer?: Array<{
    actor?: {
      reference?: string;
      display?: string;
    };
  }>;
  location?: {
    reference?: string;
    display?: string;
  };
  authorizingPrescription?: Array<{
    reference?: string;
  }>;
  quantity?: {
    system?: string;
    code?: string;
    value?: number;
  };
  daysSupply?: {
    value?: number;
    unit?: string;
    system?: string;
    code?: string;
  };
  whenPrepared?: string;
  whenHandedOver?: string;
  dosageInstruction?: Array<{
    sequence?: number;
    text?: string;
    timing?: {
      repeat?: {
        frequency?: number;
        period?: number;
        periodUnit?: string;
      };
    };
    doseAndRate?: Array<{
      type?: {
        coding?: Array<{
          system?: string;
          code?: string;
          display?: string;
        }>;
      };
      doseQuantity?: {
        value?: number;
        unit?: string;
        system?: string;
        code?: string;
      };
    }>;
  }>;

}

export interface ExistingMedicationDispense {
  id?: string;
  identifier?: Array<{
    system?: string;
    use?: string;
    value?: string;
  }>;
  status?: string;
  category?: {
    coding?: Array<{
      system?: string;
      code?: string;
      display?: string;
    }>;
  };
  medicationReference?: {
    reference?: string;
    display?: string;
  };
  subject?: {
    reference?: string;
    display?: string;
  };
  context?: {
    reference?: string;
  };
  performer?: Array<{
    actor?: {
      reference?: string;
      display?: string;
    };
  }>;
  location?: {
    reference?: string;
    display?: string;
  };
  authorizingPrescription?: Array<{
    reference?: string;
  }>;
  quantity?: {
    system?: string;
    code?: string;
    value?: number;
  };
  daysSupply?: {
    value?: number;
    unit?: string;
    system?: string;
    code?: string;
  };
  whenPrepared?: string;
  whenHandedOver?: string;
  dosageInstruction?: Array<{
    sequence?: number;
    text?: string;
    timing?: {
      repeat?: {
        frequency?: number;
        period?: number;
        periodUnit?: string;
      };
    };
    doseAndRate?: Array<{
      type?: {
        coding?: Array<{
          system?: string;
          code?: string;
          display?: string;
        }>;
      };
      doseQuantity?: {
        value?: number;
        unit?: string;
        system?: string;
        code?: string;
      };
    }>;
  }>;

}

export interface FhirPatchMedicationDispense {
  op: "replace" | "test";
  path: string;
  value: any;
}

export interface FhirMedicationDispense extends FhirCore {
  resourceType: "MedicationDispense";
  meta?: {
    profile: string[];
  };
  identifier?: Array<{
    system?: string;
    use?: string;
    value?: string;
  }>;
  status?: string;
  category?: {
    coding?: Array<{
      system?: string;
      code?: string;
      display?: string;
    }>;
  };
  medicationReference?: {
    reference?: string;
    display?: string;
  };
  subject?: {
    reference?: string;
    display?: string;
  };
  context?: {
    reference?: string;
  };
  performer?: Array<{
    actor?: {
      reference?: string;
      display?: string;
    };
  }>;
  location?: {
    reference?: string;
    display?: string;
  };
  authorizingPrescription?: Array<{
    reference?: string;
  }>;
  quantity?: {
    system?: string;
    code?: string;
    value?: number;
  };
  daysSupply?: {
    value?: number;
    unit?: string;
    system?: string;
    code?: string;
  };
  whenPrepared?: string;
  whenHandedOver?: string;
  dosageInstruction?: Array<{
    sequence?: number;
    text?: string;
    timing?: {
      repeat?: {
        frequency?: number;
        period?: number;
        periodUnit?: string;
      };
    };
    doseAndRate?: Array<{
      type?: {
        coding?: Array<{
          system?: string;
          code?: string;
          display?: string;
        }>;
      };
      doseQuantity?: {
        value?: number;
        unit?: string;
        system?: string;
        code?: string;
      };
    }>;
  }>;

}
