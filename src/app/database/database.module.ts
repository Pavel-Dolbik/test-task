import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DatabaseService } from './database.service';
import { Client } from 'pg';
import {
  INIT_PROCEDURES_FUNCTIONS_AND_VIEWS,
  INIT_TABLES_AND_CONSTRAINTS,
  INSERT_INITIAL_DATA,
} from './database.queries';

const initTables = async (client: Client, configService: ConfigService) => {
  await client.connect();
  await client.query(INIT_TABLES_AND_CONSTRAINTS);
  await client.query(INIT_PROCEDURES_FUNCTIONS_AND_VIEWS);
  const insertInitialData = configService.get<string>('INSERT_INITIAL_DATA');

  if (insertInitialData === true.toString()) {
    await client.query(INSERT_INITIAL_DATA);
  }
};

const initDatabaseFactory = async (configService: ConfigService) => {
  const client = new Client({
    host: configService.get<string>('POSTGRES_HOST'),
    port: configService.get<number>('POSTGRES_PORT'),
    user: configService.get<string>('POSTGRES_USERNAME'),
    password: configService.get<string>('POSTGRES_PASSWORD'),
    database: configService.get<string>('POSTGRES_DATABASE'),
  });
  await initTables(client, configService);
  return client;
};

@Module({
  providers: [
    DatabaseService,
    {
      provide: 'POSTGRES_CLIENT',
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) =>
        await initDatabaseFactory(configService),
    },
  ],
  exports: ['POSTGRES_CLIENT', DatabaseService],
})
export class DatabaseModule {}
