import { DataSource } from 'typeorm';
import { SettingKeyEnum } from '../../api/setting/enums/setting-key.enum';
import { Setting } from '../../api/setting/setting.entity';

export class SettingSeed {
  public async run(dataSource: DataSource): Promise<void> {
    const settingRepository = dataSource.getRepository(Setting);
    //SAVE EMAIL CONFIG
    const emailConfig = await settingRepository.findOne({
      where: {
        key: SettingKeyEnum.EMAIL,
      },
    });
    if (!emailConfig) {
      const newEmailConfig = settingRepository.create({
        key: SettingKeyEnum.EMAIL,
        data: {
          host: 'smtp.gmail.com',
          port: 465,
          email: 'teamgf2002@gmail.com',
          name: 'Team GF',
          from: 'teamgf2002@gmail.com',
          replyTo: 'teamgf2002@gmail.com',
          username: 'teamgf2002@gmail.com',
          password: 'yfgj gpya fwum rmbc',
        },
      });
      console.log('🚀 ~ SettingSeed ~ run ~ newEmailConfig:', newEmailConfig);
      await settingRepository.save(newEmailConfig);
    }
    console.log('✅ Email config seeded');
  }
}
