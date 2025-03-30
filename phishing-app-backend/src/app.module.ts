import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
// import {ClientsModule, Transport} from "@nestjs/microservices";
import {PhishingSimulationModule} from "./phishing-simulation/phishing-simulation.module";
import {ConfigModule, ConfigService} from "@nestjs/config";
import {MongooseModule} from "@nestjs/mongoose";

@Module({
  // imports: [ClientsModule.register([
  //   {
  //     name: 'PHISHING_SIMULATION',
  //     transport: Transport.TCP,
  //     options: {
  //       host: 'localhost',
  //       port: 3001,
  //     },
  //   },
  //   {
  //     name: 'PHISHING_ATTEMPTS_MANAGEMENT',
  //     transport: Transport.TCP,
  //     options: {
  //       host: 'localhost',
  //       port: 3002,
  //     },
  //   },
  // ]),],
  imports: [
      PhishingSimulationModule,
      ConfigModule.forRoot({ envFilePath: '.env', isGlobal: true }),
      MongooseModule.forRootAsync({
          imports: [ConfigModule],
          useFactory: async (config: ConfigService) => ({
              uri: config.get<string>('MONGO_URI'),
          }),
          inject: [ConfigService],
      }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
