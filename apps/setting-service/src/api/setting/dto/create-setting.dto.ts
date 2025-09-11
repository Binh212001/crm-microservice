import { IsNotEmpty, IsObject, IsString } from 'class-validator';
import { SettingKeyEnum } from '../enums/setting-key.enum';
export class CreateSettingDto {
  @IsString()
  @IsNotEmpty()
  key!: SettingKeyEnum;

  @IsObject()
  value!: any;
}
