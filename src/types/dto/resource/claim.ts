import { FhirCore } from "../core";

export interface CreateClaimInput {
  identifier?: Array<{
    system?: string;
    value?: string;
  }>;
  status?: string;
  type?: {
    coding?: Array<{
      system?: string;
      code?: string;
      display?: string;
    }>;
  };
  use?: string;
  patient?: {
    reference?: string;
  };
  billablePeriod?: {
    start?: string;
    end?: string;
  };
  created?: string;
  enterer?: {
    identifier?: {
      system?: string;
      value?: string;
    };
    reference?: string;
  };
  insurer?: {
    reference?: string;
  };
  provider?: {
    reference?: string;
  };
  priority?: {
    coding?: Array<{
      system?: string;
      code?: string;
      display?: string;
    }>;
  };
  payee?: {
    type?: {
      coding?: Array<{
        system?: string;
        code?: string;
        display?: string;
      }>;
    };
    party?: {
      reference?: string;
    };
  };
  facility?: {
    reference?: string;
  };
  supportingInfo?: Array<{
    sequence?: number;
    category?: {
      coding?: Array<{
        system?: string;
        code?: string;
        display?: string;
      }>;
    };
    code?: {
      coding?: Array<{
        system?: string;
        code?: string;
        display?: string;
      }>;
    };
  }>;
  diagnosis?: Array<{
    sequence?: number;
    diagnosisCodeableConcept?: {
      coding?: Array<{
        system?: string;
        code?: string;
        display?: string;
      }>;
    };
    type?: Array<{
      coding?: Array<{
        system?: string;
        code?: string;
        display?: string;
      }>;
    }>;
  }>;
  procedure?: Array<{
    sequence?: number;
    procedureCodeableConcept?: {
      coding?: Array<{
        system?: string;
        code?: string;
        display?: string;
      }>;
    };
  }>;
  insurance?: Array<{
    sequence?: number;
    focal?: boolean;
    coverage?: {
      reference?: string;
    };
    identifier?: {
      system?: string;
      value?: string;
    };
  }>;
  total?: {
    value?: number;
    currency?: string;
  };
  extension?: Array<{
    url?: string;
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
  }>;

}

export interface PatchClaimInput {
  identifier?: Array<{
    system?: string;
    value?: string;
  }>;
  status?: string;
  type?: {
    coding?: Array<{
      system?: string;
      code?: string;
      display?: string;
    }>;
  };
  use?: string;
  patient?: {
    reference?: string;
  };
  billablePeriod?: {
    start?: string;
    end?: string;
  };
  created?: string;
  enterer?: {
    identifier?: {
      system?: string;
      value?: string;
    };
    reference?: string;
  };
  insurer?: {
    reference?: string;
  };
  provider?: {
    reference?: string;
  };
  priority?: {
    coding?: Array<{
      system?: string;
      code?: string;
      display?: string;
    }>;
  };
  payee?: {
    type?: {
      coding?: Array<{
        system?: string;
        code?: string;
        display?: string;
      }>;
    };
    party?: {
      reference?: string;
    };
  };
  facility?: {
    reference?: string;
  };
  supportingInfo?: Array<{
    sequence?: number;
    category?: {
      coding?: Array<{
        system?: string;
        code?: string;
        display?: string;
      }>;
    };
    code?: {
      coding?: Array<{
        system?: string;
        code?: string;
        display?: string;
      }>;
    };
  }>;
  diagnosis?: Array<{
    sequence?: number;
    diagnosisCodeableConcept?: {
      coding?: Array<{
        system?: string;
        code?: string;
        display?: string;
      }>;
    };
    type?: Array<{
      coding?: Array<{
        system?: string;
        code?: string;
        display?: string;
      }>;
    }>;
  }>;
  procedure?: Array<{
    sequence?: number;
    procedureCodeableConcept?: {
      coding?: Array<{
        system?: string;
        code?: string;
        display?: string;
      }>;
    };
  }>;
  insurance?: Array<{
    sequence?: number;
    focal?: boolean;
    coverage?: {
      reference?: string;
    };
    identifier?: {
      system?: string;
      value?: string;
    };
  }>;
  total?: {
    value?: number;
    currency?: string;
  };
  extension?: Array<{
    url?: string;
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
  }>;

}

export interface ExistingClaim {
  id?: string;
  identifier?: Array<{
    system?: string;
    value?: string;
  }>;
  status?: string;
  type?: {
    coding?: Array<{
      system?: string;
      code?: string;
      display?: string;
    }>;
  };
  use?: string;
  patient?: {
    reference?: string;
  };
  billablePeriod?: {
    start?: string;
    end?: string;
  };
  created?: string;
  enterer?: {
    identifier?: {
      system?: string;
      value?: string;
    };
    reference?: string;
  };
  insurer?: {
    reference?: string;
  };
  provider?: {
    reference?: string;
  };
  priority?: {
    coding?: Array<{
      system?: string;
      code?: string;
      display?: string;
    }>;
  };
  payee?: {
    type?: {
      coding?: Array<{
        system?: string;
        code?: string;
        display?: string;
      }>;
    };
    party?: {
      reference?: string;
    };
  };
  facility?: {
    reference?: string;
  };
  supportingInfo?: Array<{
    sequence?: number;
    category?: {
      coding?: Array<{
        system?: string;
        code?: string;
        display?: string;
      }>;
    };
    code?: {
      coding?: Array<{
        system?: string;
        code?: string;
        display?: string;
      }>;
    };
  }>;
  diagnosis?: Array<{
    sequence?: number;
    diagnosisCodeableConcept?: {
      coding?: Array<{
        system?: string;
        code?: string;
        display?: string;
      }>;
    };
    type?: Array<{
      coding?: Array<{
        system?: string;
        code?: string;
        display?: string;
      }>;
    }>;
  }>;
  procedure?: Array<{
    sequence?: number;
    procedureCodeableConcept?: {
      coding?: Array<{
        system?: string;
        code?: string;
        display?: string;
      }>;
    };
  }>;
  insurance?: Array<{
    sequence?: number;
    focal?: boolean;
    coverage?: {
      reference?: string;
    };
    identifier?: {
      system?: string;
      value?: string;
    };
  }>;
  total?: {
    value?: number;
    currency?: string;
  };
  extension?: Array<{
    url?: string;
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
  }>;

}

export interface FhirPatchClaim {
  op: "replace" | "test";
  path: string;
  value: any;
}

export interface FhirClaim extends FhirCore {
  resourceType: "Claim";
  meta?: {
    profile: string[];
  };
  identifier?: Array<{
    system?: string;
    value?: string;
  }>;
  status?: string;
  type?: {
    coding?: Array<{
      system?: string;
      code?: string;
      display?: string;
    }>;
  };
  use?: string;
  patient?: {
    reference?: string;
  };
  billablePeriod?: {
    start?: string;
    end?: string;
  };
  created?: string;
  enterer?: {
    identifier?: {
      system?: string;
      value?: string;
    };
    reference?: string;
  };
  insurer?: {
    reference?: string;
  };
  provider?: {
    reference?: string;
  };
  priority?: {
    coding?: Array<{
      system?: string;
      code?: string;
      display?: string;
    }>;
  };
  payee?: {
    type?: {
      coding?: Array<{
        system?: string;
        code?: string;
        display?: string;
      }>;
    };
    party?: {
      reference?: string;
    };
  };
  facility?: {
    reference?: string;
  };
  supportingInfo?: Array<{
    sequence?: number;
    category?: {
      coding?: Array<{
        system?: string;
        code?: string;
        display?: string;
      }>;
    };
    code?: {
      coding?: Array<{
        system?: string;
        code?: string;
        display?: string;
      }>;
    };
  }>;
  diagnosis?: Array<{
    sequence?: number;
    diagnosisCodeableConcept?: {
      coding?: Array<{
        system?: string;
        code?: string;
        display?: string;
      }>;
    };
    type?: Array<{
      coding?: Array<{
        system?: string;
        code?: string;
        display?: string;
      }>;
    }>;
  }>;
  procedure?: Array<{
    sequence?: number;
    procedureCodeableConcept?: {
      coding?: Array<{
        system?: string;
        code?: string;
        display?: string;
      }>;
    };
  }>;
  insurance?: Array<{
    sequence?: number;
    focal?: boolean;
    coverage?: {
      reference?: string;
    };
    identifier?: {
      system?: string;
      value?: string;
    };
  }>;
  total?: {
    value?: number;
    currency?: string;
  };
  extension?: Array<{
    url?: string;
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
  }>;

}
