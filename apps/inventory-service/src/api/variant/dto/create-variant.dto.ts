import { IsString, IsNotEmpty, IsOptional, IsArray } from 'class-validator';

export class CreateVariantDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsArray()
  @IsNotEmpty()
  values: ValueDto[];
}

export class ValueDto {
  @IsString()
  name: string;

  @IsString()
  @IsOptional()
  color: string;
}
