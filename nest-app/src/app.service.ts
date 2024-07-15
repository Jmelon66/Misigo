import { Injectable } from '@nestjs/common';
import { getresponseBody, responseBody } from './common/responseBody';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';
@Injectable()
export class AppService {
  constructor(private readonly httpService: HttpService) {}
  async getHello(): Promise<responseBody<string>> {
    const { data } = await lastValueFrom(
      this.httpService.post('https://api.qinor.cn/soup/', {
        headers: {
          // 'User-Agent':
          //   'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36',
          // Accept:
          //   'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
          // 'Accept-Encoding': 'gzip, deflate, br, zstd',
          // 'Accept-Language': 'zh-CN,zh;q=0.9',
          // 'Cache-Control': 'max-age=0',
          // Priority: 'u=0, i',
          // 'Sec-Ch-Ua': `"Not/A)Brand";v="8", "Chromium";v="126", "Google Chrome";v="126"`,
          // 'Sec-Ch-Ua-Mobile': '?0',
          // 'Sec-Ch-Ua-Platform': 'Windows',
          // 'Sec-Fetch-Dest': 'document',
          // 'Sec-Fetch-Mode': 'navigate',
          // 'Sec-Fetch-Site': 'none',
          // 'Sec-Fetch-User': '?1',
          // 'Upgrade-Insecure-Requests': 1,
        },
      }),
    );
    return getresponseBody(data, 200, 'OK');
  }
}
