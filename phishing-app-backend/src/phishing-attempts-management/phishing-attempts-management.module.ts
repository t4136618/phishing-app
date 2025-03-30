import { Module } from '@nestjs/common';
import { PhishingAttemptsManagementService } from './phishing-attempts-management.service';
import { PhishingAttemptsManagementController } from './phishing-attempts-management.controller';

@Module({
  providers: [PhishingAttemptsManagementService],
  controllers: [PhishingAttemptsManagementController]
})
export class PhishingAttemptsManagementModule {}
