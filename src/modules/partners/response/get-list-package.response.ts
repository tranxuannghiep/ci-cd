import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose, Type } from 'class-transformer';

@Exclude()
export class PackageDto {
  @ApiProperty()
  @Expose()
  packageId: number;

  @ApiProperty()
  @Expose()
  price: number;

  @ApiProperty()
  @Expose()
  pricePackagePhysical: number;

  @ApiProperty()
  @Expose()
  usageTime: number;

  @ApiProperty()
  @Expose()
  usageUnit: string;

  @ApiProperty()
  @Expose()
  packageType: number;

  @ApiProperty()
  @Expose()
  statusId: number;

  @ApiProperty()
  @Expose()
  shopId: string;

  @ApiProperty()
  @Expose()
  packageName: string;

  @ApiProperty()
  @Expose()
  shortDescription: string;

  @ApiProperty()
  @Expose()
  ocsCode: string;

  @ApiProperty()
  @Expose()
  imgThumbnail: string;

  @ApiProperty()
  @Expose()
  imgBanner: string;

  @ApiProperty()
  @Expose()
  basicPackageId: number;

  @ApiProperty()
  @Expose()
  physicalSimPrice: number;

  @ApiProperty()
  @Expose()
  esimPrice: number;

  @ApiProperty()
  @Expose()
  priceSim: number;

  @ApiProperty()
  @Expose()
  pricePhysicalSim: number;
}
@Expose()
@Exclude()
export class ListPackageResponse {
  @Type(() => PackageDto)
  @ApiProperty({ type: [PackageDto] })
  @Expose()
  packages: PackageDto[];
}
