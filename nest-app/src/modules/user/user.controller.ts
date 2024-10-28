/*
 * @Author: Jmelon66 961255554@qq.com
 * @Date: 2024-07-29 13:44:04
 * @LastEditors: Jmelon66 961255554@qq.com
 * @LastEditTime: 2024-08-08 16:14:21
 * @FilePath: \nest-app\src\modules\user\user.controller.ts
 * @Description:
 */
/*
 * @Date: 2024-07-14 14:30:44
 * @LastEditors: Jmelon66 961255554@qq.com
 * @LastEditTime: 2024-07-19 17:06:21
 * @FilePath: \nest-app\src\modules\room\room.controller.ts
 * @Description: room control
 * @Author: ms-tlzksaoastkh
 */
import { Controller, Put, Res } from '@nestjs/common';
import { UserService } from './user.service';
import { FastifyReply } from 'fastify';
@Controller('/user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Put('/')
  createVisitorInfo(@Res({ passthrough: true }) response: FastifyReply) {
    const user = this.userService.createVisitorInfo();
    response.setCookie('userId', user.data.id);
    return user;
  }
}
