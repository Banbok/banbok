import { Injectable } from '@nestjs/common';
import { ISendMailOptions, MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {
  }

  async sendEmail(params: {
    to: string;
    subject: string;
    template: string;
    context: ISendMailOptions['context'];
  }) {
    try {
      const sendMailParams = {
        to: params.to, // 누구한테 보낼지
        from: process.env.SMTP_FROM,
        subject: params.subject, // 제목
        template: params.template, // 템플릿
        context: params.context, // 템플릿에 넣을 변수들
      }

      const response = await this.mailerService.sendMail(sendMailParams);

      console.log('이메일 전송이 완료되었습니다. :', response);
    } catch (error) {
      console.error('이메일 전송도중 에러가 발생했습니다. :', error);
      throw error;
    }
  }
}
