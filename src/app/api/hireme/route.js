import nodemailer from "nodemailer";

export async function POST(request) {
  const { name, email, message } = await request.json();
  if (!name || !email || !message) {
    return Response.json({ error: "All fields are required" }, { status: 400 });
  }

  try {
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS },
    });
    await transporter.sendMail({
      from: `"${name}" <${email}>`,
      to: process.env.EMAIL_USER,
      replyTo: email,
      subject: `🚀 Hire Me Request from ${name}`,
      html: `<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;"><h2 style="color: #2563eb; border-bottom: 2px solid #2563eb; padding-bottom: 10px;">New Hire Request</h2><div style="background: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;"><p><strong style="color: #374151;">Name:</strong> ${name}</p><p><strong style="color: #374151;">Email:</strong> ${email}</p><p><strong style="color: #374151;">Message:</strong></p><p style="background: white; padding: 15px; border-radius: 5px; border-left: 4px solid #2563eb;">${message}</p></div><p style="color: #6b7280; font-size: 14px;">This request was sent from your portfolio website.</p></div>`,
      text: `New Hire Request\n-------------------\nName: ${name}\nEmail: ${email}\nMessage: ${message}\n-------------------\nThis request was sent from your portfolio website.`,
    });
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Thank you for your interest!",
      html: `<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;"><h2 style="color: #2563eb;">Thank You for Reaching Out!</h2><p>Hi ${name},</p><p>Thank you for your interest in hiring me. I've received your request and will get back to you as soon as possible.</p><div style="background: #f3f4f6; padding: 15px; border-radius: 5px; margin: 20px 0;"><p style="margin: 0;"><strong>Your message:</strong></p><p style="margin: 10px 0 0 0;"><em>${message}</em></p></div><p>In the meantime, feel free to check out my portfolio or connect with me on social media.</p><hr style="border: none; border-top: 1px solid #e5e7eb; margin: 20px 0;" /><p style="color: #6b7280; font-size: 14px;">Best regards,<br /><strong>Musku Nishitha</strong><br />React & React Native Developer</p></div>`,
    });
    return Response.json({ success: true, message: "Email sent successfully" });
  } catch (error) {
    console.error("Hire Me API Error:", error);
    return Response.json({ error: "Failed to send email. Please try again later." }, { status: 500 });
  }
}

export async function GET() {
  return Response.json({ error: "Method not allowed" }, { status: 405 });
}
