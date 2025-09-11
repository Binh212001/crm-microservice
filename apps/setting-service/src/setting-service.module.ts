import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource, DataSourceOptions } from 'typeorm';
import {
  addTransactionalDataSource,
  initializeTransactionalContext,
  StorageDriver,
} from 'typeorm-transactional';
import { SettingModule } from './api/setting/setting.module';
import { TypeOrmConfigService } from './database/typeorm-config.service';
import { EmailModule } from './api/email/email.module';

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
    SettingModule,
    EmailModule,
  ],
})
export class SettingServiceModule {}
