import { Test } from '@nestjs/testing';
import { HealthService } from './health.service';
import { TerminusModule } from '@nestjs/terminus';
import { NotFoundException } from '@nestjs/common';

describe('HealthService', () => {
  let healthService: HealthService;
  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [TerminusModule],
      providers: [HealthService],
    }).compile();

    healthService = moduleRef.get<HealthService>(HealthService);
  });

  it('should be defined', () => {
    expect(healthService).toBeDefined();
  });

  describe('check', () => {
    it('should fail with random service', () => {
      try {
        healthService.check('random_service');
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
      }
    });
  });
});
