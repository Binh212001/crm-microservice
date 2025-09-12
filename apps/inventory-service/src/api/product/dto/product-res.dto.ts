import { FileResDto } from 'apps/inventory-service/src/comom/attachments/file.res';
import { Expose, Type } from 'class-transformer';
import { CategoryResDto } from '../../category/dto/category-res.dto';
import { VariantResDto } from '../../variant/dto/variant-res.dto';

export class ProductResDto {
  @Expose()
  id: string;
  @Expose()
  name: string;
  @Expose()
  sku: string;
  @Expose()
  barcode: string;
  @Expose()
  description: string;
  @Expose()
  isSales: string;
  @Expose()
  isPurchase: string;
  @Expose()
  isExpenses: string;
  @Expose()
  isPointOfSale: string;
  @Expose()
  isSubscriptions: string;
  @Expose()
  isRental: string;
  @Expose()
  productType: string;
  @Expose()
  quantityOnHand: string;
  @Expose()
  salesPrice: string;
  @Expose()
  soldQuantity: string;
  @Expose()
  category: CategoryResDto;
  @Expose()
  @Type(() => FileResDto)
  images: FileResDto;
  @Expose()
  variants: VariantResDto[];
}
