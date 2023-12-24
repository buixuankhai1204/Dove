import { registerAs } from '@nestjs/config';

export default registerAs('database1', () => ({
  host: process.env.host,
  port: process.env.port || 5432
}));