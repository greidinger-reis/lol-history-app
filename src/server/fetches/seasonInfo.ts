import type { Region } from "../constants/regions";
import { parseRegion } from "../utils/parseRegion";
import { env } from "~/env.mjs";

type Params = {
    summonerId: string;
    region: Region;
};
export async function fetchSummonerSeasonInfo({ summonerId, region }: Params) {
    const regionParsed = parseRegion(region);

    return fetch(
        `https://${regionParsed}.api.riotgames.com/lol/league/v4/entries/by-summoner/${summonerId}`,
        {
            headers: {
                "X-Riot-Token": env.RIOT_API_KEY,
            },
        }
    );
}
