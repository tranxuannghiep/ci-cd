import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class CheckProductResponse {
  @ApiProperty()
  @Expose()
  creator: string;

  @ApiProperty()
  @Expose()
  imSerial: string;
}
