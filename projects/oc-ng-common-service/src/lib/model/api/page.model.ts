export interface Page<T> {
    pages: number;
    count: number;
    pageNumber: number;
    list: T[];
}
