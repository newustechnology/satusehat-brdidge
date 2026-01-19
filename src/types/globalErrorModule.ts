import axios, { AxiosError } from "axios";
import { FhirError, FhirFaultError } from "./dto/core";

export class SatuSehatError extends Error {
  constructor(
    message: string,
    public code?: string,
    public statusCode?: number,
    public originalError?: any,
  ) {
    super(message);
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }

  toJSON() {
    return {
      name: this.name,
      message: this.message,
      code: this.code,
      statusCode: this.statusCode,
      ...(this.originalError && { details: this.originalError }),
    };
  }
}

export class SatuSehatErrorCacheError extends SatuSehatError {
  constructor(message: string, originalError?: any) {
    super(message, "CACHE_ERROR", 500, originalError);
  }
}
export class SatuSehatErrorAuthError extends SatuSehatError {
  constructor(message: string, originalError?: any) {
    super(message, "AUTH_ERROR", 500, originalError);
  }
}
export class SatuSehatErrorUrlNotFound extends SatuSehatError {
  constructor(endpointName?: string) {
    super(
      `Endpoint URL not found for endpoint: ${endpointName || "unknown"}`,
      "URL_NOT_FOUND",
      404,
      undefined,
    );
  }
}

export class SatuSehatErrorOperationOutcome extends SatuSehatError {
  constructor(message: string, originalError?: any) {
    super(message, "OPERATION_OUTCOME", 400, originalError);
  }
}

export class SatuSehatErrorInvalidQuery extends SatuSehatError {
  constructor(endpointName?: string, queryParams?: string[]) {
    super(
      `Invalid query parameters for endpoint: ${
        endpointName || "unknown"
      } - ${queryParams?.join(", ")} `,
      "INVALID_QUERY",
      400,
      undefined,
    );
  }
}

export class SatuSehatErrorFactory {
  static fromAxios(error: AxiosError): SatuSehatError {
    const status = error.response?.status;
    const payload = error.response?.data as
      | FhirError
      | FhirFaultError
      | undefined;

    const url = `${error.config?.method} : ${error.config?.baseURL || ""}${error.config?.url}`;

    let message = `HTTP ${status || "UNKNOWN"} ${url || "UNKNOWN_URL"}`;

    // cek pyaload as FHIR Error
    if (payload && "issue" in payload) {
      const issues = payload.issue
        .map(
          (i) =>
            `${i.severity || "unknown"} - ${i.code || "unknown"}${
              i.diagnostics ? `: diagnosyics -> ${i.diagnostics}` : ""
            }`,
        )
        .join(", ");
      message += ` | Issues: ${issues}`;
    } else if (payload && "fault" in payload) {
      message += ` | Fault: ${payload.fault}${
        payload.fault?.faultstring ? ` - ${payload.fault.faultstring}` : ""
      }`;
    } else if (payload && "Error" in payload) {
      message += ` | Error: ${payload.Error}${
        payload.ErrorCode ? ` - ${payload.ErrorCode}` : ""
      }`;
    } else if (error.message) {
      message += ` | Message: ${error.message}`;
    }

    console.error("❌ Api Error", {
      status,
      message,
      payload: JSON.stringify(payload, null, 2),
      url,
      method: error.config?.method,
    });

    const safeParsedOriginalError = (
      data: any,
      url?: string,
      method?: string,
    ): {
      url?: string;
      method?: string;
      response?: any;
    } => {
      const originalError: { url?: string; method?: string; response?: any } =
        {};
      if (url) originalError.url = url;
      if (method) originalError.method = method;
      if (data) originalError.response = data;
      return originalError;
    };

    console.log(message);

    return new SatuSehatError(
      message,
      error.code,
      status || 500,
      safeParsedOriginalError(payload, error.config?.url, error.config?.method),
    );
  }

  isAxiosError(error: unknown): error is import("axios").AxiosError {
    return axios.isAxiosError(error);
  }

  constructor(error: unknown) {
    if (this.isAxiosError(error)) {
      throw SatuSehatErrorFactory.fromAxios(error);
    }
    throw new SatuSehatError(
      (error as Error).message || "Unknown error",
      (error as SatuSehatError).code || "SATUSEHAT_ERROR",
      (error as SatuSehatError).statusCode || 500,
      (error as SatuSehatError).originalError || error,
    );
  }
}
