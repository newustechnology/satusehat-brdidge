import { FhirCore } from "../core";

export interface CreateCarePlanInput {
  status?: string;
  intent?: string;
  description?: string;
  subject?: {
    reference?: string;
    display?: string;
  };
  encounter?: {
    reference?: string;
  };
  created?: string;
  author?: {
    reference?: string;
  };

}

export interface PatchCarePlanInput {
  status?: string;
  intent?: string;
  description?: string;
  subject?: {
    reference?: string;
    display?: string;
  };
  encounter?: {
    reference?: string;
  };
  created?: string;
  author?: {
    reference?: string;
  };

}

export interface ExistingCarePlan {
  id?: string;
  status?: string;
  intent?: string;
  description?: string;
  subject?: {
    reference?: string;
    display?: string;
  };
  encounter?: {
    reference?: string;
  };
  created?: string;
  author?: {
    reference?: string;
  };

}

export interface FhirPatchCarePlan {
  op: "replace" | "test";
  path: string;
  value: any;
}

export interface FhirCarePlan extends FhirCore {
  resourceType: "CarePlan";
  meta?: {
    profile: string[];
  };
  status?: string;
  intent?: string;
  description?: string;
  subject?: {
    reference?: string;
    display?: string;
  };
  encounter?: {
    reference?: string;
  };
  created?: string;
  author?: {
    reference?: string;
  };

}
