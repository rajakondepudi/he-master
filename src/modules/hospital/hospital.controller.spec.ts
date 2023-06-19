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
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
describe('Hospitalcontroller', () => {
  let controller: HospitalController;
  let module: TestingModule;
  let app: INestApplication;
  beforeEach(async () => {
    module = await Test.createTestingModule({
      imports: [passportModule, TestDatabaseModule, TypeOrmModule.forFeature([Hospital, PinCode, City, State])],
      controllers: [HospitalController],
      providers: [HospitalService],
    }).compile();

    controller = module.get<HospitalController>(HospitalController);
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

  it('get hospital by id will return success', async () => {
    const response = await request(app.getHttpServer()).get('/hospitals/1').expect(200);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty('HOSPITAL_NAME');
    expect(response.body).toHaveProperty('WEBSITE');
    expect(response.body).toHaveProperty('PHONE');
    expect(response.body).toHaveProperty('ADDRESS');
    expect(response.body).toHaveProperty('PINCODE');
    expect(response.body).toHaveProperty('CITY_NAME');
    expect(response.body).toHaveProperty('STATE_NAME');
  });

  it('get hospitals by hospital id will return error ', async () => {
    const response = await request(app.getHttpServer()).get('/hospitals/0').expect(404);
  });

  it('get all hospitals  will return success', async () => {
    const response = await request(app.getHttpServer()).get('/hospitals').expect(200);
    expect(response.body.data).toBeInstanceOf(Array);
    response.body.data.forEach((element) => {
      expect(element).toHaveProperty('HOSPITAL_NAME');
      expect(element).toHaveProperty('WEBSITE');
      expect(element).toHaveProperty('PHONE');
      expect(element).toHaveProperty('ADDRESS');
      expect(element).toHaveProperty('PINCODE');
      expect(element).toHaveProperty('CITY_NAME');
      expect(element).toHaveProperty('STATE_NAME');
    });
  });
});
