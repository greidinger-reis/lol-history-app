import { getSummonerMatches } from "~/server/services/matches";
import type { Region } from "~/constants/regions";
import { type SummonerInfo, summonerInfoSchema } from "~/server/types/summonerInfo";
import { fetchSummonerByName } from "~/server/fetches/summonerInfo";
import { parseMatchesRegion } from "~/utils/parseMatchesRegion";
import { regionParamSchema } from "~/utils/parseRegionParam";
import { fetchCached } from "~/server/services/cache";
import { getSummonerSeasonInfo } from "~/server/services/season";
import { TIME_TO_LIVE } from "~/constants/cache";

type Params = {
    name: string;
    region: Region;
};

export async function getSummonerInfo({ name, region }: Params) {
    const summonerInfo = await fetchSummonerByName({ name, region }).then(
        (res) => res.json() as Promise<SummonerInfo>
    );

    const parsed = summonerInfoSchema.safeParse(summonerInfo);

    if (!parsed.success) return null;

    return parsed.data;
}

export async function getSummonerPage({ name, region }: Params) {
    const parsedRegion = regionParamSchema.safeParse(region);

    if (!parsedRegion.success) {
        console.log("Failed to parse region ", parsedRegion.error);
        return null;
    }

    const summonerInfo = await getSummonerInfo({
        name,
        region: parsedRegion.data,
    });

    if (!summonerInfo) return null;

    const matches = fetchCached(
        summonerInfo.puuid,
        () =>
            getSummonerMatches({
                puuid: summonerInfo.puuid,
                region: parseMatchesRegion(parsedRegion.data),
                count: 10,
                start: 0,
            }),
        TIME_TO_LIVE
    );

    const seasonInfo = fetchCached(
        summonerInfo.id,
        () =>
            getSummonerSeasonInfo({
                summonerId: summonerInfo.id,
                region: parsedRegion.data,
            }),
        TIME_TO_LIVE
    );

    const [matchesData, seasonInfoData] = await Promise.all([
        matches,
        seasonInfo,
    ]);

    return {
        summoner: { id: summonerInfo.id, puuid: summonerInfo.puuid },
        matches: matchesData,
        seasonInfo: seasonInfoData,
    };
}
