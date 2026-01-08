export {};

declare global {
  // ---- FHIR Umum (General Data Types) ----
  interface FhirAddress {
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

  interface FhirAddressExtension {
    url: string;
    extension: Array<{
      url: string;
      valueCode: string;
    }>;
  }

  interface FhirAge {
    value?: number;
    comparator?: string;
    unit?: string;
    system?: string;
    code?: string;
  }

  interface FhirAnnotation {
    authorReference?: FhirReference;
    authorString?: string;
    time?: string; // dateTime
    text: string; // markdown
  }

  interface FhirAttachment {
    contentType?: string;
    language?: string;
    data?: string;
    url?: string;
    size?: number;
    hash?: string;
    title?: string;
    creation?: string;
  }

  interface FhirCodeableConcept<D> {
    coding?: FhirCoding<D>[];
    text?: string;
  }

  interface FhirCodeableReference {
    concept?: FhirCodeableConcept;
    reference?: FhirReference;
  }

  interface FhirCoding<D = string> {
    system?: string; // uri
    version?: string;
    code?: D;
    display?: string;
    userSelected?: boolean;
  }

  interface FhirContactPoint {
    system?: "phone" | "fax" | "email" | "pager" | "url" | "sms";
    value?: string;
    use?: "home" | "work" | "temp" | "old" | "mobile";
    rank?: number;
    period?: FhirPeriod;
  }
  interface FhirHumanName {
    use?: string;
    text?: string;
    family?: string;
    given?: string[];
    prefix?: string[];
    suffix?: string[];
    period?: FhirPeriod;
  }

  interface FhirIdentifier {
    use?: "usual" | "official" | "temp" | "secondary" | "old";
    type?: FhirCodeableConcept;
    system?: string;
    value?: string;
    period?: FhirPeriod;
    assigner?: FhirReference;
  }

  interface FhirMoney {
    value?: number;
    currency?: string;
  }

  interface FhirPeriod {
    start?: string; // dateTime
    end?: string; // dateTime
  }

  interface FhirQuantity {
    value?: number;
    comparator?: "<" | "<=" | ">=" | ">" | string;
    unit?: string;
    system?: string;
    code?: string;
  }

  interface FhirRange {
    low?: FhirQuantity;
    high?: FhirQuantity;
  }

  interface FhirRatio {
    numerator?: FhirQuantity;
    denominator?: FhirQuantity;
  }

  interface FhirRatioRange {
    lowNumerator?: FhirQuantity;
    highNumerator?: FhirQuantity;
    denominator?: FhirQuantity;
  }

  interface FhirReference {
    reference?: string;
    type?: string; // uri
    identifier?: FhirIdentifier;
    display?: string;
  }

  interface FhirSampledData {
    origin: FhirQuantity;
    period: number[];
    factor?: number;
    lowerLimit?: number;
    upperLimit?: number;
    dimensions: number[];
    data: string;
  }

  interface FhirSignature {
    type?: string[];
    when?: string; // instant
    who?: FhirReference[];
    onBehalfOf?: FhirReference;
    targetFormat?: string;
    sigFormat?: string;
    data?: string;
  }

  interface FhirTiming {
    event?: string[]; // dateTime
    repeat?: {
      boundsDuration?: FhirDuration;
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
    code?: FhirCodeableConcept;
  }

  // -------------------------------
  // FHIR Metadata Types (TS Interfaces)
  // -------------------------------

  interface FhirContactDetail {
    name?: string;
    telecom?: FhirContactPoint[];
  }

  interface FhirContributor {
    type: string; // code
    name: string;
    contact?: FhirContactDetail[];
  }

  interface FhirDataRequirement<D = string> {
    type: string; // code
    profile?: string[]; // canonical
    subjectCodeableConcept?: FhirCodeableConcept;
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

  interface FhirExpression {
    description?: string;
    name?: string; // id
    language: string; // code
    expression: string;
    reference?: string; // uri
  }

  interface FhirParameterDefinition {
    name?: string; // code
    use: "in" | "out"; // code
    min?: number; // integer
    max?: string;
    documentation?: string;
    type: string; // code
    profile?: string; // canonical
  }

  interface FhirRelatedArtifact {
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

  interface FhirTriggerDefinition {
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

  interface FhirUsageContext<D = string> {
    code: FhirCoding<D>;
    valueCodeableConcept?: FhirCodeableConcept;
    valueQuantity?: FhirQuantity;
    valueRange?: FhirRange;
    valueReference?: FhirReference;
  }

  // -------------------------------
  // FHIR Special Types (TS Interfaces)
  // -------------------------------

  // FHIR Special: CodeableReference
  export interface FhirCodeableReference {
    concept?: FhirCodeableConcept;
    reference?: FhirReference;
  }

  // FHIR Special: Dosage
  export interface FhirDosage {
    sequence?: number;
    text?: string;
    additionalInstruction?: FhirCodeableConcept[];
    patientInstruction?: string;
    timing?: FhirTiming;
    asNeededBoolean?: boolean;
    asNeededCodeableConcept?: FhirCodeableConcept;
    site?: FhirCodeableConcept;
    route?: FhirCodeableConcept;
    method?: FhirCodeableConcept;
    doseAndRate?: {
      type: FhirCodeableConcept;
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
}
