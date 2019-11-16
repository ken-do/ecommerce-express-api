import * as crypto from 'crypto';

export default class Token {
    static cryptoAlgoritm = 'aes-256-cbc';
    static cryptoKey = crypto.randomBytes(32);
    static cryptoIv = crypto.randomBytes(16);

    static encrypt(text: string) {
        let cipher = crypto.createCipheriv(this.cryptoAlgoritm, Buffer.from(this.cryptoKey), this.cryptoIv);
        let encrypted = cipher.update(text);
        encrypted = Buffer.concat([encrypted, cipher.final()]);
        return encrypted.toString('hex');
    }

    static decrypt(token: string) {
        let encryptedText = Buffer.from(token, 'hex');
        let decipher = crypto.createDecipheriv(this.cryptoAlgoritm, Buffer.from(this.cryptoKey), this.cryptoIv.toString('hex'));
        let decrypted = decipher.update(encryptedText);
        decrypted = Buffer.concat([decrypted, decipher.final()]);
        return decrypted.toString();
    }
}