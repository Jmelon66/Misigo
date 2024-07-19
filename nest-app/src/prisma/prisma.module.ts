/*
 * @Author: Jmelon66 961255554@qq.com
 * @Date: 2024-07-19 15:52:11
 * @LastEditors: Jmelon66 961255554@qq.com
 * @LastEditTime: 2024-07-19 15:53:43
 * @FilePath: \nest-app\src\prisma\prisma.module.ts
 * @Description:
 */
import { Global, Module } from '@nestjs/common';

import { PrismaService } from './prisma.service';

@Global()
@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {}
