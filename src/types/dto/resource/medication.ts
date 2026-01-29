import {
  FhirCodeableConcept,
  FhirCore,
  FhirIdentifier,
  FhirRatio,
  FhirReference,
} from "../core";

export interface FhirMedication extends FhirCore {
  resourceType: "Medication";
  identifier?: Array<FhirIdentifier>;
  code?: FhirCodeableConcept<string>;
  status?: "active" | "inactive" | "entered-in-error";
  manufacturer?: FhirReference;
  form?: FhirCodeableConcept<string>;
  amount?: FhirRatio;
  ingredient?: Array<{
    itemCodeableConcept?: FhirCodeableConcept<string>;
    isActive?: boolean;
    strength?: FhirRatio;
  }>;
  batch?: {
    lotNumber?: string;
    expirationDate?: string;
  };
  extension?: Array<{
    url?: string;
    valueCodeableConcept?: FhirCodeableConcept<string>;
  }>;
}
