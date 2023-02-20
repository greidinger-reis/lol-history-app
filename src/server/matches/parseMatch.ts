import { type Match } from "~/models/Match";

export function parseMatch(match: Match): Partial<Match> {
    return {
        info: {
            gameId: match.info.gameId,
            queueId: match.info.queueId,
            gameCreation: match.info.gameCreation,
            gameDuration: match.info.gameDuration,

            //eslint-disable-next-line @typescript-eslint/ban-ts-comment
            //@ts-ignore
            teams: match.info.teams.map((team) => {
                return { teamId: team.teamId, win: team.win };
            }),

            //eslint-disable-next-line @typescript-eslint/ban-ts-comment
            //@ts-ignore
            participants: match.info.participants.map((participant) => {
                return {
                    summonerId: participant.summonerId,
                    summonerName: participant.summonerName,
                    win: participant.win,
                    deaths: participant.deaths,
                    kills: participant.kills,
                    assists: participant.kills,
                    teamId: participant.teamId,
                    championId: participant.championId,
                    championName: participant.championName,
                    champLevel: participant.champLevel,
                    summoner1Id: participant.summoner1Id,
                    summoner2Id: participant.summoner2Id,
                    detectorWardsPlaced: participant.detectorWardsPlaced,
                    wardsPlaced: participant.wardsPlaced,
                    wardsKilled: participant.wardsKilled,
                    totalMinionsKilled: participant.totalMinionsKilled,
                    neutralMinionsKilled: participant.neutralMinionsKilled,
                    item0: participant.item0,
                    item1: participant.item1,
                    item2: participant.item2,
                    item3: participant.item3,
                    item4: participant.item4,
                    item5: participant.item5,
                    item6: participant.item6,
                    goldEarned: participant.goldEarned,
                    doubleKills: participant.doubleKills,
                    tripleKills: participant.tripleKills,
                    quadraKills: participant.quadraKills,
                    pentaKills: participant.pentaKills,
                    perks: {
                        styles: participant.perks.styles.map((style) => {
                            return {
                                description: style.description,
                                selections: style.selections.map(
                                    (selection) => {
                                        return { perk: selection.perk };
                                    }
                                ),
                                style: style.style,
                            };
                        }),
                    },
                };
            }),
        },
    };
}
