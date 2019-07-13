export interface Action {
  [dataPropName: string]: any; // Action data
  type: string;
}

type Meal = { seat: number; id: string; dish: string };

export type Order = {
  id: string;
  delay: number;
  table: number | string;
  meals: Array<Meal>;
};

export type SocketCallback = (firstArg: Action, ...args: any[]) => void;
