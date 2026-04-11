import { FhirCore } from "../core";

export interface CreateInvoiceInput {
  status?: string;
  subject?: {
    reference?: string;
  };
  date?: string;
  issuer?: {
    reference?: string;
  };
  account?: {
    reference?: string;
  };
  lineItem?: Array<{
    sequence?: number;
    chargeItemReference?: {
      reference?: string;
    };
    priceComponent?: Array<{
      type?: string;
      code?: {
        coding?: Array<{
          system?: string;
          code?: string;
          display?: string;
        }>;
      };
      amount?: {
        value?: number;
        currency?: string;
      };
    }>;
  }>;
  totalNet?: {
    value?: number;
    currency?: string;
  };

}

export interface PatchInvoiceInput {
  status?: string;
  subject?: {
    reference?: string;
  };
  date?: string;
  issuer?: {
    reference?: string;
  };
  account?: {
    reference?: string;
  };
  lineItem?: Array<{
    sequence?: number;
    chargeItemReference?: {
      reference?: string;
    };
    priceComponent?: Array<{
      type?: string;
      code?: {
        coding?: Array<{
          system?: string;
          code?: string;
          display?: string;
        }>;
      };
      amount?: {
        value?: number;
        currency?: string;
      };
    }>;
  }>;
  totalNet?: {
    value?: number;
    currency?: string;
  };

}

export interface ExistingInvoice {
  id?: string;
  status?: string;
  subject?: {
    reference?: string;
  };
  date?: string;
  issuer?: {
    reference?: string;
  };
  account?: {
    reference?: string;
  };
  lineItem?: Array<{
    sequence?: number;
    chargeItemReference?: {
      reference?: string;
    };
    priceComponent?: Array<{
      type?: string;
      code?: {
        coding?: Array<{
          system?: string;
          code?: string;
          display?: string;
        }>;
      };
      amount?: {
        value?: number;
        currency?: string;
      };
    }>;
  }>;
  totalNet?: {
    value?: number;
    currency?: string;
  };

}

export interface FhirPatchInvoice {
  op: "replace" | "test";
  path: string;
  value: any;
}

export interface FhirInvoice extends FhirCore {
  resourceType: "Invoice";
  meta?: {
    profile: string[];
  };
  status?: string;
  subject?: {
    reference?: string;
  };
  date?: string;
  issuer?: {
    reference?: string;
  };
  account?: {
    reference?: string;
  };
  lineItem?: Array<{
    sequence?: number;
    chargeItemReference?: {
      reference?: string;
    };
    priceComponent?: Array<{
      type?: string;
      code?: {
        coding?: Array<{
          system?: string;
          code?: string;
          display?: string;
        }>;
      };
      amount?: {
        value?: number;
        currency?: string;
      };
    }>;
  }>;
  totalNet?: {
    value?: number;
    currency?: string;
  };

}
