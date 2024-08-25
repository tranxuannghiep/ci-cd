import { ApiProperty } from '@nestjs/swagger';
import { LoginWintelDto } from './login.dto';
import { Type } from 'class-transformer';
import { IsDefined, IsNotEmpty, ValidateNested } from 'class-validator';
import { CreateRequestWintelDto } from './create-request.dto';

export class GetListSoldWintelDto {
  @IsDefined()
  @IsNotEmpty()
  @Type(() => LoginWintelDto)
  @ApiProperty({ type: LoginWintelDto })
  @ValidateNested({ each: true })
  auth: LoginWintelDto;

  @IsDefined()
  @IsNotEmpty()
  @Type(() => CreateRequestWintelDto)
  @ApiProperty({ type: CreateRequestWintelDto })
  @ValidateNested({ each: true })
  request: CreateRequestWintelDto;
}
