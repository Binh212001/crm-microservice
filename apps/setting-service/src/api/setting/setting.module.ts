import { Module } from '@nestjs/common';
import { SettingRepository } from './setting.repository';
import { SettingService } from './setting.service';
import { SettingController } from './setting.controller';

@Module({
  imports: [],
  controllers: [SettingController],
  providers: [SettingService, SettingRepository],
  exports: [SettingService, SettingRepository],
})
export class SettingModule {}
