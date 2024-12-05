export type ApiResultModel<T>={
    message:string;
    statusCode:number,
    isSuccess:boolean,
    data:T
};
