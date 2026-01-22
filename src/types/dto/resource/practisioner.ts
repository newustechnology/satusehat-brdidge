import {
  FhirAddress,
  FhirAttachment,
  FhirCodeableConcept,
  FhirContactPoint,
  FhirHumanName,
  FhirIdentifier,
  FhirPeriod,
  FhirReference,
} from "../core";

export interface FhirPractisioner {
  resourceType?: "Practitioner";
  id?: string;
  identifier?: Array<FhirIdentifier>;
  active?: boolean;
  name?: Array<FhirHumanName>;
  telecom?: Array<FhirContactPoint>;
  address?: Array<FhirAddress>;
  gender?: string;
  birthDate?: string; // date
  photo?: Array<FhirAttachment>;
  qualification?: Array<{
    identifier?: Array<FhirIdentifier>;
    code?: FhirCodeableConcept<string>;
    period?: FhirPeriod;
    issuer?: FhirReference;
  }>;
  communication?: Array<FhirCodeableConcept<string>>;
}
