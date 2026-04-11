import { FhirCore } from "../core";

export interface CreateClaimResponseInput {
  status?: string;
  identifier?: Array<{
    system?: string;
    value?: string;
  }>;
  type?: {
    coding?: Array<{
      system?: string;
      code?: string;
      display?: string;
    }>;
  };
  subType?: {
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
  created?: string;
  insurer?: {
    reference?: string;
  };
  requestor?: {
    reference?: string;
  };
  request?: {
    reference?: string;
  };
  outcome?: string;
  disposition?: string;
  payeeType?: {
    coding?: Array<{
      system?: string;
      code?: string;
      display?: string;
    }>;
  };
  adjudication?: Array<{
    category?: {
      coding?: Array<{
        system?: string;
        code?: string;
        display?: string;
      }>;
    };
    reason?: {
      coding?: Array<{
        system?: string;
        code?: string;
        display?: string;
      }>;
    };
    amount?: {
      value?: number;
      currency?: string;
    };
    value?: number;
  }>;
  item?: Array<{
    itemSequence?: number;
    adjudication?: Array<{
      category?: {
        coding?: Array<{
          system?: string;
          code?: string;
          display?: string;
        }>;
      };
      amount?: {
        value?: number;
        currency?: string;
      };
    }>;
  }>;
  total?: Array<{
    category?: {
      coding?: Array<{
        system?: string;
        code?: string;
        display?: string;
      }>;
    };
    amount?: {
      value?: number;
      currency?: string;
    };
  }>;
  payment?: {
    type?: {
      coding?: Array<{
        system?: string;
        code?: string;
        display?: string;
      }>;
    };
    date?: string;
    amount?: {
      value?: number;
      currency?: string;
    };
  };

}

export interface PatchClaimResponseInput {
  status?: string;
  identifier?: Array<{
    system?: string;
    value?: string;
  }>;
  type?: {
    coding?: Array<{
      system?: string;
      code?: string;
      display?: string;
    }>;
  };
  subType?: {
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
  created?: string;
  insurer?: {
    reference?: string;
  };
  requestor?: {
    reference?: string;
  };
  request?: {
    reference?: string;
  };
  outcome?: string;
  disposition?: string;
  payeeType?: {
    coding?: Array<{
      system?: string;
      code?: string;
      display?: string;
    }>;
  };
  adjudication?: Array<{
    category?: {
      coding?: Array<{
        system?: string;
        code?: string;
        display?: string;
      }>;
    };
    reason?: {
      coding?: Array<{
        system?: string;
        code?: string;
        display?: string;
      }>;
    };
    amount?: {
      value?: number;
      currency?: string;
    };
    value?: number;
  }>;
  item?: Array<{
    itemSequence?: number;
    adjudication?: Array<{
      category?: {
        coding?: Array<{
          system?: string;
          code?: string;
          display?: string;
        }>;
      };
      amount?: {
        value?: number;
        currency?: string;
      };
    }>;
  }>;
  total?: Array<{
    category?: {
      coding?: Array<{
        system?: string;
        code?: string;
        display?: string;
      }>;
    };
    amount?: {
      value?: number;
      currency?: string;
    };
  }>;
  payment?: {
    type?: {
      coding?: Array<{
        system?: string;
        code?: string;
        display?: string;
      }>;
    };
    date?: string;
    amount?: {
      value?: number;
      currency?: string;
    };
  };

}

export interface ExistingClaimResponse {
  id?: string;
  status?: string;
  identifier?: Array<{
    system?: string;
    value?: string;
  }>;
  type?: {
    coding?: Array<{
      system?: string;
      code?: string;
      display?: string;
    }>;
  };
  subType?: {
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
  created?: string;
  insurer?: {
    reference?: string;
  };
  requestor?: {
    reference?: string;
  };
  request?: {
    reference?: string;
  };
  outcome?: string;
  disposition?: string;
  payeeType?: {
    coding?: Array<{
      system?: string;
      code?: string;
      display?: string;
    }>;
  };
  adjudication?: Array<{
    category?: {
      coding?: Array<{
        system?: string;
        code?: string;
        display?: string;
      }>;
    };
    reason?: {
      coding?: Array<{
        system?: string;
        code?: string;
        display?: string;
      }>;
    };
    amount?: {
      value?: number;
      currency?: string;
    };
    value?: number;
  }>;
  item?: Array<{
    itemSequence?: number;
    adjudication?: Array<{
      category?: {
        coding?: Array<{
          system?: string;
          code?: string;
          display?: string;
        }>;
      };
      amount?: {
        value?: number;
        currency?: string;
      };
    }>;
  }>;
  total?: Array<{
    category?: {
      coding?: Array<{
        system?: string;
        code?: string;
        display?: string;
      }>;
    };
    amount?: {
      value?: number;
      currency?: string;
    };
  }>;
  payment?: {
    type?: {
      coding?: Array<{
        system?: string;
        code?: string;
        display?: string;
      }>;
    };
    date?: string;
    amount?: {
      value?: number;
      currency?: string;
    };
  };

}

export interface FhirPatchClaimResponse {
  op: "replace" | "test";
  path: string;
  value: any;
}

export interface FhirClaimResponse extends FhirCore {
  resourceType: "ClaimResponse";
  meta?: {
    profile: string[];
  };
  status?: string;
  identifier?: Array<{
    system?: string;
    value?: string;
  }>;
  type?: {
    coding?: Array<{
      system?: string;
      code?: string;
      display?: string;
    }>;
  };
  subType?: {
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
  created?: string;
  insurer?: {
    reference?: string;
  };
  requestor?: {
    reference?: string;
  };
  request?: {
    reference?: string;
  };
  outcome?: string;
  disposition?: string;
  payeeType?: {
    coding?: Array<{
      system?: string;
      code?: string;
      display?: string;
    }>;
  };
  adjudication?: Array<{
    category?: {
      coding?: Array<{
        system?: string;
        code?: string;
        display?: string;
      }>;
    };
    reason?: {
      coding?: Array<{
        system?: string;
        code?: string;
        display?: string;
      }>;
    };
    amount?: {
      value?: number;
      currency?: string;
    };
    value?: number;
  }>;
  item?: Array<{
    itemSequence?: number;
    adjudication?: Array<{
      category?: {
        coding?: Array<{
          system?: string;
          code?: string;
          display?: string;
        }>;
      };
      amount?: {
        value?: number;
        currency?: string;
      };
    }>;
  }>;
  total?: Array<{
    category?: {
      coding?: Array<{
        system?: string;
        code?: string;
        display?: string;
      }>;
    };
    amount?: {
      value?: number;
      currency?: string;
    };
  }>;
  payment?: {
    type?: {
      coding?: Array<{
        system?: string;
        code?: string;
        display?: string;
      }>;
    };
    date?: string;
    amount?: {
      value?: number;
      currency?: string;
    };
  };

}
