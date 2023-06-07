import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HospitalService } from './hospital.service';
import { Hospital } from '../common/entities/hospital.entity';

describe('PinCodeService', () => {
  let service: HospitalService;
  let module: TestingModule;

  beforeEach(async () => {
    module = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({
          type: 'postgres',
          host: '127.0.0.1',
          username: 'postgres',
          password: 'admin',
          database: 'postgres',
          entities: [Hospital],
        }),
        TypeOrmModule.forFeature([Hospital]),
      ],
      controllers: [],
      providers: [HospitalService],
    }).compile();

    service = module.get<HospitalService>(HospitalService);
  });

  afterAll(async () => {
    module.close();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
