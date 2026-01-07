import { maritalStatus } from "../constan";

export {};

declare global {
  // requires

  //patient dto
  type MarriedStatusIdentifier = (typeof maritalStatus)[number]["identifier"];

  interface CreatePatientInput {
    nik: string;
    kk?: string;

    name: string;
    gender: "male" | "female" | "other" | "unknown";
    birthDate: string; // YYYY-MM-DD
    birthPlace?: {
      city: string;
      province: string;
    };

    deceased?: boolean;

    telecom?: Array<{
      type: "phone" | "email";
      value: string;
    }>;

    contact?: Array<{
      name: string;
      type: "phone" | "email";
      value: string;
    }>;

    address: {
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
    };

    maritalStatus: MarriedStatusIdentifier;

    multipleBirthInteger?: number;
  }

  export interface FhirCreatePatient {
    resourceType: "Patient";
    meta: {
      profile: string[];
    };
    identifier?: Array<{
      use: "official";
      system: string;
      value: string;
    }>;
    active: boolean;
    name: Array<{
      use: "official";
      text: string;
      family?: string;
      given?: string[];
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
    contact?: ContactInterface[];
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
    extension?: Array<{
      url: string;
      valueString?: string;
      valueAddress?: { city: string; country: string };
      valueCode?: string;
    }>;
  }

  interface ContactInterface {
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
      system: "phone" | "email" | "fax" | "pager";
      value: string;
      use: "mobile" | "home" | "work" | "temp" | "old";
    }>;
  }

  interface FhirPatchPatient {
    op: "replace" | "test";
    path: string;
    value: any;
  }

  interface PatchPatientInput {
    name?: string;
    gender?: "male" | "female" | "other" | "unknown";
    birthDate?: string;

    nik?: string;
    ihs?: string;

    maritalStatus?: MarriedStatusIdentifier;

    address?: AddressInterface;
  }

  interface AddressInterface {
    line?: string;
    city?: string;
    postalCode?: string;
    country?: string;

    provinceCode?: string;
    cityCode?: string;
    districtCode?: string;
    villageCode?: string;
    rt?: string;
    rw?: string;
  }

  interface ExistingPatient {
    name?: Array<{ use?: string; text?: string }>;
    gender?: string;
    birthDate?: string;
    identifier?: Array<{
      system: string;
      use?: string;
      value: string;
    }>;
    address?: unknown[];
  }
}
