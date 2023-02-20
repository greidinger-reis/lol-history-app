/* eslint-disable @typescript-eslint/ban-ts-comment */
//@ts-check
import LATEST_VERSION from "../../../../public/latest-version.mjs";

export async function getChampionInfo() {
    console.log("Fetching champion info");
    const data = await fetch(
        `http://ddragon.leagueoflegends.com/cdn/${LATEST_VERSION}/data/en_US/champion.json`
    )
        .then((res) => res.json())
        .then((json) => json.data);
    // console.log(data);
    /** @type {import("./getChampionInfo").ChampionDict} */
    const championDict = {};
    Object.keys(data).map((championName) => {
        const champion = data[championName];
        //@ts-ignore
        championDict[champion.key] = {
            //@ts-ignore
            name: champion.name,

            //@ts-ignore
            title: champion.title,
        };
    });
    return championDict;
}
