/* eslint-disable @typescript-eslint/no-non-null-assertion */
import {
    formatDistanceToNow,
    formatDuration,
    intervalToDuration,
} from "date-fns";
import Image from "next/image";
import { getQueueById } from "~/utils/getQueueById";
import { type RunePageDict } from "~/utils/runes/getRunes";
import { type SummonerSpellDict } from "~/utils/summoner-spells/getSummonerSpells";
import { type Style, type Match } from "~/models/Match";
import { type ChampionDict } from "~/utils/champions/getChampionInfo";
import { type ItemsDict } from "~/utils/items/getItemsInfo";
import {
    championAssetsUrl,
    itemAssetsUrl,
    runeAssetsUrl,
    spellsAssetsUrl,
} from "~/constants/urls";
import Link from "next/link";
import { useRouter } from "next/router";
import { formatWhiteSpacesToUrl } from "~/utils/formatWhiteSpace";
import classNames from "classnames";

type Props = {
    match: Partial<Match>;
    summonerId: string;
    runesDict: RunePageDict;
    ssDict: SummonerSpellDict;
    championsDict: ChampionDict;
    itemsDict: ItemsDict;
};

export function MatchCard({
    match,
    summonerId,
    runesDict,
    ssDict,
    championsDict,
    itemsDict,
}: Props) {
    const router = useRouter();
    const participant = match?.info?.participants.find(
        (participant) => participant.summonerId === summonerId
    );
    const queue = getQueueById(match?.info?.queueId ?? 0);

    const kdaRatio = Number(
        participant?.deaths === 0
            ? (participant.kills + participant.assists / 1).toFixed(2)
            : (
                  (participant?.kills ?? 0) +
                  (participant?.assists ?? 0) / (participant?.deaths ?? 1)
              ).toFixed(2)
    );

    const participantTeamMates = match?.info?.participants.filter(
        (p) => p.teamId === participant?.teamId
    );
    const participantTeamKills = participantTeamMates?.reduce(
        (acc, p) => acc + p.kills,
        0
    );
    const participantKillParticipation =
        (participant?.kills ?? 0) + (participant?.assists ?? 0);

    const participantKillParticipationPercentage =
        (participantKillParticipation * 100) / (participantTeamKills ?? 1);

    const [primaryRunes, secondaryRunes] = participant?.perks.styles ?? [];

    const championInfo = championsDict[participant?.championId ?? 0];

    const csPerMinute =
        ((participant?.totalMinionsKilled ?? 0) +
            (participant?.neutralMinionsKilled ?? 0)) /
            (match.info!.gameDuration / 60) || 0;

    return (
        <li
            className={classNames("card card-compact border-l-[6px]", {
                "bg-success/10": participant?.win,
                "bg-error/10": !participant?.win,
                "border-primary": participant?.win,
                "border-error": !participant?.win,
            })}
        >
            <div className="card-body flex-row items-center">
                {/* left side */}
                <div className="mx-1 min-w-max text-center text-xs text-base-content/50">
                    <div>
                        <p
                            className={classNames("font-bold", {
                                "text-primary": participant?.win,
                                "text-error": !participant?.win,
                            })}
                        >
                            {queue &&
                                queue.description &&
                                queue.description
                                    .split(" ")
                                    .slice(1, 3)
                                    .join(" ")}
                        </p>
                        <p>
                            {/*format the date to be human-readable*/}
                            {formatDistanceToNow(
                                new Date(match?.info?.gameCreation ?? 0),
                                {
                                    addSuffix: true,
                                }
                            ).replace("about", "")}{" "}
                        </p>
                    </div>
                    <div
                        className={classNames("my-2 h-[1px] w-full", {
                            "bg-primary/20": participant?.win,
                            "bg-error/20": !participant?.win,
                        })}
                    />
                    <div>
                        <p className="font-bold text-base-content/60">
                            {/* find the participant's team */}
                            {participant?.win ? "Victory" : "Defeat"}
                        </p>
                        <p>
                            {formatDuration(
                                intervalToDuration({
                                    start: 0,
                                    end: (match.info?.gameDuration ?? 0) * 1000,
                                })
                                // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-return
                            ).replace(/( minutes| seconds)/g, (_, p1) => p1[1])}
                        </p>
                    </div>
                    <ParticipantMultiKills
                        doubleKills={participant?.doubleKills}
                        tripleKills={participant?.tripleKills}
                        quadraKills={participant?.quadraKills}
                        pentaKills={participant?.pentaKills}
                    />
                </div>
                <div className="flex items-center gap-1">
                    {/*find the participant's champion*/}
                    <div className="flex gap-1">
                        <div
                            className="tooltip w-fit cursor-help"
                            data-tip={`${championInfo?.name ?? ""} - ${
                                championInfo?.title ?? ""
                            }`}
                        >
                            <Image
                                width={120}
                                height={120}
                                className="w-12 rounded-full"
                                src={championAssetsUrl(
                                    participant?.championId ?? -1
                                )}
                                alt={
                                    participant?.championName ??
                                    "champion image"
                                }
                            />
                            <span className="absolute bottom-2 right-0 flex w-4 items-center justify-center rounded-full bg-neutral text-xs text-white">
                                {participant?.champLevel}
                            </span>
                        </div>
                        {/*find the participant's summoner spells*/}
                        <div className="flex flex-col gap-1">
                            <div
                                className="tooltip cursor-help"
                                data-tip={
                                    ssDict[participant?.summoner1Id ?? 1]
                                        ?.description ?? ""
                                }
                            >
                                <Image
                                    width={120}
                                    height={120}
                                    className="w-7 rounded"
                                    src={spellsAssetsUrl(
                                        ssDict[participant?.summoner1Id ?? 1]
                                            ?.id ?? ""
                                    )}
                                    alt={"spell1 image"}
                                />
                            </div>
                            <div
                                className="tooltip cursor-help"
                                data-tip={
                                    ssDict[participant?.summoner2Id ?? 1]
                                        ?.description ?? ""
                                }
                            >
                                <Image
                                    width={120}
                                    height={120}
                                    className="w-7 rounded"
                                    src={spellsAssetsUrl(
                                        ssDict[participant?.summoner2Id ?? 1]
                                            ?.id ?? ""
                                    )}
                                    alt={"spell2 image"}
                                />
                            </div>
                        </div>
                    </div>
                    {/*  KDA */}
                    <div className="mx-1 min-w-max text-center text-xs text-base-content/50">
                        <p className="font-bold">
                            {participant?.kills} /{" "}
                            <span className="text-red-500">
                                {participant?.deaths}
                            </span>{" "}
                            / {participant?.assists}
                        </p>
                        {/* KDA ratio */}
                        <KdaRatio kdaRatio={kdaRatio} />
                        <p className="text-error">
                            P/Kill{" "}
                            {Number(
                                participantKillParticipationPercentage.toFixed(
                                    0
                                )
                            ) || 0}
                            %
                        </p>
                        <p>
                            CS{" "}
                            {(participant?.totalMinionsKilled ?? 0) +
                                (participant?.neutralMinionsKilled ?? 0)}{" "}
                            <span
                                className={classNames("", {
                                    "text-amber-500": csPerMinute > 8,
                                    "text-success": csPerMinute > 6,
                                    "text-error": csPerMinute < 6,
                                })}
                            >
                                ({csPerMinute.toFixed(1)})
                            </span>
                        </p>
                    </div>
                    {/* Runes icons */}
                    <div className="flex gap-1">
                        {primaryRunes && (
                            <RuneIcons
                                runePage={primaryRunes}
                                runesDict={runesDict}
                            />
                        )}
                        {secondaryRunes && (
                            <RuneIcons
                                runePage={secondaryRunes}
                                runesDict={runesDict}
                            />
                        )}
                    </div>
                    {/* Items icons */}
                    <div className="mx-1 grid grid-cols-4 gap-1">
                        {[
                            participant?.item0,
                            participant?.item1,
                            participant?.item2,
                            participant?.item6,
                            participant?.item3,
                            participant?.item4,
                            participant?.item5,
                        ].map((item) =>
                            item ? (
                                <div key={item ?? 1 * Math.random()}>
                                    <div
                                        className="tooltip cursor-help"
                                        data-tip={`${
                                            itemsDict[item ?? 0]?.name ?? ""
                                        } - ${
                                            itemsDict[item ?? 0]?.description ??
                                            ""
                                        } Cost: 
                                    ${
                                        itemsDict[item ?? 0]?.gold.total ?? ""
                                    } (${itemsDict[item ?? 0]?.gold.base ?? ""})
                                    `}
                                    >
                                        <Image
                                            src={itemAssetsUrl(item ?? 0)}
                                            className="w-6 rounded"
                                            width={100}
                                            height={100}
                                            alt={
                                                itemsDict[item ?? 0]?.name ?? ""
                                            }
                                        />
                                    </div>
                                </div>
                            ) : null
                        )}
                    </div>
                    {/* CS + CS / Minute */}
                    <div className="min-w-max text-xs text-base-content/50"></div>
                    {/* Wards */}
                    <div className="mx-1 flex flex-col gap-1">
                        <div
                            className="tooltip flex cursor-help items-center gap-1"
                            data-tip="Control Wards Placed"
                        >
                            <Image
                                width={24}
                                height={24}
                                src={itemAssetsUrl(2055)}
                                alt="Control ward"
                                className="rounded-full"
                            />
                            {participant?.detectorWardsPlaced}
                        </div>
                        <div
                            className="tooltip flex cursor-help items-center gap-1"
                            data-tip={"Wards Placed"}
                        >
                            <Image
                                src={itemAssetsUrl(3340)}
                                width={24}
                                height={24}
                                alt="Vision ward"
                                className="rounded-full"
                            />
                            {participant?.wardsPlaced}
                        </div>
                        <div
                            className="tooltip flex cursor-help items-center gap-1"
                            data-tip="Wards Destroyed"
                        >
                            <Image
                                src={itemAssetsUrl(3364)}
                                width={24}
                                height={24}
                                alt="Detector lens"
                                className="rounded-full"
                            />
                            {participant?.wardsKilled}
                        </div>
                    </div>

                    {/* Game participants */}
                    <div className="flex max-h-28 w-80 flex-col flex-wrap">
                        {match?.info?.participants.map((participant) => (
                            <div
                                key={participant.summonerId}
                                className="flex items-center gap-1"
                            >
                                <div
                                    className="tooltip cursor-help"
                                    data-tip={participant.championName}
                                >
                                    <Image
                                        width={20}
                                        height={20}
                                        src={championAssetsUrl(
                                            participant.championId ?? -1
                                        )}
                                        alt={participant.championName ?? ""}
                                        className="rounded-full"
                                    />
                                </div>
                                <Link
                                    className="hover:text-base-content/50"
                                    href={`/${router.asPath.split(
                                        "/"
                                    )[1]!}/${formatWhiteSpacesToUrl(
                                        participant.summonerName
                                    )}`}
                                >
                                    {participant.summonerName}
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </li>
    );
}

function ParticipantMultiKills({
    doubleKills,
    tripleKills,
    quadraKills,
    pentaKills,
}: {
    doubleKills?: number;
    tripleKills?: number;
    quadraKills?: number;
    pentaKills?: number;
}) {
    if (!doubleKills && !tripleKills && !quadraKills && !pentaKills)
        return null;
    return (
        <div className="badge-error badge mt-1 min-w-max text-xs">
            {/* display only the highest multikill */}
            {pentaKills
                ? "Penta Kill"
                : quadraKills
                ? "Quadra Kill"
                : tripleKills
                ? "Triple Kill"
                : doubleKills
                ? "Double Kill"
                : null}
        </div>
    );
}

function KdaRatio({ kdaRatio }: { kdaRatio: number }) {
    if (kdaRatio === 1) {
        return <p className="font-medium">Perfect KDA</p>;
    }

    if (kdaRatio > 1) {
        return <p>{kdaRatio} KDA</p>;
    }

    if (kdaRatio < 1) {
        return <p>{kdaRatio} KDA</p>;
    }

    return null;
}

function RuneIcons({
    runePage,
    runesDict,
}: {
    runePage: Style;
    runesDict: RunePageDict;
}) {
    const flatTree = runesDict[runePage.style]!.slots.flatMap(
        (slot) => slot.runes
    );

    return (
        <div className="flex flex-col justify-center gap-1">
            {runePage.selections
                .map((selection) =>
                    flatTree?.find((rune) => rune.id === selection.perk)
                )
                .map((rune) => (
                    <div
                        className="tooltip cursor-help"
                        data-tip={rune?.longDesc}
                        key={rune?.id}
                    >
                        <Image
                            src={runeAssetsUrl(rune?.icon ?? "invalid-rune")}
                            alt={rune?.name ?? "invalid-rune"}
                            width={64}
                            height={64}
                            className="w-7"
                        />
                    </div>
                ))}
        </div>
    );
}
