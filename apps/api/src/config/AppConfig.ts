import dotenv from 'dotenv';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

dotenv.config();

const appConfig = {
    appMode: process.env.APP_MODE || 'background', // combined, api, background
    port: process.env.APP_PORT || 8000,
    jwt: {
        secret: process.env.JWT_SECRET || 'abc123',
        expiresIn: process.env.JWT_EXPIRES_IN || '30d',
    },
    database: {
        host: process.env.CLOTHIFY_DB_HOST || 'localhost',
        port: parseInt(process.env.CLOTHIFY_DB_PORT || '5432', 10),
        username: process.env.CLOTHIFY_DB_USERNAME || 'clothify',
        password: process.env.CLOTHIFY_DB_PASSWORD || '123456',
        name: process.env.CLOTHIFY_DB_NAME || 'clothify',
        type: process.env.CLOTHIFY_DB_TYPE || 'postgres',
        schema: process.env.CLOTHIFY_DB_SCHEMA || 'public',
    } as TypeOrmModuleOptions,
    minio: {
        endpoint: process.env.MINIO_ENDPOINT || 'localhost',
        port: parseInt(process.env.MINIO_PORT || '9000', 10),
        useSSL: process.env.MINIO_USE_SSL === 'true',
        accessKey: process.env.MINIO_ACCESS_KEY || 'clothify',
        secretKey: process.env.MINIO_SECRET_KEY || '12345678',
        bucketName: 'clothify',
    },
    azureBlob: {
        connectionString: process.env.AZURE_BLOB_CONNECTION_STRING || 'your_connection_string_here',
    },
    cloudflareR2: {
        endpoint: process.env.CLOUDFLARE_R2_ENDPOINT,
        region: process.env.CLOUDFLARE_R2_REGION || 'auto',
        accessKeyId: process.env.CLOUDFLARE_R2_ACCESS_KEY_ID,
        secretAccessKey: process.env.CLOUDFLARE_R2_SECRET_ACCESS_KEY,
        publicBaseUrl: process.env.CLOUDFLARE_R2_PUBLIC_BASE_URL,
        bucket: process.env.CLOUDFLARE_R2_BUCKET || 'clothify',
    },
    rabbitmq: {
        vhost: process.env.RABBITMQ_VHOST,
        ssl: process.env.RABBITMQ_SSL == 'true',
        defaultUser: process.env.RABBITMQ_DEFAULT_USER || 'clothify',
        defaultPass: process.env.RABBITMQ_DEFAULT_PASS || '12345678',
        host: process.env.RABBITMQ_HOST || 'localhost',
        port: parseInt(process.env.RABBITMQ_PORT || '5672', 10),
        deadLetterScope: process.env.DEAD_LETTER_SCOPE || 'clothify',
    },
    otp: {
        privateKey: process.env.OTP_PRIVATE_KEY || 'clothify',
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
