export type TotalPoints = {
  points: number;
}[];

export type Prize = {
  uuid: string;
  point_value: number | undefined;
  description: string;
  imageData?: any | undefined;
};

export type TotalPrizesDb = {
  success: boolean;
  data?: Prize[];
  error?: string;
};
