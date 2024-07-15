/*
 * @Date: 2024-07-14 14:30:44
 * @LastEditors: git config user.name && git config user.email
 * @LastEditTime: 2024-07-15 10:19:19
 * @FilePath: \nest-app\src\modules\room.controller.ts
 * @Description: room control
 * @Author: ms-tlzksaoastkh
 */
import { Controller, Post } from '@nestjs/common';
import { RoomService } from './room.service';
@Controller()
export class RoomController {
  constructor(private readonly roomService: RoomService) {}

  @Post('/getRoomId')
  getHello() {
    return this.roomService.getRoomId();
  }
}
