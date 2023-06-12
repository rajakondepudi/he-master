import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommonKeysService } from './common.keys.service';
import { CommonKeys } from '../common/entities/common.keys.entity';

describe('CommonKeysService', () => {
  let service: CommonKeysService;
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
          entities: [CommonKeys],
        }),
        TypeOrmModule.forFeature([CommonKeys]),
      ],
      controllers: [],
      providers: [CommonKeysService],
    }).compile();

    service = module.get<CommonKeysService>(CommonKeysService);
  });

  afterAll(async () => {
    module.close();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
