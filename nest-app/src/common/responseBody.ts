/*
 * @Date: 2024-07-04 09:52:48
 * @LastEditors: git config user.name && git config user.email
 * @LastEditTime: 2024-07-04 10:37:52
 * @FilePath: \nest-app\src\common\responseBody.ts
 * @Description:
 * @Author: ms-tlzksaoastkh
 */
export interface responseBody<T> {
  data: T;
  code: number;
  message: string;
}

export function getresponseBody<T>(
  data: T,
  code: number,
  message: string,
): responseBody<T> {
  return {
    data: data,
    code: code,
    message: message,
  };
}
