import Redis from "ioredis";
import { BaseConfig } from "../../config/BaseConfig";
import { BaseService } from "../../core/BaseService";
import { OrganizationService } from "./module/organization.service";
import { PatientService } from "./module/patient.service";
import { LocationService } from "./module/location.service";

export class ResourceService extends BaseService {
  readonly organization!: OrganizationService;
  readonly patient!: PatientService;
  readonly location!: LocationService;
  constructor(config: BaseConfig, redisClient: Redis) {
    super(config, redisClient);

    this.organization = new OrganizationService(this);
    this.patient = new PatientService(this);
    this.location = new LocationService(this);
  }
}
