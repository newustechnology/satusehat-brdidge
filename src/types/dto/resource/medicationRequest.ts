import { FhirCore } from "../core";

export interface CreateMedicationRequestInput {
  identifier?: Array<{
    system?: string;
    use?: string;
    value?: string;
  }>;
  status?: string;
  intent?: string;
  category?: Array<{
    coding?: Array<{
      system?: string;
      code?: string;
      display?: string;
    }>;
  }>;
  priority?: string;
  medicationReference?: {
    reference?: string;
    display?: string;
  };
  subject?: {
    reference?: string;
    display?: string;
  };
  encounter?: {
    reference?: string;
  };
  authoredOn?: string;
  requester?: {
    reference?: string;
    display?: string;
  };
  reasonCode?: Array<{
    coding?: Array<{
      system?: string;
      code?: string;
      display?: string;
    }>;
  }>;
  courseOfTherapyType?: {
    coding?: Array<{
      system?: string;
      code?: string;
      display?: string;
    }>;
  };
  dosageInstruction?: Array<{
    sequence?: number;
    text?: string;
    additionalInstruction?: Array<{
      text?: string;
    }>;
    patientInstruction?: string;
    timing?: {
      repeat?: {
        frequency?: number;
        period?: number;
        periodUnit?: string;
      };
    };
    route?: {
      coding?: Array<{
        system?: string;
        code?: string;
        display?: string;
      }>;
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
  dispenseRequest?: {
    dispenseInterval?: {
      value?: number;
      unit?: string;
      system?: string;
      code?: string;
    };
    validityPeriod?: {
      start?: string;
      end?: string;
    };
    numberOfRepeatsAllowed?: number;
    quantity?: {
      value?: number;
      unit?: string;
      system?: string;
      code?: string;
    };
    expectedSupplyDuration?: {
      value?: number;
      unit?: string;
      system?: string;
      code?: string;
    };
    performer?: {
      reference?: string;
    };
  };

}

export interface PatchMedicationRequestInput {
  identifier?: Array<{
    system?: string;
    use?: string;
    value?: string;
  }>;
  status?: string;
  intent?: string;
  category?: Array<{
    coding?: Array<{
      system?: string;
      code?: string;
      display?: string;
    }>;
  }>;
  priority?: string;
  medicationReference?: {
    reference?: string;
    display?: string;
  };
  subject?: {
    reference?: string;
    display?: string;
  };
  encounter?: {
    reference?: string;
  };
  authoredOn?: string;
  requester?: {
    reference?: string;
    display?: string;
  };
  reasonCode?: Array<{
    coding?: Array<{
      system?: string;
      code?: string;
      display?: string;
    }>;
  }>;
  courseOfTherapyType?: {
    coding?: Array<{
      system?: string;
      code?: string;
      display?: string;
    }>;
  };
  dosageInstruction?: Array<{
    sequence?: number;
    text?: string;
    additionalInstruction?: Array<{
      text?: string;
    }>;
    patientInstruction?: string;
    timing?: {
      repeat?: {
        frequency?: number;
        period?: number;
        periodUnit?: string;
      };
    };
    route?: {
      coding?: Array<{
        system?: string;
        code?: string;
        display?: string;
      }>;
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
  dispenseRequest?: {
    dispenseInterval?: {
      value?: number;
      unit?: string;
      system?: string;
      code?: string;
    };
    validityPeriod?: {
      start?: string;
      end?: string;
    };
    numberOfRepeatsAllowed?: number;
    quantity?: {
      value?: number;
      unit?: string;
      system?: string;
      code?: string;
    };
    expectedSupplyDuration?: {
      value?: number;
      unit?: string;
      system?: string;
      code?: string;
    };
    performer?: {
      reference?: string;
    };
  };

}

export interface ExistingMedicationRequest {
  id?: string;
  identifier?: Array<{
    system?: string;
    use?: string;
    value?: string;
  }>;
  status?: string;
  intent?: string;
  category?: Array<{
    coding?: Array<{
      system?: string;
      code?: string;
      display?: string;
    }>;
  }>;
  priority?: string;
  medicationReference?: {
    reference?: string;
    display?: string;
  };
  subject?: {
    reference?: string;
    display?: string;
  };
  encounter?: {
    reference?: string;
  };
  authoredOn?: string;
  requester?: {
    reference?: string;
    display?: string;
  };
  reasonCode?: Array<{
    coding?: Array<{
      system?: string;
      code?: string;
      display?: string;
    }>;
  }>;
  courseOfTherapyType?: {
    coding?: Array<{
      system?: string;
      code?: string;
      display?: string;
    }>;
  };
  dosageInstruction?: Array<{
    sequence?: number;
    text?: string;
    additionalInstruction?: Array<{
      text?: string;
    }>;
    patientInstruction?: string;
    timing?: {
      repeat?: {
        frequency?: number;
        period?: number;
        periodUnit?: string;
      };
    };
    route?: {
      coding?: Array<{
        system?: string;
        code?: string;
        display?: string;
      }>;
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
  dispenseRequest?: {
    dispenseInterval?: {
      value?: number;
      unit?: string;
      system?: string;
      code?: string;
    };
    validityPeriod?: {
      start?: string;
      end?: string;
    };
    numberOfRepeatsAllowed?: number;
    quantity?: {
      value?: number;
      unit?: string;
      system?: string;
      code?: string;
    };
    expectedSupplyDuration?: {
      value?: number;
      unit?: string;
      system?: string;
      code?: string;
    };
    performer?: {
      reference?: string;
    };
  };

}

export interface FhirPatchMedicationRequest {
  op: "replace" | "test";
  path: string;
  value: any;
}

export interface FhirMedicationRequest extends FhirCore {
  resourceType: "MedicationRequest";
  meta?: {
    profile: string[];
  };
  identifier?: Array<{
    system?: string;
    use?: string;
    value?: string;
  }>;
  status?: string;
  intent?: string;
  category?: Array<{
    coding?: Array<{
      system?: string;
      code?: string;
      display?: string;
    }>;
  }>;
  priority?: string;
  medicationReference?: {
    reference?: string;
    display?: string;
  };
  subject?: {
    reference?: string;
    display?: string;
  };
  encounter?: {
    reference?: string;
  };
  authoredOn?: string;
  requester?: {
    reference?: string;
    display?: string;
  };
  reasonCode?: Array<{
    coding?: Array<{
      system?: string;
      code?: string;
      display?: string;
    }>;
  }>;
  courseOfTherapyType?: {
    coding?: Array<{
      system?: string;
      code?: string;
      display?: string;
    }>;
  };
  dosageInstruction?: Array<{
    sequence?: number;
    text?: string;
    additionalInstruction?: Array<{
      text?: string;
    }>;
    patientInstruction?: string;
    timing?: {
      repeat?: {
        frequency?: number;
        period?: number;
        periodUnit?: string;
      };
    };
    route?: {
      coding?: Array<{
        system?: string;
        code?: string;
        display?: string;
      }>;
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
  dispenseRequest?: {
    dispenseInterval?: {
      value?: number;
      unit?: string;
      system?: string;
      code?: string;
    };
    validityPeriod?: {
      start?: string;
      end?: string;
    };
    numberOfRepeatsAllowed?: number;
    quantity?: {
      value?: number;
      unit?: string;
      system?: string;
      code?: string;
    };
    expectedSupplyDuration?: {
      value?: number;
      unit?: string;
      system?: string;
      code?: string;
    };
    performer?: {
      reference?: string;
    };
  };

}
