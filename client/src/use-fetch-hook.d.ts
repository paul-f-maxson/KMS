declare module 'use-fetch-hook' {
  export type OptionsType<TFetchFn> = {
    url: string;
    delay: number;
    options: RequestInit;
    parseFn?: (response: Response) => Promise;
    fetchFn: TFetchFn | GlobalFetch;
  };

  export type ReturnType = {
    value: any;
    isLoading: boolean;
    error: Error | null;
    requestData: () => Promise;
  };

  export default function useFetch(options: OptionsType): ReturnType;
}
