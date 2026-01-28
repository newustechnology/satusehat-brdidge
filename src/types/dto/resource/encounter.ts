import {
  admitSource,
  dietPreference,
  dischargeDisposition,
  encounterServiceType,
  encounterType,
  reAdmission,
  specialArrangement,
} from "../../../constan";
import {
  FhirCodeableConcept,
  FhirCoding,
  FhirCore,
  FhirIdentifier,
  FhirPeriod,
  FhirReference,
} from "../core";

export type EncounterTypeCode = (typeof encounterType)[number]["code"];
export type EncounterServiceTypeCode =
  (typeof encounterServiceType)[number]["code"];

export type EncounterAdmitSourceCode = (typeof admitSource)[number]["code"];
export type EncounterReAdmissionCode = (typeof reAdmission)[number]["code"];
export type EncounterDietPreferenceCode =
  (typeof dietPreference)[number]["code"];
export type EncounterSpecialArrangementCode =
  (typeof specialArrangement)[number]["code"];
export type EncounterDischargeDispositionCode =
  (typeof dischargeDisposition)[number]["code"];

export interface FhirEncounter extends FhirCore {
  resourceType: "Encounter";
  identifier?: Array<FhirIdentifier>;
  status?: string;
  statusHistory?: Array<{
    status?: string;
    period?: FhirPeriod;
  }>;
  class?: FhirCoding<string>;
  classHistory?: Array<{
    class?: FhirCoding<string>;
    period?: FhirPeriod;
  }>;
  type?: Array<FhirCodeableConcept<EncounterTypeCode>>;
  serviceType?: FhirCodeableConcept<EncounterServiceTypeCode>;
  subject?: FhirReference;
  episodeOfCare?: Array<FhirReference>;
  basedOn?: Array<FhirReference>;
  participant?: {
    type?: Array<FhirCodeableConcept<string>>;
    individual?: FhirReference;
  };
  period?: FhirPeriod;
  length?: number;
  reasonCode?: Array<FhirCodeableConcept<string>>;
  reasonReference?: Array<FhirReference>;
  diagnosis?: Array<{
    condition?: FhirReference;
    use?: FhirCodeableConcept<string>;
    rank?: number;
  }>;
  account?: Array<FhirReference>;
  hospitalization?: {
    preAdmissionIdentifier?: FhirIdentifier;
    origin?: FhirReference;
    admitSource?: FhirCodeableConcept<EncounterAdmitSourceCode>;
    reAdmission?: FhirCodeableConcept<EncounterReAdmissionCode>;
    dietPreference?: Array<FhirCodeableConcept<EncounterDietPreferenceCode>>;
    specialArrangement?: Array<
      FhirCodeableConcept<EncounterSpecialArrangementCode>
    >;
    destination?: FhirReference;
    dischargeDisposition?: FhirCodeableConcept<EncounterDischargeDispositionCode>;
  };
  location?: Array<{
    location?: FhirReference;
    extensions?: any;
  }>;
  serviceProvider?: FhirReference;
  partOf?: FhirReference;
}
