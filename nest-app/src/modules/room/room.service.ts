/*
 * @Date: 2024-07-14 14:30:55
 * @LastEditors: Jmelon66 961255554@qq.com
 * @LastEditTime: 2024-07-15 14:42:15
 * @FilePath: \nest-app\src\modules\room\room.service.ts
 * @Description: room
 * @Author: ms-tlzksaoastkh
 */
import { Injectable } from '@nestjs/common';
import { getresponseBody, responseBody } from '../../common/responseBody';
import { CreateSocketDto } from './dto/create-socket.dto';
import { UpdateSocketDto } from './dto/update-socket.dto';
@Injectable()
export class RoomService {
  constructor() {}
  async getRoomId(): Promise<responseBody<number>> {
    return getresponseBody(Math.floor(Math.random()), 200, 'OK');
  }
  create(createSocketDto: CreateSocketDto) {
    console.log(createSocketDto)
    return 'This action adds a new socket';
  }

  findAll() {
    return `This action returns all socket`;
  }

  findOne(id: number) {
    return `This action returns a #${id} socket`;
  }

  update(id: number, updateSocketDto: UpdateSocketDto) {
    console.log(updateSocketDto)
    return `This action updates a #${id} socket`;
  }

  remove(id: number) {
    return `This action removes a #${id} socket`;
  }
}
