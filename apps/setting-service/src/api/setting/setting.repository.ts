import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { Setting } from './setting.entity';
import { BaseRepository } from '../../database/repositories/base.repository';

@Injectable()
export class SettingRepository extends BaseRepository<Setting> {
  constructor(private readonly dataSource: DataSource) {
    super(Setting, dataSource.manager);
  }
}
