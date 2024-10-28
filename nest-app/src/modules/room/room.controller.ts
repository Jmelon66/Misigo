/*
 * @Date: 2024-07-14 14:30:44
 * @LastEditors: Jmelon66 961255554@qq.com
 * @LastEditTime: 2024-08-18 14:25:33
 * @FilePath: \nest-app\src\modules\room\room.controller.ts
 * @Description: room control
 * @Author: ms-tlzksaoastkh
 */
import {
  Body,
  Controller,
  Get,
  Headers,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { RoomService } from './room.service';
import { AuthGard } from 'src/common/injectable/auth.gard';
@UseGuards(AuthGard)
@Controller('/room')
export class RoomController {
  constructor(private readonly roomService: RoomService) {}
  @Get('/ready')
  requestRoomInfo() {
    return this.roomService.requestRoomInfo();
  }
  @Post('/')
  createNewRoom(@Headers() header, @Body() roomInfo, @Req() request) {
    return this.roomService.createNewRoom(
      roomInfo.userId || request.cookies.userId,
      roomInfo.roomNo,
      roomInfo.name,
    );
  }
  @Get('/')
  getRoom(@Query() roomInfo) {
    return this.roomService.getRoom(roomInfo.roomNo);
  }
  @Post('/getRoomHostById')
  getRoomHostById(@Query() query) {
    return this.roomService.getRoomHostById(query.id);
  }
}
