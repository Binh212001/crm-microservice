import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { Opportunity } from 'apps/lead-service/src/api/opportunity/entities/opportunity.entity';
import { Order } from 'apps/order-service/src/api/order/entities/order.entity';
@Injectable()
export class EmailService {
  constructor(private readonly mailerService: MailerService) {}

  async sendQuotation(opportunity: Opportunity): Promise<void> {
    await this.mailerService.sendMail({
      to: opportunity.email,
      subject: 'Quotation',
      template: 'quotation.template.hbs',
      context: {
        opportunity,
        generatedAt: new Date().toISOString(),
      },
    });
  }
  async sendOrderEmail(order: Order): Promise<void> {
    await this.mailerService.sendMail({
      to: order.customerEmail,
      subject: 'Order',
      template: 'order.template.hbs',
      context: { order },
    });
  }
  async sendForgotPasswordEmail(
    email: string,
    password: string,
  ): Promise<void> {
    await this.mailerService.sendMail({
      to: email,
      subject: 'Forgot Password',
      template: 'forgot-password.template.hbs',
      context: {
        email,
        password,
        generatedAt: new Date().toISOString(),
      },
    });
  }
  async sendResetPasswordEmail(email: string, password: string): Promise<void> {
    await this.mailerService.sendMail({
      to: email,
      subject: 'Reset Password',
      template: 'reset-password.template.hbs',
      context: { email, password },
    });
  }
  async sendVerifyEmailEmail(email: string): Promise<void> {
    await this.mailerService.sendMail({
      to: email,
      subject: 'Verify Email',
      template: 'verify-email.template.hbs',
      context: { email },
    });
  }
  async sendChangePasswordEmail(
    email: string,
    password: string,
  ): Promise<void> {
    await this.mailerService.sendMail({
      to: email,
      subject: 'Change Password',
      template: 'change-password.template.hbs',
      context: { email, password },
    });
  }
}
