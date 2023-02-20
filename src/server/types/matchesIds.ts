import { z } from "zod";

export const summonerMatchesIdsSchema = z.array(z.string());

export type SummonersMatchesIds = z.infer<typeof summonerMatchesIdsSchema>;
