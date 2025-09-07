import { Module } from '@nestjs/common';
import { BunnyCloudServiceController } from './bunny-cloud-service.controller';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  controllers: [BunnyCloudServiceController],
  providers: [],
})
export class BunnyCloudServiceModule {}
