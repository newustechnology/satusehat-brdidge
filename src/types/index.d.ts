export {};

declare global {
  interface BundleRM1Input {
    patientId: string;
    patientName: string;
    practitionerId: string;
    organizationId: string;
    organizationName: string;
    encounterStart: string; // ISO date
    encounterEnd: string; // ISO date
    height?: number;
    weight?: number;
    conditionCode: string;
    conditionDisplay: string;
    procedureCode: string;
    procedureDisplay: string;
    compositionTitle: string;
  }

  interface BundleRM2Input {
    patientId: string;
    patientName: string;
    practitionerId: string;
    organizationId: string;
    organizationName: string;
    encounterStart: string; // ISO date
    encounterEnd: string; // ISO date
    height?: number;
    weight?: number;
    conditionCode: string;
    conditionDisplay: string;
    procedureCode: string;
    procedureDisplay: string;
    compositionTitle: string;
    medicationCode: string;
    medicationDisplay: string;
    medicationFormCode: string;
    medicationFormDisplay: string;
    ingredientList: Array<{ code: string; display: string; value: number }>;
    prescriptionCode: string;
    prescriptionDisplay: string;
    dosageText: string;
    dispenseQuantity: number;
    dispenseDuration: number;
  }

  interface BundleRMDTOData {
    patientId: string;
    patientName: string;
    practitionerId: string;
    practitionerName: string;
    organizationId: string;
    encounterStart: string;
    encounterEnd: string;
    locationId: string;
    locationName: string;
    systolic?: number;
    diastolic?: number;
    temperature?: number;
    heartrate?: number;
    respiratoryrate?: number;
    height?: number;
    weight?: number;
    diagnosis?: Condition[];
    procedures?: Procedure[];
    compositionTitle: string;
    medications?: Medication[];
  }

  interface BundleRMDTOOptions {
    skipResources?: string[];
    overrideEncounterIdentifier?: string;
    overrideCompositionIdentifier?: string;
    overrideMedicationIdentifiers?: Array<{
      medCode: string;
      index: number;
      request?: string;
      dispense?: string;
    }>;
    autoGenerateAllIdentifiers?: boolean;
    allowDuplicateSkip?: boolean;
  }

  interface Medication {
    code: string;
    display: string;
    formCode: string;
    formDisplay: string;
    dosageText: string;
    unitCode?: string;
    ingredientList: Array<{
      code: string;
      display: string;
      value: number;
      uom_name: string;
      per: number;
    }>;
    dispenseDuration: number;
    dispenseQuantity: number;
  }

  interface CompositionData {
    resourceType?: string;
    identifier: string;
    status: string;
    type: string;
    category?: string[];
    subject: string;
    encounter: string;
    date: string;
    author?: string[];
    title: string;
    custodian: string;
    section?: Section[];
  }

  interface Section {
    title: string;
    content: string;
  }
}

interface Procedure {
  code: string;
  display: string;
}

interface Condition {
  code: string;
  display: string;
}
