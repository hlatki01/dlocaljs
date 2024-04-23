// src/misc/signature.ts
import crypto from 'crypto';

export function calculatePayinsSignature(timestamp: string, xLogin: string, secretKey: string, body?: string): string {

    if (!xLogin || !secretKey) {
        throw new Error('DLocal environment variables are not set.');
    }

    let message = xLogin + timestamp;

    if (body) {
        message += body;
    }

    const hmac = crypto.createHmac('sha256', secretKey);
    hmac.update(message, 'utf-8');
    const signature = hmac.digest('hex');

    return `V2-HMAC-SHA256, Signature: ${signature}`;
}
