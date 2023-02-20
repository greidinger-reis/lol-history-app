import LATEST_VERSION from "public/latest-version.mjs";

export function itemAssetsUrl(itemId: number): string {
    return `http://ddragon.leagueoflegends.com/cdn/${LATEST_VERSION}/img/item/${itemId}.png`;
}

export function spellsAssetsUrl(id: string): string {
    return `http://ddragon.leagueoflegends.com/cdn/${LATEST_VERSION}/img/spell/${id}.png`;
}

export function championAssetsUrl(championId: number): string {
    return `https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/champion-icons/${championId}.png`;
}

export function runeAssetsUrl(runeId: string): string {
    return `https://ddragon.canisback.com/img/${runeId}`;
}
