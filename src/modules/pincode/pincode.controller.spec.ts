import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PinCodeController } from './pincode.controller';
import { PinCodeService } from './pincode.service';
import { City } from '../common/entities/city.entity';
import { State } from '../common/entities/state.entity';
import { PinCode } from '../common/entities/pincode.entity';
import { PassportModule } from '@nestjs/passport';
import { TestDatabaseModule } from '../common/database/test.database.module';
const passportModule = PassportModule.register({ defaultStrategy: 'jwt' });
import request from 'supertest';
import { INestApplication } from '@nestjs/common';
import * as data from './../../shared/testData/mock.pincode.json';

describe('PinCodeController', () => {
  let app: INestApplication;
  let controller: PinCodeController;
  let module: TestingModule;
  beforeEach(async () => {
    module = await Test.createTestingModule({
      imports: [passportModule, TestDatabaseModule, TypeOrmModule.forFeature([State, City, PinCode])],
      controllers: [PinCodeController],
      providers: [PinCodeService],
    }).compile();

    controller = module.get<PinCodeController>(PinCodeController);
    app = module.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    module.close();
    await app.close();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('findPincodeStartsWith should be defined', () => {
    expect(controller.findPincodeStartsWith).toBeDefined();
  });

  it('should be defined', () => {
    expect(controller.getOne).toBeDefined();
  });

  it('should be defined', () => {
    expect(controller.getMany).toBeDefined();
  });

  it('getone', async () => {
    const response = await request(app.getHttpServer()).get('/pincodes/201203').expect(200);
    expect(response.body).toEqual(data.oneRecord);
  });

  it('getone return error ', async () => {
    const response = await request(app.getHttpServer()).get('/pincodes/1').expect(404);
  });

  it('getMany', async () => {
    const response = await request(app.getHttpServer()).get('/pincodes').expect(200);
    expect(response.body).toBeInstanceOf(Array)
  });

  it('getMany', async () => {
    const response = await request(app.getHttpServer()).get('/pincodes/start/2').expect(200);
    expect(response.body).toBeInstanceOf(Array)
  });

  it('getMany', async () => {
    const response = await request(app.getHttpServer()).get('/pincodes/start/1').expect(200);
    expect(response.body).toEqual([]);
  });
});
