/*
 * @Date: 2024-07-14 14:30:44
 * @LastEditors: Jmelon66 961255554@qq.com
 * @LastEditTime: 2024-07-19 17:06:21
 * @FilePath: \nest-app\src\modules\room\room.controller.ts
 * @Description: room control
 * @Author: ms-tlzksaoastkh
 */
import { Body, Controller, Get, Headers, Post, Query } from '@nestjs/common';
import { RoomService } from './room.service';
@Controller('/room')
export class RoomController {
  constructor(private readonly roomService: RoomService) {}
  @Get('/ready')
  requestRoomInfo() {
    return this.roomService.requestRoomInfo();
  }
  @Post('/')
  createNewRoom(@Headers() header, @Body() roomInfo) {
    return this.roomService.createNewRoom(
      roomInfo.userid || header.userid,
      roomInfo.roomNo,
      roomInfo.name,
    );
  }
  @Get('/')
  getHello() {
    return this.roomService.getRoomId();
  }
  @Post('/getRoomHostById')
  getRoomHostById(@Query() query) {
    return this.roomService.getRoomHostById(query.id);
  }
}
