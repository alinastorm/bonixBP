import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ЭлектроннаяПочта } from './_commons/services/email/email.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, ЭлектроннаяПочта],
})
export class AppModule { }
