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

export type Answer = {
  student: string;
  question: string;
  answer: string;
  rightAnswer: string;
}
