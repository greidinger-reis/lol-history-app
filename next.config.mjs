// @ts-check
import fs from "node:fs"
import { getItemsInfo } from "./src/utils/items/getItemsInfo.mjs";
import { getChampionInfo } from "./src/utils/champions/getChampionInfo.mjs";
import { getQueueDict } from "./src/utils/queues/getQueueIds.mjs";
import { getRunePages } from "./src/utils/runes/getRunes.mjs";
import { getSummonerSpells } from "./src/utils/summoner-spells/getSummonerSpells.mjs";

/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation.
 * This is especially useful for Docker builds.
 */
!process.env.SKIP_ENV_VALIDATION && (await import("./src/env.mjs"));

/** @type {import("next").NextConfig} */
const config = {
    reactStrictMode: true,

    /**
     * If you have the "experimental: { appDir: true }" setting enabled, then you
     * must comment the below `i18n` config out.
     *
     * @see https://github.com/vercel/next.js/issues/41980
     */
    i18n: {
        locales: ["en"],
        defaultLocale: "en",
    },

    images: {
        domains: ["ddragon.leagueoflegends.com", "ddragon.canisback.com", "raw.communitydragon.org"],
    },
};

const getConfig = async () => {
    const runes = getRunePages();
    const summonerSpells = getSummonerSpells();
    const queues = getQueueDict();
    const champions = getChampionInfo();
    const items = getItemsInfo();

    Promise.all([runes, summonerSpells, queues, champions, items]).then(
        (values) => {
            fs.writeFileSync("./public/data/runes.json", JSON.stringify(values[0], null, 4), {
                encoding: "utf8"
            });
            fs.writeFileSync("./public/data/summoner-spells.json", JSON.stringify(values[1], null, 4), {
                encoding: "utf8"
            });
            fs.writeFileSync("./public/data/queues.json", JSON.stringify(values[2], null, 4), {
                encoding: "utf8"
            });
            fs.writeFileSync("./public/data/champions.json", JSON.stringify(values[3], null, 4), {
                encoding: "utf8"
            });
            fs.writeFileSync("./public/data/items.json", JSON.stringify(values[4], null, 4), {
                encoding: "utf8"
            });
        }
    );
    return config;
};

export default getConfig;
