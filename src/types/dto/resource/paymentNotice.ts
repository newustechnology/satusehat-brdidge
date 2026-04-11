import { FhirCore } from "../core";

export interface CreatePaymentNoticeInput {
  status?: string;
  request?: {
    reference?: string;
  };
  created?: string;
  paymentDate?: string;
  provider?: {
    reference?: string;
  };
  payee?: {
    reference?: string;
  };
  recipient?: {
    reference?: string;
  };
  amount?: {
    value?: number;
    currency?: string;
  };
  payment?: {
    reference?: string;
  };
  paymentStatus?: {
    coding?: Array<{
      system?: string;
      code?: string;
      display?: string;
    }>;
  };

}

export interface PatchPaymentNoticeInput {
  status?: string;
  request?: {
    reference?: string;
  };
  created?: string;
  paymentDate?: string;
  provider?: {
    reference?: string;
  };
  payee?: {
    reference?: string;
  };
  recipient?: {
    reference?: string;
  };
  amount?: {
    value?: number;
    currency?: string;
  };
  payment?: {
    reference?: string;
  };
  paymentStatus?: {
    coding?: Array<{
      system?: string;
      code?: string;
      display?: string;
    }>;
  };

}

export interface ExistingPaymentNotice {
  id?: string;
  status?: string;
  request?: {
    reference?: string;
  };
  created?: string;
  paymentDate?: string;
  provider?: {
    reference?: string;
  };
  payee?: {
    reference?: string;
  };
  recipient?: {
    reference?: string;
  };
  amount?: {
    value?: number;
    currency?: string;
  };
  payment?: {
    reference?: string;
  };
  paymentStatus?: {
    coding?: Array<{
      system?: string;
      code?: string;
      display?: string;
    }>;
  };

}

export interface FhirPatchPaymentNotice {
  op: "replace" | "test";
  path: string;
  value: any;
}

export interface FhirPaymentNotice extends FhirCore {
  resourceType: "PaymentNotice";
  meta?: {
    profile: string[];
  };
  status?: string;
  request?: {
    reference?: string;
  };
  created?: string;
  paymentDate?: string;
  provider?: {
    reference?: string;
  };
  payee?: {
    reference?: string;
  };
  recipient?: {
    reference?: string;
  };
  amount?: {
    value?: number;
    currency?: string;
  };
  payment?: {
    reference?: string;
  };
  paymentStatus?: {
    coding?: Array<{
      system?: string;
      code?: string;
      display?: string;
    }>;
  };

}
