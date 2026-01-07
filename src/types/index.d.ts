import { mariedStatus } from "../constan";

export {};

declare global {
  // requires

  //patient dto
  type MariedStatusIdentifire = (typeof mariedStatus)[number]["indentifire"];

  interface CreatePatientInput {
    nik: string;
    name: string;
    gender: "male" | "female" | "other" | "unknown";
    birthDate: string; // YYYY-MM-DD
    deceasedBoolean?: boolean;
    contact?: Array<{
      type: "phone" | "email";
      value: string;
    }>;

    // Address
    addressLine: string;
    city: string;
    postalCode?: string;
    country: string;

    provinceCode: string;
    cityCode: string;
    districtCode: string;
    villageCode: string;
    rw: string;
    rt: string;

    // Marital
    maritalStatus: MariedStatusIdentifire; // ex: "Kawin", "Belum Kawin", "Cerai Hidup"

    // Birth
    multipleBirthInteger?: number;

    // Emergency Contact
    contactName: string;
    contactPhone: string;
  }

  export interface FhirCreatePatient {
    resourceType: "Patient";
    meta: {
      profile: string[];
    };
    identifier: Array<{
      use: "official";
      system: string;
      value: string;
    }>;
    active: boolean;
    name: Array<{
      use: "official";
      text: string;
    }>;
    telecom?: Array<{
      system: "phone" | "email" | "fax" | "pager";
      value: string;
      use: "home" | "work" | "temp" | "old" | "mobile";
    }>;
    gender: "male" | "female" | "other" | "unknown";
    birthDate: string;
    deceasedBoolean?: boolean;
    address: Array<{
      use: "home";
      line: string[];
      city: string;
      postalCode?: string;
      country: string;
      extension: Array<{
        url: string;
        extension: Array<{
          url: string;
          valueCode: string;
        }>;
      }>;
    }>;
    maritalStatus: {
      coding: Array<{
        system: string;
        code: string;
        display: string;
      }>;
      text: string;
    };
    multipleBirthInteger?: number;
    contact: Array<{
      relationship: Array<{
        coding: Array<{
          system: string;
          code: string;
        }>;
      }>;
      name: {
        use: "official";
        text: string;
      };
      telecom: Array<{
        system: "phone";
        value: string;
        use: "mobile";
      }>;
    }>;
    communication: Array<{
      language: {
        coding: Array<{
          system: string;
          code: string;
          display: string;
        }>;
        text: string;
      };
      preferred: boolean;
    }>;
  }
}
