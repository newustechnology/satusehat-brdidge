import { FhirCore } from "../core";

export interface CreateCoverageEligibilityResponseInput {
  identifier?: Array<{
    use?: string;
    system?: string;
    value?: string;
    type?: {
      coding?: Array<{
        system?: string;
        code?: string;
        display?: string;
      }>;
    };
    period?: {
      start?: string;
      end?: string;
    };
  }>;
  status?: string;
  purpose?: Array<string>;
  patient?: {
    reference?: string;
  };
  created?: string;
  requestor?: {
    reference?: string;
  };
  request?: {
    reference?: string;
  };
  outcome?: string;
  disposition?: string;
  insurer?: {
    reference?: string;
  };
  insurance?: Array<{
    coverage?: {
      reference?: string;
    };
    inforce?: boolean;
    item?: Array<{
      category?: {
        coding?: Array<{
          system?: string;
          code?: string;
          display?: string;
        }>;
      };
      benefit?: Array<{
        type?: {
          coding?: Array<{
            system?: string;
            code?: string;
            display?: string;
          }>;
        };
        allowedMoney?: {
          value?: number;
          currency?: string;
        };
      }>;
    }>;
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

export interface PatchCoverageEligibilityResponseInput {
  identifier?: Array<{
    use?: string;
    system?: string;
    value?: string;
    type?: {
      coding?: Array<{
        system?: string;
        code?: string;
        display?: string;
      }>;
    };
    period?: {
      start?: string;
      end?: string;
    };
  }>;
  status?: string;
  purpose?: Array<string>;
  patient?: {
    reference?: string;
  };
  created?: string;
  requestor?: {
    reference?: string;
  };
  request?: {
    reference?: string;
  };
  outcome?: string;
  disposition?: string;
  insurer?: {
    reference?: string;
  };
  insurance?: Array<{
    coverage?: {
      reference?: string;
    };
    inforce?: boolean;
    item?: Array<{
      category?: {
        coding?: Array<{
          system?: string;
          code?: string;
          display?: string;
        }>;
      };
      benefit?: Array<{
        type?: {
          coding?: Array<{
            system?: string;
            code?: string;
            display?: string;
          }>;
        };
        allowedMoney?: {
          value?: number;
          currency?: string;
        };
      }>;
    }>;
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

export interface ExistingCoverageEligibilityResponse {
  id?: string;
  identifier?: Array<{
    use?: string;
    system?: string;
    value?: string;
    type?: {
      coding?: Array<{
        system?: string;
        code?: string;
        display?: string;
      }>;
    };
    period?: {
      start?: string;
      end?: string;
    };
  }>;
  status?: string;
  purpose?: Array<string>;
  patient?: {
    reference?: string;
  };
  created?: string;
  requestor?: {
    reference?: string;
  };
  request?: {
    reference?: string;
  };
  outcome?: string;
  disposition?: string;
  insurer?: {
    reference?: string;
  };
  insurance?: Array<{
    coverage?: {
      reference?: string;
    };
    inforce?: boolean;
    item?: Array<{
      category?: {
        coding?: Array<{
          system?: string;
          code?: string;
          display?: string;
        }>;
      };
      benefit?: Array<{
        type?: {
          coding?: Array<{
            system?: string;
            code?: string;
            display?: string;
          }>;
        };
        allowedMoney?: {
          value?: number;
          currency?: string;
        };
      }>;
    }>;
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

export interface FhirPatchCoverageEligibilityResponse {
  op: "replace" | "test";
  path: string;
  value: any;
}

export interface FhirCoverageEligibilityResponse extends FhirCore {
  resourceType: "CoverageEligibilityResponse";
  meta?: {
    profile: string[];
  };
  identifier?: Array<{
    use?: string;
    system?: string;
    value?: string;
    type?: {
      coding?: Array<{
        system?: string;
        code?: string;
        display?: string;
      }>;
    };
    period?: {
      start?: string;
      end?: string;
    };
  }>;
  status?: string;
  purpose?: Array<string>;
  patient?: {
    reference?: string;
  };
  created?: string;
  requestor?: {
    reference?: string;
  };
  request?: {
    reference?: string;
  };
  outcome?: string;
  disposition?: string;
  insurer?: {
    reference?: string;
  };
  insurance?: Array<{
    coverage?: {
      reference?: string;
    };
    inforce?: boolean;
    item?: Array<{
      category?: {
        coding?: Array<{
          system?: string;
          code?: string;
          display?: string;
        }>;
      };
      benefit?: Array<{
        type?: {
          coding?: Array<{
            system?: string;
            code?: string;
            display?: string;
          }>;
        };
        allowedMoney?: {
          value?: number;
          currency?: string;
        };
      }>;
    }>;
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
