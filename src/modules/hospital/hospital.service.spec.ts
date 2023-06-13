import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HospitalService } from './hospital.service';
import { Hospital } from '../common/entities/hospital.entity';
import { PinCode } from '../common/entities/pincode.entity';
import { City } from '../common/entities/city.entity';
import { State } from '../common/entities/state.entity';
import { TestDatabaseModule } from '../common/database/test.database.module';
describe('Hospitalservice', () => {
  let service: HospitalService;
  let module: TestingModule;

  beforeEach(async () => {
    module = await Test.createTestingModule({
      imports: [
        TestDatabaseModule,
        TypeOrmModule.forFeature([Hospital, PinCode, State, City]),
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
