import { v4 as uuidv4 } from "uuid";

/**
 * 🔹 Bundle untuk (Encounter, Condition, Observation, Procedure, Composition, Medication, MedicationRequest, MedicationDispense)
 * 🔹 Dikirim dalam satu transaksi FHIR Bundle (transaction)
 */
class BundleRM2DTO {
  static formatBundle(data: BundleRM2Input) {
    const {
      patientId,
      patientName,
      practitionerId,
      organizationId,
      organizationName,
      encounterStart,
      encounterEnd,
      height,
      weight,
      conditionCode,
      conditionDisplay,
      procedureCode,
      procedureDisplay,
      compositionTitle,
      medicationCode,
      medicationDisplay,
      medicationFormCode,
      medicationFormDisplay,
      ingredientList,
      prescriptionCode,
      prescriptionDisplay,
      dosageText,
      dispenseQuantity,
      dispenseDuration,
    } = data;

    const encounterUUID = `urn:uuid:${uuidv4()}`;
    const medicationUUID1 = `urn:uuid:${uuidv4()}`;
    const medicationUUID2 = `urn:uuid:${uuidv4()}`;

    const entries: any[] = [];

    // Encounter
    entries.push({
      fullUrl: encounterUUID,
      resource: {
        resourceType: "Encounter",
        status: "finished",
        class: {
          system: "http://terminology.hl7.org/CodeSystem/v3-ActCode",
          code: "AMB",
          display: "Ambulatory",
        },
        subject: { reference: `Patient/${patientId}`, display: patientName },
        period: { start: encounterStart, end: encounterEnd },
        participant: [
          { individual: { reference: `Practitioner/${practitionerId}` } },
        ],
        location: [
          {
            location: {
              reference: `Organization/${organizationId}`,
              display: organizationName,
            },
          },
        ],
      },
      request: { method: "POST", url: "Encounter" },
    });

    // Observation - Tinggi Badan
    if (height !== undefined) {
      entries.push(
        this.createObservation(
          patientId,
          patientName,
          encounterUUID,
          "8302-2",
          "Body height",
          height,
          "cm"
        )
      );
    }

    // Observation - Berat Badan
    if (weight !== undefined) {
      entries.push(
        this.createObservation(
          patientId,
          patientName,
          encounterUUID,
          "29463-7",
          "Body weight",
          weight,
          "kg"
        )
      );
    }

    // Condition
    entries.push({
      fullUrl: `urn:uuid:${uuidv4()}`,
      resource: {
        resourceType: "Condition",
        clinicalStatus: {
          coding: [
            {
              system:
                "http://terminology.hl7.org/CodeSystem/condition-clinical",
              code: "active",
              display: "Active",
            },
          ],
        },
        category: [
          {
            coding: [
              {
                system:
                  "http://terminology.hl7.org/CodeSystem/condition-category",
                code: "encounter-diagnosis",
                display: "Encounter Diagnosis",
              },
            ],
          },
        ],
        code: {
          coding: [
            {
              system: "http://hl7.org/fhir/sid/icd-10",
              code: conditionCode,
              display: conditionDisplay,
            },
          ],
        },
        subject: { reference: `Patient/${patientId}` },
        encounter: { reference: encounterUUID },
      },
      request: { method: "POST", url: "Condition" },
    });

    // Procedure
    entries.push({
      fullUrl: `urn:uuid:${uuidv4()}`,
      resource: {
        resourceType: "Procedure",
        status: "completed",
        category: {
          coding: [
            {
              system: "http://snomed.info/sct",
              code: "103693007",
              display: "Diagnostic procedure",
            },
          ],
        },
        code: {
          coding: [
            {
              system: "http://hl7.org/fhir/sid/icd-9-cm",
              code: procedureCode,
              display: procedureDisplay,
            },
          ],
        },
        subject: { reference: `Patient/${patientId}` },
        encounter: { reference: encounterUUID },
        performedPeriod: { start: encounterStart, end: encounterEnd },
      },
      request: { method: "POST", url: "Procedure" },
    });

    // Composition
    entries.push({
      fullUrl: `urn:uuid:${uuidv4()}`,
      resource: {
        resourceType: "Composition",
        identifier: {
          system: `http://sys-ids.kemkes.go.id/composition/${organizationId}`,
          value: "P20240001",
        },
        status: "final",
        type: {
          coding: [
            {
              system: "http://loinc.org",
              code: "18842-5",
              display: "Discharge summary",
            },
          ],
        },
        subject: { reference: `Patient/${patientId}` },
        encounter: { reference: encounterUUID },
        date: encounterStart,
        title: compositionTitle,
        author: [
          {
            reference: `Practitioner/${practitionerId}`,
            display: "Dokter Bronsig",
          },
        ],
        custodian: { reference: `Organization/${organizationId}` },
      },
      request: { method: "POST", url: "Composition" },
    });

    // Medication (UUID 1) - Untuk MedicationRequest
    entries.push(
      this.createMedication(
        medicationUUID1,
        organizationId,
        medicationCode,
        medicationDisplay,
        medicationFormCode,
        medicationFormDisplay,
        ingredientList
      )
    );

    // MedicationRequest
    entries.push({
      fullUrl: `urn:uuid:${uuidv4()}`,
      resource: {
        resourceType: "MedicationRequest",
        status: "completed",
        intent: "order",
        medicationReference: {
          reference: medicationUUID1,
          display: medicationDisplay,
        },
        subject: { reference: `Patient/${patientId}`, display: patientName },
        encounter: { reference: encounterUUID },
        requester: { reference: `Practitioner/${practitionerId}` },
        authoredOn: new Date().toISOString(),
        dosageInstruction: [
          {
            text: dosageText,
            patientInstruction: `Ikuti petunjuk penggunaan: ${dosageText}`,
            route: {
              coding: [
                {
                  system: "http://www.whocc.no/atc",
                  code: "O",
                  display: "Oral",
                },
              ],
            },
            doseAndRate: [
              {
                doseQuantity: {
                  value: 1,
                  unit: "TAB",
                  system:
                    "http://terminology.hl7.org/CodeSystem/v3-orderableDrugForm",
                  code: "TAB",
                },
              },
            ],
          },
        ],
      },
      request: { method: "POST", url: "MedicationRequest" },
    });

    // Medication (UUID 2) - Untuk MedicationDispense
    entries.push(
      this.createMedication(
        medicationUUID2,
        organizationId,
        medicationCode,
        medicationDisplay,
        medicationFormCode,
        medicationFormDisplay,
        ingredientList
      )
    );

    // MedicationDispense
    entries.push({
      fullUrl: `urn:uuid:${uuidv4()}`,
      resource: {
        resourceType: "MedicationDispense",
        status: "completed",
        medicationReference: {
          reference: medicationUUID2,
          display: medicationDisplay,
        },
        subject: { reference: `Patient/${patientId}`, display: patientName },
        encounter: { reference: encounterUUID },
        quantity: {
          value: dispenseQuantity,
          unit: "TAB",
          system: "http://terminology.hl7.org/CodeSystem/v3-orderableDrugForm",
          code: "TAB",
        },
        daysSupply: {
          value: dispenseDuration,
          unit: "days",
          system: "http://unitsofmeasure.org",
          code: "d",
        },
      },
      request: { method: "POST", url: "MedicationDispense" },
    });

    return {
      resourceType: "Bundle",
      type: "transaction",
      entry: entries,
    };
  }

  // Helper untuk membuat Observation
  static createObservation(
    patientId: string,
    patientName: string,
    encounterUUID: string,
    loincCode: string,
    display: string,
    value: number,
    unit: string
  ) {
    return {
      fullUrl: `urn:uuid:${uuidv4()}`,
      resource: {
        resourceType: "Observation",
        status: "final",
        category: [
          {
            coding: [
              {
                system:
                  "http://terminology.hl7.org/CodeSystem/observation-category",
                code: "vital-signs",
                display: "Vital Signs",
              },
            ],
          },
        ],
        code: {
          coding: [
            {
              system: "http://loinc.org",
              code: loincCode,
              display,
            },
          ],
        },
        subject: {
          reference: `Patient/${patientId}`,
          display: patientName,
        },
        encounter: {
          reference: encounterUUID,
        },
        effectiveDateTime: new Date().toISOString(),
        valueQuantity: {
          value,
          unit,
          system: "http://unitsofmeasure.org",
          code: unit,
        },
      },
      request: {
        method: "POST",
        url: "Observation",
      },
    };
  }

  // Helper untuk membuat Medication
  static createMedication(
    uuid: string,
    organizationId: string,
    code: string,
    display: string,
    formCode: string,
    formDisplay: string,
    ingredients: Array<{ code: string; display: string; value: number }>
  ) {
    return {
      fullUrl: uuid,
      resource: {
        resourceType: "Medication",
        identifier: [
          {
            system: `http://sys-ids.kemkes.go.id/medication/${organizationId}`,
            use: "official",
            value: "123456789AAA",
          },
        ],
        code: {
          coding: [
            { system: "http://sys-ids.kemkes.go.id/kfa", code, display },
          ],
        },
        status: "active",
        manufacturer: { reference: `Organization/${organizationId}` },
        form: {
          coding: [
            {
              system:
                "http://terminology.kemkes.go.id/CodeSystem/medication-form",
              code: formCode,
              display: formDisplay,
            },
          ],
        },
        ingredient: ingredients.map((ingredient) => ({
          itemCodeableConcept: {
            coding: [
              {
                system: "http://sys-ids.kemkes.go.id/kfa",
                code: ingredient.code,
                display: ingredient.display,
              },
            ],
          },
          isActive: true,
          strength: {
            numerator: {
              value: ingredient.value,
              system: "http://unitsofmeasure.org",
              code: "mg",
            },
            denominator: {
              value: 1,
              system:
                "http://terminology.hl7.org/CodeSystem/v3-orderableDrugForm",
              code: "TAB",
            },
          },
        })),
      },
      request: { method: "POST", url: "Medication" },
    };
  }
}

export default BundleRM2DTO;
