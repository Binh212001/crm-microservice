import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { Opportunity } from 'apps/lead-service/src/api/opportunity/entities/opportunity.entity';
import { EmailService } from './email.service';
import { Order } from 'apps/order-service/src/api/order/entities/order.entity';

@Controller('email')
export class EmailController {
  constructor(private readonly emailService: EmailService) {}

  @EventPattern('send_quotation')
  async sendQuotation(@Payload() opportunity: Opportunity): Promise<void> {
    this.emailService.sendQuotation(opportunity);
  }

  @EventPattern('send_order')
  async sendOrder(@Payload() order: Order): Promise<void> {
    this.emailService.sendOrderEmail(order);
  }
  @EventPattern('send_forgot_password')
  async sendForgotPassword(
    @Payload() email: string,
    @Payload() password: string,
  ): Promise<void> {
    this.emailService.sendForgotPasswordEmail(email, password);
  }
}
