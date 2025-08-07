export type IResponse<T, K = null> = {
  successed: true,
  data: T,
  error: null
} | {
  successed: false,
  data: K,
  error: string
}