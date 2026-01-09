import Redis from "ioredis";
import axios, { Axios, AxiosInstance, AxiosResponse } from "axios";
import { BaseConfig, baseUrls } from "../../config/BaseConfig";
import {
  SatuSehatErrorAuthError,
  SatuSehatErrorCacheError,
  SatuSehatErrorFactory,
  SatuSehatErrorInvalidQuery,
  SatuSehatErrorUrlNotFound,
} from "../../types/globalErrorModule";
import { OAuthTokenResponse } from "../../types/auth";
import { EndpointName, endpoints } from "../../config/enpoint";

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
      console.info("[SATUSEHAT] ✅ Redis connected")
    );

    this.redis.on("error", (err) =>
      console.error("[SATUSEHAT] ❌ Redis error:", err)
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
    ttlSeconds: number = 3600
  ): Promise<void> {
    try {
      const data =
        typeof value === "object" ? JSON.stringify(value) : String(value);

      await this.redis.set(this.buildKey(key), data, "EX", ttlSeconds);
    } catch (error) {
      throw new SatuSehatErrorCacheError(
        "Gagal menyimpan data ke Redis",
        error
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
    const cacheKey = "auth_token";

    const cachedToken = await this.get(cacheKey);
    if (cachedToken) return cachedToken;

    try {
      const { data } = await axios.post<OAuthTokenResponse>(
        `${this.url.auth}/accesstoken`,
        new URLSearchParams({
          grant_type: "client_credentials",
          client_id: this.config.client_id,
          client_secret: this.config.client_secret,
        }),
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );

      if (!data?.access_token) {
        throw new SatuSehatErrorAuthError("Token tidak valid");
      }

      const ttl = Math.max(Number(data.expires_in) - 60, 60);

      await this.set(cacheKey, data.access_token, ttl);

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

    const client = axios.create({
      baseURL: this.url.baseUrl,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

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
    name: EndpointName,
    params: Record<string, any> = {},
    query?: Record<string, any>,
    body?: Record<string, any>,
    headers?: Record<string, string>
  ): Promise<AxiosResponse<T>> {
    const endpointConfig = endpoints.find((e) => e.name === name);
    if (!endpointConfig) {
      throw new SatuSehatErrorUrlNotFound(name);
    }

    let path = endpointConfig.path as string;
    Object.entries(params).forEach(([key, value]) => {
      path = path.replace(`{${key}}`, String(value));
    });
    if (query && Object.keys(query).length > 0) {
      const queryKeys = Object.keys(query);
      const hasInvalidKey = queryKeys.some(
        (key) => !(endpointConfig.query as readonly string[]).includes(key)
      );
      if (hasInvalidKey) {
        throw new SatuSehatErrorInvalidQuery(name, queryKeys);
      }

      const queryString = new URLSearchParams(
        query as Record<string, string>
      ).toString();
      path += `?${queryString}`;
    }

    const client = await this.createClient();

    try {
      switch (endpointConfig.method as "GET" | "POST" | "PUT" | "DELETE") {
        case "GET":
          return client.get<T>(path, {
            ...(headers && { headers }),
          });

        case "POST":
          return client.post<T>(path, body, {
            ...(headers && { headers }),
          });
        case "PUT":
          return client.put<T>(path, body, {
            ...(headers && { headers }),
          });

        case "DELETE":
          return client.delete<T>(path, {
            data: body,
            ...(headers && { headers }),
          });

        default:
          throw new SatuSehatErrorUrlNotFound(name);
      }
    } catch (error) {
      throw new SatuSehatErrorFactory(error);
    }
  }
}
