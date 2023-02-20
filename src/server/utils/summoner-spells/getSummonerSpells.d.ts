import { type SummonerJsonData as _SummonerJsonData } from "~/models/SummonerSpell";
export type SummonerSpellDict = Record<
    number,
    { id: string; description: string }
>;
export type SummonerJsonData = _SummonerJsonData;
