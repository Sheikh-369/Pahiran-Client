// pages/api/contact.ts
import type { NextApiRequest, NextApiResponse } from "next";
import sendMail from "../../utils/sendMail"; // adjust path if needed

type Data = { success: boolean; error?: string };

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method !== "POST") {
    return res.status(405).json({ success: false, error: "Method not allowed" });
  }

  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ success: false, error: "All fields are required" });
  }

  try {
    await sendMail({
      to: process.env.EMAIL_TO!,
      subject: `New Contact Message from ${name}`,
      html: `
        <h2>New Message from WashTralaya Contact Form</h2>
        <p><b>Name:</b> ${name}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Message:</b><br/>${message}</p>
      `,
    });

    return res.status(200).json({ success: true });
  } catch (error) {
    return res.status(500).json({ success: false, error: "Failed to send email." });
  }
}
