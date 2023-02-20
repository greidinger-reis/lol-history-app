import { getSummonerMatches } from "~/server/matches";
import type { Region } from "../constants/regions";
import { type SummonerInfo, summonerInfoSchema } from "../types/summonerInfo";
import { fetchSummonerByName } from "../fetches/summonerInfo";
import { parseMatchesRegion } from "../utils/parseMatchesRegion";
import type { Match } from "~/models/Match";
import { regionParamSchema } from "../utils/parseRegionParam";
import { fetchCached } from "../cache";
import { getSummonerSeasonInfo } from "../season";
import { type SeasonInfo } from "../types/seasonInfo";

// 1 week
export const CACHE_TIME = 60 * 60 * 24 * 7;
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
        return Promise.resolve(
            {} as {
                summoner: { id: string; puuid: string };
                matches: Match[];
                seasonInfo: SeasonInfo;
            }
        );
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
        CACHE_TIME
    );

    const seasonInfo = fetchCached(
        summonerInfo.id,
        () =>
            getSummonerSeasonInfo({
                summonerId: summonerInfo.id,
                region: parsedRegion.data,
            }),
        CACHE_TIME
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
