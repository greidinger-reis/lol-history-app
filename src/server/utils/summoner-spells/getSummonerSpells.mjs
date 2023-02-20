/* eslint-disable @typescript-eslint/ban-ts-comment */
//@ts-check
import LATEST_VERSION from "../../../../public/latest-version.mjs";

const fetchSummonerSpells = fetch(
    `http://ddragon.leagueoflegends.com/cdn/${LATEST_VERSION}/data/en_US/summoner.json`
)
    .then((response) => response.json())
    .then((json) => json.data);

export async function getSummonerSpells() {
    console.log("Fetching summoner spells");
    /**@type {import("./getSummonerSpells").SummonerJsonData} */
    const json = await fetchSummonerSpells
    /** @type {import("./getSummonerSpells").SummonerSpellDict} */
    const spellsMap = {};
    for (const summ of Object.keys(json)) {
        // @ts-ignore
        spellsMap[Number(json[summ].key)] = {
            //@ts-ignore
            id: json[summ].id,
            //@ts-ignore
            description: json[summ].description,
        };
    }
    return spellsMap;
}
