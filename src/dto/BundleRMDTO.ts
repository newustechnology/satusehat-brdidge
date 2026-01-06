import { v4 as uuidv4 } from "uuid";

class BundleRMDTO {
  static formatBundle(data: BundleRMDTOData, options: BundleRMDTOOptions = {}) {
    const {
      skipResources = [],
      overrideEncounterIdentifier,
      overrideCompositionIdentifier,
      overrideMedicationIdentifiers = [],
      autoGenerateAllIdentifiers = false,
      allowDuplicateSkip = false,
    } = options;

    // ✨ Validasi kritikal fields
    if (
      !data.patientId ||
      typeof data.patientId !== "string" ||
      data.patientId.trim() === ""
    ) {
      throw new Error("❌ Tidak bisa membuat Bundle: IHS Pasien kosong.");
    }
    if (
      !data.practitionerId ||
      typeof data.practitionerId !== "string" ||
      data.practitionerId.trim() === ""
    ) {
      throw new Error("❌ Tidak bisa membuat Bundle: IHS Dokter kosong.");
    }
    if (
      !data.organizationId ||
      typeof data.organizationId !== "string" ||
      data.organizationId.trim() === ""
    ) {
      throw new Error("❌ Tidak bisa membuat Bundle: IHS Organisasi kosong.");
    }
    if (
      !data.locationId ||
      typeof data.locationId !== "string" ||
      data.locationId.trim() === ""
    ) {
      throw new Error("❌ Tidak bisa membuat Bundle: IHS Lokasi kosong.");
    }

    const {
      patientId,
      patientName,
      practitionerId,
      practitionerName,
      organizationId,
      encounterStart,
      encounterEnd,
      locationId,
      locationName,
      systolic,
      diastolic,
      temperature,
      heartrate,
      respiratoryrate,
      height,
      weight,
      diagnosis,
      procedures,
      compositionTitle,
      medications,
    } = data;

    const encounterUUID = `urn:uuid:${uuidv4()}`;
    const compositionUUID = `urn:uuid:${uuidv4()}`;

    const proceduresFull = (procedures || [])
      .filter(
        (v, i, a) =>
          a.findIndex((t) => t.code === v.code && t.display === v.display) === i
      )
      .map((procedure) => ({
        uuid: `urn:uuid:${uuidv4()}`,
        code: procedure.code,
        display: procedure.display,
      }));

    const diagnosisFull = (diagnosis || [])
      .filter(
        (v, i, a) =>
          a.findIndex((t) => t.code === v.code && t.display === v.display) === i
      )
      .map((condition) => ({
        uuid: `urn:uuid:${uuidv4()}`,
        code: condition.code,
        display: condition.display,
      }));

    const medicationsRaw = medications || [];

    const medicationsFiltered = medicationsRaw.filter(
      (v, i, a) =>
        a.findIndex((t) => t.code === v.code && t.display === v.display) === i
    );

    const medicationsValid = medicationsFiltered
      .filter((med) => this.isValidMedication(med))
      .map((med, index) => {
        const override = overrideMedicationIdentifiers.find(
          (o) => o.medCode === med.code || o.index === index
        );
        return {
          uuid: `urn:uuid:${uuidv4()}`,
          requestUUID:
            override?.request ||
            (autoGenerateAllIdentifiers ? `urn:uuid:${uuidv4()}` : undefined),
          dispenseUUID:
            override?.dispense ||
            (autoGenerateAllIdentifiers ? `urn:uuid:${uuidv4()}` : undefined),
          ...med,
          unitCode: med.unitCode || "mg",
        };
      });

    const entries = [];

    if (!skipResources.includes("Encounter")) {
      const encounterIdentifier =
        overrideEncounterIdentifier ||
        (autoGenerateAllIdentifiers ? `ENC-${Date.now()}` : "P20240001");
      entries.push({
        fullUrl: encounterUUID,
        resource: {
          resourceType: "Encounter",
          identifier: [
            {
              system: `http://sys-ids.kemkes.go.id/encounter/${organizationId}`,
              value: encounterIdentifier,
            },
          ],
          status: "finished",
          statusHistory: [
            {
              status: "finished",
              period: { start: encounterStart, end: encounterEnd },
            },
          ],
          class: {
            system: "http://terminology.hl7.org/CodeSystem/v3-ActCode",
            code: "AMB",
            display: "Ambulatory",
          },
          subject: {
            reference: this.safeReference("Patient", patientId),
            display: patientName,
          },
          participant: [
            {
              individual: {
                reference: this.safeReference("Practitioner", practitionerId),
                display: practitionerName,
              },
            },
          ],
          period: { start: encounterStart, end: encounterEnd },
          location: [
            {
              location: {
                reference: this.safeReference("Location", locationId),
                display: locationName,
              },
            },
          ],
          diagnosis: diagnosisFull.map((diagnosis, index) => ({
            condition: {
              reference: diagnosis.uuid,
              display: diagnosis.display,
            },
            rank: index + 1,
          })),
          serviceProvider: {
            reference: this.safeReference("Organization", organizationId),
          },
        },
        request: { method: "POST", url: "Encounter" },
      });
    }

    if (!skipResources.includes("Observation")) {
      const obs: [string, string, any, string][] = [
        ["8462-4", "Diastolic blood pressure", diastolic, "mm[Hg]"],
        ["8480-6", "Systolic blood pressure", systolic, "mm[Hg]"],
        ["8867-4", "Heart rate", heartrate, "/min"],
        ["9279-1", "Respiratory rate", respiratoryrate, "/min"],
        ["8310-5", "Body temperature", temperature, "Cel"],
        ["8302-2", "Body height", height, "cm"],
        ["29463-7", "Body weight", weight, "kg"],
      ];
      obs.forEach(([code, label, value, unit]) => {
        if (this.isValidObservationValue(value)) {
          entries.push(
            this.createObservation(
              patientId,
              patientName,
              encounterUUID,
              code,
              label,
              value,
              unit,
              practitionerId
            )
          );
        }
      });
    }

    if (!skipResources.includes("Condition")) {
      diagnosisFull.forEach((condition) => {
        entries.push({
          fullUrl: condition.uuid,
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
                  code: condition.code,
                  display: condition.display,
                },
              ],
            },
            subject: {
              reference: this.safeReference("Patient", patientId),
              display: patientName,
            },
            encounter: { reference: encounterUUID },
          },
          request: { method: "POST", url: "Condition" },
        });
      });
    }

    if (!skipResources.includes("Procedure")) {
      proceduresFull.forEach((procedure) => {
        entries.push({
          fullUrl: procedure.uuid,
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
                  code: procedure.code,
                  display: procedure.display,
                },
              ],
            },
            subject: {
              reference: this.safeReference("Patient", patientId),
              display: patientName,
            },
            encounter: { reference: encounterUUID },
            performedPeriod: { start: encounterStart, end: encounterEnd },
          },
          request: { method: "POST", url: "Procedure" },
        });
      });
    }

    if (!skipResources.includes("Composition")) {
      const compositionIdentifier =
        overrideCompositionIdentifier ||
        (autoGenerateAllIdentifiers ? `COMP-${Date.now()}` : "P20240001");
      entries.push({
        fullUrl: compositionUUID,
        resource: {
          resourceType: "Composition",
          identifier: {
            system: `http://sys-ids.kemkes.go.id/composition/${organizationId}`,
            value: compositionIdentifier,
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
            reference: this.safeReference("Patient", patientId),
            display: patientName,
          },
          encounter: { reference: encounterUUID },
          date: encounterStart,
          title:
            medicationsValid.length > 0
              ? compositionTitle
              : `${compositionTitle} (Tanpa Resep Obat)`,
          author: [
            {
              reference: this.safeReference("Practitioner", practitionerId),
              display: practitionerName,
            },
          ],
          custodian: {
            reference: this.safeReference("Organization", organizationId),
          },
        },
        request: { method: "POST", url: "Composition" },
      });
    }

    if (!skipResources.includes("Medication") && medicationsValid.length > 0) {
      medicationsValid.forEach((med) => {
        entries.push(
          ...[
            {
              fullUrl: med.uuid,
              resource: {
                resourceType: "Medication",
                identifier: [
                  {
                    system: "http://sys-ids.kemkes.go.id/medication",
                    value: med.code,
                  },
                ],
                code: {
                  coding: [
                    {
                      system: "http://sys-ids.kemkes.go.id/kfa",
                      code: med.code,
                      display: med.display,
                    },
                  ],
                },
                status: "active",
                manufacturer: {
                  reference: this.safeReference("Organization", organizationId),
                },
                form: {
                  coding: [
                    {
                      system:
                        "http://terminology.kemkes.go.id/CodeSystem/medication-form",
                      code: med.formCode,
                      display: med.formDisplay,
                    },
                  ],
                },
                ingredient: (med.ingredientList || []).map((ing) => ({
                  itemCodeableConcept: {
                    coding: [
                      {
                        system: "http://sys-ids.kemkes.go.id/kfa",
                        code: ing.code,
                        display: ing.display,
                      },
                    ],
                  },
                  isActive: true,
                  strength: {
                    numerator: {
                      value: ing.value,
                      system: "http://unitsofmeasure.org",
                      code: ing.uom_name,
                    },
                    denominator: {
                      value: ing.per || 1,
                      system: "http://unitsofmeasure.org",
                      code: ing.uom_name,
                    },
                  },
                })),
              },
              request: { method: "POST", url: "Medication" },
            },
            {
              fullUrl: med.requestUUID,
              resource: {
                resourceType: "MedicationRequest",
                identifier: [
                  {
                    system: "http://sys-ids.kemkes.go.id/medreq",
                    value: uuidv4(),
                  },
                ],
                status: "completed",
                intent: "order",
                medicationReference: {
                  reference: med.uuid,
                  display: med.display,
                },
                subject: {
                  reference: this.safeReference("Patient", patientId),
                  display: patientName,
                },
                encounter: { reference: encounterUUID },
                requester: {
                  reference: this.safeReference("Practitioner", practitionerId),
                },
                authoredOn: new Date().toISOString(),
                dosageInstruction: [
                  {
                    text: med.dosageText,
                    patientInstruction: med.dosageText,
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
                          unit: med.unitCode || "mg",
                          system: "http://unitsofmeasure.org",
                          code: med.unitCode || "mg",
                        },
                      },
                    ],
                  },
                ],
              },
              request: { method: "POST", url: "MedicationRequest" },
            },
            {
              fullUrl: med.dispenseUUID,
              resource: {
                resourceType: "MedicationDispense",
                identifier: [
                  {
                    system: "http://sys-ids.kemkes.go.id/meddisp",
                    value: uuidv4(),
                  },
                ],
                status: "completed",
                medicationReference: {
                  reference: med.uuid,
                  display: med.display,
                },
                subject: {
                  reference: this.safeReference("Patient", patientId),
                  display: patientName,
                },
                context: { reference: encounterUUID },
                authorizingPrescription: [{ reference: med.requestUUID }],
                quantity: {
                  value: med.dispenseQuantity,
                  unit: med.unitCode || "mg",
                  system: "http://unitsofmeasure.org",
                  code: med.unitCode || "mg",
                },
                daysSupply: {
                  value: med.dispenseDuration,
                  unit: "days",
                  system: "http://unitsofmeasure.org",
                  code: "d",
                },
              },
              request: { method: "POST", url: "MedicationDispense" },
            },
          ]
        );
      });
    }

    // 🚫 VALIDASI DUPLIKAT - Batalkan jika data asli > data hasil filter
    const hasDuplicateDiagnosis =
      (diagnosis || []).length > diagnosisFull.length;
    const hasDuplicateProcedure =
      (procedures || []).length > proceduresFull.length;
    const hasDuplicateMedication =
      (medications || []).length > medicationsValid.length;

    if (
      hasDuplicateDiagnosis ||
      hasDuplicateProcedure ||
      hasDuplicateMedication
    ) {
      console.warn("⚠️ Duplikasi data ditemukan pada Bundle.");

      if (hasDuplicateDiagnosis) {
        console.warn(
          `🧠 Diagnosis: ${(diagnosis || []).length} -> Unik: ${
            diagnosisFull.length
          }`
        );
      }
      if (hasDuplicateProcedure) {
        console.warn(
          `🔬 Procedure: ${(procedures || []).length} -> Unik: ${
            proceduresFull.length
          }`
        );
      }
      if (hasDuplicateMedication) {
        console.warn(
          `💊 Medication: ${(medications || []).length} -> Valid & Unik: ${
            medicationsValid.length
          }`
        );
      }

      if (!allowDuplicateSkip) {
        console.warn(
          "🚫 Duplikasi tidak diizinkan (allowDuplicateSkip: false), Bundle dibatalkan."
        );
        return null;
      } else {
        console.warn(
          "✅ Duplikasi diabaikan karena allowDuplicateSkip: true, proses tetap dilanjutkan."
        );
      }
    }

    return {
      resourceType: "Bundle",
      type: "transaction",
      entry: entries,
    };
  }

  static safeReference(type: string, id: string) {
    if (!id || id.trim() === "") {
      throw new Error(`❌ Reference ${type} kosong`);
    }
    return `${type}/${id}`;
  }

  static isValidObservationValue(value: any) {
    return value !== null && value !== undefined && value !== 0 && value !== "";
  }

  static createObservation(
    patientId: string,
    patientName: string,
    encounterUUID: string,
    loincCode: string,
    display: string,
    value: any,
    unit: string,
    practitionerId: string
  ) {
    if (!patientId) throw new Error("❌ PatientId kosong saat Observation");
    if (!practitionerId)
      throw new Error("❌ PractitionerId kosong saat Observation");
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
              display: display,
            },
          ],
        },
        subject: {
          reference: this.safeReference("Patient", patientId),
          display: patientName,
        },
        encounter: { reference: encounterUUID },
        performer: [
          { reference: this.safeReference("Practitioner", practitionerId) },
        ],
        effectiveDateTime: new Date().toISOString(),
        valueQuantity: {
          value: value,
          unit: unit,
          system: "http://unitsofmeasure.org",
          code: unit,
        },
      },
      request: { method: "POST", url: "Observation" },
    };
  }

  static isValidMedication(med: Medication) {
    return (
      med &&
      med.code &&
      med.formCode &&
      med.dosageText &&
      med.ingredientList &&
      med.dispenseDuration &&
      med.dispenseQuantity
    );
  }
}

export default BundleRMDTO;
