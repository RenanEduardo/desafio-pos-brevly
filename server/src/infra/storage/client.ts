import { env } from '@/env';
import { S3Client } from '@aws-sdk/client-s3';


export const r2Client = new S3Client({
 region: 'auto',
 endpoint: `https://${env.CLOUDFARE_ACCOUNT_ID}.r2.cloudflarestorage.com`,
 credentials: {
  accessKeyId: env.CLOUDFARE_ACCESS_KEY_ID,
  secretAccessKey: env.CLOUDFARE_SECREY_ACCESS_KEY
 }
})