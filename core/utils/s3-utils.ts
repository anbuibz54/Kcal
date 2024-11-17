import uuid from 'react-native-uuid';
import S3Upload from '../services/storage/upload';
import S3Delete from '../services/storage/delete';
import type { UploadToS3Model } from '../models/s3-storage/s3-storage-models';
import { R2_PUBLIC_DOMAIN } from '../../global_variables/s3-instances';

async function handleUploadToS3(path: string){
    const file = await fetch(path);
    const data = await file.blob();
    const input: UploadToS3Model ={
        bucket:'kcal',
        key: `${uuid.v4()}.jpeg`,
        data: data,
        type: data.type
    }
    const imageUrl = await S3Upload(input);
    return imageUrl;
}

async function handleDeleteFromS3(url:string){
    const key = url.replace(R2_PUBLIC_DOMAIN, '');
    await S3Delete({bucket: 'kcal', key: key});
}

export const s3Utils={handleUploadToS3, handleDeleteFromS3}

