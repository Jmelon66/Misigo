/*
 * @Author: Jmelon66 961255554@qq.com
 * @Date: 2024-07-15 10:22:55
 * @LastEditors: Jmelon66 961255554@qq.com
 * @LastEditTime: 2024-07-15 15:39:22
 * @FilePath: \nest-app\src\modules\room\room.gateway.ts
 * @Description:
 */

import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { RoomService } from './room.service';
import { CreateSocketDto } from './dto/create-socket.dto';
import { UpdateSocketDto } from './dto/update-socket.dto';
// const userId = '123';
@WebSocketGateway(3002, {
  allowEIO3: true,
  cors: {
    origin: 'http://localhost:3000',
    credentials: true,
  },
})
export class RoomGateway {
  @WebSocketServer() private socket: Server;
  //    socket-ID to use-ID
  private socket_use_map = new Map();
  //   socket-ID to room info
  private socket_room_map = new Map();
  // online room
  private room_user_map = new Map();

  private useIdMock = '123';
  constructor(private readonly socketService: RoomService) {
    console.log('init socket');
  }

  initWsBasc() {}
  handleConnection(client: any) {
    // const { use_list_map, socket_room_map,room_user_map } = this;
    // if (socket_room_map.get(client.id)) {
    //   use_list_map.set(userId, client.id);
    //   const userList = room_user_map.get()
    // } else {
    //   this.use_list_map.set(userId, client.id);
    //   this.socket_room_map.set(client.id, userId);
    // }
    // this.use_list_map.set(userId, client.id);
    // this.socket_room_map.set(client.id, userId);
    // console.log(client);
    console.log('有人链接了' + client.id);
  }
  handleDisconnect(client: any) {
    // console.log(client);
    const { socket_use_map, socket_room_map, room_user_map } = this;
    const useId = socket_use_map.get(client.id);
    if (useId) {
      const RoomId = socket_room_map.get(client.id);
      const useList = room_user_map.get(RoomId);
      room_user_map.set(
        RoomId,
        useList.filters((v) => v !== useId),
      );
      socket_room_map.delete(client.id);
      socket_use_map.delete(client.id);
    }
    console.log('有人离开了' + client.id);
  }
  /**
   * @Date: 2024-07-15 11:40:28
   * @LastEditors: Jmelon66 961255554@qq.com
   * @Description: init user or room
   * @param {*} client
   * @param {*} param
   */
  @SubscribeMessage('CreateRoom')
  CreateConnect(client, param) {
    console.log(client, param);
  }
  @SubscribeMessage('connectionRoom')
  FirstConnect(client, param) {
    console.log(client, param);
  }
  @SubscribeMessage('createSocket')
  create(@MessageBody() createSocketDto: CreateSocketDto) {
    return this.socketService.create(createSocketDto);
  }

  @SubscribeMessage('findAllSocket')
  findAll() {
    return this.socketService.findAll();
  }

  @SubscribeMessage('findOneSocket')
  findOne(@MessageBody() id: number) {
    return this.socketService.findOne(id);
  }

  @SubscribeMessage('updateSocket')
  update(@MessageBody() updateSocketDto: UpdateSocketDto) {
    return this.socketService.update(updateSocketDto.id, updateSocketDto);
  }

  @SubscribeMessage('removeSocket')
  remove(@MessageBody() id: number) {
    return this.socketService.remove(id);
  }
}
