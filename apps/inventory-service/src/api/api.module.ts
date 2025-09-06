import { Module } from '@nestjs/common';
import { CategoryModule } from './category/category.module';
import { ProductModule } from './product/product.module';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [DatabaseModule, CategoryModule, ProductModule],
  providers: [],
  exports: [],
})
export class ApiModule {}
