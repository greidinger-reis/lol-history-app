import { z } from "zod";
import { getSummonerMatches } from "~/server/services/matches";
import { MatchesRegion } from "~/constants/regions";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { fetchCached, get, set } from "~/server/services/cache";
import { TRPCError } from "@trpc/server";
import { TIME_TO_LIVE } from "~/constants/cache";

export const matchesRouter = createTRPCRouter({
    listInfinite: publicProcedure
        .input(
            z.object({
                puuid: z.string(),
                region: z.nativeEnum(MatchesRegion),
                limit: z.number().min(5).max(20),
                cursor: z.number().optional(),
            })
        )
        .query(async ({ input }) => {
            console.log(`[matchesRouter] listInfinite`);
            const { limit, puuid, region, cursor } = input;
            console.log(`[matchesRouter] listInfinite puuid: ${puuid}`);
            console.log(
                `[matchesRouter] listInfinite cursor: ${cursor ?? ""} `
            );
            // fetch the first 20 matches on cache.
            const matches = cursor
                ? await getSummonerMatches({
                      puuid,
                      region,
                      start: cursor ? cursor : 0,
                      count: limit + 1, // get an extra match to check if there are more
                  })
                : await fetchCached(
                      puuid,
                      async () => {
                          await set(
                              `${puuid}:DATE`,
                              async () =>
                                  Promise.resolve(new Date().toString()),
                              TIME_TO_LIVE
                          );
                          return getSummonerMatches({
                              puuid,
                              region,
                              start: 0,
                              count: limit + 1,
                          });
                      },
                      TIME_TO_LIVE
                  );
            console.log(
                `[matchesRouter] listInfinite matches: ${matches.length} `
            );

            let nextCursor: typeof cursor;
            if (matches.length > limit) {
                nextCursor = cursor ? cursor + limit : limit; // if cursor is null, set it to limit, otherwise add limit to cursor
                matches.pop();
            }
            console.log(
                `[matchesRouter] listInfinite nextCursor: ${nextCursor ?? ""}`
            );
            return {
                matches,
                nextCursor,
            };
        }),
    getLastCacheUpdatedDate: publicProcedure
        .input(
            z.object({
                puuid: z.string(),
            })
        )
        .query(async ({ input }) => {
            const { puuid } = input;
            const date = await get<string>(`${puuid}:DATE`).then(
                (it: string) => new Date(it)
            );
            if (!date)
                throw new TRPCError({
                    code: "NOT_FOUND",
                    cause: "Cache Date not found",
                });
            return date;
        }),
});
