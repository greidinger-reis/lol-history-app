import { z } from "zod";

export const seasonInfoSchema = z
    .object({
        leagueId: z.string(),
        queueType: z.string(),
        tier: z.string(),
        rank: z.string(),
        summonerId: z.string(),
        summonerName: z.string(),
        leaguePoints: z.number(),
        wins: z.number(),
        losses: z.number(),
        veteran: z.boolean(),
        inactive: z.boolean(),
        freshBlood: z.boolean(),
        hotStreak: z.boolean(),
    })
    .array();

export type SeasonInfo = z.infer<typeof seasonInfoSchema>;
