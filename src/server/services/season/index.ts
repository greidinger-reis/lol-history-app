import { fetchSummonerSeasonInfo } from "~/server/fetches/seasonInfo";
import { type Region } from "~/constants/regions";
import { seasonInfoSchema, type SeasonInfo } from "~/server/types/seasonInfo";

type Params = {
    summonerId: string;
    region: Region;
};
export async function getSummonerSeasonInfo({ summonerId, region }: Params) {
    const data = await fetchSummonerSeasonInfo({ summonerId, region });
    const seasonInfo = (await data.json()) as SeasonInfo;

    const parsedSeasonInfo = seasonInfoSchema.safeParse(seasonInfo);
    if (!parsedSeasonInfo.success) return [];
    return parsedSeasonInfo.data;
}
