export type UploadToS3Model ={
    bucket: string;
    key:string;
    type: string;
    data: string | Blob
}