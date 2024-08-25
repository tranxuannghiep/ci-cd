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

export class RequestListPackageWintelDto extends CreateRequestWintelDto {
  @IsDefined()
  @IsNotEmpty()
  @ApiProperty()
  @IsString()
  storeId: string;
}

export class GetListPackageWintelDto {
  @IsDefined()
  @IsNotEmpty()
  @Type(() => LoginWintelDto)
  @ApiProperty({ type: LoginWintelDto })
  @ValidateNested({ each: true })
  auth: LoginWintelDto;

  @IsDefined()
  @IsNotEmpty()
  @Type(() => RequestListPackageWintelDto)
  @ApiProperty({ type: RequestListPackageWintelDto })
  @ValidateNested({ each: true })
  request: RequestListPackageWintelDto;
}
