import {
  courseOfTherapyType,
  intentStatus,
  medicationRequestStatus,
  medicationStatusReason,
} from "../../../constan";
import {
  FhirCodeableConcept,
  FhirCore,
  FhirDosage,
  FhirIdentifier,
  FhirPeriod,
  FhirReference,
  FhirSimpleQuantity,
} from "../core";

export type MedicationRequestStatusCode =
  (typeof medicationRequestStatus)[number]["code"];

export type MedicationRequestStatusReasonCode =
  (typeof medicationStatusReason)[number]["code"];

export type MedicationRequestIntentCode = (typeof intentStatus)[number]["code"];

export type MedicationRequestCourseOfTherapyTypeCode =
  (typeof courseOfTherapyType)[number]["code"];

export interface FhirMedicationRequest extends FhirCore {
  resourceType: "MedicationRequest";
  identifier?: Array<FhirIdentifier>;
  status?: MedicationRequestStatusCode;
  statusReason?: FhirCodeableConcept<MedicationRequestStatusReasonCode>;
  intent?: MedicationRequestIntentCode;
  category?: Array<FhirCodeableConcept<string>>;
  priority?: "routine" | "urgent" | "asap" | "stat";
  reportedBoolean?: boolean;
  medicationReference?: FhirReference;
  subject?: FhirReference;
  encounter?: FhirReference;
  authoredOn?: string;
  requester?: FhirReference;
  performer?: FhirReference;
  performerType?: FhirCodeableConcept<string>;
  recorder?: FhirReference;
  reasonCode?: Array<FhirCodeableConcept<string>>;
  reasonReference?: Array<FhirReference>;
  basedOn?: Array<FhirReference>;
  courseOfTherapyType?: FhirCodeableConcept<MedicationRequestCourseOfTherapyTypeCode>;
  insurance?: Array<FhirReference>;
  note?: Array<any>;
  dosageInstruction?: Array<FhirDosage>;
  dispenseRequest?: {
    dispenseInterval?: FhirSimpleQuantity;
    validityPeriod?: FhirPeriod;
    numberOfRepeatsAllowed?: number;
    quantity?: FhirSimpleQuantity;
    expectedSupplyDuration?: FhirSimpleQuantity;
    performer?: FhirReference;
  };
  substitution?: {
    allowedBoolean: boolean;
    allowedCodeableConcept?: FhirCodeableConcept<string>;
    reason?: FhirCodeableConcept<string>;
  };
}
