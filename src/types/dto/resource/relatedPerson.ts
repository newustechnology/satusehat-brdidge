import { FhirCore } from "../core";

export interface CreateRelatedPersonInput {
  identifier?: Array<{
    use?: string;
    system?: string;
    value?: string;
  }>;
  active?: boolean;
  relationship?: Array<{
    coding?: Array<{
      system?: string;
      code?: string;
      display?: string;
    }>;
    text?: string;
  }>;
  patient?: {
    reference?: string;
  };
  name?: Array<{
    use?: string;
    text?: string;
  }>;
  telecom?: Array<{
    system?: string;
    value?: string;
    use?: string;
  }>;
  gender?: string;
  birthDate?: string;
  address?: Array<{
    use?: string;
    line?: Array<string>;
    city?: string;
    postalCode?: string;
    country?: string;
  }>;
  communication?: Array<{
    language?: {
      coding?: Array<{
        system?: string;
        code?: string;
        display?: string;
      }>;
      text?: string;
    };
    preferred?: boolean;
  }>;

}

export interface PatchRelatedPersonInput {
  identifier?: Array<{
    use?: string;
    system?: string;
    value?: string;
  }>;
  active?: boolean;
  relationship?: Array<{
    coding?: Array<{
      system?: string;
      code?: string;
      display?: string;
    }>;
    text?: string;
  }>;
  patient?: {
    reference?: string;
  };
  name?: Array<{
    use?: string;
    text?: string;
  }>;
  telecom?: Array<{
    system?: string;
    value?: string;
    use?: string;
  }>;
  gender?: string;
  birthDate?: string;
  address?: Array<{
    use?: string;
    line?: Array<string>;
    city?: string;
    postalCode?: string;
    country?: string;
  }>;
  communication?: Array<{
    language?: {
      coding?: Array<{
        system?: string;
        code?: string;
        display?: string;
      }>;
      text?: string;
    };
    preferred?: boolean;
  }>;

}

export interface ExistingRelatedPerson {
  id?: string;
  identifier?: Array<{
    use?: string;
    system?: string;
    value?: string;
  }>;
  active?: boolean;
  relationship?: Array<{
    coding?: Array<{
      system?: string;
      code?: string;
      display?: string;
    }>;
    text?: string;
  }>;
  patient?: {
    reference?: string;
  };
  name?: Array<{
    use?: string;
    text?: string;
  }>;
  telecom?: Array<{
    system?: string;
    value?: string;
    use?: string;
  }>;
  gender?: string;
  birthDate?: string;
  address?: Array<{
    use?: string;
    line?: Array<string>;
    city?: string;
    postalCode?: string;
    country?: string;
  }>;
  communication?: Array<{
    language?: {
      coding?: Array<{
        system?: string;
        code?: string;
        display?: string;
      }>;
      text?: string;
    };
    preferred?: boolean;
  }>;

}

export interface FhirPatchRelatedPerson {
  op: "replace" | "test";
  path: string;
  value: any;
}

export interface FhirRelatedPerson extends FhirCore {
  resourceType: "RelatedPerson";
  meta?: {
    profile: string[];
  };
  identifier?: Array<{
    use?: string;
    system?: string;
    value?: string;
  }>;
  active?: boolean;
  relationship?: Array<{
    coding?: Array<{
      system?: string;
      code?: string;
      display?: string;
    }>;
    text?: string;
  }>;
  patient?: {
    reference?: string;
  };
  name?: Array<{
    use?: string;
    text?: string;
  }>;
  telecom?: Array<{
    system?: string;
    value?: string;
    use?: string;
  }>;
  gender?: string;
  birthDate?: string;
  address?: Array<{
    use?: string;
    line?: Array<string>;
    city?: string;
    postalCode?: string;
    country?: string;
  }>;
  communication?: Array<{
    language?: {
      coding?: Array<{
        system?: string;
        code?: string;
        display?: string;
      }>;
      text?: string;
    };
    preferred?: boolean;
  }>;

}
