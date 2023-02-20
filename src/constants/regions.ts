//TODO: Improve this, fetch from riot official API
export const _Region = {
    br: "br1",
    eun: "eun1",
    euw: "euw1",
    jp: "jp1",
    kr: "kr",
    lan: "la1",
    las: "la2",
    na: "na1",
    oce: "oc1",
    ph: "ph2",
} as const;

export type Region = keyof typeof _Region;

export enum MatchesRegion {
    AMERICAS = "americas",
    ASIA = "asia",
    EUROPE = "europe",
    SEA = "sea",
}
