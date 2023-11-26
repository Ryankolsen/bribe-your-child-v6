export type TotalPoints = {
  points: number;
  error?: string | unknown;
}[];

export type Prizes =
  | {
      uuid: string;
      point_value: number | undefined;
      description: string;
      imageData?: any | undefined;
      error?: string | unknown;
    }[]
  | undefined;
