import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { TokenblacklistBackupExecute } from './provider/tokenblacklist-backup-execute';

@Injectable()
export class TokenblacklistBackupTaskService {
  constructor(
    private readonly tokenblacklistBackupExecute: TokenblacklistBackupExecute,
  ) {}

  @Cron('0 0 * * *')
  async task() {
    await this.tokenblacklistBackupExecute.execute();
  }
}
