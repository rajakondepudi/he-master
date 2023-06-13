import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PinCodeService } from './pincode.service';
import { City } from '../common/entities/city.entity';
import { State } from '../common/entities/state.entity';
import { PinCode } from '../common/entities/pincode.entity';
import { TestDatabaseModule } from '../common/database/test.database.module';
describe('PinCodeService', () => {
  let service: PinCodeService;
  let module: TestingModule;

  beforeEach(async () => {
    module = await Test.createTestingModule({
      imports: [
        TestDatabaseModule,
        TypeOrmModule.forFeature([State, City, PinCode]),
      ],
      controllers: [],
      providers: [PinCodeService],
    }).compile();

    service = module.get<PinCodeService>(PinCodeService);
  });

  afterAll(async () => {
    module.close();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('findPincodeStartsWith should be defined', () => {
    expect(service.findPincodeStartsWith).toBeDefined();
  });
});
