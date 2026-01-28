export const maritalStatus = [
  {
    identifier: "Dibatalkan",
    code: "A",
    display: "Annulled",
  },
  {
    identifier: "Cerai Hidup",
    code: "D",
    display: "Divorced",
  },
  {
    identifier: "Putusan Sela",
    code: "I",
    display: "Interlocutory",
  },
  {
    identifier: "Pisah Hukum",
    code: "L",
    display: "Legally Separated",
  },
  {
    identifier: "Kawin",
    code: "M",
    display: "Married",
  },
  {
    identifier: "Kawin Adat",
    code: "C",
    display: "Common Law",
  },
  {
    identifier: "Poligami",
    code: "P",
    display: "Polygamous",
  },
  {
    identifier: "Pasangan Domestik",
    code: "T",
    display: "Domestic Partner",
  },
  {
    identifier: "Belum Kawin",
    code: "U",
    display: "Unmarried",
  },
  {
    identifier: "Tidak Pernah Kawin",
    code: "S",
    display: "Never Married",
  },
  {
    identifier: "Cerai Mati",
    code: "W",
    display: "Widowed",
  },
] as const;

export const organizationTypes = {
  dept: {
    coding_system: "http://terminology.hl7.org/CodeSystem/organization-type",
    coding_code: "dept",
    coding_display: "Hospital Department",
    keterangan: "Departemen Dalam Rumah Sakit",
  },
  team: {
    coding_system: "http://terminology.hl7.org/CodeSystem/organization-type",
    coding_code: "team",
    coding_display: "Organizational Team",
    keterangan: "Kelompok praktisi/tenaga kesehatan dalam organisasi",
  },
  prov: {
    coding_system: "http://terminology.hl7.org/CodeSystem/organization-type",
    coding_code: "prov",
    coding_display: "Healthcare Provider",
    keterangan: "Fasilitas Pelayanan Kesehatan",
  },
  govt: {
    coding_system: "http://terminology.hl7.org/CodeSystem/organization-type",
    coding_code: "govt",
    coding_display: "Government",
    keterangan: "Organisasi Pemerintah",
  },
  ins: {
    coding_system: "http://terminology.hl7.org/CodeSystem/organization-type",
    coding_code: "ins",
    coding_display: "Insurance Company",
    keterangan: "Perusahaan Asuransi",
  },
  other: {
    coding_system: "http://terminology.hl7.org/CodeSystem/organization-type",
    coding_code: "other",
    coding_display: "Other",
    keterangan: "Lain-lain",
  },
} as const;

export const contactPurpose = [
  {
    code: "BILL",
    display: "Billing",
    definition:
      "Contact details for information regarding to billing/general finance enquiries.",
  },
  {
    code: "ADMIN",
    display: "Administrative",
    definition: "Contact details for administrative enquiries.",
  },
  {
    code: "HR",
    display: "Human Resource",
    definition:
      "Contact details for issues related to Human Resources, such as staff matters, OH&S etc.",
  },
  {
    code: "PAYOR",
    display: "Payor",
    definition:
      "Contact details for dealing with issues related to insurance claims/adjudication/payment.",
  },
  {
    code: "PATINF",
    display: "Patient",
    definition: "Generic information contact for patients.",
  },
  {
    code: "PRESS",
    display: "Press",
    definition:
      "Dedicated contact point for matters relating to press enquiries.",
  },
] as const;

export const patientContactRelationship = [
  {
    code: "BP",
    system: "http://terminology.hl7.org/CodeSystem/v2-0131",
    display: "Billing contact person",
    definition: "Billing contact person",
  },
  {
    code: "CP",
    system: "http://terminology.hl7.org/CodeSystem/v2-0131",
    display: "Contact person",
    definition: "Contact person",
  },
  {
    code: "EP",
    system: "http://terminology.hl7.org/CodeSystem/v2-0131",
    display: "Emergency contact person",
    definition: "Emergency contact person",
  },
  {
    code: "PR",
    system: "http://terminology.hl7.org/CodeSystem/v2-0131",
    display: "Person preparing referral",
    definition: "Person preparing referral",
  },
  {
    code: "E",
    system: "http://terminology.hl7.org/CodeSystem/v2-0131",
    display: "Employer",
    definition: "Employer",
  },
  {
    code: "C",
    system: "http://terminology.hl7.org/CodeSystem/v2-0131",
    display: "Emergency Contact",
    definition: "Emergency Contact",
  },
  {
    code: "F",
    system: "http://terminology.hl7.org/CodeSystem/v2-0131",
    display: "Federal Agency",
    definition: "Federal Agency",
  },
  {
    code: "I",
    system: "http://terminology.hl7.org/CodeSystem/v2-0131",
    display: "Insurance Company",
    definition: "Insurance Company",
  },
  {
    code: "N",
    system: "http://terminology.hl7.org/CodeSystem/v2-0131",
    display: "Next-of-Kin",
    definition: "Next-of-Kin",
  },
  {
    code: "S",
    system: "http://terminology.hl7.org/CodeSystem/v2-0131",
    display: "State Agency",
    definition: "State Agency",
  },
  {
    code: "U",
    system: "http://terminology.hl7.org/CodeSystem/v2-0131",
    display: "Unknown",
    definition: "Unknown",
  },
] as const;

export const operationalStatus = [
  {
    code: "C",
    display: "Closed",
    definition: "Closed",
  },
  {
    code: "H",
    display: "Housekeeping",
    definition: "Housekeeping",
  },
  {
    code: "O",
    display: "Occupied",
    definition: "Occupied",
  },
  {
    code: "U",
    display: "Unoccupied",
    definition: "Unoccupied",
  },
  {
    code: "K",
    display: "Contaminated",
    definition: "Contaminated",
  },
  {
    code: "I",
    display: "Isolated",
    definition: "Isolated",
  },
] as const;

export const physicalType = [
  {
    code: "si",
    display: "Site",
    keterangan:
      "Kumpulan bangunan atau lokasi lain seperti kompleks atau kampus",
  },
  {
    code: "bu",
    display: "Building",
    keterangan: "Setiap bangunan atau struktur",
  },
  {
    code: "lvl",
    display: "Level",
    keterangan: "Lantai di Gedung/Struktur",
  },
  {
    code: "ro",
    display: "Room",
    keterangan: "Sebuah ruangan yang dialokasikan sebagai ruangan",
  },
  {
    code: "wi",
    display: "Wing",
    keterangan:
      "Sayap di dalam Gedung, sering berisi lantai, kamar, dan koridor",
  },
  {
    code: "wa",
    display: "Ward",
    keterangan:
      "Bangsal adalah bagian dari fasilitas medis yang mungkin berisi kamar dan jenis lokasi lainnya",
  },
  {
    code: "co",
    display: "Corridor",
    keterangan:
      "Setiap koridor di dalam Gedung, yang dapat menghubungkan kamar-kamar",
  },
  {
    code: "bd",
    display: "Bed",
    keterangan: "Tempat tidur yang dapat ditempati",
  },
  {
    code: "ve",
    display: "Vehicle",
    keterangan: "Alat transportasi",
  },
  {
    code: "ho",
    display: "House",
    keterangan: "Rumah",
  },
  {
    code: "ca",
    display: "Cabinet",
    keterangan:
      "Wadah yang dapat menyimpan barang, peralatan, obat-obatan atau barang lainnya",
  },
  {
    code: "rd",
    display: "Road",
    keterangan: "Jalan",
  },
  {
    code: "area",
    display: "Area",
    keterangan: "Area (contoh: zona risiko banjir, wilayah kodepos)",
  },
  {
    code: "jdn",
    display: "Jurisdiction",
    keterangan: "Negara, Provinsi",
  },
  {
    code: "vir",
    display: "Virtual",
    keterangan: "Lokasi virtual",
  },
] as const;

export const daysOfWeek = [
  { code: "mon", display: "Senin" },
  { code: "tue", display: "Selasa" },
  { code: "wed", display: "Rabu" },
  { code: "thu", display: "Kamis" },
  { code: "fri", display: "Jumat" },
  { code: "sat", display: "Sabtu" },
  { code: "sun", display: "Minggu" },
] as const;

export const encounterType = [
  {
    code: "ADMS",
    display: "Annual diabetes mellitus screening",
  },
  {
    code: "BD/BM-clin",
    display: "Bone drilling/bone marrow punction in clinic",
  },
  {
    code: "CCS60",
    display: "Infant colon screening - 60 minutes",
  },
  {
    code: "OKI",
    display: "Outpatient Kenacort injection",
  },
] as const;

export * from "./enconterServicetype";

export const admitSource = [
  {
    code: "hosp-trans",
    display: "Transferred from other hospital",
    definition:
      "The Patient has been transferred from another hospital for this encounter.",
  },
  {
    code: "emd",
    display: "From accident/emergency department",
    definition:
      "The patient has been transferred from the emergency department within the hospital. This is typically used in the transition to an inpatient encounter",
  },
  {
    code: "outp",
    display: "From outpatient department",
    definition:
      "The patient has been transferred from an outpatient department within the hospital.",
  },
  {
    code: "born",
    display: "Born in hospital",
    definition:
      "The patient is a newborn and the encounter will track the baby related activities (as opposed to the Mothers encounter - that may be associated using the newborn encounters partof property)",
  },
  {
    code: "gp",
    display: "General Practitioner referral",
    definition:
      "The patient has been admitted due to a referred from a General Practitioner.",
  },
  {
    code: "mp",
    display: "Medical Practitioner/physician referral",
    definition:
      "The patient has been admitted due to a referred from a Specialist (as opposed to a General Practitioner).",
  },
  {
    code: "nursing",
    display: "From nursing home",
    definition: "The patient has been transferred from a nursing home.",
  },
  {
    code: "psych",
    display: "From psychiatric hospital",
    definition: "The patient has been transferred from a psychiatric facility.",
  },
  {
    code: "rehab",
    display: "From rehabilitation facility",
    definition:
      "The patient has been transferred from a rehabilitation facility or clinic.",
  },
  {
    code: "other",
    display: "Other",
    definition:
      "The patient has been admitted from a source otherwise not specified here.",
  },
] as const;

export const reAdmission = [
  {
    code: "R",
    display: "Re-admission",
    definition: "Re-admission",
  },
] as const;

export const dietPreference = [
  {
    code: "vegetarian",
    display: "Vegetarian",
    definition: "Food without meat, poultry or seafood.",
  },
  {
    code: "dairy-free",
    display: "Dairy Free",
    definition: "Excludes dairy products.",
  },
  {
    code: "nut-free",
    display: "Nut Free",
    definition: "Excludes ingredients containing nuts.",
  },
  {
    code: "gluten-free",
    display: "Gluten Free",
    definition: "Excludes ingredients containing gluten.",
  },
  {
    code: "vegan",
    display: "Vegan",
    definition:
      "Food without meat, poultry, seafood, eggs, dairy products and other animal-derived substances.",
  },
  {
    code: "halal",
    display: "Halal",
    definition: "Foods that conform to Islamic law.",
  },
  {
    code: "kosher",
    display: "Kosher",
    definition: "Foods that conform to Jewish dietary law.",
  },
] as const;

export const specialArrangement = [
  {
    code: "wheel",
    display: "Wheelchair",
    definition:
      "The patient requires a wheelchair to be made available for the encounter.",
  },
  {
    code: "add-bed",
    display: "Additional bedding",
    definition:
      "An additional bed made available for a person accompanying the patient, for example a parent accompanying a child.",
  },
  {
    code: "int",
    display: "Interpreter",
    definition:
      "The patient is not fluent in the local language and requires an interpreter to be available. Refer to the Patient.Language property for the type of interpreter required.",
  },
  {
    code: "att",
    display: "Attendant",
    definition:
      "A person who accompanies a patient to provide assistive services necessary for the patient's care during the encounter.",
  },
  {
    code: "dog",
    display: "Guide dog",
    definition:
      "The patient has a guide dog and the location used for the encounter should be able to support the presence of the service animal.",
  },
] as const;

export const dischargeDisposition = [
  {
    code: "home",
    display: "Home",
    definition:
      "The patient was dicharged and has indicated that they are going to return home afterwards.",
  },
  {
    code: "alt-home",
    display: "Alternative home",
    definition:
      "The patient was discharged and has indicated that they are going to return home afterwards, but not the patient's home - e.g. a family member's home.",
  },
  {
    code: "other-hcf",
    display: "Other healthcare facility",
    definition: "The patient was transferred to another healthcare facility.",
  },
  {
    code: "hosp",
    display: "Hospice",
    definition: "The patient has been discharged into palliative care.",
  },
  {
    code: "long",
    display: "Long-term care",
    definition:
      "The patient has been discharged into long-term care where is likely to be monitored through an ongoing episode-of-care.",
  },
  {
    code: "aadvice",
    display: "Left against advice",
    definition: "The patient self discharged against medical advice.",
  },
  {
    code: "exp",
    display: "Expired",
    definition: "The patient has deceased during this encounter.",
  },
  {
    code: "psy",
    display: "Psychiatric hospital",
    definition: "The patient has been transferred to a psychiatric facility.",
  },
  {
    code: "rehab",
    display: "Rehabilitation",
    definition:
      "The patient was discharged and is to receive post acute care rehabilitation services.",
  },
  {
    code: "snf",
    display: "Skilled nursing facility",
    definition:
      "The patient has been discharged to a skilled nursing facility for the patient to receive additional care.",
  },
  {
    code: "oth",
    display: "Other",
    definition: "The discharge disposition has not otherwise defined.",
  },
] as const;

export const clinicalStatus = [
  {
    code: "active",
    display: "Active",
  },
  {
    code: "recurrence",
    display: "Recurrence",
  },
  {
    code: "relapse",
    display: "Relapse",
  },
  {
    code: "inactive",
    display: "Inactive",
  },
  {
    code: "remission",
    display: "Remission",
  },
  {
    code: "resolved",
    display: "Resolved",
  },
  {
    code: "unknown",
    display: "Unknown",
  },
] as const;

export const verificationStatus = [
  {
    code: "unconfirmed",
    display: "Unconfirmed",
  },
  {
    code: "provisional",
    display: "Provisional",
  },
  {
    code: "differential",
    display: "Differential",
  },
  {
    code: "confirmed",
    display: "Confirmed",
  },
  {
    code: "refuted",
    display: "Refuted",
  },
  {
    code: "entered-in-error",
    display: "Entered in Error",
  },
] as const;

export const conditionCategory = [
  {
    code: "problem-list-item",
    display: "Problem List Item",
    definition:
      "An item on a problem list that can be managed over time and can be expressed by a practitioner (e.g. physician, nurse), patient, or related person.",
  },
  {
    code: "encounter-diagnosis",
    display: "Encounter Diagnosis",
    definition:
      "A point in time diagnosis (e.g. from a physician or nurse) in context of an encounter.",
  },
  {
    code: "diagnostic-report-impression",
    display: "Diagnostic Report Impression",
    definition:
      "A diagnosis or differential diagnosis item that is expressed in a diagnostic report.",
  },
] as const;

export const observationStatus = [
  {
    code: "registered",
    display: "Registered",
  },
  {
    code: "preliminary",
    display: "Preliminary",
  },
  {
    code: "final",
    display: "Final",
  },
  {
    code: "amended",
    display: "Amended",
  },
  {
    code: "corrected",
    display: "Corrected",
  },
  {
    code: "cancelled",
    display: "Cancelled",
  },
  {
    code: "entered-in-error",
    display: "Entered in Error",
  },
  {
    code: "unknown",
    display: "Unknown",
  },
] as const;

export const observationCategory = [
  {
    code: "social-history",
    display: "Social History",
    definition:
      "Social History Observations define the patient's occupational, personal (e.g., lifestyle), social, familial, and environmental history and health risk factors that may impact the patient's health.",
  },
  {
    code: "vital-signs",
    display: "Vital Signs",
    definition:
      "Clinical observations measure the body's basic functions such as blood pressure, heart rate, respiratory rate, height, weight, body mass index, head circumference, pulse oximetry, temperature, and body surface area.",
  },
  {
    code: "imaging",
    display: "Imaging",
    definition:
      "Observations generated by imaging. The scope includes observations regarding plain x-ray, ultrasound, CT, MRI, angiography, echocardiography, and nuclear medicine.",
  },
  {
    code: "laboratory",
    display: "Laboratory",
    definition:
      "The results of observations generated by laboratories.  Laboratory results are typically generated by laboratories providing analytic services in areas such as chemistry, hematology, serology, histology, cytology, anatomic pathology (including digital pathology), microbiology, and/or virology. These observations are based on analysis of specimens obtained from the patient and submitted to the laboratory.",
  },
  {
    code: "procedure",
    display: "Procedure",
    definition:
      "Observations generated by other procedures.  This category includes observations resulting from interventional and non-interventional procedures excluding laboratory and imaging (e.g., cardiology catheterization, endoscopy, electrodiagnostics, etc.).  Procedure results are typically generated by a clinician to provide more granular information about component observations made during a procedure.  An example would be when a gastroenterologist reports the size of a polyp observed during a colonoscopy.",
  },
  {
    code: "survey",
    display: "Survey",
    definition:
      "Observations from survey instruments (e.g., patient experience surveys), questionnaires, forms (e.g., patient admission forms) and assessment tools (e.g., Apgar Scores, Montreal Cognitive Assessment [MoCA]).",
  },
  {
    code: "exam",
    display: "Exam",
    definition:
      "Observations generated by physical exam findings, including direct observations made by a clinician using simple instruments or as the result of simple maneuvers performed directly on the patient's body (e.g., signs).",
  },
  {
    code: "therapy",
    display: "Therapy",
    definition:
      "Observations generated by non-interventional treatment protocols (e.g. occupational, physical, radiation, nutritional and medication therapy).",
  },
  {
    code: "activity",
    display: "Activity",
    definition:
      "Observations that measure or record any bodily activity that enhances or maintains physical fitness and overall health and wellness.",
  },
  {
    code: "symptom",
    display: "Symptom",
    definition:
      "Observations which record a manifestation of a disease that is apparent to and has been communicated by the patient.",
  },
] as const;

export const dataAbsentReason = [
  {
    code: "unknown",
    display: "Unknown",
  },
  {
    code: "asked-unknown",
    display: "Asked But Unknown",
  },
  {
    code: "temp-unknown",
    display: "Temporarily Unknown",
  },
  {
    code: "not-asked",
    display: "Not Asked",
  },
  {
    code: "asked-declined",
    display: "Asked But Declined",
  },
  {
    code: "masked",
    display: "Masked",
  },
  {
    code: "not-applicable",
    display: "Not Applicable",
  },
  {
    code: "unsupported",
    display: "Unsupported",
  },
  {
    code: "as-text",
    display: "As Text",
  },
  {
    code: "error",
    display: "Error",
  },
  {
    code: "not-a-number",
    display: "Not a Number (NaN)",
  },
  {
    code: "negative-infinity",
    display: "Negative Infinity (NINF)",
  },
  {
    code: "positive-infinity",
    display: "Positive Infinity (PINF)",
  },
  {
    code: "not-performed",
    display: "Not Performed",
  },
  {
    code: "not-permitted",
    display: "Not Permitted",
  },
] as const;

export const referenceRangeType = [
  {
    code: "type",
    display: "Type",
  },
  {
    code: "normal",
    display: "Normal Range",
  },
  {
    code: "recommended",
    display: "Recommended Range",
  },
  {
    code: "treatment",
    display: "Treatment Range",
  },
  {
    code: "therapeutic",
    display: "Therapeutic Desired Level",
  },
  {
    code: "pre",
    display: "Pre Therapeutic Desired Level",
  },
  {
    code: "post",
    display: "Post Therapeutic Desired Level",
  },
  {
    code: "endocrine",
    display: "Endocrine",
  },
  {
    code: "pre-puberty",
    display: "Pre-Puberty",
  },
  {
    code: "follicular",
    display: "Follicular Stage",
  },
  {
    code: "midcycle",
    display: "MidCycle",
  },
  {
    code: "luteal",
    display: "Luteal",
  },
  {
    code: "postmenopausal",
    display: "Post-Menopause",
  },
] as const;
