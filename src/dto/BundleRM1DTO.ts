import { v4 as uuidv4 } from "uuid";

/**
 * 🔹 Bundle untuk Encounter, Condition, Observation, Procedure, Composition
 * 🔹 Dikirim dalam satu transaksi FHIR Bundle (transaction)
 */

export class BundleRM1DTO {
  static formatBundle(data: BundleRM1Input) {
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
    } = data;

    const encounterUUID = `urn:uuid:${uuidv4()}`;

    const entries: any[] = [];

    /**
     * ======================
     * Encounter
     * ======================
     */
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
        subject: {
          reference: `Patient/${patientId}`,
          display: patientName,
        },
        period: {
          start: encounterStart,
          end: encounterEnd,
        },
        participant: [
          {
            individual: {
              reference: `Practitioner/${practitionerId}`,
            },
          },
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
      request: {
        method: "POST",
        url: "Encounter",
      },
    });

    /**
     * ======================
     * Observation (optional)
     * ======================
     */
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

    /**
     * ======================
     * Condition
     * ======================
     */
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
        subject: {
          reference: `Patient/${patientId}`,
        },
        encounter: {
          reference: encounterUUID,
        },
      },
      request: {
        method: "POST",
        url: "Condition",
      },
    });

    /**
     * ======================
     * Procedure
     * ======================
     */
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
        subject: {
          reference: `Patient/${patientId}`,
        },
        encounter: {
          reference: encounterUUID,
        },
        performedPeriod: {
          start: encounterStart,
          end: encounterEnd,
        },
      },
      request: {
        method: "POST",
        url: "Procedure",
      },
    });

    /**
     * ======================
     * Composition
     * ======================
     */
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
        subject: {
          reference: `Patient/${patientId}`,
        },
        encounter: {
          reference: encounterUUID,
        },
        date: encounterStart,
        title: compositionTitle,
        author: [
          {
            reference: `Practitioner/${practitionerId}`,
            display: "Dokter Bronsig",
          },
        ],
        custodian: {
          reference: `Organization/${organizationId}`,
        },
      },
      request: {
        method: "POST",
        url: "Composition",
      },
    });

    return {
      resourceType: "Bundle",
      type: "transaction",
      entry: entries,
    };
  }

  /**
   * 🔹 Helper untuk membuat Observation (vital signs & lainnya)
   */
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
}
