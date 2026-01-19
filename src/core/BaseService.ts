import Redis from "ioredis";
import axios, { Axios, AxiosError, AxiosInstance, AxiosResponse } from "axios";
import { BaseConfig, baseUrls } from "../config/BaseConfig";
import {
  SatuSehatErrorAuthError,
  SatuSehatErrorCacheError,
  SatuSehatErrorFactory,
  SatuSehatErrorInvalidQuery,
  SatuSehatErrorOperationOutcome,
  SatuSehatErrorUrlNotFound,
} from "../types/globalErrorModule";
import { OAuthTokenResponse } from "../types/auth";
import { FhirError } from "../types/dto/core";

const CACHEKEY = "auth_token";

export class BaseService {
  private readonly url: { auth: string; baseUrl: string };
  private readonly redis: Redis;
  private readonly redisPrefix: string;
  private readonly config: BaseConfig;

  constructor(config: BaseConfig, redisClient: Redis) {
    this.config = config;
    this.redis = redisClient;

    this.url = {
      auth: baseUrls[config.module].auth,
      baseUrl: baseUrls[config.module].baseUrl,
    };

    this.redisPrefix = `satusehat_bridge_${config.client_id}`;

    this.redis.on("connect", () =>
      console.info("[SATUSEHAT] ✅ Redis connected"),
    );

    this.redis.on("error", (err) =>
      console.error("[SATUSEHAT] ❌ Redis error:", err),
    );
  }

  /* ============================================================
     REDIS HELPERS
     ============================================================ */

  private buildKey(key: string): string {
    return `${this.redisPrefix}:${key}`;
  }

  private async set<T>(
    key: string,
    value: T,
    ttlSeconds: number = 3600,
  ): Promise<void> {
    try {
      const data =
        typeof value === "object" ? JSON.stringify(value) : String(value);

      await this.redis.set(this.buildKey(key), data, "EX", ttlSeconds);
    } catch (error) {
      throw new SatuSehatErrorCacheError(
        "Gagal menyimpan data ke Redis",
        error,
      );
    }
  }

  private async get(key: string): Promise<string | null> {
    try {
      return await this.redis.get(this.buildKey(key));
    } catch (error) {
      console.error("[REDIS GET ERROR]", error);
      return null;
    }
  }

  private async del(key: string): Promise<void> {
    try {
      await this.redis.del(this.buildKey(key));
    } catch (error) {
      throw new SatuSehatErrorCacheError("Gagal menghapus data Redis", error);
    }
  }

  /* ============================================================
     AUTH TOKEN
     ============================================================ */

  protected async generateAuthToken(): Promise<string> {
    const cachedToken = await this.get(CACHEKEY);
    if (cachedToken) return cachedToken;

    try {
      const { data } = await axios.post<OAuthTokenResponse>(
        `${this.url.auth}/accesstoken?grant_type=client_credentials`,
        new URLSearchParams({
          client_id: this.config.client_id,
          client_secret: this.config.client_secret,
        }),
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        },
      );

      if (!data?.access_token) {
        throw new SatuSehatErrorAuthError("Token tidak valid");
      }

      const ttl = Math.max(Number(data.expires_in) - 60, 60);

      await this.set(CACHEKEY, data.access_token, ttl);

      return data.access_token;
    } catch (error) {
      throw new SatuSehatErrorFactory(error);
    }
  }

  /* ============================================================
     AXIOS CLIENT
     ============================================================ */

  private async createClient(): Promise<AxiosInstance> {
    const token = await this.generateAuthToken();

    console.log("✅ Generated Auth Token:", token);

    const client = axios.create({
      baseURL: this.url.baseUrl,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    // interceptors response
    client.interceptors.response.use(
      (response: AxiosResponse) => {
        if (
          !response.data ||
          response.data.resourceType === "OperationOutcome"
        ) {
          const data = response.data as FhirError;

          const message =
            data.issue
              ?.map(
                (i) =>
                  `${i.severity} - ${i.code}${i.diagnostics ? `: ${i.diagnostics}` : ""}`,
              )
              .join(", ") || "FHIR OperationOutcome";

          const error = new AxiosError(
            message,
            "FHIR_OPERATION_OUTCOME",
            response.config,
            undefined,
            response,
          );

          return Promise.reject(error); // ❗ INI BARU BENAR
        }

        return response;
      },
      async (error: AxiosError) => {
        if (error.status === 401) {
          await this.del(CACHEKEY);
        }
        return Promise.reject(error); // ❗ WAJIB return
      },
    );

    return client;
  }

  /* ============================================================
     API CALLER
     ============================================================ */

  /**
   * Call Endpoint
   * @param name
   * @param params
   * @param body
   * @returns
   */
  public async callEndpoint<T>(
    endpoint: string,
    method: "GET" | "POST" | "PUT" | "DELETE",
    body?: Record<string, any>,
    headers?: Record<string, string>,
  ): Promise<AxiosResponse<T>> {
    let path = endpoint;

    try {
      const client = await this.createClient();
      switch (method) {
        case "GET":
          return await client.get<T>(path, {
            ...(headers && { headers }),
          });

        case "POST":
          return await client.post<T>(path, body, {
            ...(headers && { headers }),
          });
        case "PUT":
          return await client.put<T>(path, body, {
            ...(headers && { headers }),
          });

        case "DELETE":
          return await client.delete<T>(path, {
            data: body,
            ...(headers && { headers }),
          });

        default:
          throw new SatuSehatErrorUrlNotFound(endpoint);
      }
    } catch (error) {
      throw new SatuSehatErrorFactory(error);
    }
  }
}
