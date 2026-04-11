import { FhirCore } from "../core";

export interface CreateCoverageEligibilityRequestInput {
  identifier?: Array<{
    system?: string;
    value?: string;
  }>;
  status?: string;
  priority?: {
    coding?: Array<{
      system?: string;
      code?: string;
    }>;
  };
  purpose?: Array<string>;
  patient?: {
    reference?: string;
  };
  servicedDate?: string;
  created?: string;
  enterer?: {
    reference?: string;
  };
  provider?: {
    reference?: string;
  };
  insurer?: {
    reference?: string;
  };
  facility?: {
    reference?: string;
  };
  insurance?: Array<{
    focal?: boolean;
    coverage?: {
      reference?: string;
    };
  }>;
  supportingInfo?: Array<{
    sequence?: number;
    information?: {
      reference?: string;
    };
  }>;
  contained?: Array<{
    id?: string;
    questionnaire?: string;
    status?: string;
    subject?: {
      reference?: string;
      display?: string;
    };
    authored?: string;
    author?: {
      reference?: string;
    };
    source?: {
      reference?: string;
    };
    encounter?: {
      reference?: string;
    };
    item?: Array<{
      linkId?: string;
      text?: string;
      answer?: Array<{
        valueCoding?: {
          system?: string;
          code?: string;
          display?: string;
        };
      }>;
    }>;
  }>;

}

export interface PatchCoverageEligibilityRequestInput {
  identifier?: Array<{
    system?: string;
    value?: string;
  }>;
  status?: string;
  priority?: {
    coding?: Array<{
      system?: string;
      code?: string;
    }>;
  };
  purpose?: Array<string>;
  patient?: {
    reference?: string;
  };
  servicedDate?: string;
  created?: string;
  enterer?: {
    reference?: string;
  };
  provider?: {
    reference?: string;
  };
  insurer?: {
    reference?: string;
  };
  facility?: {
    reference?: string;
  };
  insurance?: Array<{
    focal?: boolean;
    coverage?: {
      reference?: string;
    };
  }>;
  supportingInfo?: Array<{
    sequence?: number;
    information?: {
      reference?: string;
    };
  }>;
  contained?: Array<{
    id?: string;
    questionnaire?: string;
    status?: string;
    subject?: {
      reference?: string;
      display?: string;
    };
    authored?: string;
    author?: {
      reference?: string;
    };
    source?: {
      reference?: string;
    };
    encounter?: {
      reference?: string;
    };
    item?: Array<{
      linkId?: string;
      text?: string;
      answer?: Array<{
        valueCoding?: {
          system?: string;
          code?: string;
          display?: string;
        };
      }>;
    }>;
  }>;

}

export interface ExistingCoverageEligibilityRequest {
  id?: string;
  identifier?: Array<{
    system?: string;
    value?: string;
  }>;
  status?: string;
  priority?: {
    coding?: Array<{
      system?: string;
      code?: string;
    }>;
  };
  purpose?: Array<string>;
  patient?: {
    reference?: string;
  };
  servicedDate?: string;
  created?: string;
  enterer?: {
    reference?: string;
  };
  provider?: {
    reference?: string;
  };
  insurer?: {
    reference?: string;
  };
  facility?: {
    reference?: string;
  };
  insurance?: Array<{
    focal?: boolean;
    coverage?: {
      reference?: string;
    };
  }>;
  supportingInfo?: Array<{
    sequence?: number;
    information?: {
      reference?: string;
    };
  }>;
  contained?: Array<{
    id?: string;
    questionnaire?: string;
    status?: string;
    subject?: {
      reference?: string;
      display?: string;
    };
    authored?: string;
    author?: {
      reference?: string;
    };
    source?: {
      reference?: string;
    };
    encounter?: {
      reference?: string;
    };
    item?: Array<{
      linkId?: string;
      text?: string;
      answer?: Array<{
        valueCoding?: {
          system?: string;
          code?: string;
          display?: string;
        };
      }>;
    }>;
  }>;

}

export interface FhirPatchCoverageEligibilityRequest {
  op: "replace" | "test";
  path: string;
  value: any;
}

export interface FhirCoverageEligibilityRequest extends FhirCore {
  resourceType: "CoverageEligibilityRequest";
  meta?: {
    profile: string[];
  };
  identifier?: Array<{
    system?: string;
    value?: string;
  }>;
  status?: string;
  priority?: {
    coding?: Array<{
      system?: string;
      code?: string;
    }>;
  };
  purpose?: Array<string>;
  patient?: {
    reference?: string;
  };
  servicedDate?: string;
  created?: string;
  enterer?: {
    reference?: string;
  };
  provider?: {
    reference?: string;
  };
  insurer?: {
    reference?: string;
  };
  facility?: {
    reference?: string;
  };
  insurance?: Array<{
    focal?: boolean;
    coverage?: {
      reference?: string;
    };
  }>;
  supportingInfo?: Array<{
    sequence?: number;
    information?: {
      reference?: string;
    };
  }>;
  contained?: Array<{
    id?: string;
    questionnaire?: string;
    status?: string;
    subject?: {
      reference?: string;
      display?: string;
    };
    authored?: string;
    author?: {
      reference?: string;
    };
    source?: {
      reference?: string;
    };
    encounter?: {
      reference?: string;
    };
    item?: Array<{
      linkId?: string;
      text?: string;
      answer?: Array<{
        valueCoding?: {
          system?: string;
          code?: string;
          display?: string;
        };
      }>;
    }>;
  }>;

}
