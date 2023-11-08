export type Environment = "dev" | "prod";

export const totalPointsDbRecord: Record<Environment, string> = {
  dev: "totalpoints_dev",
  prod: "totalpoints",
};
