import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { PhishingSimulationService } from "./phishing-simulation.service";

@Controller('phishing')
export class PhishingSimulationController {
    constructor(private readonly phishingSimulationService: PhishingSimulationService) {}

    @Post('send')
    sendPhishingEmail(@Body() { to }: { to: string; }) {
        const emailId = this.phishingSimulationService.sendPhishingEmail(to);
        return { message: 'Email sent successfully', emailId};
    }

    @Get('track/:emailId')
    trackEmailOpen(@Param('emailId') emailId: string) {
        this.phishingSimulationService.markAsOpened(emailId);
        return 'Tracked';
    }
}
