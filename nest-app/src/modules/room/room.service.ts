/*
 * @Date: 2024-07-14 14:30:55
 * @LastEditors: Jmelon66 961255554@qq.com
 * @LastEditTime: 2024-08-18 14:11:28
 * @FilePath: \nest-app\src\modules\room\room.service.ts
 * @Description: room
 * @Author: ms-tlzksaoastkh
 */
import { Injectable } from '@nestjs/common';
import { getresponseBody } from '../../common/responseBody';
import { CreateSocketDto } from './dto/create-socket.dto';
import { UpdateSocketDto } from './dto/update-socket.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { InjectRedis } from '@nestjs-modules/ioredis';
import { Redis } from 'ioredis';
@Injectable()
export class RoomService {
  // online room
  private room_hostUser_map = new Map();
  private roomNoObj = {};
  constructor(
    private readonly prisma: PrismaService,
    @InjectRedis()
    private readonly redis: Redis,
  ) {}
  requestRoom(): Global.responseBody<string> {
    const roomId = `${new Date().getTime()}${Math.floor(Math.random() * 1000)}`;
    return getresponseBody(roomId, 200, 'OK');
  }
  async getRoomId(): Promise<Global.responseBody<number>> {
    return getresponseBody(Math.floor(Math.random()), 200, 'OK');
  }
  getRoomHostById(id: string): Global.responseBody<string> {
    return getresponseBody(this.room_hostUser_map.get(id), 200, 'OK');
  }
  // 请求一个房间号
  async requestRoomInfo(): Promise<Global.responseBody<any>> {
    let roomNo =
      Math.floor(Math.random() * 10000) * 100 +
      parseInt(new Date().getTime().toString().slice(-3));
    let ifExit = await this.redis.get('roomNoObject');
    ifExit = ifExit ? JSON.parse(ifExit) : {};
    while (ifExit && ifExit[roomNo]) {
      roomNo = Math.floor(Math.random() * 1000000);
    }
    const room = {
      roomNo,
    };
    return getresponseBody(room, 200, 'OK');
  }
  // 創建房間 返回房間信息
  async createNewRoom(
    userId: any,
    roomNo: number,
    name: string,
  ): Promise<Global.responseBody<any>> {
    const room = {
      status: 2,
      roomNo,
      name,
      ownerId: userId,
    };
    const res = await this.prisma.room.create({ data: room });

    const roomNoObjectStr = await this.redis.get('roomNoObject');
    const roomNoObject = roomNoObjectStr ? JSON.parse(roomNoObjectStr) : {};
    roomNoObject[roomNo] = res;
    await this.redis.set('roomNoObject', JSON.stringify(roomNoObject));
    return getresponseBody(res, 200, 'OK');
  }
  async getRoom(roomNo: number): Promise<Global.responseBody<any>> {
    const roomNoObjectStr = await this.redis.get('roomNoObject');
    const roomNoObject = roomNoObjectStr ? JSON.parse(roomNoObjectStr) : {};
    if (!roomNoObject[roomNo]) {
      return getresponseBody(false, 201, 'OK');
    } else {
      return getresponseBody(roomNoObject[roomNo], 200, 'OK');
    }
  }
  createRoom(roomId, userId) {
    this.room_hostUser_map.set(roomId, userId);
  }
  create(createSocketDto: CreateSocketDto) {
    console.log(createSocketDto);
    return 'This action adds a new socket';
  }

  findAll() {
    return `This action returns all socket`;
  }

  findOne(id: number) {
    return `This action returns a #${id} socket`;
  }

  update(id: number, updateSocketDto: UpdateSocketDto) {
    console.log(updateSocketDto);
    return `This action updates a #${id} socket`;
  }

  remove(id: number) {
    return `This action removes a #${id} socket`;
  }
}
