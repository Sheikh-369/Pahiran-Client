// utils/sendMail.ts
import nodemailer from "nodemailer";
import { config } from "dotenv";
config();

interface IMailInformation {
  to: string;
  subject: string;
  html: string;
}

const sendMail = async (mailInformation: IMailInformation) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.NODEMAILER_EMAIL,
      pass: process.env.NODEMAILER_PASSWORD,
    },
  });

  const mailFormatObject = {
    from: "WashTralaya",
    to: mailInformation.to,
    subject: mailInformation.subject,
    html: mailInformation.html,
  };

  try {
    await transporter.sendMail(mailFormatObject);
  } catch (error) {
    console.error("SendMail error:", error);
    throw error;
  }
};

export default sendMail;
