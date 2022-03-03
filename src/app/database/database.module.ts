import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DatabaseService } from './database.service';
import { Client } from 'pg';
import { INIT_TABLES_AND_CONSTRAINTS } from './database.queries';

const initTables = async (client: Client) => {
  await client.connect();
  await client.query(INIT_TABLES_AND_CONSTRAINTS);
  await client.end();
};

const initDatabaseFactory = async (configService: ConfigService) => {
  const client = new Client({
    host: configService.get<string>('POSTGRES_HOST'),
    port: configService.get<number>('POSTGRES_PORT'),
    user: configService.get<string>('POSTGRES_USERNAME'),
    password: configService.get<string>('POSTGRES_PASSWORD'),
    database: configService.get<string>('POSTGRES_DATABASE'),
  });
  await initTables(client);
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
})
export class DatabaseModule {}
