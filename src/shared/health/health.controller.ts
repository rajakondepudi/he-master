import { Controller, Get, Param } from '@nestjs/common';
import { HealthCheck } from '@nestjs/terminus';
import { HealthService } from './health.service';

@Controller('health')
export class HealthController {
  constructor(private healthService: HealthService) {}

  @Get(':service')
  @HealthCheck()
  check(@Param('service') service: string) {
    return this.healthService.check(service);
  }
}
