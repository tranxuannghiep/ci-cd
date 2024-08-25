import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsNotEmpty, IsString } from 'class-validator';

export class CreateRequestWintelDto {
  @IsDefined()
  @IsNotEmpty()
  @ApiProperty()
  @IsString()
  checksum: string;

  @IsDefined()
  @IsNotEmpty()
  @ApiProperty()
  @IsString()
  merchantId: string;

  @IsDefined()
  @IsNotEmpty()
  @ApiProperty()
  @IsString()
  key: string;
}
