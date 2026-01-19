import { daysOfWeek, operationalStatus, physicalType } from "../../../constan";
import {
  AddressInput,
  FhirAddress,
  FhirCodeableConcept,
  FhirCoding,
  FhirContactPoint,
  FhirIdentifier,
  FhirReference,
  TelecomInputArray,
} from "../core";

export type FhirOperationalStatusCode =
  (typeof operationalStatus)[number]["code"];
export type FhirPhysicalTypeCode = (typeof physicalType)[number]["code"];
export type FhirDayOfWeekCode = (typeof daysOfWeek)[number]["code"];

export interface LocationDtoInput {
  organizationIhsNumber: string;
  id?: string;
  locationCode: string;
  status: "active" | "suspended" | "inactive";
  name: string;
  alias?: Array<string>;
  description?: string;
  mode: "instance" | "kind";
  telecom?: Array<TelecomInputArray>;
  address?: AddressInput;
  physicalType: FhirPhysicalTypeCode;
  position?: {
    longitude?: number;
    latitude?: number;
    altitude?: number;
  };
}

export interface FhirLocation {
  resourceType?: "Location";
  id?: string;
  identifier?: Array<FhirIdentifier>;
  status?: "active" | "suspended" | "inactive";
  operationalStatus?: FhirCoding<FhirOperationalStatusCode>;
  name?: string;
  alias?: Array<string>;
  description?: string;
  mode?: "instance" | "kind";
  type?: Array<FhirCodeableConcept<string>>;
  telecom?: Array<FhirContactPoint>;
  address?: FhirAddress;
  physicalType?: {
    coding: FhirCoding<FhirPhysicalTypeCode>[];
  };
  position?: {
    longitude?: number;
    latitude?: number;
    altitude?: number;
  };
  managingOrganization?: FhirReference;
  partOf?: FhirReference;
  hoursOfOperation?: Array<{
    daysOfWeek?: Array<FhirDayOfWeekCode>;
    allDay?: boolean;
    openingTime?: string; // time
    closingTime?: string; // time
  }>;
  availabilityExceptions?: string;
  endpoint?: Array<FhirReference>;
  extension?: {
    serviceClass: FhirCodeableConcept<string>;
  };
}
