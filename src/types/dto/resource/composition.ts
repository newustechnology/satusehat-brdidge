import { FhirCore } from "../core";

export interface CreateCompositionInput {
  identifier?: {
    system?: string;
    value?: string;
  };
  status?: string;
  type?: {
    coding?: Array<{
      system?: string;
      code?: string;
      display?: string;
    }>;
  };
  category?: Array<{
    coding?: Array<{
      system?: string;
      code?: string;
      display?: string;
    }>;
  }>;
  subject?: {
    reference?: string;
    display?: string;
  };
  encounter?: {
    reference?: string;
    display?: string;
  };
  date?: string;
  author?: Array<{
    reference?: string;
    display?: string;
  }>;
  title?: string;
  custodian?: {
    reference?: string;
  };
  section?: Array<{
    code?: {
      coding?: Array<{
        system?: string;
        code?: string;
        display?: string;
      }>;
    };
    text?: {
      status?: string;
      div?: string;
    };
  }>;

}

export interface PatchCompositionInput {
  identifier?: {
    system?: string;
    value?: string;
  };
  status?: string;
  type?: {
    coding?: Array<{
      system?: string;
      code?: string;
      display?: string;
    }>;
  };
  category?: Array<{
    coding?: Array<{
      system?: string;
      code?: string;
      display?: string;
    }>;
  }>;
  subject?: {
    reference?: string;
    display?: string;
  };
  encounter?: {
    reference?: string;
    display?: string;
  };
  date?: string;
  author?: Array<{
    reference?: string;
    display?: string;
  }>;
  title?: string;
  custodian?: {
    reference?: string;
  };
  section?: Array<{
    code?: {
      coding?: Array<{
        system?: string;
        code?: string;
        display?: string;
      }>;
    };
    text?: {
      status?: string;
      div?: string;
    };
  }>;

}

export interface ExistingComposition {
  id?: string;
  identifier?: {
    system?: string;
    value?: string;
  };
  status?: string;
  type?: {
    coding?: Array<{
      system?: string;
      code?: string;
      display?: string;
    }>;
  };
  category?: Array<{
    coding?: Array<{
      system?: string;
      code?: string;
      display?: string;
    }>;
  }>;
  subject?: {
    reference?: string;
    display?: string;
  };
  encounter?: {
    reference?: string;
    display?: string;
  };
  date?: string;
  author?: Array<{
    reference?: string;
    display?: string;
  }>;
  title?: string;
  custodian?: {
    reference?: string;
  };
  section?: Array<{
    code?: {
      coding?: Array<{
        system?: string;
        code?: string;
        display?: string;
      }>;
    };
    text?: {
      status?: string;
      div?: string;
    };
  }>;

}

export interface FhirPatchComposition {
  op: "replace" | "test";
  path: string;
  value: any;
}

export interface FhirComposition extends FhirCore {
  resourceType: "Composition";
  meta?: {
    profile: string[];
  };
  identifier?: {
    system?: string;
    value?: string;
  };
  status?: string;
  type?: {
    coding?: Array<{
      system?: string;
      code?: string;
      display?: string;
    }>;
  };
  category?: Array<{
    coding?: Array<{
      system?: string;
      code?: string;
      display?: string;
    }>;
  }>;
  subject?: {
    reference?: string;
    display?: string;
  };
  encounter?: {
    reference?: string;
    display?: string;
  };
  date?: string;
  author?: Array<{
    reference?: string;
    display?: string;
  }>;
  title?: string;
  custodian?: {
    reference?: string;
  };
  section?: Array<{
    code?: {
      coding?: Array<{
        system?: string;
        code?: string;
        display?: string;
      }>;
    };
    text?: {
      status?: string;
      div?: string;
    };
  }>;

}
