import Redis from "ioredis";
import { BaseConfig, baseUrls } from "../../config/BaseConfig";
import {
  SatuSehatErrorAuthError,
  SatuSehatErrorCacheError,
} from "../../lib/ErrorModule";

export class BaseService {
  private url: { auth: string; baseUrl: string };
  private redisClient: Redis | null = null;
  private defaultRedisKeyPrefix = "satusehat_bridge";

  constructor(config: BaseConfig, redisClient: Redis) {
    this.url = {
      auth: baseUrls[config.module].auth,
      baseUrl: baseUrls[config.module].baseUrl,
    };

    this.redisClient = redisClient;

    this.redisClient.on("connect", () => {
      console.info("[BRIDGE FKTP BPJS] => ✅ Redis connected");
    });

    this.redisClient.on("error", (err: Error) => {
      console.error("[BRIDGE FKTP BPJS] => ❌ Redis error:", err);
    });

    this.defaultRedisKeyPrefix =
      this.defaultRedisKeyPrefix + "_" + config.client_id + ":";
  }

  /**
   * Menyimpan data ke Redis dengan TTL (time-to-live)
   * @param key - Kunci data
   * @param value - Data yang akan disimpan
   * @param expInSecond - Waktu kadaluarsa dalam detik (default: 3600)
   */
  private async set<T>(
    key: string,
    value: T,
    expInSecond: number = 3600
  ): Promise<void> {
    if (typeof expInSecond !== "number") {
      expInSecond = 3600;
    }
    try {
      const data =
        typeof value === "object" ? JSON.stringify(value) : String(value);
      await this.redisClient!.set(
        this.defaultRedisKeyPrefix + ":" + key,
        data,
        "EX",
        expInSecond
      );
    } catch (error) {
      console.error("❌ Redis set error:", error);
      throw new SatuSehatErrorCacheError(
        "Gagal menyimpan data ke cache",
        error
      );
    }
  }

  /**
   * Mengambil data dari Redis
   * @param key - Kunci data
   * @returns Data dari Redis atau null jika tidak ditemukan
   */
  private async get(key: string): Promise<string | null> {
    try {
      const data = await this.redisClient!.get(
        this.defaultRedisKeyPrefix + ":" + key
      );
      if (data) {
        console.info(`🔍 Redis GET: ${this.defaultRedisKeyPrefix + key}`);
        return data;
      }
      return null;
    } catch (error) {
      console.error("❌ Redis get error:", error);
      return null;
    }
  }

  /**
   * Menghapus data dari Redis
   * @param key - Kunci data
   */
  private async del(key: string): Promise<void> {
    try {
      await this.redisClient!.del(this.defaultRedisKeyPrefix + ":" + key);
      console.info(`🗑️ Redis DEL: ${this.defaultRedisKeyPrefix + key}`);
    } catch (error) {
      console.error("❌ Redis del error:", error);
      throw new SatuSehatErrorCacheError("Gagal menghapus data cache", error);
    }
  }

  /**
   *
   * @param pattern - Pola kunci untuk menghapus (misal: 'user_*' untuk menghapus semua kunci yang diawali 'user_')
   * Menghapus beberapa kunci berdasarkan pola (pattern)
   */
  private async deleteKeysByPattern(pattern: string) {
    try {
      let cursor = "0";
      pattern = this.defaultRedisKeyPrefix + ":" + pattern;

      do {
        const [nextCursor, foundKeys] = await this.redisClient!.scan(
          cursor,
          "MATCH",
          pattern,
          "COUNT",
          100
        );
        cursor = nextCursor;
        if (foundKeys.length > 0) {
          await this.redisClient!.del(...foundKeys);
        }
      } while (cursor !== "0");
    } catch (error) {
      console.error("❌ Redis delete by pattern error:", error);
      throw new SatuSehatErrorCacheError(
        "Gagal menghapus data cache berdasarkan pattern",
        error
      );
    }
  }

  /**
   * Membersihkan seluruh cache Redis
   */
  private async flushAll(): Promise<void> {
    try {
      await this.redisClient!.flushall();
      console.info("🧹 Redis cache cleared!");
    } catch (error) {
      console.error("❌ Redis flush error:", error);
      throw new SatuSehatErrorCacheError("Gagal membersihkan cache", error);
    }
  }

  protected async GenerateTokenAuthUrl(): Promise<{ token: string }> {
    const key = this.defaultRedisKeyPrefix + "auth_token";

    try {
      const toketFormChace = await this.get(key);
      if (toketFormChace) {
        return { token: toketFormChace };
      }

      return { token: `${this.url.auth}/oauth2/token` };
    } catch (error) {
      throw new SatuSehatErrorAuthError(
        "Gagal menghasilkan URL otentikasi token",
        error
      );
    }
  }
}
