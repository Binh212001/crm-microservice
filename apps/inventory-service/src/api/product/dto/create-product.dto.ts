import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsBoolean,
  IsEnum,
} from 'class-validator';
import { ProductType } from '../enums/product-type.enum';
import { IsNumber } from 'class-validator';

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
}
