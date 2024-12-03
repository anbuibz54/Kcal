import { cloudflareR2, R2_PUBLIC_DOMAIN} from '@global-vars/index';
import { PutObjectCommand } from '@aws-sdk/client-s3';
interface UploadInputType {
    bucket: string;
    key: string;
    data: any;
    type: string;
}
export async function S3Upload(input: UploadInputType) {

    const params = {
        Bucket: input.bucket,
        Key: input.key,
        Body: input.data,
    };
    const command = new PutObjectCommand(params);
    let url = null;
    try {
        const response = await cloudflareR2.send(command);
        console.log(response);
        url = `${R2_PUBLIC_DOMAIN}${input.key}`;
    } catch (err) {
        console.error(err);
    }
    return url;
}
