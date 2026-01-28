import {
  attesterMode,
  compositionStatus,
  relatesToCodes,
  sectionTextCode,
} from "../../../constan";
import {
  FhirCodeableConcept,
  FhirCore,
  FhirIdentifier,
  FhirNarrative,
  FhirPeriod,
  FhirReference,
} from "../core";

export type CompositionStatusCode = (typeof compositionStatus)[number]["code"];
export type CompositionAttesterModeCode = (typeof attesterMode)[number]["code"];
export type CompositionRelatesToCode = (typeof relatesToCodes)[number]["code"];
export type CompositionSectionTextCode =
  (typeof sectionTextCode)[number]["code"];

export interface FhirComposition extends FhirCore {
  resourceType: "Composition";
  identifier?: Array<FhirIdentifier>;
  status?: CompositionStatusCode;
  type?: FhirCodeableConcept<string>;
  category?: Array<FhirCodeableConcept<string>>;
  subject?: FhirReference;
  encounter?: FhirReference;
  date?: string;
  author?: Array<FhirReference>;
  title?: string;
  confidentiality?: string;
  attester?: Array<{
    mode?: CompositionAttesterModeCode;
    time?: string;
    party?: FhirReference;
  }>;
  custodian?: FhirReference;
  relatesTo?: Array<{
    code?: CompositionRelatesToCode;
    target?: {
      targetIdentifier?: FhirIdentifier;
      targetReference?: FhirReference;
    };
  }>;
  event?: Array<{
    code?: Array<FhirCodeableConcept<string>>;
    period?: FhirPeriod;
    detail?: Array<FhirReference>;
  }>;
  section?: Array<{
    title?: string;
    code?: FhirCodeableConcept<string>;
    author?: Array<FhirReference>;
    focus?: any;
    text?: FhirNarrative<CompositionSectionTextCode>;
    mode?: "working" | "snapshot" | "changes";
    orderedBy?: FhirCodeableConcept<string>;
    entry?: Array<FhirReference>;
    emptyReason?: FhirCodeableConcept<string>;
    section?: Array<any>;
  }>;
}
