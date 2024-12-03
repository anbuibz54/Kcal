import uuid from 'react-native-uuid';
import {storageServices} from '@/services';
import type { UploadToS3Model } from '@/models';
import { R2_PUBLIC_DOMAIN } from '@global-vars/index';

async function handleUploadToS3(path: string){
    const file = await fetch(path);
    const data = await file.blob();
    const input: UploadToS3Model ={
        bucket:'kcal',
        key: `${uuid.v4()}.jpeg`,
        data: data,
        type: data.type
    }
    const imageUrl = await storageServices.S3Upload(input);
    return imageUrl;
}

async function handleDeleteFromS3(url:string){
    const key = url.replace(R2_PUBLIC_DOMAIN, '');
    await storageServices.S3Delete({bucket: 'kcal', key: key});
}

export const s3Utils={handleUploadToS3, handleDeleteFromS3}

