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
