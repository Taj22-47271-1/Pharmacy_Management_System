import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailService {
  private transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });
  }

  async sendOtpEmail(to: string, otp: string) {
    await this.transporter.sendMail({
      from: process.env.MAIL_USER,
      to,
      subject: 'Your OTP Code',
      text: `Your OTP code is: ${otp}`,
      html: `
        <h2>Your OTP Code</h2>
        <p>Your OTP code is:</p>
        <h1>${otp}</h1>
      `,
    });

    return {
      message: 'OTP sent to email',
    };
  }
}