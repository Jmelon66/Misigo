/*
 * @Date: 2024-07-14 14:30:55
 * @LastEditors: Jmelon66 961255554@qq.com
 * @LastEditTime: 2024-08-09 14:40:12
 * @FilePath: \nest-app\src\modules\user\user.service.ts
 * @Description: room
 * @Author: ms-tlzksaoastkh
 */
import { Injectable } from '@nestjs/common';
import { getresponseBody } from '../../common/responseBody';
import { randomUUID } from 'crypto';
export interface UserDto {
  id: string;
}
import { Redis } from 'ioredis';
import { InjectRedis } from '@nestjs-modules/ioredis';
@Injectable()
export class UserService {
  constructor(@InjectRedis() private readonly redis: Redis) {}
  createVisitorInfo(): Global.responseBody<UserDto> {
    const roomId = randomUUID();
    const userInfo = {
      id: roomId,
      name: '游客' + Math.floor(Math.random() * 100),
    };
    this.redis.set('userInfo:user:' + userInfo.id, JSON.stringify(userInfo));
    return getresponseBody({ id: roomId }, 200, 'OK');
  }
}
