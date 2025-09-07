import { Module } from '@nestjs/common';
import { CategoryModule } from '../category/category.module';
import { VariantController } from './variant.controller';
import { VariantService } from './variant.service';
import { AttributeRepository } from './repositories/attribute.repository';
import { ValueRepository } from './repositories/value.repository';

@Module({
  imports: [CategoryModule],
  controllers: [VariantController],
  providers: [VariantService, AttributeRepository, ValueRepository],
  exports: [VariantService],
})
export class VariantModule {}
