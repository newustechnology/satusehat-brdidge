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

export class SatuSehatErrorFactory {
  static fromAxios(error: any): SatuSehatError {
    return new SatuSehatError(
      error.message || "Terjadi kesalahan pada request",
      error.code || "BPJS_BRIDGE_ERROR",
      error.status || 500,
      error
    );
  }
}
