import { FhirCore } from "../core";

export interface CreateEpisodeOfCareInput {
  identifier?: Array<{
    system?: string;
    value?: string;
  }>;
  status?: string;
  statusHistory?: Array<{
    status?: string;
    period?: {
      start?: string;
      end?: string;
    };
  }>;
  type?: Array<{
    coding?: Array<{
      system?: string;
      code?: string;
      display?: string;
    }>;
  }>;
  diagnosis?: Array<{
    condition?: {
      reference?: string;
      display?: string;
    };
    role?: {
      coding?: Array<{
        system?: string;
        code?: string;
        display?: string;
      }>;
    };
    rank?: number;
  }>;
  patient?: {
    reference?: string;
    display?: string;
  };
  managingOrganization?: {
    reference?: string;
  };
  period?: {
    start?: string;
    end?: string;
  };
  careManager?: {
    reference?: string;
    display?: string;
  };

}

export interface PatchEpisodeOfCareInput {
  identifier?: Array<{
    system?: string;
    value?: string;
  }>;
  status?: string;
  statusHistory?: Array<{
    status?: string;
    period?: {
      start?: string;
      end?: string;
    };
  }>;
  type?: Array<{
    coding?: Array<{
      system?: string;
      code?: string;
      display?: string;
    }>;
  }>;
  diagnosis?: Array<{
    condition?: {
      reference?: string;
      display?: string;
    };
    role?: {
      coding?: Array<{
        system?: string;
        code?: string;
        display?: string;
      }>;
    };
    rank?: number;
  }>;
  patient?: {
    reference?: string;
    display?: string;
  };
  managingOrganization?: {
    reference?: string;
  };
  period?: {
    start?: string;
    end?: string;
  };
  careManager?: {
    reference?: string;
    display?: string;
  };

}

export interface ExistingEpisodeOfCare {
  id?: string;
  identifier?: Array<{
    system?: string;
    value?: string;
  }>;
  status?: string;
  statusHistory?: Array<{
    status?: string;
    period?: {
      start?: string;
      end?: string;
    };
  }>;
  type?: Array<{
    coding?: Array<{
      system?: string;
      code?: string;
      display?: string;
    }>;
  }>;
  diagnosis?: Array<{
    condition?: {
      reference?: string;
      display?: string;
    };
    role?: {
      coding?: Array<{
        system?: string;
        code?: string;
        display?: string;
      }>;
    };
    rank?: number;
  }>;
  patient?: {
    reference?: string;
    display?: string;
  };
  managingOrganization?: {
    reference?: string;
  };
  period?: {
    start?: string;
    end?: string;
  };
  careManager?: {
    reference?: string;
    display?: string;
  };

}

export interface FhirPatchEpisodeOfCare {
  op: "replace" | "test";
  path: string;
  value: any;
}

export interface FhirEpisodeOfCare extends FhirCore {
  resourceType: "EpisodeOfCare";
  meta?: {
    profile: string[];
  };
  identifier?: Array<{
    system?: string;
    value?: string;
  }>;
  status?: string;
  statusHistory?: Array<{
    status?: string;
    period?: {
      start?: string;
      end?: string;
    };
  }>;
  type?: Array<{
    coding?: Array<{
      system?: string;
      code?: string;
      display?: string;
    }>;
  }>;
  diagnosis?: Array<{
    condition?: {
      reference?: string;
      display?: string;
    };
    role?: {
      coding?: Array<{
        system?: string;
        code?: string;
        display?: string;
      }>;
    };
    rank?: number;
  }>;
  patient?: {
    reference?: string;
    display?: string;
  };
  managingOrganization?: {
    reference?: string;
  };
  period?: {
    start?: string;
    end?: string;
  };
  careManager?: {
    reference?: string;
    display?: string;
  };

}
