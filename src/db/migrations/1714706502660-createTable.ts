import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTable1714706502660 implements MigrationInterface {
  name = 'CreateTable1714706502660';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "urls" DROP COLUMN "created_at"`);
    await queryRunner.query(
      `ALTER TABLE "urls" ADD "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`,
    );
    await queryRunner.query(`ALTER TABLE "urls" DROP COLUMN "updated_at"`);
    await queryRunner.query(
      `ALTER TABLE "urls" ADD "updated_at" TIMESTAMP WITH TIME ZONE DEFAULT now()`,
    );
    await queryRunner.query(`ALTER TABLE "urls" DROP COLUMN "deleted_at"`);
    await queryRunner.query(
      `ALTER TABLE "urls" ADD "deleted_at" TIMESTAMP WITH TIME ZONE`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "urls" DROP COLUMN "deleted_at"`);
    await queryRunner.query(`ALTER TABLE "urls" ADD "deleted_at" TIMESTAMP`);
    await queryRunner.query(`ALTER TABLE "urls" DROP COLUMN "updated_at"`);
    await queryRunner.query(
      `ALTER TABLE "urls" ADD "updated_at" TIMESTAMP DEFAULT now()`,
    );
    await queryRunner.query(`ALTER TABLE "urls" DROP COLUMN "created_at"`);
    await queryRunner.query(
      `ALTER TABLE "urls" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()`,
    );
  }
}
