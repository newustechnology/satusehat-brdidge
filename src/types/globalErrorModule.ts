import axios, { AxiosError } from "axios";

export class SatuSehatError extends Error {
  constructor(
    message: string,
    public code?: string,
    public statusCode?: number,
    public originalError?: any
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
      undefined
    );
  }
}

export class SatuSehatErrorFactory {
  static fromAxios(error: AxiosError): SatuSehatError {
    const status = error.response?.status;
    const payload = error.response?.data;

    console.error("❌ OAuth Axios Error", {
      status,
      payload,
      url: error.config?.url,
      method: error.config?.method,
    });

    const safeParsedMessage = (data: any): string => {
      if (!data) return "Unknown error response from server";

      if (typeof data === "string") {
        return data;
      } else if (data.error_description) {
        return data.error_description;
      } else if (data.error && typeof data.error === "string") {
        return data.error;
      } else if (data.message) {
        return data.message;
      } else {
        return "Unknown error response from server";
      }
    };

    const safeParsedOriginalError = (
      data: any,
      url?: string,
      method?: string
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

    return new SatuSehatError(
      safeParsedMessage(payload),
      error.code,
      status || 500,
      safeParsedOriginalError(payload, error.config?.url, error.config?.method)
    );
  }

  isAxiosError(error: unknown): error is import("axios").AxiosError {
    return axios.isAxiosError(error);
  }

  constructor(error: unknown) {
    if (this.isAxiosError(error)) {
      SatuSehatErrorFactory.fromAxios(error);
    }
    throw new SatuSehatError(
      (error as Error).message || "Unknown error",
      (error as SatuSehatError).code || "SATUSEHAT_ERROR",
      (error as SatuSehatError).statusCode || 500,
      (error as SatuSehatError).originalError || error
    );
  }
}
