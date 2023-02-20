// @ts-check
import fsExtra from "fs-extra";
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
            fsExtra.writeJson("./public/data/runes.json", values[0], {
                spaces: 4,
            });
            fsExtra.writeJson("./public/data/summoner-spells.json", values[1], {
                spaces: 4,
            });
            fsExtra.writeJson("./public/data/queues.json", values[2], {
                spaces: 4,
            });
            fsExtra.writeJson("./public/data/champions.json", values[3], {
                spaces: 4,
            });
            fsExtra.writeJson("./public/data/items.json", values[4], {
                spaces: 4,
            });
        }
    );
    return config;
};

export default getConfig;
