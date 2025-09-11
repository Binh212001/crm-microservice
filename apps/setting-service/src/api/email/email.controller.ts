import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { Opportunity } from 'apps/lead-service/src/api/opportunity/entities/opportunity.entity';
import { EmailService } from './email.service';

@Controller('email')
export class EmailController {
  constructor(private readonly emailService: EmailService) {}

  @EventPattern('send_quotation')
  async sendQuotation(@Payload() opportunity: Opportunity): Promise<void> {
    this.emailService.sendQuotation(opportunity);
  }
}
