import { contactPurpose } from "../../constan";

// global //
export type TelecomUse = "work" | "home" | "temp" | "old" | "mobile";

export type ContactPurposeCode = (typeof contactPurpose)[number]["code"];

export interface TelecomItem {
  value: string;
  use: TelecomUse;
}

export interface TelecomInputArray {
  phone?: TelecomItem[];
  email?: TelecomItem[];
  url?: TelecomItem[];
}

export interface TelecomInputSimple {
  phone?: string[];
  email?: string[];
  url?: string[];
}

export interface AddressInput {
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
}

// ---- FHIR Umum (General Data Types) ----
export interface FhirAddress {
  use: "home" | "work" | "temp" | "old" | "billing";
  type: "postal" | "physical" | "both";
  text?: string;
  line?: string[];
  city?: string;
  district?: string;
  state?: string;
  postalCode?: string;
  country?: string;
  period?: FhirPeriod;
  extension?: Array<FhirAddressExtension>;
}

export interface FhirAddressExtension {
  url: string;
  extension: Array<{
    url: string;
    valueCode: string;
  }>;
}

export interface FhirAge {
  value?: number;
  comparator?: string;
  unit?: string;
  system?: string;
  code?: string;
}

export interface FhirAnnotation {
  authorReference?: FhirReference;
  authorString?: string;
  time?: string; // dateTime
  text: string; // markdown
}

export interface FhirAttachment {
  contentType?: string;
  language?: string;
  data?: string;
  url?: string;
  size?: number;
  hash?: string;
  title?: string;
  creation?: string;
}

export interface FhirCodeableConcept<D> {
  coding?: FhirCoding<D>[];
  text?: string;
}

export interface FhirCodeableReference<D = string> {
  concept?: FhirCodeableConcept<D>;
  reference?: FhirReference;
}

export interface FhirCoding<D = string> {
  system?: string; // uri
  version?: string;
  code?: D;
  display?: string;
  userSelected?: boolean;
}

export interface FhirContactPoint {
  system?: "phone" | "fax" | "email" | "pager" | "url" | "sms";
  value?: string;
  use?: "home" | "work" | "temp" | "old" | "mobile";
  rank?: number;
  period?: FhirPeriod;
}
export interface FhirHumanName {
  use?: string;
  text?: string;
  family?: string;
  given?: string[];
  prefix?: string[];
  suffix?: string[];
  period?: FhirPeriod;
}

export interface FhirIdentifier<D = string> {
  use?: "usual" | "official" | "temp" | "secondary" | "old";
  type?: FhirCodeableConcept<D>;
  system?: string;
  value?: string;
  period?: FhirPeriod;
  assigner?: FhirReference;
}

export interface FhirMoney {
  value?: number;
  currency?: string;
}

export interface FhirPeriod {
  start?: string; // dateTime
  end?: string; // dateTime
}

export interface FhirQuantity {
  value?: number;
  comparator?: "<" | "<=" | ">=" | ">" | string;
  unit?: string;
  system?: string;
  code?: string;
}

export interface FhirRange {
  low?: FhirQuantity;
  high?: FhirQuantity;
}

export interface FhirRatio {
  numerator?: FhirQuantity;
  denominator?: FhirQuantity;
}

export interface FhirRatioRange {
  lowNumerator?: FhirQuantity;
  highNumerator?: FhirQuantity;
  denominator?: FhirQuantity;
}

export interface FhirReference {
  reference?: string;
  type?: string; // uri
  identifier?: FhirIdentifier;
  display?: string;
}

export interface FhirSampledData {
  origin: FhirQuantity;
  period: number[];
  factor?: number;
  lowerLimit?: number;
  upperLimit?: number;
  dimensions: number[];
  data: string;
}

export interface FhirSignature {
  type?: string[];
  when?: string; // instant
  who?: FhirReference[];
  onBehalfOf?: FhirReference;
  targetFormat?: string;
  sigFormat?: string;
  data?: string;
}

export interface FhirTiming<D = string> {
  event?: string[]; // dateTime
  repeat?: {
    boundsDuration?: any;
    boundsRange?: FhirRange;
    boundsPeriod?: FhirPeriod;
    count?: number;
    countMax?: number;
    duration?: number;
    durationMax?: number;
    durationUnit?: string;
    frequency?: number;
    frequencyMax?: number;
    period?: number;
    periodMax?: number;
    periodUnit?: string;
    dayOfWeek?: string[];
    timeOfDay?: string[];
    when?: string[];
    offset?: number;
  };
  code?: FhirCodeableConcept<D>;
}

// -------------------------------
// FHIR Metadata Types (TS Interfaces)
// -------------------------------

export interface FhirContactDetail {
  name?: string;
  telecom?: FhirContactPoint[];
}

export interface FhirContributor {
  type: string; // code
  name: string;
  contact?: FhirContactDetail[];
}

export interface FhirDataRequirement<D = string> {
  type: string; // code
  profile?: string[]; // canonical
  subjectCodeableConcept?: FhirCodeableConcept<D>;
  subjectReference?: FhirReference;
  mustSupport?: string[];
  codeFilter?: string[];
  path?: string;
  searchParam?: string;
  valueSet?: string; // canonical
  code?: FhirCoding<D>[];
  dateFilter?: string[];
  valueDateTime?: string; // dateTime
  valuePeriod?: FhirPeriod;
  valueDuration?: number;
  limit?: number; // positiveInt
  sort?: string[];
}

export interface FhirExpression {
  description?: string;
  name?: string; // id
  language: string; // code
  expression: string;
  reference?: string; // uri
}

export interface FhirParameterDefinition {
  name?: string; // code
  use: "in" | "out"; // code
  min?: number; // integer
  max?: string;
  documentation?: string;
  type: string; // code
  profile?: string; // canonical
}

export interface FhirRelatedArtifact {
  type:
    | "documentation"
    | "justification"
    | "citation"
    | "predecessor"
    | "successor"
    | "derived-from"
    | "depends-on"
    | "composed-of"; // code
  label?: string;
  display?: string;
  citation?: string; // markdown
  url?: string; // url
  document?: FhirAttachment;
  resource?: string; // canonical
}

export interface FhirTriggerDefinition {
  type:
    | "named-event"
    | "periodic"
    | "data-changed"
    | "data-added"
    | "data-modified"
    | "data-removed"
    | "data-accessed"
    | "data-access-ended"; // code
  name?: string;
  timingTiming?: FhirTiming;
  timingReference?: FhirReference;
  timingDate?: string; // date
  timingDateTime?: string; // dateTime
  data?: FhirDataRequirement[];
  condition?: FhirExpression;
}

export interface FhirUsageContext<D = string> {
  code: FhirCoding<D>;
  valueCodeableConcept?: FhirCodeableConcept<D>;
  valueQuantity?: FhirQuantity;
  valueRange?: FhirRange;
  valueReference?: FhirReference;
}

// -------------------------------
// FHIR Special Types (TS Interfaces)
// -------------------------------

// FHIR Special: CodeableReference
export interface FhirCodeableReference<D = string> {
  concept?: FhirCodeableConcept<D>;
  reference?: FhirReference;
}

// FHIR Special: Dosage
export interface FhirDosage<
  D = string,
  T = string,
  C = string,
  R = string,
  U = string,
  M = string,
  A = string,
> {
  sequence?: number;
  text?: string;
  additionalInstruction?: FhirCodeableConcept<D>[];
  patientInstruction?: string;
  timing?: FhirTiming<T>;
  asNeededBoolean?: boolean;
  asNeededCodeableConcept?: FhirCodeableConcept<C>;
  site?: FhirCodeableConcept<U>;
  route?: FhirCodeableConcept<R>;
  method?: FhirCodeableConcept<M>;
  doseAndRate?: {
    type: FhirCodeableConcept<A>;
    doseRange?: FhirRange;
    doseQuantity?: any;
    rateRatio?: FhirRatio;
    rateRange?: FhirRange;
    rateQuantity?: any;
  }[];
  maxDosePerPeriod?: FhirRatio;
  maxDosePerAdministration?: any;
  maxDosePerLifetime?: any;
}

// FHIR Special: Extension (generic FHIR extension)
export interface FhirExtension {
  url: string;
  value?: any;
}

// FHIR Special: Meta
export interface FhirMeta<D = string, C = string> {
  versionId?: string;
  lastUpdated?: string;
  source?: string;
  profile?: string[];
  security?: FhirCoding<D>[];
  tag?: FhirCoding<C>[];
}

// FHIR Special: Narrative
export interface FhirNarrative {
  status: string;
  div: string; // XHTML string
}

// FHIR Special: Reference
export interface FhirReference {
  reference?: string;
  type?: string;
  identifier?: FhirIdentifier;
  display?: string;
}

// FHIR Special: XHTML (as a string alias)
export type FhirXhtml = string;

// patch output
export interface FhirPatchOutput {
  op: "replace" | "test";
  path: string;
  value: any;
}

// output endpoints
export interface DataArray<T> {
  entry: Entry<T>[];
  link: {
    relation: string;
    url: string;
  }[];
  resourceType: string;
  total: number;
  type: string;
}

interface Entry<T> {
  fullUrl: string;
  resource: T;
}

// error output
export type FhirError = {
  resourceType: string;
  issue: Issue[];
};

export type Issue = {
  severity?: string;
  code?: string;
  diagnostics?: string;
  details?: {
    text?: string;
  };
  expression?: string[];
};

export interface FhirFaultError {
  fault?: {
    faultstring: string;
    detail: {
      errorcode: string;
    };
  };
  ErrorCode?: string;
  Error?: string;
}

export interface FhirCore {
  id?: string;
}
