import { Module } from '@nestjs/common';
import { SettingModule } from '../setting/setting.module';
import { EmailController } from './email.controller';
import { EmailService } from './email.service';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { SettingService } from '../setting/setting.service';
import { SettingKeyEnum } from '../setting/enums/setting-key.enum';
import { EmailConfig } from '../../config/email.comfig';

@Module({
  imports: [
    SettingModule,
    MailerModule.forRootAsync({
      imports: [SettingModule],
      inject: [SettingService],
      useFactory: async (settingService: SettingService) => {
        const emailSetting = await settingService.findByKey(
          SettingKeyEnum.EMAIL,
        );
        const data = emailSetting.data as EmailConfig;

        const host = data.host;
        const port = Number(data.port);
        const user = data.username || data.email;
        const pass = data.password;
        const from = data.from || data.email || data.username;
        const isProd = process.env.NODE_ENV === 'production';
        const secure = port === 465; // 465 = SMTPS

        return {
          transport: {
            host,
            port,
            secure,
            requireTLS: !secure,
            // Helpful in dev to avoid self-signed cert issues and track connection lifecycle
            tls: {
              rejectUnauthorized: isProd,
            },
            connectionTimeout: 30_000,
            greetingTimeout: 20_000,
            socketTimeout: 30_000,
            pool: true,
            maxConnections: 5,
            auth: {
              user,
              pass,
            },
          },
          defaults: {
            from,
          },
          logger: !isProd,
          debug: !isProd,
          template: {
            dir: process.cwd() + '/apps/setting-service/templates',
            adapter: new HandlebarsAdapter(),
            options: {
              strict: true,
            },
          },
        };
      },
    }),
  ],
  controllers: [EmailController],
  providers: [EmailService],
  exports: [],
})
export class EmailModule {}
