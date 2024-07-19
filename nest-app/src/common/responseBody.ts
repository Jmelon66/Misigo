/*
 * @Date: 2024-07-04 09:52:48
 * @LastEditors: Jmelon66 961255554@qq.com
 * @LastEditTime: 2024-07-19 10:48:23
 * @FilePath: \nest-app\src\common\responseBody.ts
 * @Description:
 * @Author: ms-tlzksaoastkh
 */

export function getresponseBody<T>(
  data: T,
  code: number,
  message: string,
): Global.responseBody<T> {
  return {
    data: data,
    code: code,
    message: message,
  };
}
