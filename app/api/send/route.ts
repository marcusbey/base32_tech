import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const { vision, email } = await request.json();

    if (!vision || !email) {
      return NextResponse.json(
        { error: 'Vision and email are required' },
        { status: 400 }
      );
    }

    const data = await resend.emails.send({
      from: 'Base32 <onboarding@resend.dev>',
      to: [email],
      subject: 'Thanks for sharing your vision with Base32',
      html: `
        <h1>Thank you for reaching out!</h1>
        <p>We've received your vision:</p>
        <p>${vision}</p>
        <p>We'll be in touch soon to discuss how we can help bring your vision to life.</p>
        <br/>
        <p>Best regards,</p>
        <p>The Base32 Team</p>
      `,
    });

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
