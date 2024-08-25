import * as crypto from 'crypto';

const createKey = (key: string) => {
  const md5 = crypto.createHash('md5').update(key).digest('hex');
  return md5.slice(0, 24);
};
export const TripleDES = {
  encrypt(data: string, key: string): string {
    const cipher = crypto.createCipheriv('des-ede3', createKey(key), null);
    let encrypted = cipher.update(data, 'utf8', 'base64');
    encrypted += cipher.final('base64');
    return encrypted;
  },

  decrypt(data: string, key: string): string {
    const decipher = crypto.createDecipheriv('des-ede3', createKey(key), null);
    let decrypted = decipher.update(data, 'base64', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
  },
};
