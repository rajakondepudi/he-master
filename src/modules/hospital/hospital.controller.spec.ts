import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HospitalController } from './hospital.controller';
import { HospitalService } from './hospital.service';
import { Hospital } from '../common/entities/hospital.entity';
import { PinCode } from '../common/entities/pincode.entity';
import { City } from '../common/entities/city.entity';
import { State } from '../common/entities/state.entity';
import { PassportModule } from '@nestjs/passport';
const passportModule = PassportModule.register({ defaultStrategy: 'jwt' });
import { TestDatabaseModule } from '../common/database/test.database.module';
describe('Hospitalcontroller', () => {
  let controller: HospitalController;
  let module: TestingModule;
  beforeEach(async () => {
    module = await Test.createTestingModule({
      imports: [
        passportModule,
        TestDatabaseModule,
        TypeOrmModule.forFeature([Hospital, PinCode, City, State]),
      ],
      controllers: [HospitalController],
      providers: [HospitalService],
    }).compile();

    controller = module.get<HospitalController>(HospitalController);
  });

  afterAll(async () => {
    module.close();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
