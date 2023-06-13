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
import { ParsedRequest } from '@nestjsx/crud';

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
    const data = {
      CREATED_BY: null,
      CREATED_DATETIME: '2023-06-13T05:34:21.699Z',
      UPDATED_BY: null,
      UPDATED_DATETIME: '2023-06-13T05:34:21.699Z',
      EFFECTIVE_DATE: '2023-07-06T18:30:00.000Z',
      EXPIRED_DATE: null,
      IS_ACTIVE: 1,
      ID: 1,
      PINCODE: 201203,
      PINCODE_NAME: 'noida',
      SEQ_NUM: null,
      CITY_NAME: 'Faleda - Gautam Buddha Nagar',
      STATE_NAME: 'Uttar Pradesh',
    };
    const response = await request(app.getHttpServer()).get('/pincodes/201203').expect(200);
    expect(response.body).toEqual(data);
  });

  it('getone return error ', async () => {
    const response = await request(app.getHttpServer()).get('/pincodes/1').expect(404);
  });

  it('getMany', async () => {
    const data = [
      {
        CREATED_BY: null,
        CREATED_DATETIME: '2023-06-13T05:34:21.699Z',
        UPDATED_BY: null,
        UPDATED_DATETIME: '2023-06-13T05:34:21.699Z',
        EFFECTIVE_DATE: '2023-07-06T18:30:00.000Z',
        EXPIRED_DATE: null,
        IS_ACTIVE: 1,
        ID: 1,
        PINCODE: 201203,
        PINCODE_NAME: 'noida',
        SEQ_NUM: null,
        CITY_NAME: 'Faleda - Gautam Buddha Nagar',
        STATE_NAME: 'Uttar Pradesh',
      },
    ];
    const response = await request(app.getHttpServer()).get('/pincodes').expect(200);
    expect(response.body).toEqual(data);
  });

  it('getMany', async () => {
    const data = [
      {
        CREATED_BY: null,
        CREATED_DATETIME: '2023-06-13T05:34:21.699Z',
        UPDATED_BY: null,
        UPDATED_DATETIME: '2023-06-13T05:34:21.699Z',
        EFFECTIVE_DATE: '2023-07-06T18:30:00.000Z',
        EXPIRED_DATE: null,
        IS_ACTIVE: 1,
        ID: 1,
        PINCODE: 201203,
        PINCODE_NAME: 'noida',
        SEQ_NUM: null,
        CITY_NAME: 'Faleda - Gautam Buddha Nagar',
        STATE_NAME: 'Uttar Pradesh',
      },
    ];
    const response = await request(app.getHttpServer()).get('/pincodes/start/2').expect(200);
    expect(response.body).toEqual(data);
  });

  it('getMany', async () => {
    const response = await request(app.getHttpServer()).get('/pincodes/start/1').expect(200);
    expect(response.body).toEqual([]);
  });
});
