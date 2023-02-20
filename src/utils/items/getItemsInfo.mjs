//@ts-check
import LATEST_VERSION from "../../../public/latest-version.mjs";
import { stripHTML } from "../stripHTML.mjs";

export async function getItemsInfo() {
    console.log("Fetching items info");

    /**@type {import("./getItemsInfo").ItemsDict} */
    const itemsParsed = {};

    await fetch(
        `http://ddragon.leagueoflegends.com/cdn/${LATEST_VERSION}/data/en_US/item.json`
    )
        .then((res) => res.json())
        .then((json) => json.data)
        .then((/**@type {import("./getItemsInfo").ItemsDict}*/ items) => {
            for (const key of Object.keys(items)) {
                // console.log(`Parsing item ${key}`);
                const item = items[Number(key)];
                if (!item) continue;
                const { description, ...rest } = item;

                itemsParsed[Number(key)] = {
                    //replace any html/jsx tags in this string
                    description: stripHTML(description),
                    ...rest,
                };
            }
        });
    return itemsParsed;
}
