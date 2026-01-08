import {
  contactPurpose,
  maritalStatus,
  organizationTypes,
  patientContactRelationship,
} from "../constan";

export {};

declare global {
  // requires

  //patient dto
  type MariedStatusIdentifier = (typeof maritalStatus)[number]["identifier"];
  type MaritalStatusCode = (typeof maritalStatus)[number]["code"];
  type patientContactRelationshipCode =
    (typeof patientContactRelationship)[number]["code"];

  interface CreatePatientInput {
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

    address: {
      line: string;
      city: string;
      postalCode?: string;
      country: string;

      provinceCode: string;
      cityCode: string;
      districtCode: string;
      villageCode: string;
      rt: string;
      rw: string;
    };

    maritalStatus: MariedStatusIdentifier;

    multipleBirthInteger?: number;
  }

  interface PatchPatientInput {
    name?: string;
    gender?: "male" | "female" | "other" | "unknown";
    birthDate?: string;

    nik?: string;
    ihs?: string;

    maritalStatus?: MarriedStatusIdentifier;

    address?: {
      line: string;
      city: string;
      postalCode?: string;
      country: string;

      provinceCode: string;
      cityCode: string;
      districtCode: string;
      villageCode: string;
      rt: string;
      rw: string;
    };
  }

  interface ExistingPatient {
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

  interface FhirPatchPatient {
    op: "replace" | "test";
    path: string;
    value: any;
  }

  interface ContactInterface {
    relationship?: Array<FhirCodeableConcept<patientContactRelationshipCode>>;
    name?: FhirHumanName;
    telecom?: Array<FhirContactPoint>;
    address?: FhirAddress;
    gender?: "male" | "female" | "other" | "unknown";
    organization?: FhirReference;
    period?: FhirPeriod;
  }

  interface CommunicationInterface {
    language?: FhirCodeableConcept<string>;
    preferred: boolean;
  }

  interface FhirPatient {
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

  //organization dto
  type OrganisationTypeCode =
    (typeof organizationTypes)[keyof typeof organizationTypes]["coding_code"];
  type ContactPurposeCode = (typeof contactPurpose)[number]["code"];

  interface OrganizationInput {
    active?: boolean;
    identifier_value: string;
    type_code: OrganisationTypeCode;
    name: string;

    phone?: string;
    email?: string;
    url?: string;

    street?: string;
    city?: string;
    postalCode?: string;

    provincecode?: string;
    citycode?: string;
    districtcode?: string;
    villagecode?: string;

    partOf?: string;
    contact?: Array<{
      purpose_code: ContactPurposeCode; // http://terminology.hl7.org/CodeSystem/contactentity-type
      name: string;
      phone?: string;
      email?: string;
      url?: string;
    }>;
  }

  interface OrganizationUpdateInput extends OrganizationInput {
    id: string;
  }

  // output fhir organization
  interface FhirOrganization {
    resourceType?: "Organization";
    id?: string;
    active?: boolean;

    identifier?: Array<FhirIdentifier>;

    type?: Array<FhirCodeableConcept<OrganisationTypeCode>>;

    name?: string;

    telecom?: Array<FhirContactPoint>;

    address?: Array<FhirAddress>;
    partOf?: FhirReference;
    contact?: Array<{
      purpose?: FhirCodeableConcept<ContactPurposeCode>;
      name?: FhirHumanName;
      telecom?: Array<FhirContactPoint>;
      address?: FhirAddress;
      endpoint?: Array<FhirReference>;
    }>;
  }
}
