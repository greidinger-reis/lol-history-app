import { MatchesRegion } from "../constants/regions";
import type { Region } from "../constants/regions";

const matchesRegionDict: Record<Region, MatchesRegion> = {
    br: MatchesRegion.AMERICAS,
    na: MatchesRegion.AMERICAS,
    eun: MatchesRegion.EUROPE,
    euw: MatchesRegion.EUROPE,
    jp: MatchesRegion.ASIA,
    kr: MatchesRegion.ASIA,
    lan: MatchesRegion.AMERICAS,
    las: MatchesRegion.AMERICAS,
    oce: MatchesRegion.AMERICAS,
    ph: MatchesRegion.SEA,
};

export function parseMatchesRegion(region: Region): MatchesRegion {
    return matchesRegionDict[region];
}
