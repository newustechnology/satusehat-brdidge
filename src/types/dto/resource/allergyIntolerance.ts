import { FhirCore } from "../core";

export interface CreateAllergyIntoleranceInput {
  identifier?: Array<{
    system?: string;
    use?: string;
    value?: string;
  }>;
  clinicalStatus?: {
    coding?: Array<{
      system?: string;
      code?: string;
      display?: string;
    }>;
  };
  verificationStatus?: {
    coding?: Array<{
      system?: string;
      code?: string;
      display?: string;
    }>;
  };
  category?: Array<string>;
  code?: {
    coding?: Array<{
      system?: string;
      code?: string;
      display?: string;
    }>;
    text?: string;
  };
  patient?: {
    reference?: string;
    display?: string;
  };
  encounter?: {
    reference?: string;
    display?: string;
  };
  recordedDate?: string;
  recorder?: {
    reference?: string;
  };

}

export interface PatchAllergyIntoleranceInput {
  identifier?: Array<{
    system?: string;
    use?: string;
    value?: string;
  }>;
  clinicalStatus?: {
    coding?: Array<{
      system?: string;
      code?: string;
      display?: string;
    }>;
  };
  verificationStatus?: {
    coding?: Array<{
      system?: string;
      code?: string;
      display?: string;
    }>;
  };
  category?: Array<string>;
  code?: {
    coding?: Array<{
      system?: string;
      code?: string;
      display?: string;
    }>;
    text?: string;
  };
  patient?: {
    reference?: string;
    display?: string;
  };
  encounter?: {
    reference?: string;
    display?: string;
  };
  recordedDate?: string;
  recorder?: {
    reference?: string;
  };

}

export interface ExistingAllergyIntolerance {
  id?: string;
  identifier?: Array<{
    system?: string;
    use?: string;
    value?: string;
  }>;
  clinicalStatus?: {
    coding?: Array<{
      system?: string;
      code?: string;
      display?: string;
    }>;
  };
  verificationStatus?: {
    coding?: Array<{
      system?: string;
      code?: string;
      display?: string;
    }>;
  };
  category?: Array<string>;
  code?: {
    coding?: Array<{
      system?: string;
      code?: string;
      display?: string;
    }>;
    text?: string;
  };
  patient?: {
    reference?: string;
    display?: string;
  };
  encounter?: {
    reference?: string;
    display?: string;
  };
  recordedDate?: string;
  recorder?: {
    reference?: string;
  };

}

export interface FhirPatchAllergyIntolerance {
  op: "replace" | "test";
  path: string;
  value: any;
}

export interface FhirAllergyIntolerance extends FhirCore {
  resourceType: "AllergyIntolerance";
  meta?: {
    profile: string[];
  };
  identifier?: Array<{
    system?: string;
    use?: string;
    value?: string;
  }>;
  clinicalStatus?: {
    coding?: Array<{
      system?: string;
      code?: string;
      display?: string;
    }>;
  };
  verificationStatus?: {
    coding?: Array<{
      system?: string;
      code?: string;
      display?: string;
    }>;
  };
  category?: Array<string>;
  code?: {
    coding?: Array<{
      system?: string;
      code?: string;
      display?: string;
    }>;
    text?: string;
  };
  patient?: {
    reference?: string;
    display?: string;
  };
  encounter?: {
    reference?: string;
    display?: string;
  };
  recordedDate?: string;
  recorder?: {
    reference?: string;
  };

}
