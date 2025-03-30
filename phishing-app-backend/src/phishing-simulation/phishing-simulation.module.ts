import { Module } from '@nestjs/common';
import { PhishingSimulationService } from './phishing-simulation.service';
import { PhishingSimulationController } from './phishing-simulation.controller';

@Module({
  providers: [PhishingSimulationService],
  controllers: [PhishingSimulationController]
})
export class PhishingSimulationModule {}
