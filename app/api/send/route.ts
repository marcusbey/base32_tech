import { NextResponse } from 'next/server';
import { Resend } from 'resend';

if (!process.env.RESEND_API_KEY) {
  throw new Error('Missing RESEND_API_KEY environment variable');
}

const resend = new Resend(process.env.RESEND_API_KEY);

const techEmailTemplate = (vision: string) => `
<!DOCTYPE html>
<html>
  <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
    <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
      <h1 style="color: #2563eb;">Thank you for reaching out to BASE32.TECH!</h1>
      <p>We're excited to learn about your vision:</p>
      <div style="background-color: #f8fafc; padding: 15px; border-radius: 8px; margin: 20px 0;">
        <p style="margin: 0;">${vision}</p>
      </div>
      <p>Our team will carefully review your project requirements and get back to you shortly with insights on how we can help bring your vision to life through our AI and automation solutions.</p>
      <p>In the meantime, feel free to explore our previous work and case studies at <a href="https://base32.tech" style="color: #2563eb;">base32.tech</a></p>
      <div style="margin-top: 30px;">
        <p style="margin: 0;">Best regards,</p>
        <p style="margin: 5px 0; font-weight: bold;">The BASE32.TECH Team</p>
      </div>
    </div>
  </body>
</html>
`;

const studioEmailTemplate = (vision: string) => `
<!DOCTYPE html>
<html>
  <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
    <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
      <h1 style="color: #6366f1;">Thank you for reaching out to BASE32.STUDIO!</h1>
      <p>We're thrilled to hear about your creative vision:</p>
      <div style="background-color: #f8fafc; padding: 15px; border-radius: 8px; margin: 20px 0;">
        <p style="margin: 0;">${vision}</p>
      </div>
      <p>Our creative team will review your project and reach out soon to discuss how we can bring your vision to life through our design expertise.</p>
      <p>While you wait, check out our portfolio at <a href="https://base32.tech" style="color: #6366f1;">base32.tech</a></p>
      <div style="margin-top: 30px;">
        <p style="margin: 0;">Best regards,</p>
        <p style="margin: 5px 0; font-weight: bold;">The BASE32.STUDIO Team</p>
      </div>
    </div>
  </body>
</html>
`;

export async function POST(request: Request) {
  try {
    const { vision, email, company } = await request.json();

    if (!vision || !email) {
      return NextResponse.json(
        { error: 'Vision and email are required' },
        { status: 400 }
      );
    }

    const template = company === 'tech' ? techEmailTemplate : studioEmailTemplate;
    const fromName = company === 'tech' ? 'BASE32.TECH' : 'BASE32.STUDIO';

    const data = await resend.emails.send({
      from: `${fromName} <onboarding@resend.dev>`,
      to: [email],
      subject: `Thank you for connecting with ${fromName}!`,
      html: template(vision),
    });

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
