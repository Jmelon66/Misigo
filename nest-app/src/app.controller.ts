import { Controller, Get, Header, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthGard } from './common/injectable/auth.gard';
@Controller()
@UseGuards(AuthGard)
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/getHello')
  @Header('Cache-Control', 'private, max-age=100')
  getHello() {
    // console.log(request.cookies);
    return this.appService.getHello();
  }
}
