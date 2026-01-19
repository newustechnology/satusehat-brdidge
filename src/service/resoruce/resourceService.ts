import Redis from "ioredis";
import { BaseConfig } from "../../config/BaseConfig";
import { BaseService } from "../../core/BaseService";
import { OrganizationService } from "./module/organization.service";

export class ResourceService extends BaseService {
  readonly organization!: OrganizationService;
  constructor(config: BaseConfig, redisClient: Redis) {
    super(config, redisClient);

    this.organization = new OrganizationService(this);
  }
}
