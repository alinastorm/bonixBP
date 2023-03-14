import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Email } from './_commons/services/email/email.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, Email],
})
export class AppModule { }
