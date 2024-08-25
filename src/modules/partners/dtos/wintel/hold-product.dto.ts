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

export class RequestHoldProductWintelDto extends CreateRequestWintelDto {
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
}

export class HoldProductWintelDto {
  @IsDefined()
  @IsNotEmpty()
  @Type(() => LoginWintelDto)
  @ApiProperty({ type: LoginWintelDto })
  @ValidateNested({ each: true })
  auth: LoginWintelDto;

  @IsDefined()
  @IsNotEmpty()
  @Type(() => RequestHoldProductWintelDto)
  @ApiProperty({ type: RequestHoldProductWintelDto })
  @ValidateNested({ each: true })
  request: RequestHoldProductWintelDto;
}
