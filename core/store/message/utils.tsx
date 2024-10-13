/* eslint-disable prettier/prettier */
export type MessageType={
    type:'success' | 'error' | 'infor';
    message:string;
    color?:string;
    icon?:string;
}