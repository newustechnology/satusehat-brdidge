import { FhirCore } from "../core";

export interface CreateChargeItemInput {
  status?: string;
  code?: {
    coding?: Array<{
      system?: string;
      code?: string;
      display?: string;
    }>;
  };
  subject?: {
    reference?: string;
  };
  context?: {
    reference?: string;
  };
  occurrencePeriod?: {
    start?: string;
    end?: string;
  };
  performer?: Array<{
    function?: {
      coding?: Array<{
        system?: string;
        code?: string;
        display?: string;
      }>;
    };
    actor?: {
      reference?: string;
    };
  }>;
  quantity?: {
    value?: number;
  };
  account?: Array<{
    reference?: string;
  }>;
  extension?: Array<{
    url?: string;
    valueMoney?: {
      value?: number;
      currency?: string;
    };
  }>;

}

export interface PatchChargeItemInput {
  status?: string;
  code?: {
    coding?: Array<{
      system?: string;
      code?: string;
      display?: string;
    }>;
  };
  subject?: {
    reference?: string;
  };
  context?: {
    reference?: string;
  };
  occurrencePeriod?: {
    start?: string;
    end?: string;
  };
  performer?: Array<{
    function?: {
      coding?: Array<{
        system?: string;
        code?: string;
        display?: string;
      }>;
    };
    actor?: {
      reference?: string;
    };
  }>;
  quantity?: {
    value?: number;
  };
  account?: Array<{
    reference?: string;
  }>;
  extension?: Array<{
    url?: string;
    valueMoney?: {
      value?: number;
      currency?: string;
    };
  }>;

}

export interface ExistingChargeItem {
  id?: string;
  status?: string;
  code?: {
    coding?: Array<{
      system?: string;
      code?: string;
      display?: string;
    }>;
  };
  subject?: {
    reference?: string;
  };
  context?: {
    reference?: string;
  };
  occurrencePeriod?: {
    start?: string;
    end?: string;
  };
  performer?: Array<{
    function?: {
      coding?: Array<{
        system?: string;
        code?: string;
        display?: string;
      }>;
    };
    actor?: {
      reference?: string;
    };
  }>;
  quantity?: {
    value?: number;
  };
  account?: Array<{
    reference?: string;
  }>;
  extension?: Array<{
    url?: string;
    valueMoney?: {
      value?: number;
      currency?: string;
    };
  }>;

}

export interface FhirPatchChargeItem {
  op: "replace" | "test";
  path: string;
  value: any;
}

export interface FhirChargeItem extends FhirCore {
  resourceType: "ChargeItem";
  meta?: {
    profile: string[];
  };
  status?: string;
  code?: {
    coding?: Array<{
      system?: string;
      code?: string;
      display?: string;
    }>;
  };
  subject?: {
    reference?: string;
  };
  context?: {
    reference?: string;
  };
  occurrencePeriod?: {
    start?: string;
    end?: string;
  };
  performer?: Array<{
    function?: {
      coding?: Array<{
        system?: string;
        code?: string;
        display?: string;
      }>;
    };
    actor?: {
      reference?: string;
    };
  }>;
  quantity?: {
    value?: number;
  };
  account?: Array<{
    reference?: string;
  }>;
  extension?: Array<{
    url?: string;
    valueMoney?: {
      value?: number;
      currency?: string;
    };
  }>;

}
