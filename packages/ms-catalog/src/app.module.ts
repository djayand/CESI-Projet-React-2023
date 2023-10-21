import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppService } from './app.service';
import { AppController } from './app.controller';

import { MenusModule } from './menus/menus.module';
import { ArticlesModule } from './articles/articles.module';

@Module({
  imports: [
    // Database information
    TypeOrmModule.forRoot({
      type: 'mongodb',
      url: 'mongodb+srv://Admin:pp6YgvaKGXqOiLMW@ceseat.djtt1e3.mongodb.net/?retryWrites=true&w=majority',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
      useUnifiedTopology: true,
      useNewUrlParser: true,
    }),
    MenusModule,
    ArticlesModule,
  ],
  providers: [AppService],
  controllers: [AppController],
})
export class AppModule {}
