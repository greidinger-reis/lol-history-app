import { env } from "~/env.mjs";
import { formatWhiteSpacesToUrl } from "../utils/formatWhiteSpace";
import { parseRegion } from "../utils/parseRegion";
import type { Region } from "../constants/regions";

type Params = {
    name: string;
    region: Region;
};
export function fetchSummonerByName({ name, region }: Params) {
    const regionParsed = parseRegion(region);
    return fetch(
        `https://${regionParsed}.api.riotgames.com/lol/summoner/v4/summoners/by-name/${formatWhiteSpacesToUrl(
            name
        )}`,
        {
            headers: {
                "X-Riot-Token": env.RIOT_API_KEY,
            },
        }
    );
}
