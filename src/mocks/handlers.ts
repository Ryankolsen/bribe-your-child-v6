import { graphql, HttpResponse } from "msw";

const totalPoints = new Map<string, number>([["totalPoints", 50]]);

export const handlers = [
  graphql.query("getTotalPointsRev", () => {
    return HttpResponse.json({
      data: {
        posts: Array.from(totalPoints.values()),
      },
    });
  }),
];
