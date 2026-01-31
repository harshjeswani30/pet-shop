import nodemailer from 'nodemailer';
import { branding } from './config/branding';

const SMTP_HOST = process.env.SMTP_HOST || 'smtp.gmail.com';
const SMTP_PORT = parseInt(process.env.SMTP_PORT || '587');
const SMTP_USER = process.env.SMTP_USER || '';
const SMTP_PASSWORD = process.env.SMTP_PASSWORD || '';
const SMTP_FROM = process.env.SMTP_FROM || 'noreply@petcompanion.in';

const transporter = nodemailer.createTransport({ host: SMTP_HOST, port: SMTP_PORT, secure: SMTP_PORT === 465, auth: { user: SMTP_USER, pass: SMTP_PASSWORD } });

const emailTemplate = (title: string, content: string) => `<!DOCTYPE html>
<html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>${title}</title>
<style>body{font-family:'Inter',system-ui,sans-serif;line-height:1.6;color:#333}.container{max-width:600px;margin:0 auto;padding:20px}.header{background:linear-gradient(135deg,#2563eb,#10b981);padding:30px;text-align:center;border-radius:10px 10px 0 0}.header h1{color:white;margin:0;font-size:24px}.content{background:#fff;padding:30px;border:1px solid #e5e7eb;border-top:none;border-radius:0 0 10px 10px}.button{display:inline-block;background:#2563eb;color:white;padding:12px 30px;text-decoration:none;border-radius:6px;margin:20px 0}.footer{text-align:center;padding:20px;color:#6b7280;font-size:14px}.logo{font-size:28px;font-weight:bold;color:white}</style>
</head><body><div class="container"><div class="header"><div class="logo">🐾 ${branding.company.name}</div></div><div class="content">${content}</div><div class="footer"><p>${branding.company.mission}</p><p>Contact: ${branding.contact.email}</p><p>&copy; ${new Date().getFullYear()} ${branding.company.name}</p></div></div></body></html>`;

async function sendEmail(to: string, subject: string, html: string): Promise<boolean> {
  if (!SMTP_USER || !SMTP_PASSWORD) { console.log('Email not sent (SMTP not configured):', { to, subject }); return false; }
  try { await transporter.sendMail({ from: `"${branding.company.name}" <${SMTP_FROM}>`, to, subject, html }); return true; } catch (error) { console.error('Email error:', error); return false; }
}

export async function sendWelcomeEmail(to: string, name: string): Promise<boolean> {
  const content = `<h2>Welcome to ${branding.company.name}, ${name}!</h2><p>Thank you for joining India's most trusted pet marketplace.</p><ul><li>Browse verified pet listings</li><li>Connect with ethical breeders</li><li>Save favorites & track orders</li></ul><a href="${process.env.NEXT_PUBLIC_API_URL}/shop" class="button">Start Exploring</a>`;
  return sendEmail(to, `Welcome to ${branding.company.name}!`, emailTemplate('Welcome', content));
}

export async function sendVerificationEmail(to: string, name: string, token: string): Promise<boolean> {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/verify-email/${token}`;
  const content = `<h2>Verify Your Email</h2><p>Hi ${name},</p><p>Click below to verify your email:</p><a href="${url}" class="button">Verify Email</a><p style="word-break:break-all;color:#2563eb">${url}</p><p>Expires in 24 hours.</p>`;
  return sendEmail(to, 'Verify Your Email', emailTemplate('Email Verification', content));
}

export async function sendPasswordResetEmail(to: string, name: string, token: string): Promise<boolean> {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/reset-password/${token}`;
  const content = `<h2>Reset Your Password</h2><p>Hi ${name},</p><p>Click below to reset:</p><a href="${url}" class="button">Reset Password</a><p style="word-break:break-all;color:#2563eb">${url}</p><p>Expires in 1 hour.</p>`;
  return sendEmail(to, 'Password Reset', emailTemplate('Password Reset', content));
}

export async function sendOrderConfirmationEmail(to: string, name: string, orderNumber: string, petName: string, amount: number): Promise<boolean> {
  const content = `<h2>Order Confirmation</h2><p>Hi ${name},</p><div style="background:#f3f4f6;padding:20px;border-radius:8px;margin:20px 0"><p><strong>Order:</strong> ${orderNumber}</p><p><strong>Pet:</strong> ${petName}</p><p><strong>Amount:</strong> ₹${amount.toLocaleString()}</p></div><a href="${process.env.NEXT_PUBLIC_API_URL}/my-orders" class="button">View Order</a>`;
  return sendEmail(to, `Order Confirmation - ${orderNumber}`, emailTemplate('Order Confirmation', content));
}

export async function sendPaymentReceiptEmail(to: string, name: string, orderNumber: string, amount: number, paymentId: string): Promise<boolean> {
  const content = `<h2>Payment Receipt</h2><p>Hi ${name},</p><div style="background:#f3f4f6;padding:20px;border-radius:8px;margin:20px 0"><p><strong>Order:</strong> ${orderNumber}</p><p><strong>Payment ID:</strong> ${paymentId}</p><p><strong>Amount:</strong> ₹${amount.toLocaleString()}</p><p><strong>Date:</strong> ${new Date().toLocaleDateString('en-IN')}</p></div><a href="${process.env.NEXT_PUBLIC_API_URL}/my-orders" class="button">View Receipt</a>`;
  return sendEmail(to, `Receipt - ${orderNumber}`, emailTemplate('Payment Receipt', content));
}

export async function sendSellerApprovalEmail(to: string, name: string): Promise<boolean> {
  const content = `<h2>Seller Account Approved!</h2><p>Hi ${name},</p><p>Your seller account has been verified!</p><ul><li>List pets for sale</li><li>Manage inventory</li><li>Track sales & analytics</li></ul><a href="${process.env.NEXT_PUBLIC_API_URL}/dashboard/seller" class="button">Go to Dashboard</a>`;
  return sendEmail(to, 'Seller Account Approved!', emailTemplate('Seller Approval', content));
}

export async function verifyEmailConfig(): Promise<boolean> {
  if (!SMTP_USER || !SMTP_PASSWORD) return false;
  try { await transporter.verify(); return true; } catch { return false; }
}
