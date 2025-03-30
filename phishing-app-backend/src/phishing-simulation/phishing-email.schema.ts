import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class PhishingEmail extends Document {
  @Prop({ required: true })
  emailAddress: string;

  @Prop({ default: false })
  isOpened: boolean;

  @Prop({ default: Date.now })
  sentAt: Date;
}

export const PhishingEmailSchema = SchemaFactory.createForClass(PhishingEmail);
