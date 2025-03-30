import {Body, Controller, Get, HttpException, Param, Post} from '@nestjs/common';
import { PhishingSimulationService } from "./phishing-simulation.service";
import { isValidObjectId } from "mongoose";

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

    @Get('status/:emailId')
    async getEmailStatus(@Param('emailId') emailId: string) {
        if(isValidObjectId(emailId)) {
            const status = await this.phishingSimulationService.getEmailStatus(emailId);
            return {status}
        }
        return new HttpException('Id is not valid', 400)
    }
}
