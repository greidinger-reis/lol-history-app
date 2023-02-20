import { env } from "~/env.mjs";
import type { MatchesRegion } from "../constants/regions";

export function fetchMatchById({
    id,
    region,
}: {
    id: string;
    region: MatchesRegion;
}) {
    return fetch(
        `https://${region}.api.riotgames.com/lol/match/v5/matches/${id}`,
        {
            headers: {
                "X-Riot-Token": env.RIOT_API_KEY,
            },
        }
    );
}
