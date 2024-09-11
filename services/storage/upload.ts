/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { cloudflareR2 } from "../../global_variables/s3-instances";
import { PutObjectCommand } from "@aws-sdk/client-s3";
interface UploadInputType {
    bucket: string;
    key: string;
    data: any;
    type: string;
}
export default async function S3Upload(input: UploadInputType) {

    const params = {
        Bucket: input.bucket,
        Key: input.key,
        Body: input.data,
    };
    const command = new PutObjectCommand(params)
    let url = null
    try {
        const response = await cloudflareR2.send(command);
        console.log(response);
        url = `https://bilesoft.org/${input.key}`;
    } catch (err) {
        console.error(err);
    }
    return url;
}