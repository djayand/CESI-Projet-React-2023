import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './ms-auth/ms-auth.module';

@Module({
  // Ajout du module AuthModule, on rajoutera ici les autres
  imports: [AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
