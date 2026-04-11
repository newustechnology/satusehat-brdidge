import { FhirCore } from "../core";

export interface CreateServiceRequestInput {
  identifier?: Array<{
    system?: string;
    value?: string;
  }>;
  status?: string;
  intent?: string;
  priority?: string;
  category?: Array<{
    coding?: Array<{
      system?: string;
      code?: string;
      display?: string;
    }>;
  }>;
  code?: {
    coding?: Array<{
      system?: string;
      code?: string;
      display?: string;
    }>;
    text?: string;
  };
  subject?: {
    reference?: string;
  };
  encounter?: {
    reference?: string;
    display?: string;
  };
  occurrenceDateTime?: string;
  authoredOn?: string;
  requester?: {
    reference?: string;
    display?: string;
  };
  performer?: Array<{
    reference?: string;
    display?: string;
  }>;
  reasonCode?: Array<{
    coding?: Array<{
      system?: string;
      code?: string;
      display?: string;
    }>;
    text?: string;
  }>;
  locationCode?: Array<{
    coding?: Array<{
      system?: string;
      code?: string;
      display?: string;
    }>;
  }>;
  locationReference?: Array<{
    reference?: string;
    display?: string;
  }>;
  patientInstruction?: string;

}

export interface PatchServiceRequestInput {
  identifier?: Array<{
    system?: string;
    value?: string;
  }>;
  status?: string;
  intent?: string;
  priority?: string;
  category?: Array<{
    coding?: Array<{
      system?: string;
      code?: string;
      display?: string;
    }>;
  }>;
  code?: {
    coding?: Array<{
      system?: string;
      code?: string;
      display?: string;
    }>;
    text?: string;
  };
  subject?: {
    reference?: string;
  };
  encounter?: {
    reference?: string;
    display?: string;
  };
  occurrenceDateTime?: string;
  authoredOn?: string;
  requester?: {
    reference?: string;
    display?: string;
  };
  performer?: Array<{
    reference?: string;
    display?: string;
  }>;
  reasonCode?: Array<{
    coding?: Array<{
      system?: string;
      code?: string;
      display?: string;
    }>;
    text?: string;
  }>;
  locationCode?: Array<{
    coding?: Array<{
      system?: string;
      code?: string;
      display?: string;
    }>;
  }>;
  locationReference?: Array<{
    reference?: string;
    display?: string;
  }>;
  patientInstruction?: string;

}

export interface ExistingServiceRequest {
  id?: string;
  identifier?: Array<{
    system?: string;
    value?: string;
  }>;
  status?: string;
  intent?: string;
  priority?: string;
  category?: Array<{
    coding?: Array<{
      system?: string;
      code?: string;
      display?: string;
    }>;
  }>;
  code?: {
    coding?: Array<{
      system?: string;
      code?: string;
      display?: string;
    }>;
    text?: string;
  };
  subject?: {
    reference?: string;
  };
  encounter?: {
    reference?: string;
    display?: string;
  };
  occurrenceDateTime?: string;
  authoredOn?: string;
  requester?: {
    reference?: string;
    display?: string;
  };
  performer?: Array<{
    reference?: string;
    display?: string;
  }>;
  reasonCode?: Array<{
    coding?: Array<{
      system?: string;
      code?: string;
      display?: string;
    }>;
    text?: string;
  }>;
  locationCode?: Array<{
    coding?: Array<{
      system?: string;
      code?: string;
      display?: string;
    }>;
  }>;
  locationReference?: Array<{
    reference?: string;
    display?: string;
  }>;
  patientInstruction?: string;

}

export interface FhirPatchServiceRequest {
  op: "replace" | "test";
  path: string;
  value: any;
}

export interface FhirServiceRequest extends FhirCore {
  resourceType: "ServiceRequest";
  meta?: {
    profile: string[];
  };
  identifier?: Array<{
    system?: string;
    value?: string;
  }>;
  status?: string;
  intent?: string;
  priority?: string;
  category?: Array<{
    coding?: Array<{
      system?: string;
      code?: string;
      display?: string;
    }>;
  }>;
  code?: {
    coding?: Array<{
      system?: string;
      code?: string;
      display?: string;
    }>;
    text?: string;
  };
  subject?: {
    reference?: string;
  };
  encounter?: {
    reference?: string;
    display?: string;
  };
  occurrenceDateTime?: string;
  authoredOn?: string;
  requester?: {
    reference?: string;
    display?: string;
  };
  performer?: Array<{
    reference?: string;
    display?: string;
  }>;
  reasonCode?: Array<{
    coding?: Array<{
      system?: string;
      code?: string;
      display?: string;
    }>;
    text?: string;
  }>;
  locationCode?: Array<{
    coding?: Array<{
      system?: string;
      code?: string;
      display?: string;
    }>;
  }>;
  locationReference?: Array<{
    reference?: string;
    display?: string;
  }>;
  patientInstruction?: string;

}
