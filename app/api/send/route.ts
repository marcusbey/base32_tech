"use client";

import { NextResponse } from 'next/server';
import { Resend } from 'resend';

if (!process.env.RESEND_API_KEY) {
  throw new Error('Missing RESEND_API_KEY environment variable');
}

const resend = new Resend(process.env.RESEND_API_KEY);

// Template for the sender (confirmation email)
const techEmailTemplate = (vision: string, name: string) => `
<!DOCTYPE html>
<html>
  <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
    <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
      <h1 style="color: #2563eb;">Thank you for reaching out to BASE32.TECH!</h1>
      <p>Hi ${name},</p>
      <p>We're excited to learn about your vision:</p>
      <div style="background-color: #f8fafc; padding: 15px; border-radius: 8px; margin: 20px 0;">
        <p style="margin: 0;">${vision}</p>
      </div>
      <p>Our team will carefully review your project requirements and get back to you shortly with insights on how we can help bring your vision to life through our AI and automation solutions.</p>
      <p>In the meantime, feel free to explore our previous work and case studies at <a href="https://base32.tech" style="color: #2563eb;">base32.tech</a></p>
      <div style="margin-top: 30px;">
        <p style="margin: 0;">Best regards,</p>
        <p style="margin: 5px 0; font-weight: bold;">The BASE32 Team</p>
      </div>
    </div>
  </body>
</html>
`;

const studioEmailTemplate = (vision: string, name: string) => `
<!DOCTYPE html>
<html>
  <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
    <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
      <h1 style="color: #6366f1;">Thank you for reaching out to BASE32.STUDIO!</h1>
      <p>Hi ${name},</p>
      <p>We're thrilled to hear about your creative vision:</p>
      <div style="background-color: #f8fafc; padding: 15px; border-radius: 8px; margin: 20px 0;">
        <p style="margin: 0;">${vision}</p>
      </div>
      <p>Our creative team will review your project and reach out soon to discuss how we can bring your vision to life through our design expertise.</p>
      <p>While you wait, check out our portfolio at <a href="https://base32.studio" style="color: #6366f1;">base32.studio</a></p>
      <div style="margin-top: 30px;">
        <p style="margin: 0;">Best regards,</p>
        <p style="margin: 5px 0; font-weight: bold;">The BASE32.STUDIO Team</p>
      </div>
    </div>
  </body>
</html>
`;

// Template for the base32 team (notification email)
const teamNotificationTemplate = (vision: string, email: string, name: string, company: string) => `
<!DOCTYPE html>
<html>
  <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
    <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
      <h1 style="color: ${company === 'tech' ? '#2563eb' : '#6366f1'};">New Contact Form Submission</h1>
      <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <h2 style="margin-top: 0; color: #333;">Contact Details</h2>
        <p style="margin: 0;"><strong>Name:</strong> ${name}</p>
        <p style="margin: 10px 0;"><strong>Email:</strong> ${email}</p>
        <p style="margin: 10px 0 0;"><strong>Company Type:</strong> ${company === 'tech' ? 'BASE32.TECH' : 'BASE32.STUDIO'}</p>
      </div>
      <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <h2 style="margin-top: 0; color: #333;">Project Vision</h2>
        <p style="margin: 0;">${vision}</p>
      </div>
      <div style="margin-top: 20px;">
        <p style="margin: 0; color: #666;">This message was sent from the contact form on ${company === 'tech' ? 'base32.tech' : 'base32.studio'}</p>
      </div>
    </div>
  </body>
</html>
`;

export async function POST(request: Request) {
  try {
    const { vision, email, name, company } = await request.json();

    if (!vision || !email || !name) {
      return NextResponse.json(
        { error: 'Vision, email, and name are required' },
        { status: 400 }
      );
    }

    const template = company === 'tech' ? techEmailTemplate : studioEmailTemplate;
    const fromName = company === 'tech' ? 'BASE32.TECH' : 'BASE32.STUDIO';
    const fromEmail = company === 'tech' ? 'contact@base32.tech' : 'contact@base32.studio';
    const replyTo = company === 'tech' ? 'contact@base32.tech' : 'contact@base32.studio';

    // Send confirmation email to the sender
    const confirmationEmail = await resend.emails.send({
      from: `${fromName} <${fromEmail}>`,
      to: [email],
      subject: `Thank you for connecting with ${fromName}!`,
      html: template(vision, name),
      replyTo: replyTo
    });

    // Send notification email to the base32 team
    const notificationEmail = await resend.emails.send({
      from: `${fromName} Contact Form <${fromEmail}>`,
      to: [replyTo],
      subject: `New Contact Form Submission - ${name}`,
      html: teamNotificationTemplate(vision, email, name, company),
      replyTo: email // Set reply-to as the sender's email
    });

    return NextResponse.json({ 
      confirmation: confirmationEmail,
      notification: notificationEmail 
    });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
