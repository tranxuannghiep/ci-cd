import { Exclude, Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

@Exclude()
export class ResultResponse {
  @ApiProperty({})
  @Expose()
  result: boolean;

  constructor(partial: Partial<ResultResponse>) {
    Object.assign(this, partial);
  }
}

@Exclude()
export class EmptyResponse {
  constructor(partial: Partial<ResultResponse>) {
    Object.assign(this, partial);
  }
}
