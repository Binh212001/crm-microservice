import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateSettingDto } from './dto/update-setting.dto';
import { SettingKeyEnum } from './enums/setting-key.enum';
import { Setting } from './setting.entity';
import { SettingRepository } from './setting.repository';

@Injectable()
export class SettingService {
  constructor(private readonly settingRepository: SettingRepository) {}

  async findByKey(key: SettingKeyEnum): Promise<Setting> {
    console.log('🚀 ~ SettingService ~ findByKey ~ key:', key);
    const setting = await this.settingRepository.findOneBy({ key });
    if (!setting) {
      throw new NotFoundException(`Setting with key '${key}' not found`);
    }
    return setting;
  }

  async update(
    key: SettingKeyEnum,
    updateSettingDto: UpdateSettingDto,
  ): Promise<Setting> {
    const setting = await this.findByKey(key);

    Object.assign(setting, updateSettingDto);
    return this.settingRepository.save(setting);
  }
}
