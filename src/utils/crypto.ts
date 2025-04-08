import * as crypto from 'crypto';

export function md5(password: string): string {
  return crypto.createHash('md5').update(password).digest('hex');
}
