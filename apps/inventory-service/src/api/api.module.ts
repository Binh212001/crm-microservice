import { Module } from '@nestjs/common';
import { CategoryModule } from './category/category.module';
import { TypeOrmConfigService } from '../database/typeorm-config.service';
import { DataSource, DataSourceOptions } from 'typeorm';
import {
  addTransactionalDataSource,
  initializeTransactionalContext,
  StorageDriver,
} from 'typeorm-transactional';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductModule } from './product/product.module';
import { VariantModule } from './variant/variant.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmConfigService,
      dataSourceFactory: async (options: DataSourceOptions) => {
        if (!options) {
          throw new Error('Invalid options passed');
        }
        initializeTransactionalContext({
          storageDriver: StorageDriver.ASYNC_LOCAL_STORAGE,
        });

        return addTransactionalDataSource(new DataSource(options));
      },
    }),
    CategoryModule,
    ProductModule,
    VariantModule,
  ],
  providers: [],
  exports: [],
})
export class ApiModule {}
