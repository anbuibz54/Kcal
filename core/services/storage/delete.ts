import { cloudflareR2 } from '@global-vars/index';
import { DeleteObjectCommand } from '@aws-sdk/client-s3';
interface DeleteInputType {
    bucket: string;
    key: string;
}
export async function S3Delete(input: DeleteInputType) {

    const params = {
        Bucket: input.bucket,
        Key: input.key,
    };
    const command = new DeleteObjectCommand(params);
    try {
        await cloudflareR2.send(command);
    } catch (err) {
        console.error(err);
    }
}
