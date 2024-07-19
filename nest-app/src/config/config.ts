/*
 * @Author: Jmelon66 961255554@qq.com
 * @Date: 2024-07-19 15:51:19
 * @LastEditors: Jmelon66 961255554@qq.com
 * @LastEditTime: 2024-07-19 15:56:00
 * @FilePath: \nest-app\src\config\config.ts
 * @Description:
 */
export default () => ({
  app: {
    name: 'Mixigo',
    isDev: process.env.NODE_ENV == 'development',
  },

  database: {
    url: 'mysql://mixilon:mixigo.com@localhost:3306/teamwork',
  },
});
