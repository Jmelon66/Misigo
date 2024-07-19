/*
 * @Author: Jmelon66 961255554@qq.com
 * @Date: 2024-07-19 15:52:13
 * @LastEditors: Jmelon66 961255554@qq.com
 * @LastEditTime: 2024-07-19 15:53:17
 * @FilePath: \nest-app\src\prisma\prisma.service.ts
 * @Description:
 */
/*
 * @Author: Jmelon66 961255554@qq.com
 * @Date: 2024-07-19 15:52:11
 * @LastEditors: Jmelon66 961255554@qq.com
 * @LastEditTime: 2024-07-19 15:52:11
 * @FilePath: \nest-app\src\prisma\prisma.module.ts
 * @Description:
 */

import { Injectable } from '@nestjs/common';
// import { ConfigService } from '@nestjs/config';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient {
  constructor() {
    //输出查询SQL等LOG
    super();
  }
}
