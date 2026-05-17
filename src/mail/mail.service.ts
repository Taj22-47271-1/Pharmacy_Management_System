import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailService {
    private transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.MAIL_USER,
            pass: process.env.MAIL_PASS,
        },
    });

    async sendOrderConfirmation(email: string, fullName: string) {
        await this.transporter.sendMail({
            from: process.env.MAIL_USER,
            to: email,
            subject: 'Order Confirmation - ePharmacy',
            html: `
        <h2>Hello ${fullName}</h2>
        <p>Your order has been placed successfully.</p>
        <p>Thank you for shopping with ePharmacy.</p>
      `,
        });

        return true;
    }
}