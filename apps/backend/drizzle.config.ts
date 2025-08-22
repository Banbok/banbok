import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  schema: ['./src/**/*.schema.ts', './src/**/schema/*.ts'],
  out: './drizzle',
  dialect: 'postgresql',
  dbCredentials: {
    host: process.env.DATABASE_HOST || 'localhost',
    port: Number(process.env.DATABASE_PORT) || 5432,
    user: process.env.DATABASE_USER || 'postgres',
    password: process.env.DATABASE_PASSWORD || 'password',
    database: process.env.DATABASE_NAME || 'banbok',
    ssl: false,
  },
});
