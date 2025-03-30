import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PhishingSimulationModule } from './phishing-simulation/phishing-simulation.module';
import { PhishingAttemptsManagementModule } from './phishing-attempts-management/phishing-attempts-management.module';

@Module({
  imports: [PhishingSimulationModule, PhishingAttemptsManagementModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
