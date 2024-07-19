/*
 * @Author: Jmelon66 961255554@qq.com
 * @Date: 2024-07-18 18:01:24
 * @LastEditors: Jmelon66 961255554@qq.com
 * @LastEditTime: 2024-07-19 16:02:11
 * @FilePath: \nest-app\src\entities\room.entity.ts
 * @Description:
 */
import { PartialType } from '@nestjs/mapped-types';

export class Room {
  id?: string;
  createTime?: Date;
  updateTime?: Date;
  name?: string;
  onwerId?: string;
  status?: number;
}
export class CreateRoomDto extends Room {}
export class UpdateRoomDto extends PartialType(CreateRoomDto) {}
