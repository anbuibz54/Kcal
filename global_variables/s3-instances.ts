import 'react-native-url-polyfill/auto';

import { S3Client } from '@aws-sdk/client-s3';
export const cloudflareR2 = new S3Client({
    credentials: {
        accessKeyId: 'aad6fefa852b2496254047351868ffa5',
        secretAccessKey: 'ba07ef6ecb0cb91dab13d753cea5db65ea8760f3ab6f36954171de92bb53386e',
    },
    region: 'auto',
    apiVersion: '2006-03-01',
    endpoint: 'https://ca2ef2fb3b6315782a92dea2d4b4e727.r2.cloudflarestorage.com',
    logger: console,
});

export const R2_PUBLIC_DOMAIN = 'https://bilesoft.org/';
