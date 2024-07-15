import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RoomModule } from './modules/room/room.module';
@Module({
  imports: [HttpModule, RoomModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
