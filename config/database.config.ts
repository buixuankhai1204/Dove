import { registerAs } from '@nestjs/config';

export default registerAs('database1', () => ({
  host: process.env.HOST,
  port: process.env.PORT || 5432
}));
