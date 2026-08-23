// pages/api/hireme.js
import nodemailer from "nodemailer";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { name, email, message } = req.body;

  // Validate input
  if (!name || !email || !message) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.EMAIL_USER, // your email
        pass: process.env.EMAIL_PASS, // app password for Gmail
      },
    });

    await transporter.sendMail({
      from: `"${name}" <${email}>`,
      to: process.env.EMAIL_USER, // your email to receive requests
      replyTo: email,
      subject: `🚀 Hire Me Request from ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #2563eb; border-bottom: 2px solid #2563eb; padding-bottom: 10px;">
            New Hire Request
          </h2>
          
          <div style="background: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p><strong style="color: #374151;">Name:</strong> ${name}</p>
            <p><strong style="color: #374151;">Email:</strong> ${email}</p>
            <p><strong style="color: #374151;">Message:</strong></p>
            <p style="background: white; padding: 15px; border-radius: 5px; border-left: 4px solid #2563eb;">
              ${message}
            </p>
          </div>
          
          <p style="color: #6b7280; font-size: 14px;">
            This request was sent from your portfolio website.
          </p>
        </div>
      `,
      // Plain text version as fallback
      text: `
        New Hire Request
        -------------------
        Name: ${name}
        Email: ${email}
        Message: ${message}
        -------------------
        This request was sent from your portfolio website.
      `,
    });

    // Optional: Send auto-reply to the person who submitted
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Thank you for your interest!",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #2563eb;">Thank You for Reaching Out!</h2>
          <p>Hi ${name},</p>
          <p>Thank you for your interest in hiring me. I've received your message and will get back to you as soon as possible.</p>
          
          <div style="background: #f3f4f6; padding: 15px; border-radius: 5px; margin: 20px 0;">
            <p style="margin: 0;"><strong>Your message:</strong></p>
            <p style="margin: 10px 0 0 0;"><em>${message}</em></p>
          </div>
          
          <p>In the meantime, feel free to check out my portfolio or connect with me on social media.</p>
          
          <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 20px 0;" />
          
          <p style="color: #6b7280; font-size: 14px;">
            Best regards,<br />
            <strong>Musku Nishitha</strong><br />
            React & React Native Developer
          </p>
        </div>
      `,
    });

    res.status(200).json({ 
      success: true, 
      message: "Email sent successfully" 
    });
  } catch (error) {
    console.error("Hire Me API Error:", error);
    res.status(500).json({ 
      error: "Failed to send email. Please try again later." 
    });
  }
}