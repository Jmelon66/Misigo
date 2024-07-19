/*
 * @Author: Jmelon66 961255554@qq.com
 * @Date: 2024-07-15 10:22:55
 * @LastEditors: Jmelon66 961255554@qq.com
 * @LastEditTime: 2024-07-18 09:40:44
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
const userId = '123';
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
  private socket_user_map = new Map();
  //    socket-ID to use-ID
  private user_socket_map = new Map();
  //   socket-ID to room info
  private socket_room_map = new Map();
  // online room
  private room_user_map = new Map();
  // online room
  private room_hostUser_map = new Map();
  // online room
  private user_offer_map = new Map();

  private room_socket_waitmap = new Map();

  private useIdMock = '123';
  constructor(private readonly socketService: RoomService) {
    console.log('init socket');
  }

  initWsBasc() {}
  handleConnection(client: any, socket: Server) {
    console.log(socket);
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
    client.join(userId);
    console.log('有人链接了' + client.id);
  }
  handleDisconnect(client: any, socket: Server) {
    console.log(socket);
    const { socket_user_map, socket_room_map, room_user_map, user_socket_map } =
      this;

    const useId = socket_user_map.get(client.id);
    user_socket_map.delete(useId);
    if (useId) {
      const RoomId = socket_room_map.get(client.id);
      const useList = room_user_map.get(RoomId) || [];
      room_user_map.set(
        RoomId,
        useList.filter((v) => v !== useId),
      );
      socket_room_map.delete(client.id);
      socket_user_map.delete(client.id);
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
    const {
      user_offer_map,
      socket_user_map,
      socket_room_map,
      room_user_map,
      user_socket_map,
      room_hostUser_map,
    } = this;
    const socId = client.id;
    const { userId, offer, roomId } = param;
    user_offer_map.set(userId, offer);
    const userList = [userId];
    room_user_map.set(roomId, userList);
    socket_user_map.set(socId, userId);
    user_socket_map.set(userId, socId);
    socket_room_map.set(socId, roomId);
    room_hostUser_map.set(roomId, userId);
    this.socketService.createRoom(roomId, userId);
    client.join(roomId);
  }
  @SubscribeMessage('JoinRoom')
  ReadyJoinRoom(client, param) {
    const { socket_user_map, user_socket_map, socket_room_map } = this;
    const { userId, roomId } = param;
    const socId = client.id;
    socket_user_map.set(socId, userId);
    socket_room_map.set(socId, roomId);
    user_socket_map.set(userId, socId);
    // this.socket
    //   .to(roomId)
    //   .emit('getOffer', { name: 'getOffer', data: { userId } });
    client.join(roomId);
  }
  /**
   * @Date: 2024-07-17 09:49:02
   * @LastEditors: Jmelon66 961255554@qq.com
   * @Description: user to user offer
   * @param {*} client
   * @param {*} param
   */
  @SubscribeMessage('SingleOffer')
  offerForwarding(client, param) {
    console.log(param);
    const { user_socket_map } = this;
    const { userId, data } = param;
    const { offer, toUserId } = data;
    const socId = user_socket_map.get(toUserId);
    console.log(socId);
    this.socket
      .to(socId)
      .emit('setOffer', { name: 'setOffer', data: { userId, offer } });
  }
  @SubscribeMessage('SingleICEOffer')
  SingleICEOffer(client, param) {
    console.log(param);
    const { user_socket_map } = this;
    const { userId, data } = param;
    const { candidate, belongUserId } = data;
    const socId = user_socket_map.get(belongUserId);
    this.socket.to(socId).emit('setICEOffer', {
      name: 'setICEOffer',
      data: { userId, candidate, belongUserId },
    });
  }
  @SubscribeMessage('connenctRoomSuccess')
  connenctRoomSuccess(client, param) {
    console.log(param);
    const { user_socket_map } = this;
    const { userId, data } = param;
    const { candidate, toUserId } = data;
    const socId = user_socket_map.get(toUserId);
    this.socket.to(socId).emit('connenctRoomSuccess', {
      name: 'connenctRoomSuccess',
      data: { userId, candidate, toUserId },
    });
  }
  /**
   * @Date: 2024-07-17 09:49:02
   * @LastEditors: Jmelon66 961255554@qq.com
   * @Description: user to user offer
   * @param {*} client
   * @param {*} param
   */
  @SubscribeMessage('SingleAnswer')
  AnswerForwarding(client, param) {
    console.log(param);
    const { user_socket_map } = this;
    const { userId, data } = param;
    const { answer, toUserId } = data;
    const socId = user_socket_map.get(toUserId);

    this.socket
      .to(socId)
      .emit('setAnswer', { name: 'setAnswer', data: { userId, answer } });
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
