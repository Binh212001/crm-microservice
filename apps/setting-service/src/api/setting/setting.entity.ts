import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { SettingKeyEnum } from './enums/setting-key.enum';
import { AbstractEntity } from '../../database/entities/abstract.entity';

@Entity('settings')
export abstract class Setting<T = object> extends AbstractEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    length: 255,
  })
  key: SettingKeyEnum;

  @Column({
    type: 'jsonb',
  })
  data: T;

  constructor(partial: Partial<Setting<T>>) {
    super();
    Object.assign(this, partial);
  }
}
