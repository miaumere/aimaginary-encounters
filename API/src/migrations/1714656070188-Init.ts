import { MigrationInterface, QueryRunner } from 'typeorm';

export class init1714656070188 implements MigrationInterface {
	name = ' init1714656070188';

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`CREATE TYPE "public"."chat_character1attitude_enum" AS ENUM('0', '1', '2', '3', '4', '5', '6', '7')`
		);
		await queryRunner.query(
			`CREATE TYPE "public"."chat_character2attitude_enum" AS ENUM('0', '1', '2', '3', '4', '5', '6', '7')`
		);
		await queryRunner.query(
			`CREATE TABLE "chat" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(50) NOT NULL, "additionalContext" character varying(250), "character1Attitude" "public"."chat_character1attitude_enum" NOT NULL DEFAULT '0', "character2Attitude" "public"."chat_character2attitude_enum", "isCharacter2CurrentUser" boolean NOT NULL DEFAULT false, "createdAt" TIMESTAMP NOT NULL, "character1Id" uuid, "character2Id" uuid, CONSTRAINT "PK_9d0b2ba74336710fd31154738a5" PRIMARY KEY ("id"))`
		);
		await queryRunner.query(
			`CREATE TABLE "character" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(50) NOT NULL, "age" character varying(10), "gender" character varying(50), "backstory" character varying(250) NOT NULL, "positiveTraits" character varying(50) NOT NULL, "negativeTraits" character varying(50) NOT NULL, "skills" character varying(50) NOT NULL, "image" character varying, "color" character varying(8) NOT NULL, "createdAt" TIMESTAMP NOT NULL, CONSTRAINT "PK_6c4aec48c564968be15078b8ae5" PRIMARY KEY ("id"))`
		);
		await queryRunner.query(
			`CREATE TABLE "message" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "content" character varying NOT NULL, "sentDate" TIMESTAMP NOT NULL, "authorId" uuid, "chatId" uuid, CONSTRAINT "PK_ba01f0a3e0123651915008bc578" PRIMARY KEY ("id"))`
		);
		await queryRunner.query(
			`ALTER TABLE "chat" ADD CONSTRAINT "FK_c5b56d1ea8d26efd0a83a7d9135" FOREIGN KEY ("character1Id") REFERENCES "character"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
		);
		await queryRunner.query(
			`ALTER TABLE "chat" ADD CONSTRAINT "FK_5f69d15e88ba0eb01cf421c37cc" FOREIGN KEY ("character2Id") REFERENCES "character"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
		);
		await queryRunner.query(
			`ALTER TABLE "message" ADD CONSTRAINT "FK_c72d82fa0e8699a141ed6cc41b3" FOREIGN KEY ("authorId") REFERENCES "character"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
		);
		await queryRunner.query(
			`ALTER TABLE "message" ADD CONSTRAINT "FK_619bc7b78eba833d2044153bacc" FOREIGN KEY ("chatId") REFERENCES "chat"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`ALTER TABLE "message" DROP CONSTRAINT "FK_619bc7b78eba833d2044153bacc"`
		);
		await queryRunner.query(
			`ALTER TABLE "message" DROP CONSTRAINT "FK_c72d82fa0e8699a141ed6cc41b3"`
		);
		await queryRunner.query(
			`ALTER TABLE "chat" DROP CONSTRAINT "FK_5f69d15e88ba0eb01cf421c37cc"`
		);
		await queryRunner.query(
			`ALTER TABLE "chat" DROP CONSTRAINT "FK_c5b56d1ea8d26efd0a83a7d9135"`
		);
		await queryRunner.query(`DROP TABLE "message"`);
		await queryRunner.query(`DROP TABLE "character"`);
		await queryRunner.query(`DROP TABLE "chat"`);
		await queryRunner.query(
			`DROP TYPE "public"."chat_character2attitude_enum"`
		);
		await queryRunner.query(
			`DROP TYPE "public"."chat_character1attitude_enum"`
		);
	}
}
