import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1686121884922 implements MigrationInterface {
    name = 'Migration1686121884922'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "hospital" ("CREATED_BY" character varying, "CREATED_DATETIME" TIMESTAMP NOT NULL DEFAULT now(), "UPDATED_BY" character varying, "UPDATED_DATETIME" TIMESTAMP NOT NULL DEFAULT now(), "EFFECTIVE_DATE" TIMESTAMP, "EXPIRED_DATE" TIMESTAMP, "IS_ACTIVE" integer, "HOSPITAL_ID" SERIAL NOT NULL, "HOSPITAL_NAME" character varying NOT NULL, "HOSPITAL_TYPE" character varying, "ADDRESS" character varying NOT NULL, "PINCODE" character varying NOT NULL, "CITY_ID" integer, "STATE_ID" integer, "LATITUDE" character varying, "LONGITUDE" character varying, "EMAILID" character varying, "WEBSITE" character varying, "PHONE" character varying NOT NULL, "FAX" character varying, CONSTRAINT "UQ_f71a7f0c299e509fbc55cdb8864" UNIQUE ("HOSPITAL_NAME"), CONSTRAINT "UQ_328144ebd07773e793a0b5be2d0" UNIQUE ("ADDRESS"), CONSTRAINT "UQ_2872d09000cb92c70e3b88862b3" UNIQUE ("EMAILID"), CONSTRAINT "UQ_88badc3a938c19f4cddc221831d" UNIQUE ("WEBSITE"), CONSTRAINT "UQ_532c8a80fe6555948d8313da801" UNIQUE ("PHONE"), CONSTRAINT "PK_39748b6a1d128500c1b79eafea2" PRIMARY KEY ("HOSPITAL_ID"))`);
        await queryRunner.query(`CREATE TABLE "pin_code" ("CREATED_BY" character varying, "CREATED_DATETIME" TIMESTAMP NOT NULL DEFAULT now(), "UPDATED_BY" character varying, "UPDATED_DATETIME" TIMESTAMP NOT NULL DEFAULT now(), "EFFECTIVE_DATE" TIMESTAMP, "EXPIRED_DATE" TIMESTAMP, "IS_ACTIVE" integer, "ID" SERIAL NOT NULL, "PINCODE" character varying NOT NULL, "PINCODE_NAME" character varying, "CITY_ID" integer, "SEQ_NUM" character varying, CONSTRAINT "UQ_cafdbe55e4c2f4960805635f633" UNIQUE ("PINCODE"), CONSTRAINT "PK_96b540d8e172a680623d7611c00" PRIMARY KEY ("ID"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "pin_code"`);
        await queryRunner.query(`DROP TABLE "hospital"`);
    }

}
