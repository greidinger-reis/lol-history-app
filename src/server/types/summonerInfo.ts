import { z } from "zod";

export const summonerInfoSchema = z.object({
    accountId: z.string(),
    profileIconId: z.number(),
    revisionDate: z.number(),
    name: z.string(),
    id: z.string(),
    puuid: z.string(),
    summonerLevel: z.number(),
});

export type SummonerInfo = z.infer<typeof summonerInfoSchema>;
