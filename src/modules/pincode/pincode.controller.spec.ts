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

  it('get pincode by pincode will return success', async () => {
    const response = await request(app.getHttpServer()).get('/pincodes/201002').expect(200);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty('PINCODE');
    expect(response.body).toHaveProperty('PINCODE_NAME');
    expect(response.body).toHaveProperty('CITY_NAME');
    expect(response.body).toHaveProperty('STATE_NAME');
  });

  it('get pincode by pincode will return error ', async () => {
    const response = await request(app.getHttpServer()).get('/pincodes/1').expect(404);
  });

  it('get all pincode will return success', async () => {
    const response = await request(app.getHttpServer()).get('/pincodes').expect(200);
    expect(response.body).toBeInstanceOf(Array);
    response.body.forEach((element) => {
      expect(element).toHaveProperty('PINCODE');
      expect(element).toHaveProperty('PINCODE_NAME');
      expect(element).toHaveProperty('CITY_NAME');
      expect(element).toHaveProperty('STATE_NAME');
    });
  });

  it('pincode starts with api will return success', async () => {
    const response = await request(app.getHttpServer()).get('/pincodes/start/2').expect(200);
    expect(response.body).toBeInstanceOf(Array);
    response.body.forEach((element) => {
      expect(element).toHaveProperty('PINCODE');
      expect(element).toHaveProperty('PINCODE_NAME');
      expect(element).toHaveProperty('CITY_NAME');
      expect(element).toHaveProperty('STATE_NAME');
    });
  });

  it('pincode starts with api will return empty response', async () => {
    const response = await request(app.getHttpServer()).get('/pincodes/start/0').expect(200);
    expect(response.body).toBeInstanceOf(Array);
    expect(response.body).toEqual([]);
  });
});
