export interface IFetch {
  status: boolean;
  message: string;
}
export interface IFetchWithData<T> {
  status: boolean;
  message: string;
  data: T;
}
