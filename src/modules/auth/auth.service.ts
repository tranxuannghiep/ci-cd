import { Injectable } from '@nestjs/common';
import axios from 'axios';
import * as https from 'https';
import { InvalidArgumentException } from 'src/shared/exception/exception';

const agent = new https.Agent({
  rejectUnauthorized: false,
});

@Injectable()
export class AuthService {
  constructor() {}

  async login(data: {
    username: string;
    password: string;
    merchantId: string;
  }): Promise<{
    username: string;
    accountId: number;
    Authorization: string;
  }> {
    const url = `https://merchant-test.reddi.vn/third-party/api/v2/CoreService/Login`;
    const result = await axios.post(url, data, { httpsAgent: agent });
    if (result.data.code !== 'S200') {
      throw new InvalidArgumentException(result.data.message, {
        code: result.data.code,
      });
    }

    return {
      ...result.data.wsResponse,
      Authorization: result.headers['authorization'],
    };
  }
}
