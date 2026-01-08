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
