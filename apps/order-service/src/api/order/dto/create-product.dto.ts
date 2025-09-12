import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsBoolean,
  IsEnum,
  IsArray,
} from 'class-validator';
import { ProductType } from 'apps/inventory-service/src/api/product/enums/product-type.enum';
import { IsNumber } from 'class-validator';
import { FileResDto } from 'apps/inventory-service/src/comom/attachments/file.res';
import { Type } from 'class-transformer';

export class CreateProductDto {
  @IsString()
  name: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  sku: string;

  @IsString()
  barcode: string;

  @IsBoolean()
  isSales: boolean;

  @IsBoolean()
  isPurchase: boolean;

  @IsBoolean()
  isExpenses: boolean;

  @IsBoolean()
  isPointOfSale: boolean;

  @IsBoolean()
  isSubscriptions: boolean;

  @IsBoolean()
  isRental: boolean;

  @IsEnum(ProductType)
  @IsNotEmpty()
  productType: ProductType;

  @IsNumber()
  quantityOnHand: number;

  @IsNumber()
  @IsNotEmpty()
  salesPrice: number;

  @IsNumber()
  soldQuantity: number;

  @IsNumber()
  categoryId: number;

  @IsArray()
  variants: CreateProductVariantDto[];

  @IsOptional()
  @Type(() => FileResDto)
  images: FileResDto;
}

export class CreateProductVariantDto {
  @IsNumber()
  attributeId: number;

  @IsArray()
  @IsNotEmpty()
  valueIds: number[];
}
