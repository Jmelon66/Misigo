/*
 * @Author: Jmelon66 961255554@qq.com
 * @Date: 2024-08-06 15:02:09
 * @LastEditors: Jmelon66 961255554@qq.com
 * @LastEditTime: 2024-08-06 15:33:23
 * @FilePath: \nest-app\src\common\injectable\auth.gard.ts
 * @Description:
 */
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const res = context.switchToHttp().getRequest();
    console.log(res.cookies);
    if (!res.cookies.userId) {
      throw new UnauthorizedException();
    }
    return true;
  }
}
