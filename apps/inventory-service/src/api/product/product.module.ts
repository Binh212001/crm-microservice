import { Module } from '@nestjs/common';
import { DatabaseModule } from '../../database/database.module';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { productProviders } from './providers/product.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [ProductController],
  providers: [ProductService, ...productProviders],
  exports: [ProductService],
})
export class ProductModule {}
