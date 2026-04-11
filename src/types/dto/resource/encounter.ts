import { FhirCore } from "../core";

export interface CreateEncounterInput {
  status?: string;
  class?: {
    system?: string;
    code?: string;
    display?: string;
  };
  subject?: {
    reference?: string;
    display?: string;
  };
  participant?: Array<{
    type?: Array<{
      coding?: Array<{
        system?: string;
        code?: string;
        display?: string;
      }>;
    }>;
    individual?: {
      reference?: string;
      display?: string;
    };
  }>;
  period?: {
    start?: string;
  };
  location?: Array<{
    location?: {
      reference?: string;
      display?: string;
    };
  }>;
  statusHistory?: Array<{
    status?: string;
    period?: {
      start?: string;
    };
  }>;
  serviceProvider?: {
    reference?: string;
  };
  identifier?: Array<{
    system?: string;
    value?: string;
  }>;

}

export interface PatchEncounterInput {
  status?: string;
  class?: {
    system?: string;
    code?: string;
    display?: string;
  };
  subject?: {
    reference?: string;
    display?: string;
  };
  participant?: Array<{
    type?: Array<{
      coding?: Array<{
        system?: string;
        code?: string;
        display?: string;
      }>;
    }>;
    individual?: {
      reference?: string;
      display?: string;
    };
  }>;
  period?: {
    start?: string;
  };
  location?: Array<{
    location?: {
      reference?: string;
      display?: string;
    };
  }>;
  statusHistory?: Array<{
    status?: string;
    period?: {
      start?: string;
    };
  }>;
  serviceProvider?: {
    reference?: string;
  };
  identifier?: Array<{
    system?: string;
    value?: string;
  }>;

}

export interface ExistingEncounter {
  id?: string;
  status?: string;
  class?: {
    system?: string;
    code?: string;
    display?: string;
  };
  subject?: {
    reference?: string;
    display?: string;
  };
  participant?: Array<{
    type?: Array<{
      coding?: Array<{
        system?: string;
        code?: string;
        display?: string;
      }>;
    }>;
    individual?: {
      reference?: string;
      display?: string;
    };
  }>;
  period?: {
    start?: string;
  };
  location?: Array<{
    location?: {
      reference?: string;
      display?: string;
    };
  }>;
  statusHistory?: Array<{
    status?: string;
    period?: {
      start?: string;
    };
  }>;
  serviceProvider?: {
    reference?: string;
  };
  identifier?: Array<{
    system?: string;
    value?: string;
  }>;

}

export interface FhirPatchEncounter {
  op: "replace" | "test";
  path: string;
  value: any;
}

export interface FhirEncounter extends FhirCore {
  resourceType: "Encounter";
  meta?: {
    profile: string[];
  };
  status?: string;
  class?: {
    system?: string;
    code?: string;
    display?: string;
  };
  subject?: {
    reference?: string;
    display?: string;
  };
  participant?: Array<{
    type?: Array<{
      coding?: Array<{
        system?: string;
        code?: string;
        display?: string;
      }>;
    }>;
    individual?: {
      reference?: string;
      display?: string;
    };
  }>;
  period?: {
    start?: string;
  };
  location?: Array<{
    location?: {
      reference?: string;
      display?: string;
    };
  }>;
  statusHistory?: Array<{
    status?: string;
    period?: {
      start?: string;
    };
  }>;
  serviceProvider?: {
    reference?: string;
  };
  identifier?: Array<{
    system?: string;
    value?: string;
  }>;

}
