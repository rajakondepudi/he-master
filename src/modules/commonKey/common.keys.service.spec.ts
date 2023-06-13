import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommonKeysService } from './common.keys.service';
import { CommonKeys } from '../common/entities/common.keys.entity';
import { TestDatabaseModule } from '../common/database/test.database.module';
describe('CommonKeysService', () => {
  let service: CommonKeysService;
  let module: TestingModule;

  beforeEach(async () => {
    module = await Test.createTestingModule({
      imports: [TestDatabaseModule, TypeOrmModule.forFeature([CommonKeys])],
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
