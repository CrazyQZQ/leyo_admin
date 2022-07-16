export interface BaseResponseType<T> {
    code: number
    msg: string
    data?: any
    total?: number
    rows?: Array<T>
}
