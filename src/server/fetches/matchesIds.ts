import { env } from "~/env.mjs";
import type { MatchesRegion } from "~/constants/regions";

type Params = {
    puuid: string;
    region: MatchesRegion;
    start: number;
    count: number;
};
export async function fetchSummonerMatchesIds({
    puuid,
    region,
    start,
    count,
}: Params) {
    return fetch(
        `https://${region}.api.riotgames.com/lol/match/v5/matches/by-puuid/${puuid}/ids?start=${start}&count=${count}`,
        {
            headers: {
                "X-Riot-Token": env.RIOT_API_KEY,
            },
        }
    );
}
