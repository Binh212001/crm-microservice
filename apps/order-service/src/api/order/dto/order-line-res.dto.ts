import { Expose, Type } from 'class-transformer';

export class OrderLineResDto {
  @Expose()
  id: number;

  @Expose()
  productId: number;

  @Expose()
  productName: string;

  @Expose()
  variantId: number;

  @Expose()
  variantName: string;

  @Expose()
  quantity: number;

  @Expose()
  unitPrice: number;

  @Expose()
  totalPrice: number;

  @Expose()
  discountPercentage: number;

  @Expose()
  discountAmount: number;

  @Expose()
  taxAmount: number;

  @Expose()
  @Type(() => Date)
  createdAt: Date;

  @Expose()
  @Type(() => Date)
  updatedAt: Date;
}
