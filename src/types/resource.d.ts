import { contactPurpose, maritalStatus, organizationTypes } from "../constan";

export {};

declare global {
  // requires

  //patient dto
  type MariedStatusIdentifier = (typeof maritalStatus)[number]["identifier"];
  type MaritalStatusCode = (typeof maritalStatus)[number]["code"];

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

    telecom?: Array<{
      type: "phone" | "email";
      value: string;
    }>;

    contact?: Array<{
      name: string;
      type: "phone" | "email";
      value: string;
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

    maritalStatus: MarriedStatusIdentifier;

    multipleBirthInteger?: number;
  }

  interface ContactInterface {
    relationship: Array<{
      coding: Array<{
        system: string;
        code: string;
      }>;
    }>;
    name: {
      use: "official";
      text: string;
    };
    telecom: Array<{
      system: "phone" | "email" | "fax" | "pager";
      value: string;
      use: "mobile" | "home" | "work" | "temp" | "old";
    }>;
  }

  interface FhirPatchPatient {
    op: "replace" | "test";
    path: string;
    value: any;
  }

  interface PatchPatientInput {
    name?: string;
    gender?: "male" | "female" | "other" | "unknown";
    birthDate?: string;

    nik?: string;
    ihs?: string;

    maritalStatus?: MarriedStatusIdentifier;

    address?: AddressInterface;
  }

  interface ExistingPatient {
    name?: Array<{ use?: string; text?: string }>;
    gender?: string;
    birthDate?: string;
    identifier?: Array<{
      system: string;
      use?: string;
      value: string;
    }>;
    address?: unknown[];
  }

  interface FhirCreatePatient {
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
    multipleBirthInteger?: number;
    contact?: ContactInterface[];
    communication: Array<{
      language: {
        coding: Array<{
          system: string;
          code: string;
          display: string;
        }>;
        text: string;
      };
      preferred: boolean;
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
    partOf?: string;

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
  }

  interface OrganizationUpdateInput {
    id: string;

    active?: boolean;

    identifier_value: string;
    partOf?: string;

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
