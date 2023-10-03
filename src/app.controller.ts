import { Controller, Get } from '@nestjs/common';
import { AppModule } from './app.module';
@Controller()
export class AppController {
  constructor() {}

  @Get()
  getHello(): string {
    return 'Hello World!';
  }
}