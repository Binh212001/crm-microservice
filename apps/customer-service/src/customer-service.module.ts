import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfigService } from './database/typeorm-config.service';
import { CustomerModule } from './api/customer/customer.module';
import { DataSourceOptions } from 'typeorm';
import { initializeTransactionalContext } from 'typeorm-transactional';
import { StorageDriver } from 'typeorm-transactional';
import { DataSource } from 'typeorm';
import { addTransactionalDataSource } from 'typeorm-transactional';

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
    CustomerModule,
  ],
  controllers: [],
  providers: [TypeOrmConfigService],
})
export class CustomerServiceModule {}
