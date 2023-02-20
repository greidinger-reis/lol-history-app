import type { MatchesRegion } from "~/constants/regions";
import { summonerMatchesIdsSchema } from "~/server/types/matchesIds";
import { fetchSummonerMatchesIds } from "~/server/fetches/matchesIds";
import { fetchMatchById } from "~/server/fetches/matchById";
import type { Match } from "~/models/Match";
import { parseMatch } from "./parseMatch";

export async function getSummonerMatchesIds({
    puuid,
    region,
    count,
    start,
}: {
    puuid: string;
    region: MatchesRegion;
    start: number;
    count: number;
}) {
    const res = await fetchSummonerMatchesIds({
        puuid,
        region,
        count,
        start,
    }).then((res) => res.json() as Promise<string[]>);
    const parsed = summonerMatchesIdsSchema.safeParse(res);
    if (!parsed.success) return [];
    return parsed.data;
}

export async function getMatchInfoById(match: {
    id: string;
    region: MatchesRegion;
}) {
    return await fetchMatchById(match)
        .then(async (res) => (await res.json()) as Match)
        .then((match) => parseMatch(match));
}

export async function getSummonerMatches({
    puuid,
    region,
    count,
    start,
}: {
    puuid: string;
    region: MatchesRegion;
    start: number;
    count: number;
}) {
    const matchIds = await getSummonerMatchesIds({
        puuid,
        region,
        count,
        start,
    });
    return Promise.all(matchIds.map((id) => getMatchInfoById({ id, region })));
}
