import { MigrationInterface, QueryRunner } from 'typeorm';

export class extension714656070187 implements MigrationInterface {
	name = ' extension1714656070187';

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp";`);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {}
}
