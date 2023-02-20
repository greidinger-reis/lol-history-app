import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { type Region, _Region } from "~/constants/regions";
import { getSummonerSeasonInfo } from "~/server/services/season";
import { TRPCError } from "@trpc/server";
import { fetchCached } from "~/server/services/cache";

const TIME_TO_LIVE = 1000 * 60 * 60 * 24 * 2;

export const seasonRouter = createTRPCRouter({
    getSummonerSeasonInfo: publicProcedure
        .input(
            z.object({
                summonerId: z.string(),
                region: z.string().refine((region) => {
                    return Object.keys(_Region).includes(region);
                }),
            })
        )
        .query(async ({ input }) => {
            const { summonerId, region } = input;
            const seasonInfo = await fetchCached(
                summonerId,
                async () =>
                    await getSummonerSeasonInfo({
                        summonerId,
                        region: region as Region,
                    }),
                TIME_TO_LIVE
            );
            if (!seasonInfo) {
                throw new TRPCError({
                    code: "NOT_FOUND",
                    message: "No season info found for summoner",
                });
            }
            return seasonInfo;
        }),
});
