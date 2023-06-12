import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommonKeysController } from './common.keys.controller';
import { CommonKeysService } from './common.keys.service';
import { CommonKeys } from '../common/entities/common.keys.entity';
import { PassportModule } from '@nestjs/passport';
const passportModule = PassportModule.register({ defaultStrategy: 'jwt' });
describe('CommonKeysController', () => {
  let controller: CommonKeysController;
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
          entities: [CommonKeys],
        }),
        TypeOrmModule.forFeature([CommonKeys]),
      ],
      controllers: [CommonKeysController],
      providers: [CommonKeysService],
    }).compile();

    controller = module.get<CommonKeysController>(CommonKeysController);
  });

  afterAll(async () => {
    module.close();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
