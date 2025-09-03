import { Module } from '@nestjs/common';
import { MailService } from './service';
import { MailerModule } from '@nestjs-modules/mailer';
import { PugAdapter } from '@nestjs-modules/mailer/dist/adapters/pug.adapter';
import * as path from 'path';

@Module({
  imports: [
    MailerModule.forRootAsync({
      useFactory: () => ({
        transport: {
          host: process.env.SMPT_HOST,
          port: +process.env.SMPT_PORT,
          secure: false,
          auth: {
            user: process.env.SMPT_USER,
            pass: process.env.SMPT_PASS,
          },
          tls: {
            rejectUnauthorized: false,
          }
        },
        defaults: {
          from: process.env.FROM,
        },
        template: {
          dir: path.join(__dirname, '../../templates'),
          adapter: new PugAdapter(),
          options: {
            strict: true,
          },
        },
      })
    })
  ],
  providers: [MailService],
  exports: [MailService],
})
export class MailModule {
}
