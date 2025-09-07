import { Expose, Type } from 'class-transformer';

export class VariantResDto {
  @Expose()
  id: string;
  @Expose()
  name: string;
  @Expose()
  @Type(() => ValueResDto)
  values: ValueResDto[];
}

export class ValueResDto {
  @Expose()
  id: string;
  @Expose()
  name: string;
  @Expose()
  color: string;
}
