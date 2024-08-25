import { ApiProperty } from '@nestjs/swagger';
import { LoginWintelDto } from './login.dto';
import { Type } from 'class-transformer';
import {
  IsDefined,
  IsEnum,
  IsNotEmpty,
  IsString,
  ValidateNested,
} from 'class-validator';
import { CreateRequestWintelDto } from './create-request.dto';
import { getEnumDescription } from 'src/shared/utils/enum';

export enum TypeProductWintel {
  Physical = 0,
  Esim = 1,
}

export class RequestCheckProductWintelDto extends CreateRequestWintelDto {
  @IsDefined()
  @IsNotEmpty()
  @ApiProperty()
  @IsString()
  storeId: string;

  @IsDefined()
  @IsNotEmpty()
  @ApiProperty()
  @IsString()
  serial: string;

  @IsDefined()
  @IsNotEmpty()
  @IsEnum(TypeProductWintel)
  @ApiProperty({
    enum: TypeProductWintel,
    description: getEnumDescription(TypeProductWintel),
  })
  type: TypeProductWintel;
}

export class CheckProductWintelDto {
  @IsDefined()
  @IsNotEmpty()
  @Type(() => LoginWintelDto)
  @ApiProperty({ type: LoginWintelDto })
  @ValidateNested({ each: true })
  auth: LoginWintelDto;

  @IsDefined()
  @IsNotEmpty()
  @Type(() => RequestCheckProductWintelDto)
  @ApiProperty({ type: RequestCheckProductWintelDto })
  @ValidateNested({ each: true })
  request: RequestCheckProductWintelDto;
}
