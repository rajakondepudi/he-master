import path from 'path';
import { Transport } from '@nestjs/microservices';

export const HTTP_PING_URL = 'http://localhost:3000/';
export const MICROSERVICE_OPTION = { transport: Transport.TCP, option: { host: 'localhost', port: 3000 } };
export const MEMORY_THRESHOLD = 150 * 1024 * 1024;
export const STORAGE_OPTION = { path: path.resolve('/'), thresholdPercent: 0.5 };
