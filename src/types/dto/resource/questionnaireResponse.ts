import { FhirCore } from "../core";

export interface CreateQuestionnaireResponseInput {
  questionnaire?: string;
  status?: string;
  subject?: {
    reference?: string;
    display?: string;
  };
  encounter?: {
    reference?: string;
  };
  authored?: string;
  author?: {
    reference?: string;
  };
  source?: {
    reference?: string;
  };
  item?: Array<{
    linkId?: string;
    text?: string;
    answer?: Array<{
      valueCoding?: {
        system?: string;
        code?: string;
        display?: string;
      };
    }>;
  }>;

}

export interface PatchQuestionnaireResponseInput {
  questionnaire?: string;
  status?: string;
  subject?: {
    reference?: string;
    display?: string;
  };
  encounter?: {
    reference?: string;
  };
  authored?: string;
  author?: {
    reference?: string;
  };
  source?: {
    reference?: string;
  };
  item?: Array<{
    linkId?: string;
    text?: string;
    answer?: Array<{
      valueCoding?: {
        system?: string;
        code?: string;
        display?: string;
      };
    }>;
  }>;

}

export interface ExistingQuestionnaireResponse {
  id?: string;
  questionnaire?: string;
  status?: string;
  subject?: {
    reference?: string;
    display?: string;
  };
  encounter?: {
    reference?: string;
  };
  authored?: string;
  author?: {
    reference?: string;
  };
  source?: {
    reference?: string;
  };
  item?: Array<{
    linkId?: string;
    text?: string;
    answer?: Array<{
      valueCoding?: {
        system?: string;
        code?: string;
        display?: string;
      };
    }>;
  }>;

}

export interface FhirPatchQuestionnaireResponse {
  op: "replace" | "test";
  path: string;
  value: any;
}

export interface FhirQuestionnaireResponse extends FhirCore {
  resourceType: "QuestionnaireResponse";
  meta?: {
    profile: string[];
  };
  questionnaire?: string;
  status?: string;
  subject?: {
    reference?: string;
    display?: string;
  };
  encounter?: {
    reference?: string;
  };
  authored?: string;
  author?: {
    reference?: string;
  };
  source?: {
    reference?: string;
  };
  item?: Array<{
    linkId?: string;
    text?: string;
    answer?: Array<{
      valueCoding?: {
        system?: string;
        code?: string;
        display?: string;
      };
    }>;
  }>;

}
