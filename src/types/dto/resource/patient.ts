import { maritalStatus, patientContactRelationship } from "../../../constan";
import {
  AddressInput,
  ContactPurposeCode,
  FhirAddress,
  FhirAttachment,
  FhirCodeableConcept,
  FhirContactPoint,
  FhirCore,
  FhirHumanName,
  FhirIdentifier,
  FhirPeriod,
  FhirReference,
} from "../core";

//patient dto
export type MariedStatusIdentifier =
  (typeof maritalStatus)[number]["identifier"];
export type MaritalStatusCode = (typeof maritalStatus)[number]["code"];
export type patientContactRelationshipCode =
  (typeof patientContactRelationship)[number]["code"];

// input create patient
export interface CreatePatientInput {
  nik: string;
  kk?: string;

  name: string;
  gender: "male" | "female" | "other" | "unknown";
  birthDate: string; // YYYY-MM-DD
  birthPlace?: {
    city: string;
    province: string;
  };

  deceased?: boolean;
  deceasedDateTime?: string; // dateTime

  phone?: string[];
  email?: string[];
  url?: string[];

  contact?: Array<{
    purpose_code: ContactPurposeCode; // http://terminology.hl7.org/CodeSystem/contactentity-type
    name: string;
    phone?: string;
    email?: string;
    url?: string;
  }>;

  address: AddressInput;

  maritalStatus: MariedStatusIdentifier;

  multipleBirthInteger?: number;
}

// input patch patient
export interface PatchPatientInput {
  name?: string;
  gender?: "male" | "female" | "other" | "unknown";
  birthDate?: string;

  nik?: string;
  ihs?: string;

  maritalStatus?: MariedStatusIdentifier;

  address?: AddressInput;
}

// existing patient for update purpose
export interface ExistingPatient {
  name?: Array<FhirHumanName>;
  id?: string;
  gender?: string;
  birthDate?: string;
  identifier?: Array<FhirIdentifier>;
  maritalStatus?: FhirCodeableConcept<MaritalStatusCode>;
  multipleBirthBoolean?: boolean;
  multipleBirthInteger?: number;
  telecom?: Array<FhirContactPoint>;
  address?: Array<FhirAddress>;
}

export interface ContactInterface {
  relationship?: Array<FhirCodeableConcept<patientContactRelationshipCode>>;
  name?: FhirHumanName;
  telecom?: Array<FhirContactPoint>;
  address?: FhirAddress;
  gender?: "male" | "female" | "other" | "unknown";
  organization?: FhirReference;
  period?: FhirPeriod;
}

export interface CommunicationInterface {
  language?: FhirCodeableConcept<string>;
  preferred: boolean;
}

// patch output
export interface FhirPatchPatient {
  op: "replace" | "test";
  path: string;
  value: any;
}

// output fhir patient
export interface FhirPatient extends FhirCore {
  resourceType: "Patient";
  meta: {
    profile: string[];
  };
  identifier?: Array<FhirIdentifier>;
  active?: boolean;
  name?: Array<FhirHumanName>;
  telecom?: Array<FhirContactPoint>;
  gender?: "male" | "female" | "other" | "unknown";
  birthDate?: string; // YYYY-MM-DD
  deceasedBoolean?: boolean;
  deceasedDateTime?: string; // dateTime
  address?: Array<FhirAddress>;
  maritalStatus?: FhirCodeableConcept<MaritalStatusCode>;
  multipleBirthBoolean?: boolean;
  multipleBirthInteger?: number;
  photo?: Array<FhirAttachment>;
  contact?: ContactInterface[];
  communication?: Array<CommunicationInterface>;
  generalPractitioner?: Array<FhirReference>;
  managingOrganization?: FhirReference;
  link?: Array<{
    other?: FhirReference;
    type: string;
  }>;
  extension?: Array<{
    url: string;
    valueString?: string;
    valueAddress?: { city: string; country: string };
    valueCode?: string;
  }>;
}
