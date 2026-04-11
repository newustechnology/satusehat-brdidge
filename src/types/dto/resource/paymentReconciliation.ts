import { FhirCore } from "../core";

export interface CreatePaymentReconciliationInput {
  status?: string;
  period?: {
    start?: string;
    end?: string;
  };
  created?: string;
  paymentIssuer?: {
    reference?: string;
  };
  outcome?: string;
  disposition?: string;
  paymentDate?: string;
  paymentAmount?: {
    value?: number;
    currency?: string;
  };
  detail?: Array<{
    type?: {
      coding?: Array<{
        system?: string;
        code?: string;
        display?: string;
      }>;
    };
    request?: {
      reference?: string;
    };
  }>;
  processNote?: Array<{
    type?: string;
    text?: string;
  }>;

}

export interface PatchPaymentReconciliationInput {
  status?: string;
  period?: {
    start?: string;
    end?: string;
  };
  created?: string;
  paymentIssuer?: {
    reference?: string;
  };
  outcome?: string;
  disposition?: string;
  paymentDate?: string;
  paymentAmount?: {
    value?: number;
    currency?: string;
  };
  detail?: Array<{
    type?: {
      coding?: Array<{
        system?: string;
        code?: string;
        display?: string;
      }>;
    };
    request?: {
      reference?: string;
    };
  }>;
  processNote?: Array<{
    type?: string;
    text?: string;
  }>;

}

export interface ExistingPaymentReconciliation {
  id?: string;
  status?: string;
  period?: {
    start?: string;
    end?: string;
  };
  created?: string;
  paymentIssuer?: {
    reference?: string;
  };
  outcome?: string;
  disposition?: string;
  paymentDate?: string;
  paymentAmount?: {
    value?: number;
    currency?: string;
  };
  detail?: Array<{
    type?: {
      coding?: Array<{
        system?: string;
        code?: string;
        display?: string;
      }>;
    };
    request?: {
      reference?: string;
    };
  }>;
  processNote?: Array<{
    type?: string;
    text?: string;
  }>;

}

export interface FhirPatchPaymentReconciliation {
  op: "replace" | "test";
  path: string;
  value: any;
}

export interface FhirPaymentReconciliation extends FhirCore {
  resourceType: "PaymentReconciliation";
  meta?: {
    profile: string[];
  };
  status?: string;
  period?: {
    start?: string;
    end?: string;
  };
  created?: string;
  paymentIssuer?: {
    reference?: string;
  };
  outcome?: string;
  disposition?: string;
  paymentDate?: string;
  paymentAmount?: {
    value?: number;
    currency?: string;
  };
  detail?: Array<{
    type?: {
      coding?: Array<{
        system?: string;
        code?: string;
        display?: string;
      }>;
    };
    request?: {
      reference?: string;
    };
  }>;
  processNote?: Array<{
    type?: string;
    text?: string;
  }>;

}
