import { Injectable } from '@nestjs/common';
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { PhishingEmail } from "./phishing-email.schema";
import * as nodemailer from 'nodemailer';
import {ConfigService} from "@nestjs/config";

@Injectable()
export class PhishingSimulationService {
    constructor(@InjectModel(PhishingEmail.name) private phishingEmailModel: Model<PhishingEmail>,
                private readonly configService: ConfigService
    ) {}

    async saveEmailData(toEmailAddress: string) {
        const newEmail = new this.phishingEmailModel({ emailAddress: toEmailAddress });
        await newEmail.save();
        return newEmail;
    }

    async markAsOpened(emailId: string) {
        const email = await this.phishingEmailModel.findById(emailId);
        if (email) {
            email.isOpened = true;
            await email.save();
        }
    }

    async sendPhishingEmail(toEmailAddress: string) {
        try {
            const email = await this.saveEmailData(toEmailAddress);

            const transporter = nodemailer.createTransport({
                host: this.configService.get('MAIL_HOST'),
                port: this.configService.get('MAIL_PORT'),
                auth: {
                    user: this.configService.get('MAIL_USER'),
                    pass: this.configService.get('MAIL_PASS')
                }
            });

            const trackingUrl = `http://localhost:5000/phishing/track/${email._id}`;

            const htmlContent = `
                <p>Hi! how are you?</p>
                <br />
                <a href="${trackingUrl}">click me</a>
              `;

            const mailOptions = {
                from: 'no-replay@gmail.com',
                to: toEmailAddress,
                subject: 'Hi from my app',
                html: htmlContent,
            };


            const sent = await transporter.sendMail(mailOptions);
            console.log('Send email:', sent)
        } catch (error) {
            console.error('Error sending email:', error);
        }
    }

    async getEmailStatus(emailId: string) {
        const email = await this.phishingEmailModel.findById(emailId);
        return email.isOpened  ? 'Opened': 'Never Opened'
    }
}
