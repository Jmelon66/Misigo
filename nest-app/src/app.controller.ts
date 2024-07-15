import { Controller, Get, Header } from '@nestjs/common';
import { AppService } from './app.service';
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/getHello')
  @Header('Cache-Control', 'private, max-age=100')
  getHello() {
    return this.appService.getHello();
  }
}
