import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTable1714497001305 implements MigrationInterface {
  name = 'CreateTable1714497001305';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "users" ("id" SERIAL NOT NULL, "name" character varying(100) NOT NULL, "email" character varying(70) NOT NULL, "password" character varying(255) NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "urls" ("id" SERIAL NOT NULL, "original_url" character varying(255) NOT NULL, "short_url" character varying(30) NOT NULL, "clicks" integer NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP NOT NULL DEFAULT now(), "userId" integer, CONSTRAINT "REL_3088b58113241e3f5f6c10cf1f" UNIQUE ("userId"), CONSTRAINT "PK_eaf7bec915960b26aa4988d73b0" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "urls" ADD CONSTRAINT "FK_3088b58113241e3f5f6c10cf1fb" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "urls" DROP CONSTRAINT "FK_3088b58113241e3f5f6c10cf1fb"`,
    );
    await queryRunner.query(`DROP TABLE "urls"`);
    await queryRunner.query(`DROP TABLE "users"`);
  }
}
