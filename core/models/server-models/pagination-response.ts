export type PaginationResponse<T> = {
    data: T[],
    totalCount: number;
    totalPage: number;
    pageNumber: number;
    pageSize: number;
};
