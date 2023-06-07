import path from 'path';
import { DataSource } from 'typeorm';
import Config from '../src/shared/config/app.config';

const config = Config() as Record<string, any>;

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: config.db.postgres.host,
  port: config.db.postgres.port,
  database: config.db.postgres.name,
  username: config.db.postgres.username,
  password: config.db.postgres.password,
  entities: [path.join(__dirname, '..', 'src', 'modules', '**', '*.entity.ts')],
  migrations: [path.join(__dirname, 'migrations', '*.ts')],
});
