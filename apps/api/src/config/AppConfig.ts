import dotenv from 'dotenv';

dotenv.config();

const appConfig = {
    appMode: process.env.APP_MODE || 'api', // combined, api, background
    port: process.env.APP_PORT || 8000,
    database: {
        type: process.env.DATABASE_TYPE || 'postgres',
        url: process.env.DATABASE_URL || 'localhost',
    },
    supabase: {
        jwtSecret: process.env.SUPABASE_JWT_SECRET || 'abc123',
    },
    smtp: {
        host: process.env.SMTP_HOST || '',
        port: Number(process.env.SMTP_PORT || 587),
        secure: process.env.SMTP_IS_SECURE == 'true',
        auth: {
            user: process.env.SMTP_EMAIL || '',
            pass: process.env.SMTP_EMAIL_PASSWORD,
        },
        from: process.env.SMTP_SEND_FROM,
    },
};

export { appConfig };
