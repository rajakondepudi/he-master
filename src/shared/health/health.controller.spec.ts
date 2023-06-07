import { Test } from '@nestjs/testing';
import { HealthController } from './health.controller';
import { TerminusModule } from '@nestjs/terminus';
import { HealthService } from './health.service';
import { NotFoundException } from '@nestjs/common';

describe('HealthController', () => {
  let healthController: HealthController;
  let healthService: HealthService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [TerminusModule],
      controllers: [HealthController], // Add
      providers: [HealthService], // Add
    }).compile();

    healthController = moduleRef.get<HealthController>(HealthController);
    healthService = moduleRef.get<HealthService>(HealthService);
  });

  it('should be defined', () => {
    expect(healthController).toBeDefined();
  });

  describe('check', () => {
    it('should succeed', () => {
      const result = { status: 'ok', info: { disk: { status: 'up' } }, error: {}, details: { disk: { status: 'up' } } };
      jest.spyOn(healthService, 'check').mockImplementation(() => result);
      expect(healthController.check('disk')).toBe(result);
    });
    it('should fail', () => {
      try {
        healthController.check('random_service');
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
      }
    });
  });
});
