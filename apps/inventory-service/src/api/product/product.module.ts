import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { ProductRepository } from './repositories/product.repository';
import { CategoryModule } from '../category/category.module';
import { ProductVariantRepository } from './repositories/product-variant.repository';
import { AttributeRepository } from '../variant/repositories/attribute.repository';
import { ValueRepository } from '../variant/repositories/value.repository';

@Module({
  imports: [CategoryModule],
  controllers: [ProductController],
  providers: [
    ProductService,
    ProductRepository,
    ProductVariantRepository,
    AttributeRepository,
    ValueRepository,
  ],
  exports: [ProductService],
})
export class ProductModule {}
