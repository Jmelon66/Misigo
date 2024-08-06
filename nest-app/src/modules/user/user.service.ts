/*
 * @Date: 2024-07-14 14:30:55
 * @LastEditors: Jmelon66 961255554@qq.com
 * @LastEditTime: 2024-07-29 15:16:03
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
@Injectable()
export class UserService {
  constructor() {}
  createVisitorInfo(): Global.responseBody<UserDto> {
    const roomId = randomUUID();
    return getresponseBody({ id: roomId }, 200, 'OK');
  }
}
