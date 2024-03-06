import { Injectable } from '@nestjs/common';
import * as crypto from 'crypto';
import { KmsManager } from './kms-manager';
import { ConfigService } from '@nestjs/config';
import { EnvKey } from 'src/common/env.validator';

@Injectable()
export class CryptoManager {
  #key;
  #iv;

  constructor(
    private readonly kmsManager: KmsManager,
    private readonly configService: ConfigService,
  ) {}
  async encrypt(plainText: string) {
    const { key, iv } = await this.getParams();
    const cipher = crypto.createCipheriv('aes-256-gcm', key, iv);
    const encrypted = cipher.update(plainText);
    const rst = cipher.final();

    return `${cipher.getAuthTag().toString('hex')}:${Buffer.concat([
      encrypted,
      rst,
    ]).toString('hex')}`;
  }

  async decrypt(ciphertext: string) {
    const { key, iv } = await this.getParams();
    const textParts = ciphertext.split(':');
    const authTag = Buffer.from(textParts.shift(), 'hex');
    const encryptedText = Buffer.from(textParts.join(':'), 'hex');
    const decipher = crypto.createDecipheriv('aes-256-gcm', key, iv);

    decipher.setAuthTag(authTag);

    const decrypted = decipher.update(encryptedText);

    return Buffer.concat([decrypted, decipher.final()]).toString();
  }

  async getParams() {
    if (!this.#key) {
      this.#key = await this.kmsManager.decrypt(
        this.configService.get(EnvKey.ENCRYPTION_KEY),
      );
    }
    if (!this.#iv) {
      this.#iv = await this.kmsManager.decrypt(
        this.configService.get(EnvKey.ENCRYPTION_IV),
      );
    }

    return {
      key: Buffer.from(this.#key),
      iv: Buffer.from(this.#iv, 'hex'),
    };
  }
}
