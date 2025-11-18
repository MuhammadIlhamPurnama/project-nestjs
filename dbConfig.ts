import { Property } from "src/entities/property.entity";
import { PostgresConnectionOptions } from "typeorm/driver/postgres/PostgresConnectionOptions.js";

export const pgConfig:PostgresConnectionOptions = {
  type: "postgres",
  database:'project_nestjs',
  username: 'postgres',
  password: 'postgres',
  host:'localhost',
  port: 5432,
  entities: [__dirname + '/**/*.entity{.ts,.js}'],
  // synchronize: true, // to synchronize our schema with actual field in db. ok in dev but carefull in production. can cause permanent data loss, i
  // logging: true
}