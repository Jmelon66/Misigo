import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RoomModule } from './modules/room/room.module';
import { PrismaModule } from './prisma/prisma.module';
import { RedisModule } from '@nestjs-modules/ioredis';
// import { readFileSync } from 'fs';
// import { Room } from 'src/entities/room.entity';
@Module({
  imports: [
    HttpModule,
    RoomModule,
    PrismaModule,
    RedisModule.forRoot({
      type: 'single',
      url: 'redis://localhost:6379',
      options: {
        name: 'db1',
        host: 'localhost',
        port: 6379,
        db: 0,
      },
    }),
    // TypeOrmModule.forRoot({
    //   name: 'main',
    //   type: 'mysql',
    //   host: 'localhost',
    //   port: 3306,
    //   username: 'root',
    //   password: '123456',
    //   database: 'teamwork',
    //   autoLoadEntities: true,
    //   // entities: [__dirname + '/**/*.entity{.ts,.js}'],
    //   ssl: {
    //     ca: readFileSync('C:/ProgramData/MySQL/MySQL Server 8.4/Data/ca.pem'),
    //     cert: readFileSync(
    //       'C:/ProgramData/MySQL/MySQL Server 8.4/Data/server-cert.pem',
    //     ),
    //     key: readFileSync(
    //       'C:/ProgramData/MySQL/MySQL Server 8.4/Data/server-key.pem',
    //     ),
    //   },
    // })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
