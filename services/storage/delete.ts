/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { cloudflareR2 } from "../../global_variables/s3-instances";
import { DeleteObjectCommand } from "@aws-sdk/client-s3";
interface DeleteInputType {
    bucket: string;
    key: string;
}
export default async function S3Delete(input: DeleteInputType) {

    const params = {
        Bucket: input.bucket,
        Key: input.key,
    };
    const command = new DeleteObjectCommand(params)
    try {
        const response = await cloudflareR2.send(command);
        console.log(response);
    } catch (err) {
        console.error(err);
    }
}