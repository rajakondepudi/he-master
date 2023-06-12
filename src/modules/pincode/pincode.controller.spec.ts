import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PinCodeController } from './pincode.controller';
import { PinCodeService } from './pincode.service';
import { City } from '../common/entities/city.entity';
import { State } from '../common/entities/state.entity';
import { PinCode } from '../common/entities/pincode.entity';
import { PassportModule } from '@nestjs/passport';
const passportModule = PassportModule.register({ defaultStrategy: 'jwt' });
describe('PinCodeController', () => {
  let controller: PinCodeController;
  let module: TestingModule;
  beforeEach(async () => {
    module = await Test.createTestingModule({
      imports: [
        passportModule,
        TypeOrmModule.forRoot({
          type: 'postgres',
          host: '127.0.0.1',
          username: 'postgres',
          password: 'admin',
          database: 'postgres',
          entities: [State, City, PinCode],
        }),
        TypeOrmModule.forFeature([State, City, PinCode]),
      ],
      controllers: [PinCodeController],
      providers: [PinCodeService],
    }).compile();

    controller = module.get<PinCodeController>(PinCodeController);
  });

  afterAll(async () => {
    module.close();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
