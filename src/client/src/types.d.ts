export interface Action {
  [dataPropName: string]: any; // Action data
  type: string;
}

export type SocketCallback = (...args: any[]) => void;
