export type ResultCompare = {
  err: string | null;
  success: boolean;
  difference: string | null;
}

export type Question = {
  name: string;
  text: string;
  sql: string;
}
