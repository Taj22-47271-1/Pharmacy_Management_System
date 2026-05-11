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

  async sendOtpEmail(email: string, otp: string) {
    try {
      const info = await this.transporter.sendMail({
        from: process.env.MAIL_USER,
        to: email,
        subject: 'Password Reset OTP',

        html: `
          <h2>Password Reset OTP</h2>
          <p>Your OTP is:</p>
          <h1>${otp}</h1>
        `,
      });

      console.log('MAIL SENT:', info.response);

      return {
        message: 'OTP sent successfully',
      };
    } catch (error) {
      console.log('MAIL ERROR:', error);

      throw error;
    }
  }
}