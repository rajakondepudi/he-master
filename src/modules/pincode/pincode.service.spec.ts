import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PinCodeService } from './pincode.service';
import { PinCode } from '../common/entities/pincode.entity';

describe('PinCodeService', () => {
  let service: PinCodeService;
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
          entities: [PinCode],
        }),
        TypeOrmModule.forFeature([PinCode]),
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
});
