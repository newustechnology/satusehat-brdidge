import { contactPurpose, organizationTypes } from "../../../constan";
import {
  ContactPurposeCode,
  FhirAddress,
  FhirCodeableConcept,
  FhirContactPoint,
  FhirHumanName,
  FhirIdentifier,
  FhirReference,
} from "../core";

//organization dto
export type OrganisationTypeCode =
  (typeof organizationTypes)[keyof typeof organizationTypes]["coding_code"];

export interface OrganizationInput {
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

export interface OrganizationUpdateInput extends OrganizationInput {
  id: string;
}

// output fhir organization
export interface FhirOrganization {
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
