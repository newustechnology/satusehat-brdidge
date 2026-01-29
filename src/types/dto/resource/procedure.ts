import { procedureEventStatus } from "../../../constan";
import {
  FhirCodeableConcept,
  FhirCore,
  FhirIdentifier,
  FhirPeriod,
  FhirRange,
  FhirReference,
} from "../core";

export type ProcedureStatusCode = (typeof procedureEventStatus)[number]["code"];

export interface FhirProcedure extends FhirCore {
  resourceType: "Procedure";
  identifier?: Array<FhirIdentifier>;
  partOf?: Array<FhirIdentifier>;
  status?: ProcedureStatusCode;
  statusReason?: FhirCodeableConcept<string>;
  category?: FhirCodeableConcept<string>;
  code?: FhirCodeableConcept<string>;
  subject?: FhirReference;
  encounter?: FhirReference;
  performedDateTime?: string;
  performedPeriod?: FhirPeriod;
  performedString?: string;
  performedAge?: number;
  performedRange?: FhirRange;
  recorder?: FhirReference;
  asserter?: FhirReference;
  performer?: Array<{
    function?: FhirCodeableConcept<string>;
    actor?: FhirReference;
    onBehalfOf?: FhirReference;
  }>;
  location?: FhirReference;
  reasonCode?: Array<FhirCodeableConcept<string>>;
  reasonReference?: Array<FhirReference>;
  bodySite?: Array<FhirCodeableConcept<string>>;
  outcome?: FhirCodeableConcept<string>;
  report?: Array<FhirReference>;
  complication?: Array<FhirCodeableConcept<string>>;
  complicationDetail?: Array<FhirReference>;
  followUp?: Array<FhirCodeableConcept<string>>;
  note?: Array<{
    authorReference?: FhirReference;
    note?: {
      time?: string;
      text?: any;
    };
  }>;
  focalDevice?: {
    action?: FhirCodeableConcept<string>;
    manipulated?: FhirReference;
    usedReference?: Array<FhirReference>;
    usedCode?: Array<FhirCodeableConcept<string>>;
  };
}
