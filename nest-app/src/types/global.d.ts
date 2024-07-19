/*
 * @Author: Jmelon66 961255554@qq.com
 * @Date: 2024-07-19 10:44:11
 * @LastEditors: Jmelon66 961255554@qq.com
 * @LastEditTime: 2024-07-19 10:47:08
 * @FilePath: \nest-app\src\types\global.d.ts
 * @Description:
 */
declare namespace Global {
  type responseBody<T> = {
    data: T;
    code: number;
    message: string;
  };
}
