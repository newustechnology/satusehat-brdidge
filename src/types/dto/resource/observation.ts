import {
  dataAbsentReason,
  observationCategory,
  observationStatus,
  referenceRangeType,
} from "../../../constan";
import {
  FhirCodeableConcept,
  FhirCore,
  FhirIdentifier,
  FhirPeriod,
  FhirQuantity,
  FhirRange,
  FhirRatio,
  FhirReference,
} from "../core";

export type ObservationCategoryCode =
  (typeof observationCategory)[number]["code"];

export type ObservationDataAbsentReasonCode =
  (typeof dataAbsentReason)[number]["code"];

export type ObservationReferenceRangeTypeCode =
  (typeof referenceRangeType)[number]["code"];

export interface FhirObservation extends FhirCore {
  resourceType: "Observation";
  identifier?: Array<FhirIdentifier>;
  basedOn?: Array<FhirReference>;
  partOf?: Array<FhirReference>;
  status?: (typeof observationStatus)[number]["code"];
  category: Array<FhirCodeableConcept<ObservationCategoryCode>>;
  subject: FhirReference;
  focus?: Array<FhirReference>;
  encounter?: FhirReference;
  effectiveDateTime?: string;
  effectivePeriod?: FhirPeriod;
  effectiveTiming?: any;
  effectiveInstant?: any;
  issued?: string;
  performer?: Array<FhirReference>;
  valueQuantity?: FhirQuantity;
  valueCodeableConcept?: FhirCodeableConcept<string>;
  valueString?: string;
  valueBooelean?: boolean;
  valueInteger?: number;
  valueRange?: FhirRange;
  valueRatio?: FhirRatio;
  valueSampledData?: any;
  valueTime?: string;
  valueDateTime?: string;
  valuePeriod?: FhirPeriod;
  dataAbsentReason?: FhirCodeableConcept<ObservationDataAbsentReasonCode>;
  interpretation?: Array<FhirCodeableConcept<string>>;
  note?: Array<any>;
  bodySite?: FhirCodeableConcept<string>;
  method?: FhirCodeableConcept<string>;
  specimen?: FhirReference;
  device?: FhirReference;
  referenceRange?: Array<{
    low?: any;
    high?: any;
    type?: FhirCodeableConcept<ObservationReferenceRangeTypeCode>;
    appliesTo?: Array<FhirCodeableConcept<string>>;
    age?: FhirRange;
    text?: string;
  }>;
  hasMember?: Array<FhirReference>;
  derivedFrom?: Array<FhirReference>;
  component?: Array<{
    code?: FhirCodeableConcept<string>;
    valueQuantity?: FhirQuantity;
    valueCodeableConcept?: FhirCodeableConcept<string>;
    valueString?: string;
    valueBoolean?: boolean;
    valueInteger?: number;
    valueRange?: FhirRange;
    valueRatio?: FhirRatio;
    valueSampledData?: any;
    valueTime?: string;
    valueDateTime?: string;
    dataAbsentReason?: FhirCodeableConcept<string>;
    interpretation?: Array<FhirCodeableConcept<string>>;
    referenceRange?: Array<{
      low?: any;
      high?: any;
      type?: FhirCodeableConcept<ObservationReferenceRangeTypeCode>;
      appliesTo?: Array<FhirCodeableConcept<string>>;
      age?: FhirRange;
      text?: string;
    }>;
  }>;
}
