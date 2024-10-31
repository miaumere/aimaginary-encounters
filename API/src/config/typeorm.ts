import { registerAs } from '@nestjs/config';
import { config as dotenvConfig } from 'dotenv';
import { DataSource, DataSourceOptions } from 'typeorm';

if (process.env.NODE_ENV !== 'development') {
	console.log('Using production environment');
	dotenvConfig({ path: '.env' });
} else {
	console.log('Using development environment');
	dotenvConfig({ path: '.env.development' });
}

const config = {
	type: 'postgres',
	host: process.env.DB_HOST,
	port: parseInt(process.env.DB_PORT, 10),
	username: process.env.DB_USERNAME,
	password: process.env.DB_PASSWORD,
	database: process.env.DB_DATABASE,
	entities: [__dirname + '/**/*.entity{.ts,.js}'],
	migrationsTableName: 'migrations',
	migrations: [__dirname + '/../migrations/*{.ts,.js}'],
	autoLoadEntities: true,
	// Setting synchronize: true shouldn't be used in production - otherwise you can lose production data.
	synchronize: process.env.NODE_ENV === 'development',
};

export default registerAs('typeorm', () => config);
export const connectionSource = new DataSource(config as DataSourceOptions);
