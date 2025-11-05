import { Resend } from 'resend';
import { NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

interface OrderItem {
  id: number;
  name: string;
  image: string;
  price: number;
  quantity: number;
}

interface ShippingAddress {
  address: string;
  city: string;
  zipCode: string;
  country: string;
}

interface Totals {
  subtotal: number;
  shipping: number;
  vat: number;
  grandTotal: number;
}

interface EmailRequest {
  email: string;
  name: string;
  orderId: string;
  items: OrderItem[];
  totals: Totals;
  shipping: ShippingAddress;
}

function formatPrice(price: number): string {
  return price.toLocaleString('en-US', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
}

function generateEmailHTML(data: EmailRequest): string {
  const itemsHTML = data.items
    .map(
      (item) => `
    <tr>
      <td style="padding: 12px; border-bottom: 1px solid #f1f1f1;">
        <div style="display: flex; align-items: center; gap: 12px;">
          <img src="${item.image}" alt="${item.name}" style="width: 64px; height: 64px; border-radius: 8px; object-fit: cover;" />
          <div>
            <p style="margin: 0; font-weight: bold; color: #000;">${item.name}</p>
            <p style="margin: 4px 0 0 0; color: #666; font-size: 14px;">$${formatPrice(item.price)}</p>
          </div>
        </div>
      </td>
      <td style="padding: 12px; text-align: right; border-bottom: 1px solid #f1f1f1; color: #666;">
        x${item.quantity}
      </td>
      <td style="padding: 12px; text-align: right; border-bottom: 1px solid #f1f1f1; font-weight: bold;">
        $${formatPrice(item.price * item.quantity)}
      </td>
    </tr>
  `
    )
    .join('');

  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Order Confirmation</title>
    </head>
    <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f5f5f5;">
      <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff;">
        <!-- Header -->
        <div style="background-color: #191919; padding: 32px; text-align: center;">
          <h1 style="margin: 0; color: #ffffff; font-size: 24px; font-weight: bold; letter-spacing: -0.5px;">AUDIOPHILE</h1>
        </div>
        
        <!-- Success Icon -->
        <div style="padding: 48px 32px 24px 32px; text-align: center;">
          <div style="width: 64px; height: 64px; background-color: #D87D4A; border-radius: 50%; margin: 0 auto; display: flex; align-items: center; justify-content: center;">
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 20L8 16L6.5 17.5L12 23L26 9L24.5 7.5L12 20Z" fill="white" stroke="white" stroke-width="2"/>
            </svg>
          </div>
        </div>
        
        <!-- Main Content -->
        <div style="padding: 0 32px 32px 32px;">
          <h2 style="margin: 0 0 16px 0; font-size: 28px; font-weight: bold; text-align: center; text-transform: uppercase;">
            Thank you<br/>for your order
          </h2>
          
          <p style="margin: 0 0 32px 0; text-align: center; color: #666; font-size: 16px; line-height: 1.6;">
            Hi ${data.name},<br/>
            Your order has been confirmed! You will receive a shipping confirmation email once your order has shipped.
          </p>
          
          <!-- Order ID -->
          <div style="background-color: #f5f5f5; padding: 16px; border-radius: 8px; margin-bottom: 24px; text-align: center;">
            <p style="margin: 0; color: #666; font-size: 14px;">Order ID</p>
            <p style="margin: 8px 0 0 0; font-weight: bold; font-size: 18px; color: #000;">${data.orderId}</p>
          </div>
          
          <!-- Order Summary -->
          <h3 style="margin: 0 0 16px 0; font-size: 18px; font-weight: bold; text-transform: uppercase;">Order Summary</h3>
          
          <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
            <thead>
              <tr style="border-bottom: 2px solid #000;">
                <th style="padding: 12px; text-align: left; font-size: 14px; color: #666; font-weight: normal;">ITEM</th>
                <th style="padding: 12px; text-align: right; font-size: 14px; color: #666; font-weight: normal;">QTY</th>
                <th style="padding: 12px; text-align: right; font-size: 14px; color: #666; font-weight: normal;">PRICE</th>
              </tr>
            </thead>
            <tbody>
              ${itemsHTML}
            </tbody>
          </table>
          
          <!-- Totals -->
          <div style="background-color: #f5f5f5; padding: 24px; border-radius: 8px; margin-bottom: 24px;">
            <div style="display: flex; justify-content: space-between; margin-bottom: 12px;">
              <span style="color: #666; text-transform: uppercase; font-size: 14px;">Subtotal</span>
              <span style="font-weight: bold;">$${formatPrice(data.totals.subtotal)}</span>
            </div>
            <div style="display: flex; justify-content: space-between; margin-bottom: 12px;">
              <span style="color: #666; text-transform: uppercase; font-size: 14px;">Shipping</span>
              <span style="font-weight: bold;">$${formatPrice(data.totals.shipping)}</span>
            </div>
            <div style="display: flex; justify-content: space-between; margin-bottom: 16px; padding-bottom: 16px; border-bottom: 1px solid #ddd;">
              <span style="color: #666; text-transform: uppercase; font-size: 14px;">VAT (Included)</span>
              <span style="font-weight: bold;">$${formatPrice(data.totals.vat)}</span>
            </div>
            <div style="display: flex; justify-content: space-between;">
              <span style="color: #666; text-transform: uppercase; font-size: 14px;">Grand Total</span>
              <span style="font-weight: bold; color: #D87D4A; font-size: 18px;">$${formatPrice(data.totals.grandTotal)}</span>
            </div>
          </div>
          
          <!-- Shipping Address -->
          <h3 style="margin: 0 0 16px 0; font-size: 18px; font-weight: bold; text-transform: uppercase;">Shipping Address</h3>
          <div style="background-color: #f5f5f5; padding: 20px; border-radius: 8px; margin-bottom: 32px;">
            <p style="margin: 0; line-height: 1.6; color: #333;">
              ${data.name}<br/>
              ${data.shipping.address}<br/>
              ${data.shipping.city}, ${data.shipping.zipCode}<br/>
              ${data.shipping.country}
            </p>
          </div>
          
          <!-- Support Info -->
          <div style="text-align: center; padding: 24px 0; border-top: 1px solid #f1f1f1;">
            <p style="margin: 0 0 8px 0; color: #666; font-size: 14px;">Need help with your order?</p>
            <p style="margin: 0;">
              <a href="mailto:support@audiophile.com" style="color: #D87D4A; text-decoration: none; font-weight: bold;">Contact Support</a>
            </p>
          </div>
        </div>
        
        <!-- Footer -->
        <div style="background-color: #191919; padding: 32px; text-align: center;">
          <p style="margin: 0; color: #999; font-size: 14px;">
            © ${new Date().getFullYear()} Audiophile. All rights reserved.
          </p>
        </div>
      </div>
    </body>
    </html>
  `;
}

export async function POST(request: Request) {
  try {
    const body: EmailRequest = await request.json();
    const { email, name, orderId, items, totals, shipping } = body;

    // Validate required fields
    if (!email || !name || !orderId || !items || !totals || !shipping) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Send email using Resend
    const data = await resend.emails.send({
      from: 'Audiophile <onboarding@resend.dev>', // Change this to your verified domain
      to: email,
      subject: `Order Confirmation - ${orderId}`,
      html: generateEmailHTML(body),
    });

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json(
      { error: 'Failed to send confirmation email', details: error },
      { status: 500 }
    );
  }
}
