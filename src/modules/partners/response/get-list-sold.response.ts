import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class GetListSoldResponse {
  @ApiProperty({ type: [String] })
  @Expose()
  listSold: string[];
}
