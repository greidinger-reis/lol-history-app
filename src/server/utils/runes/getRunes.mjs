//@ts-check
import LATEST_VERSION from "../../../../public/latest-version.mjs";
import { stripHTML } from "../stripHTML.mjs";

const fetchRunes = fetch(
    `http://ddragon.leagueoflegends.com/cdn/${LATEST_VERSION}/data/en_US/runesReforged.json`
).then((response) => response.json());

export async function getRunePages() {
    console.log("Fetching rune pages");
    /**@type {import("./getRunes").RunePageDict} */
    const runePages = {};

    /**@type {import("./getRunes")._RunePage[]}*/
    const runes = await fetchRunes;
    for (const rune of runes) {
        const { id, ...rest } = rune;
        // strip html tags from rune slots longDesc property
        rest.slots = rest.slots.map((slot) => {
            const slotParsed = slot.runes.map((rune) => {
                const { longDesc, ...rest } = rune;
                return {
                    longDesc: stripHTML(longDesc),
                    ...rest,
                };
            });
            return {
                runes: slotParsed,
            };
        });
        runePages[id] = rest;
    }
    return runePages;
}
