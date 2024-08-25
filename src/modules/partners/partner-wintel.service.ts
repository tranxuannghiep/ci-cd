import { Injectable } from '@nestjs/common';
import axios from 'axios';
import * as https from 'https';
import { InvalidArgumentException } from 'src/shared/exception/exception';
import { CommonUtils } from 'src/shared/utils/mbc';
import { AuthService } from '../auth/auth.service';
import {
  ICheckProductWintel,
  ICreateOrderWintel,
  IGetListPackageWintel,
  IGetListSoldWintel,
  IHoldProductWintel,
} from './interfaces/wintel';
import { handleApiError } from 'src/shared/utils/axios/handle-api-error';

const agent = new https.Agent({
  rejectUnauthorized: false,
});

@Injectable()
export class PartnerWintelService {
  constructor(private readonly authSvc: AuthService) {}

  async getListSold(body: IGetListSoldWintel) {
    const { auth, request } = body;

    try {
      const { accountId, username, Authorization } =
        await this.authSvc.login(auth);
      const mbcRequest = {
        wsRequest: {
          username,
          accountId,
        },
      };

      const { checksum, func, key, merchantId, version } = request;

      const response = await this.getData({
        checksum,
        func,
        key,
        merchantId,
        version,
        mbcRequest,
        Authorization,
      });

      return response.isdnList;
    } catch (error) {
      handleApiError(error);
    }
  }

  async holdProduct(body: IHoldProductWintel) {
    const { auth, request } = body;

    try {
      const { accountId, username, Authorization } =
        await this.authSvc.login(auth);
      const mbcRequest = {
        wsRequest: {
          username,
          accountId,
          storeId: request.storeId,
          isdn: request.isdn,
        },
      };

      const { checksum, func, key, merchantId, version } = request;

      await this.getData({
        checksum,
        func,
        key,
        merchantId,
        version,
        mbcRequest,
        Authorization,
      });

      return { result: true };
    } catch (error) {
      handleApiError(error);
    }
  }

  async getListPackage(body: IGetListPackageWintel) {
    const { auth, request } = body;

    try {
      const { accountId, username, Authorization } =
        await this.authSvc.login(auth);
      const mbcRequest = {
        wsRequest: {
          username,
          accountId,
          storeId: request.storeId,
        },
      };

      const { checksum, func, key, merchantId, version } = request;

      const response = await this.getData({
        checksum,
        func,
        key,
        merchantId,
        version,
        mbcRequest,
        Authorization,
      });

      return response.listPackagePosWcm;
    } catch (error) {
      handleApiError(error);
    }
  }

  async checkProduct(body: ICheckProductWintel) {
    const { auth, request } = body;

    try {
      const { accountId, username, Authorization } =
        await this.authSvc.login(auth);
      const mbcRequest = {
        wsRequest: {
          username,
          accountId,
          storeId: request.storeId,
          serial: request.serial,
          type: request.type,
        },
      };

      const { checksum, func, key, merchantId, version } = request;

      const response = await this.getData({
        checksum,
        func,
        key,
        merchantId,
        version,
        mbcRequest,
        Authorization,
      });

      return response;
    } catch (error) {
      handleApiError(error);
    }
  }

  async getData(body: {
    checksum: string;
    func: string;
    key: string;
    merchantId: string;
    version: string;
    mbcRequest: {
      wsRequest: object;
    };
    Authorization: string;
  }) {
    const {
      checksum,
      func,
      key,
      merchantId,
      version,
      mbcRequest,
      Authorization,
    } = body;

    const data = CommonUtils.createRequest(
      checksum,
      func,
      merchantId,
      version,
      mbcRequest,
      key,
    );

    const url = `https://merchant-test.reddi.vn/third-party/api/v1/CoreService/Routing`;
    const result = await axios.post(url, JSON.parse(data), {
      httpsAgent: agent,
      headers: {
        Authorization,
      },
    });

    if (result.data.code !== 'S200') {
      throw new InvalidArgumentException(result.data.message, {
        code: result.data.code,
      });
    }

    if (result.data.encData) {
      const response = JSON.parse(
        CommonUtils.getResponse(result.data.encData, key),
      );

      return response;
    }

    return true;
  }

  async createOrder(body: ICreateOrderWintel) {
    const { auth, request } = body;

    try {
      const { accountId, username, Authorization } =
        await this.authSvc.login(auth);
      const mbcRequest = {
        wsRequest: {
          username,
          accountId,
          isdn: request.isdn,
          mainPackId: request.mainPackId,
          email: request.email,
          phone: request.phone,
        },
      };

      const { checksum, func, key, merchantId, version } = request;

      const response = await this.getData({
        checksum,
        func,
        key,
        merchantId,
        version,
        mbcRequest,
        Authorization,
      });

      return response;
    } catch (error) {
      handleApiError(error);
    }
  }
}
