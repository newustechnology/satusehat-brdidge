import { FhirCore } from "../core";

export interface CreateCoverageInput {
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
  policyHolder?: {
    reference?: string;
  };
  subscriber?: {
    reference?: string;
  };
  subscriberId?: string;
  beneficiary?: {
    reference?: string;
  };
  payor?: Array<{
    reference?: string;
  }>;
  class?: Array<{
    type?: {
      coding?: Array<{
        system?: string;
        code?: string;
        display?: string;
      }>;
    };
    value?: string;
    name?: string;
  }>;

}

export interface PatchCoverageInput {
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
  policyHolder?: {
    reference?: string;
  };
  subscriber?: {
    reference?: string;
  };
  subscriberId?: string;
  beneficiary?: {
    reference?: string;
  };
  payor?: Array<{
    reference?: string;
  }>;
  class?: Array<{
    type?: {
      coding?: Array<{
        system?: string;
        code?: string;
        display?: string;
      }>;
    };
    value?: string;
    name?: string;
  }>;

}

export interface ExistingCoverage {
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
  policyHolder?: {
    reference?: string;
  };
  subscriber?: {
    reference?: string;
  };
  subscriberId?: string;
  beneficiary?: {
    reference?: string;
  };
  payor?: Array<{
    reference?: string;
  }>;
  class?: Array<{
    type?: {
      coding?: Array<{
        system?: string;
        code?: string;
        display?: string;
      }>;
    };
    value?: string;
    name?: string;
  }>;

}

export interface FhirPatchCoverage {
  op: "replace" | "test";
  path: string;
  value: any;
}

export interface FhirCoverage extends FhirCore {
  resourceType: "Coverage";
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
  policyHolder?: {
    reference?: string;
  };
  subscriber?: {
    reference?: string;
  };
  subscriberId?: string;
  beneficiary?: {
    reference?: string;
  };
  payor?: Array<{
    reference?: string;
  }>;
  class?: Array<{
    type?: {
      coding?: Array<{
        system?: string;
        code?: string;
        display?: string;
      }>;
    };
    value?: string;
    name?: string;
  }>;

}
