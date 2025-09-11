import { Body, Controller, Get, Param, Put } from '@nestjs/common';
import { UpdateSettingDto } from './dto/update-setting.dto';
import { SettingService } from './setting.service';
import { SettingKeyEnum } from './enums/setting-key.enum';
import { Setting } from './setting.entity';

@Controller('settings')
export class SettingController {
  constructor(private readonly settingService: SettingService) {}

  @Get(':key')
  async findByKey(@Param('key') key: SettingKeyEnum): Promise<Setting> {
    return this.settingService.findByKey(key);
  }

  @Put(':key')
  async update(
    @Param('key') key: SettingKeyEnum,
    @Body() updateSettingDto: UpdateSettingDto,
  ): Promise<Setting> {
    return this.settingService.update(key, updateSettingDto);
  }
}
