export type BaseConfig = {
  module: "sandbox" | "production";
  client_id: string;
  client_secret: string;
};

export const baseUrls: Record<
  BaseConfig["module"],
  { auth: string; baseUrl: string }
> = {
  sandbox: {
    auth: "https://api-satusehat-stg.dto.kemkes.go.id/oauth2/v1",
    baseUrl: "https://api-satusehat-stg.dto.kemkes.go.id/fhir-r4/v1",
  },
  production: {
    auth: "https://api-satusehat.kemkes.go.id/oauth2/v1",
    baseUrl: "https://api-satusehat.kemkes.go.id/fhir-r4/v1",
  },
};
