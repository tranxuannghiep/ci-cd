import { ApiProperty } from '@nestjs/swagger';
import { LoginWintelDto } from './login.dto';
import { Type } from 'class-transformer';
import {
  IsDefined,
  IsNotEmpty,
  IsString,
  ValidateNested,
} from 'class-validator';
import { CreateRequestWintelDto } from './create-request.dto';

export class RequestCreateOrderWintelDto extends CreateRequestWintelDto {
  @IsDefined()
  @IsNotEmpty()
  @ApiProperty()
  @IsString()
  storeId: string;

  @IsDefined()
  @IsNotEmpty()
  @ApiProperty()
  @IsString()
  isdn: string;

  @IsDefined()
  @IsNotEmpty()
  @ApiProperty()
  @IsString()
  mainPackId: string;

  @IsDefined()
  @IsNotEmpty()
  @ApiProperty()
  @IsString()
  email: string;

  @IsDefined()
  @IsNotEmpty()
  @ApiProperty()
  @IsString()
  phone: string;
}

export class CreateOrderWintelDto {
  @IsDefined()
  @IsNotEmpty()
  @Type(() => LoginWintelDto)
  @ApiProperty({ type: LoginWintelDto })
  @ValidateNested({ each: true })
  auth: LoginWintelDto;

  @IsDefined()
  @IsNotEmpty()
  @Type(() => RequestCreateOrderWintelDto)
  @ApiProperty({ type: RequestCreateOrderWintelDto })
  @ValidateNested({ each: true })
  request: RequestCreateOrderWintelDto;
}
