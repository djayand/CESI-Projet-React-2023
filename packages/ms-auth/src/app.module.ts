
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './authentifier/authentifier.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'NY2AX202-2.numerilab-cesi.fr' /* process.env.DB_HOST */,
      port: 5000 /* +process.env.DB_PORT */,
      database: 'ms_auth_db' /* process.env.DB_NAME */,
      username: 'postgres' /* process.env.DB_USER */,
      password: 'P@$$w0rdCES1' /* process.env.DB_PASSWORD */,
      entities: ['dist/**/*.entity.{ts,js}'],
      synchronize: true, // never true in production!
      extra: {
        trustServerCertificate: true,
        encrypt: true,
        enableArithAbort: true,
      },
    }),
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}