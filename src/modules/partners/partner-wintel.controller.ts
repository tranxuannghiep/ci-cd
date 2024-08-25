import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { plainToInstance } from 'class-transformer';
import { ResultResponse } from 'src/shared/dtos';
import {
  CheckProductWintelDto,
  CreateOrderWintelDto,
  GetListPackageWintelDto,
  GetListSoldWintelDto,
  HoldProductWintelDto,
} from './dtos/wintel';
import { PartnerWintelService } from './partner-wintel.service';
import { CheckProductResponse, GetListSoldResponse } from './response';
import { ListPackageResponse } from './response/get-list-package.response';

@ApiTags('Partner Wintel')
@Controller('/v1/partner/wintel')
export class PartnerWintelController {
  constructor(private readonly svc: PartnerWintelService) {}

  @Post('/list-sold')
  @ApiOperation({ summary: 'Get list sold from 0h today' })
  @ApiResponse({ status: 200, type: GetListSoldResponse })
  async getListSold(@Body() body: GetListSoldWintelDto) {
    const listSold = await this.svc.getListSold({
      auth: body.auth,
      request: {
        ...body.request,
        func: 'mb_getListSoldIsdnSTL',
        version: '1.0',
      },
    });

    return plainToInstance(GetListSoldResponse, { listSold });
  }

  @Post('/hold-product')
  @ApiOperation({ summary: 'Hold Product' })
  @ApiResponse({ status: 200, type: ResultResponse })
  async holdProduct(@Body() body: HoldProductWintelDto) {
    await this.svc.holdProduct({
      auth: body.auth,
      request: {
        ...body.request,
        func: 'mb_keepIsdn',
        version: '1.0',
      },
    });

    return plainToInstance(ResultResponse, { result: true });
  }

  @Post('/packages')
  @ApiOperation({ summary: 'Get list package' })
  @ApiResponse({ status: 200, type: ListPackageResponse })
  async getListPackage(@Body() body: GetListPackageWintelDto) {
    const packages = await this.svc.getListPackage({
      auth: body.auth,
      request: {
        ...body.request,
        func: 'mb_getListPackagePosWcm',
        version: '1.0',
      },
    });

    return plainToInstance(ListPackageResponse, { packages });
  }

  @Post('/check-product')
  @ApiOperation({ summary: 'Check product' })
  @ApiResponse({ status: 200, type: CheckProductResponse })
  async checkProduct(@Body() body: CheckProductWintelDto) {
    const result = await this.svc.checkProduct({
      auth: body.auth,
      request: {
        ...body.request,
        func: 'mb_validateSimStatus',
        version: '1.0',
      },
    });

    return plainToInstance(CheckProductResponse, result);
  }

  @Post('/order')
  @ApiOperation({ summary: 'Create order kit' })
  @ApiResponse({ status: 200, type: ResultResponse })
  async createOrder(@Body() body: CreateOrderWintelDto) {
    const packages = await this.svc.createOrder({
      auth: body.auth,
      request: {
        ...body.request,
        func: 'mb_createEsimOrderPosWcm',
        version: '1.0',
      },
    });
    return packages;
    return plainToInstance(ResultResponse, { result: true });
  }
}
