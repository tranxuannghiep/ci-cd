import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsNotEmpty, IsString } from 'class-validator';

export class LoginWintelDto {
  @IsDefined()
  @IsNotEmpty()
  @ApiProperty()
  @IsString()
  username: string;

  @IsDefined()
  @IsNotEmpty()
  @ApiProperty()
  @IsString()
  password: string;

  @IsDefined()
  @IsNotEmpty()
  @ApiProperty()
  @IsString()
  merchantId: string;
}
