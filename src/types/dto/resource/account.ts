import { FhirCore } from "../core";

export interface CreateAccountInput {
  status?: string;
  type?: {
    coding?: Array<{
      system?: string;
      code?: string;
      display?: string;
    }>;
    text?: string;
  };
  name?: string;
  subject?: Array<{
    reference?: string;
    display?: string;
  }>;
  servicePeriod?: {
    start?: string;
    end?: string;
  };
  owner?: {
    reference?: string;
  };
  guarantor?: Array<{
    party?: {
      reference?: string;
    };
    period?: {
      start?: string;
      end?: string;
    };
  }>;
  description?: string;

}

export interface PatchAccountInput {
  status?: string;
  type?: {
    coding?: Array<{
      system?: string;
      code?: string;
      display?: string;
    }>;
    text?: string;
  };
  name?: string;
  subject?: Array<{
    reference?: string;
    display?: string;
  }>;
  servicePeriod?: {
    start?: string;
    end?: string;
  };
  owner?: {
    reference?: string;
  };
  guarantor?: Array<{
    party?: {
      reference?: string;
    };
    period?: {
      start?: string;
      end?: string;
    };
  }>;
  description?: string;

}

export interface ExistingAccount {
  id?: string;
  status?: string;
  type?: {
    coding?: Array<{
      system?: string;
      code?: string;
      display?: string;
    }>;
    text?: string;
  };
  name?: string;
  subject?: Array<{
    reference?: string;
    display?: string;
  }>;
  servicePeriod?: {
    start?: string;
    end?: string;
  };
  owner?: {
    reference?: string;
  };
  guarantor?: Array<{
    party?: {
      reference?: string;
    };
    period?: {
      start?: string;
      end?: string;
    };
  }>;
  description?: string;

}

export interface FhirPatchAccount {
  op: "replace" | "test";
  path: string;
  value: any;
}

export interface FhirAccount extends FhirCore {
  resourceType: "Account";
  meta?: {
    profile: string[];
  };
  status?: string;
  type?: {
    coding?: Array<{
      system?: string;
      code?: string;
      display?: string;
    }>;
    text?: string;
  };
  name?: string;
  subject?: Array<{
    reference?: string;
    display?: string;
  }>;
  servicePeriod?: {
    start?: string;
    end?: string;
  };
  owner?: {
    reference?: string;
  };
  guarantor?: Array<{
    party?: {
      reference?: string;
    };
    period?: {
      start?: string;
      end?: string;
    };
  }>;
  description?: string;

}
