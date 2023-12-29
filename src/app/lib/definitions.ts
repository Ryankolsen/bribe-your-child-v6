export type TotalPoints = {
  points: number;
}[];

export type Prize = {
  uuid: string;
  point_value: number | undefined;
  description: string;
  link: string;
};

export type TotalPrizesDb =
  | {
      success: boolean;
      data?: Prize[];
      error?: string;
    }
  | undefined;
