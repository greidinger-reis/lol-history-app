/* eslint-disable @typescript-eslint/ban-ts-comment, @typescript-eslint/no-misused-promises, @typescript-eslint/no-floating-promises */
import type { InferGetServerSidePropsType, GetServerSideProps } from "next";
import nProgress from "nprogress";
import { useEffect } from "react";
import { z } from "zod";
import { getSummonerInfo } from "~/server/summoner";
import { regionParamSchema } from "~/server/utils/parseRegionParam";
import { Loading } from "~/components/Loading";
import { MatchCard } from "~/components/MatchCard";
import runesDict from "public/data/runes.json";
import summonerSpellsDict from "public/data/summoner-spells.json";
import championsDict from "public/data/champions.json";
import itemsDict from "public/data/items.json";
import { createProxySSGHelpers } from "@trpc/react-query/ssg";
import { createInnerTRPCContext } from "~/server/api/trpc";
import { appRouter } from "~/server/api/root";
import { parseMatchesRegion } from "~/server/utils/parseMatchesRegion";
import { api, type RouterOutputs } from "~/utils/api";
import superjson from "superjson";
import { formatDistanceToNow } from "date-fns";
import Head from "next/head";

const paramsSchema = z.object({
    region: regionParamSchema,
    summonerName: z.string(),
});

export const getServerSideProps = (async (ctx) => {
    const params = paramsSchema.safeParse(ctx.params);

    if (!params.success) {
        return {
            notFound: true,
        };
    }

    const { region, summonerName } = params.data;

    const summoner = await getSummonerInfo({ name: summonerName, region });

    if (!summoner) {
        return {
            notFound: true,
        };
    }

    const ssg = createProxySSGHelpers({
        router: appRouter,
        ctx: createInnerTRPCContext({}),
        transformer: superjson,
    });

    const matchesList = ssg.matches.listInfinite.prefetchInfinite({
        limit: 10,
        puuid: summoner.puuid,
        region: parseMatchesRegion(region),
    });

    const seasonInfo = ssg.season.getSummonerSeasonInfo.prefetch({
        summonerId: summoner.id,
        region,
    });

    const lastCacheUpdatedDate = ssg.matches.getLastCacheUpdatedDate.prefetch({
        puuid: summoner.puuid,
    });

    await Promise.all([matchesList, seasonInfo, lastCacheUpdatedDate]);

    return {
        props: { trpcState: ssg.dehydrate(), summoner, region },
    };
}) satisfies GetServerSideProps;

export default function SummonerPage({
    summoner,
    region,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
    nProgress.configure({ showSpinner: false });

    const matchesQuery = api.matches.listInfinite.useInfiniteQuery(
        {
            limit: 10,
            puuid: summoner.puuid,
            region: parseMatchesRegion(region),
        },
        {
            getNextPageParam: (lastPage) => lastPage.nextCursor,
            refetchOnWindowFocus: false,
            refetchOnMount: false,
            staleTime: Infinity,
        }
    );

    const seasonInfoQuery = api.season.getSummonerSeasonInfo.useQuery(
        {
            summonerId: summoner.id,
            region,
        },
        {
            refetchOnMount: false,
            refetchOnWindowFocus: false,
            staleTime: Infinity,
        }
    );

    const updateCacheMutation = api.cache.update.useMutation();
    const cacheCreationDateQuery = api.matches.getLastCacheUpdatedDate.useQuery(
        {
            puuid: summoner.puuid,
        },
        {
            refetchOnMount: false,
            refetchOnWindowFocus: false,
        }
    );

    function handleNextPage() {
        if (!matchesQuery.hasNextPage) return;
        console.log(matchesQuery.fetchNextPage);
        matchesQuery.fetchNextPage();
    }

    function handleRefetch() {
        matchesQuery.refetch();
    }

    async function handleCacheUpdate() {
        const updatePuuid = updateCacheMutation.mutateAsync({
            key: summoner.puuid,
        });
        const updateId = updateCacheMutation.mutateAsync({ key: summoner.id });
        await Promise.all([updatePuuid, updateId]);
        await matchesQuery.refetch();
    }

    useEffect(() => {
        if (updateCacheMutation.isLoading) {
            nProgress.start();
            return;
        }
        nProgress.done();
    }, [updateCacheMutation.isLoading]);

    return (
        <>
            <Head>
                <title>
                    {`LoL ${summoner.name} ${region.toUpperCase()} Profile`}
                </title>
            </Head>
            <div className="container mx-auto flex max-w-4xl flex-col gap-2">
                <button
                    disabled={updateCacheMutation.isLoading}
                    className="btn-primary btn text-base-100"
                    onClick={() => handleCacheUpdate()}
                >
                    {updateCacheMutation.isLoading ? <Loading /> : "Update"}
                </button>
                <p>
                    {cacheCreationDateQuery.data &&
                        formatDistanceToNow(cacheCreationDateQuery.data, {
                            addSuffix: true,
                        })}
                </p>
                {seasonInfoQuery.data && (
                    <SeasonInfo seasonInfo={seasonInfoQuery.data} />
                )}
                <ul className="flex flex-col gap-2">
                    {matchesQuery?.data?.pages.map((match) => {
                        const { matches } = match;
                        return matches.map((match) => (
                            <MatchCard
                                championsDict={championsDict}
                                //@ts-ignore
                                itemsDict={itemsDict}
                                runesDict={runesDict}
                                ssDict={summonerSpellsDict}
                                key={match?.info?.gameId}
                                match={match}
                                summonerId={summoner.id}
                            />
                        ));
                    })}
                </ul>
                <button
                    disabled={matchesQuery.isFetchingNextPage}
                    className="btn-outline btn-primary btn w-full"
                    onClick={handleNextPage}
                >
                    {matchesQuery.isFetchingNextPage ? (
                        <Loading />
                    ) : (
                        "Load more"
                    )}
                </button>
            </div>
        </>
    );
}

export function SeasonInfo({
    seasonInfo,
}: {
    seasonInfo: RouterOutputs["season"]["getSummonerSeasonInfo"];
}) {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const rankedSoloSeason = seasonInfo[0];

    if(!rankedSoloSeason) return null;

    return (
        <div>
            <h2>{rankedSoloSeason.queueType}</h2>
            <p>
                {rankedSoloSeason.tier} {rankedSoloSeason.rank}{" "}
                {rankedSoloSeason.leaguePoints} LP
            </p>
            <div>
                W: {rankedSoloSeason.wins} / L: {rankedSoloSeason.losses}{" "}
                <p>
                    Win Rate{" "}
                    {(
                        (rankedSoloSeason.wins /
                            (rankedSoloSeason.wins + rankedSoloSeason.losses)) *
                        100
                    ).toFixed(0)}
                    %
                </p>
            </div>
        </div>
    );
}
