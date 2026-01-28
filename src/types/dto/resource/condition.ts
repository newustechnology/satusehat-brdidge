import {
  clinicalStatus,
  conditionCategory,
  verificationStatus,
} from "../../../constan";
import {
  FhirCodeableConcept,
  FhirCore,
  FhirIdentifier,
  FhirPeriod,
  FhirRange,
  FhirReference,
} from "../core";

export type ConditionClinicalStatusCode =
  (typeof clinicalStatus)[number]["code"];

export type ConditionVerificationStatusCode =
  (typeof verificationStatus)[number]["code"];

export type ConditionCategoryCode = (typeof conditionCategory)[number]["code"];

export interface FhirCondition extends FhirCore {
  resourceType: "Condition";
  identifier?: Array<FhirIdentifier>;
  clinicalStatus?: FhirCodeableConcept<ConditionClinicalStatusCode>;
  verificationStatus?: FhirCodeableConcept<ConditionVerificationStatusCode>;
  category?: Array<FhirCodeableConcept<ConditionCategoryCode>>;
  severity?: FhirCodeableConcept<string>;
  code?: Array<FhirCodeableConcept<string>>;
  bodySite?: Array<FhirCodeableConcept<string>>;
  subject?: FhirReference;
  encounter?: FhirReference;
  onsetDateTime?: Date;
  onsetAge?: number;
  onsetPeriod?: FhirPeriod;
  onsetRange?: FhirRange;
  onsetString?: string;
  abatementDateTime?: Date;
  abatementAge?: number;
  abatementPeriod?: FhirPeriod;
  abatementRange?: FhirRange;
  abatementString?: string;
  recordedDate?: Date;
  recorder?: FhirReference;
  asserter?: FhirReference;
  stage?: Array<{
    summary?: FhirCodeableConcept<string>;
    assessment?: Array<FhirReference>;
    type?: FhirCodeableConcept<string>;
    evidence?: {
      code?: Array<FhirCodeableConcept<string>>;
      detail?: Array<FhirReference>;
    };
  }>;
  note?: Array<any>;
}
