import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsNotEmpty, IsString } from 'class-validator';
import { TypeProductWintel } from '../../dtos/wintel';

interface ILoginWintel {
  username: string;
  password: string;
  merchantId: string;
}

interface ICreateRequestWintel {
  checksum: string;
  func: string;
  version: string;
  merchantId: string;
  key: string;
}

interface IRequestHoldProductWintel extends ICreateRequestWintel {
  storeId: string;
  isdn: string;
}

interface IRequestListPackageWintel extends ICreateRequestWintel {
  storeId: string;
}

interface IRequestCheckProductWintel extends ICreateRequestWintel {
  storeId: string;
  serial: string;
  type: TypeProductWintel;
}

interface IRequestCreateOrderWintel extends ICreateRequestWintel {
  storeId: string;
  isdn: string;
  mainPackId: string;
  email: string;
  phone: string;
}

export interface IGetListSoldWintel {
  auth: ILoginWintel;
  request: ICreateRequestWintel;
}

export class IHoldProductWintel {
  auth: ILoginWintel;
  request: IRequestHoldProductWintel;
}

export class IGetListPackageWintel {
  auth: ILoginWintel;
  request: IRequestListPackageWintel;
}

export class ICheckProductWintel {
  auth: ILoginWintel;
  request: IRequestCheckProductWintel;
}

export class ICreateOrderWintel {
  auth: ILoginWintel;
  request: IRequestCreateOrderWintel;
}
