import { Module } from '@nestjs/common';
import { PhishingSimulationService } from './phishing-simulation.service';
import { PhishingSimulationController } from './phishing-simulation.controller';
import {MongooseModule} from "@nestjs/mongoose";
import {MailerModule} from "@nestjs-modules/mailer";
import {PhishingEmail, PhishingEmailSchema} from "./phishing-email.schema";
import {ConfigService} from "@nestjs/config";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: PhishingEmail.name, schema: PhishingEmailSchema }]),
    MailerModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        transport: {
          host: configService.get<string>('MAIL_HOST'),
          auth: {
            user: configService.get<string>('MAIL_USER'),
            pass: configService.get<string>('MAIL_PASS'),
          },
        },
      }),
    }),
  ],
  providers: [PhishingSimulationService],
  controllers: [PhishingSimulationController]
})
export class PhishingSimulationModule {}
