import { Injectable, NotFoundException } from '@nestjs/common';
import {
  DiskHealthIndicator,
  HealthCheckService,
  HttpHealthIndicator,
  MemoryHealthIndicator,
  MicroserviceHealthIndicator,
  TypeOrmHealthIndicator,
} from '@nestjs/terminus';
import { HealthEnum } from './enums/health.enum';
import * as HealthConfig from '../../constants/health.endpoints';

@Injectable()
export class HealthService {
  constructor(
    private health: HealthCheckService,
    private db: TypeOrmHealthIndicator,
    private http: HttpHealthIndicator,
    private microservice: MicroserviceHealthIndicator,
    private memory: MemoryHealthIndicator,
    private disk: DiskHealthIndicator,
  ) {}

  check(service: string) {
    let response: any;
    switch (service) {
      case HealthEnum.Database:
        response = this.database();
        break;

      case HealthEnum.Http:
        response = this.httpCheck();
        break;

      case HealthEnum.Microservice:
        response = this.microserviceCheck();
        break;

      case HealthEnum.Memory:
        response = this.memoryCheck();
        break;

      case HealthEnum.Disk:
        response = this.diskCheck();
        break;

      default:
        throw new NotFoundException(`'${service}' is not a valid service to check health.`);
        break;
    }
    return response;
  }

  private database() {
    return this.health.check([() => this.db.pingCheck(HealthEnum.Database)]);
  }

  private httpCheck() {
    return this.health.check([() => this.http.pingCheck(HealthEnum.Http, HealthConfig.HTTP_PING_URL)]);
  }

  private microserviceCheck() {
    return this.health.check([() => this.microservice.pingCheck(HealthEnum.Microservice, HealthConfig.MICROSERVICE_OPTION)]);
  }

  private memoryCheck() {
    return this.health.check([() => this.memory.checkHeap(HealthEnum.Memory, HealthConfig.MEMORY_THRESHOLD)]);
  }

  private diskCheck() {
    return this.health.check([() => this.disk.checkStorage(HealthEnum.Disk, HealthConfig.STORAGE_OPTION)]);
  }
}
