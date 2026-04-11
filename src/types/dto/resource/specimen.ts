import { FhirCore } from "../core";

export interface CreateSpecimenInput {
  identifier?: Array<{
    system?: string;
    value?: string;
    assigner?: {
      reference?: string;
    };
  }>;
  status?: string;
  type?: {
    coding?: Array<{
      system?: string;
      code?: string;
      display?: string;
    }>;
  };
  collection?: {
    collectedDateTime?: string;
    extension?: Array<{
      url?: string;
      valueReference?: {
        reference?: string;
      };
    }>;
  };
  subject?: {
    reference?: string;
    display?: string;
  };
  request?: Array<{
    reference?: string;
  }>;
  receivedTime?: string;
  extension?: Array<{
    url?: string;
    valueDateTime?: string;
  }>;

}

export interface PatchSpecimenInput {
  identifier?: Array<{
    system?: string;
    value?: string;
    assigner?: {
      reference?: string;
    };
  }>;
  status?: string;
  type?: {
    coding?: Array<{
      system?: string;
      code?: string;
      display?: string;
    }>;
  };
  collection?: {
    collectedDateTime?: string;
    extension?: Array<{
      url?: string;
      valueReference?: {
        reference?: string;
      };
    }>;
  };
  subject?: {
    reference?: string;
    display?: string;
  };
  request?: Array<{
    reference?: string;
  }>;
  receivedTime?: string;
  extension?: Array<{
    url?: string;
    valueDateTime?: string;
  }>;

}

export interface ExistingSpecimen {
  id?: string;
  identifier?: Array<{
    system?: string;
    value?: string;
    assigner?: {
      reference?: string;
    };
  }>;
  status?: string;
  type?: {
    coding?: Array<{
      system?: string;
      code?: string;
      display?: string;
    }>;
  };
  collection?: {
    collectedDateTime?: string;
    extension?: Array<{
      url?: string;
      valueReference?: {
        reference?: string;
      };
    }>;
  };
  subject?: {
    reference?: string;
    display?: string;
  };
  request?: Array<{
    reference?: string;
  }>;
  receivedTime?: string;
  extension?: Array<{
    url?: string;
    valueDateTime?: string;
  }>;

}

export interface FhirPatchSpecimen {
  op: "replace" | "test";
  path: string;
  value: any;
}

export interface FhirSpecimen extends FhirCore {
  resourceType: "Specimen";
  meta?: {
    profile: string[];
  };
  identifier?: Array<{
    system?: string;
    value?: string;
    assigner?: {
      reference?: string;
    };
  }>;
  status?: string;
  type?: {
    coding?: Array<{
      system?: string;
      code?: string;
      display?: string;
    }>;
  };
  collection?: {
    collectedDateTime?: string;
    extension?: Array<{
      url?: string;
      valueReference?: {
        reference?: string;
      };
    }>;
  };
  subject?: {
    reference?: string;
    display?: string;
  };
  request?: Array<{
    reference?: string;
  }>;
  receivedTime?: string;
  extension?: Array<{
    url?: string;
    valueDateTime?: string;
  }>;

}
