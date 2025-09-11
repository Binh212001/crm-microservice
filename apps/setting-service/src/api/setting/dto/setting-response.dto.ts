export class SettingResponseDto {
  id!: string;
  key!: string;
  value!: any;
  description?: string;
  createdAt!: Date;
  updatedAt!: Date;
  createdBy?: string;
  updatedBy?: string;
}
