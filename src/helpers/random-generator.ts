import crypto from 'crypto';

export function generate() {
    return crypto.randomBytes(15).toString('hex').slice(0, 15);
}