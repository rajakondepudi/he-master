/**
 * Logger related class
 */
import { Inject, Injectable } from '@nestjs/common';
import { Logger } from 'winston';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
@Injectable()
export class LoggerService {
  constructor(@Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger) {}

  async logInfo(message: string, data: Record<string, unknown>): Promise<void> {
    await this.logger.info(message, data);
  }

  async logError(message: string, data: Record<string, unknown>): Promise<void> {
    await this.logger.error(message, data);
  }

  async logDebug(message: string, data: Record<string, unknown>): Promise<void> {
    await this.logger.debug(message, data);
  }

  async logWarn(message: string, data: Record<string, unknown>): Promise<void> {
    await this.logger.warn(message, data);
  }
}
