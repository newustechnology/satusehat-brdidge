import { FhirCore } from "../core";

export interface CreateImagingStudyInput {
  identifier?: Array<{
    use?: string;
    type?: {
      coding?: Array<{
        system?: string;
        code?: string;
      }>;
    };
    system?: string;
    value?: string;
  }>;
  status?: string;
  modality?: Array<{
    system?: string;
    code?: string;
  }>;
  subject?: {
    reference?: string;
  };
  started?: string;
  basedOn?: Array<{
    reference?: string;
  }>;
  numberOfSeries?: number;
  numberOfInstances?: number;
  series?: Array<{
    uid?: string;
    number?: number;
    modality?: {
      system?: string;
      code?: string;
    };
    numberOfInstances?: number;
    started?: string;
    instance?: Array<{
      uid?: string;
      sopClass?: {
        system?: string;
        code?: string;
      };
      number?: number;
      title?: string;
    }>;
  }>;

}

export interface PatchImagingStudyInput {
  identifier?: Array<{
    use?: string;
    type?: {
      coding?: Array<{
        system?: string;
        code?: string;
      }>;
    };
    system?: string;
    value?: string;
  }>;
  status?: string;
  modality?: Array<{
    system?: string;
    code?: string;
  }>;
  subject?: {
    reference?: string;
  };
  started?: string;
  basedOn?: Array<{
    reference?: string;
  }>;
  numberOfSeries?: number;
  numberOfInstances?: number;
  series?: Array<{
    uid?: string;
    number?: number;
    modality?: {
      system?: string;
      code?: string;
    };
    numberOfInstances?: number;
    started?: string;
    instance?: Array<{
      uid?: string;
      sopClass?: {
        system?: string;
        code?: string;
      };
      number?: number;
      title?: string;
    }>;
  }>;

}

export interface ExistingImagingStudy {
  id?: string;
  identifier?: Array<{
    use?: string;
    type?: {
      coding?: Array<{
        system?: string;
        code?: string;
      }>;
    };
    system?: string;
    value?: string;
  }>;
  status?: string;
  modality?: Array<{
    system?: string;
    code?: string;
  }>;
  subject?: {
    reference?: string;
  };
  started?: string;
  basedOn?: Array<{
    reference?: string;
  }>;
  numberOfSeries?: number;
  numberOfInstances?: number;
  series?: Array<{
    uid?: string;
    number?: number;
    modality?: {
      system?: string;
      code?: string;
    };
    numberOfInstances?: number;
    started?: string;
    instance?: Array<{
      uid?: string;
      sopClass?: {
        system?: string;
        code?: string;
      };
      number?: number;
      title?: string;
    }>;
  }>;

}

export interface FhirPatchImagingStudy {
  op: "replace" | "test";
  path: string;
  value: any;
}

export interface FhirImagingStudy extends FhirCore {
  resourceType: "ImagingStudy";
  meta?: {
    profile: string[];
  };
  identifier?: Array<{
    use?: string;
    type?: {
      coding?: Array<{
        system?: string;
        code?: string;
      }>;
    };
    system?: string;
    value?: string;
  }>;
  status?: string;
  modality?: Array<{
    system?: string;
    code?: string;
  }>;
  subject?: {
    reference?: string;
  };
  started?: string;
  basedOn?: Array<{
    reference?: string;
  }>;
  numberOfSeries?: number;
  numberOfInstances?: number;
  series?: Array<{
    uid?: string;
    number?: number;
    modality?: {
      system?: string;
      code?: string;
    };
    numberOfInstances?: number;
    started?: string;
    instance?: Array<{
      uid?: string;
      sopClass?: {
        system?: string;
        code?: string;
      };
      number?: number;
      title?: string;
    }>;
  }>;

}
