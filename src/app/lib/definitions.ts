export type TotalPoints = {
  points: number;
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
