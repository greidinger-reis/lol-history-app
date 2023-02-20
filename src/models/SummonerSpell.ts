/* eslint-disable @typescript-eslint/no-empty-interface */
/* eslint-disable @typescript-eslint/no-explicit-any */
export interface SummonerJsonData {
    SummonerBarrier: SummonerBarrier;
    SummonerBoost: SummonerBoost;
    SummonerDot: SummonerDot;
    SummonerExhaust: SummonerExhaust;
    SummonerFlash: SummonerFlash;
    SummonerHaste: SummonerHaste;
    SummonerHeal: SummonerHeal;
    SummonerMana: SummonerMana;
    SummonerPoroRecall: SummonerPoroRecall;
    SummonerPoroThrow: SummonerPoroThrow;
    SummonerSmite: SummonerSmite;
    SummonerSnowURFSnowball_Mark: SummonerSnowUrfsnowballMark;
    SummonerSnowball: SummonerSnowball;
    SummonerTeleport: SummonerTeleport;
    Summoner_UltBookPlaceholder: SummonerUltBookPlaceholder;
    Summoner_UltBookSmitePlaceholder: SummonerUltBookSmitePlaceholder;
}

export interface SummonerBarrier {
    id: string;
    name: string;
    description: string;
    tooltip: string;
    maxrank: number;
    cooldown: number[];
    cooldownBurn: string;
    cost: number[];
    costBurn: string;
    datavalues: Datavalues;
    effect: number[] | undefined[];
    effectBurn: string | undefined[];
    vars: any[];
    key: string;
    summonerLevel: number;
    modes: string[];
    costType: string;
    maxammo: string;
    range: number[];
    rangeBurn: string;
    image: Image;
    resource: string;
}

export interface Datavalues {}

export interface Image {
    full: string;
    sprite: string;
    group: string;
    x: number;
    y: number;
    w: number;
    h: number;
}

export interface SummonerBoost {
    id: string;
    name: string;
    description: string;
    tooltip: string;
    maxrank: number;
    cooldown: number[];
    cooldownBurn: string;
    cost: number[];
    costBurn: string;
    datavalues: Datavalues2;
    effect: number[] | undefined[];
    effectBurn: string | undefined[];
    vars: any[];
    key: string;
    summonerLevel: number;
    modes: string[];
    costType: string;
    maxammo: string;
    range: number[];
    rangeBurn: string;
    image: Image2;
    resource: string;
}

export interface Datavalues2 {}

export interface Image2 {
    full: string;
    sprite: string;
    group: string;
    x: number;
    y: number;
    w: number;
    h: number;
}

export interface SummonerDot {
    id: string;
    name: string;
    description: string;
    tooltip: string;
    maxrank: number;
    cooldown: number[];
    cooldownBurn: string;
    cost: number[];
    costBurn: string;
    datavalues: Datavalues3;
    effect: number[] | undefined[];
    effectBurn: string | undefined[];
    vars: any[];
    key: string;
    summonerLevel: number;
    modes: string[];
    costType: string;
    maxammo: string;
    range: number[];
    rangeBurn: string;
    image: Image3;
    resource: string;
}

export interface Datavalues3 {}

export interface Image3 {
    full: string;
    sprite: string;
    group: string;
    x: number;
    y: number;
    w: number;
    h: number;
}

export interface SummonerExhaust {
    id: string;
    name: string;
    description: string;
    tooltip: string;
    maxrank: number;
    cooldown: number[];
    cooldownBurn: string;
    cost: number[];
    costBurn: string;
    datavalues: Datavalues4;
    effect: number[] | undefined[];
    effectBurn: string | undefined[];
    vars: any[];
    key: string;
    summonerLevel: number;
    modes: string[];
    costType: string;
    maxammo: string;
    range: number[];
    rangeBurn: string;
    image: Image4;
    resource: string;
}

export interface Datavalues4 {}

export interface Image4 {
    full: string;
    sprite: string;
    group: string;
    x: number;
    y: number;
    w: number;
    h: number;
}

export interface SummonerFlash {
    id: string;
    name: string;
    description: string;
    tooltip: string;
    maxrank: number;
    cooldown: number[];
    cooldownBurn: string;
    cost: number[];
    costBurn: string;
    datavalues: Datavalues5;
    effect: number[] | undefined[];
    effectBurn: string | undefined[];
    vars: any[];
    key: string;
    summonerLevel: number;
    modes: string[];
    costType: string;
    maxammo: string;
    range: number[];
    rangeBurn: string;
    image: Image5;
    resource: string;
}

export interface Datavalues5 {}

export interface Image5 {
    full: string;
    sprite: string;
    group: string;
    x: number;
    y: number;
    w: number;
    h: number;
}

export interface SummonerHaste {
    id: string;
    name: string;
    description: string;
    tooltip: string;
    maxrank: number;
    cooldown: number[];
    cooldownBurn: string;
    cost: number[];
    costBurn: string;
    datavalues: Datavalues6;
    effect: number[] | undefined[];
    effectBurn: string | undefined[];
    vars: any[];
    key: string;
    summonerLevel: number;
    modes: string[];
    costType: string;
    maxammo: string;
    range: number[];
    rangeBurn: string;
    image: Image6;
    resource: string;
}

export interface Datavalues6 {}

export interface Image6 {
    full: string;
    sprite: string;
    group: string;
    x: number;
    y: number;
    w: number;
    h: number;
}

export interface SummonerHeal {
    id: string;
    name: string;
    description: string;
    tooltip: string;
    maxrank: number;
    cooldown: number[];
    cooldownBurn: string;
    cost: number[];
    costBurn: string;
    datavalues: Datavalues7;
    effect: number[] | undefined[];
    effectBurn: string | undefined[];
    vars: any[];
    key: string;
    summonerLevel: number;
    modes: string[];
    costType: string;
    maxammo: string;
    range: number[];
    rangeBurn: string;
    image: Image7;
    resource: string;
}

export interface Datavalues7 {}

export interface Image7 {
    full: string;
    sprite: string;
    group: string;
    x: number;
    y: number;
    w: number;
    h: number;
}

export interface SummonerMana {
    id: string;
    name: string;
    description: string;
    tooltip: string;
    maxrank: number;
    cooldown: number[];
    cooldownBurn: string;
    cost: number[];
    costBurn: string;
    datavalues: Datavalues8;
    effect: number[] | undefined[];
    effectBurn: string | undefined[];
    vars: any[];
    key: string;
    summonerLevel: number;
    modes: string[];
    costType: string;
    maxammo: string;
    range: number[];
    rangeBurn: string;
    image: Image8;
    resource: string;
}

export interface Datavalues8 {}

export interface Image8 {
    full: string;
    sprite: string;
    group: string;
    x: number;
    y: number;
    w: number;
    h: number;
}

export interface SummonerPoroRecall {
    id: string;
    name: string;
    description: string;
    tooltip: string;
    maxrank: number;
    cooldown: number[];
    cooldownBurn: string;
    cost: number[];
    costBurn: string;
    datavalues: Datavalues9;
    effect: number[] | undefined[];
    effectBurn: string | undefined[];
    vars: any[];
    key: string;
    summonerLevel: number;
    modes: string[];
    costType: string;
    maxammo: string;
    range: number[];
    rangeBurn: string;
    image: Image9;
    resource: string;
}

export interface Datavalues9 {}

export interface Image9 {
    full: string;
    sprite: string;
    group: string;
    x: number;
    y: number;
    w: number;
    h: number;
}

export interface SummonerPoroThrow {
    id: string;
    name: string;
    description: string;
    tooltip: string;
    maxrank: number;
    cooldown: number[];
    cooldownBurn: string;
    cost: number[];
    costBurn: string;
    datavalues: Datavalues10;
    effect: number[] | undefined[];
    effectBurn: string | undefined[];
    vars: any[];
    key: string;
    summonerLevel: number;
    modes: string[];
    costType: string;
    maxammo: string;
    range: number[];
    rangeBurn: string;
    image: Image10;
    resource: string;
}

export interface Datavalues10 {}

export interface Image10 {
    full: string;
    sprite: string;
    group: string;
    x: number;
    y: number;
    w: number;
    h: number;
}

export interface SummonerSmite {
    id: string;
    name: string;
    description: string;
    tooltip: string;
    maxrank: number;
    cooldown: number[];
    cooldownBurn: string;
    cost: number[];
    costBurn: string;
    datavalues: Datavalues11;
    effect: number[] | undefined[];
    effectBurn: string | undefined[];
    vars: any[];
    key: string;
    summonerLevel: number;
    modes: string[];
    costType: string;
    maxammo: string;
    range: number[];
    rangeBurn: string;
    image: Image11;
    resource: string;
}

export interface Datavalues11 {}

export interface Image11 {
    full: string;
    sprite: string;
    group: string;
    x: number;
    y: number;
    w: number;
    h: number;
}

export interface SummonerSnowUrfsnowballMark {
    id: string;
    name: string;
    description: string;
    tooltip: string;
    maxrank: number;
    cooldown: number[];
    cooldownBurn: string;
    cost: number[];
    costBurn: string;
    datavalues: Datavalues12;
    effect: number[] | undefined[];
    effectBurn: string | undefined[];
    vars: any[];
    key: string;
    summonerLevel: number;
    modes: string[];
    costType: string;
    maxammo: string;
    range: number[];
    rangeBurn: string;
    image: Image12;
    resource: string;
}

export interface Datavalues12 {}

export interface Image12 {
    full: string;
    sprite: string;
    group: string;
    x: number;
    y: number;
    w: number;
    h: number;
}

export interface SummonerSnowball {
    id: string;
    name: string;
    description: string;
    tooltip: string;
    maxrank: number;
    cooldown: number[];
    cooldownBurn: string;
    cost: number[];
    costBurn: string;
    datavalues: Datavalues13;
    effect: number[] | undefined[];
    effectBurn: string | undefined[];
    vars: any[];
    key: string;
    summonerLevel: number;
    modes: string[];
    costType: string;
    maxammo: string;
    range: number[];
    rangeBurn: string;
    image: Image13;
    resource: string;
}

export interface Datavalues13 {}

export interface Image13 {
    full: string;
    sprite: string;
    group: string;
    x: number;
    y: number;
    w: number;
    h: number;
}

export interface SummonerTeleport {
    id: string;
    name: string;
    description: string;
    tooltip: string;
    maxrank: number;
    cooldown: number[];
    cooldownBurn: string;
    cost: number[];
    costBurn: string;
    datavalues: Datavalues14;
    effect: number[] | undefined[];
    effectBurn: string | undefined[];
    vars: any[];
    key: string;
    summonerLevel: number;
    modes: string[];
    costType: string;
    maxammo: string;
    range: number[];
    rangeBurn: string;
    image: Image14;
    resource: string;
}

export interface Datavalues14 {}

export interface Image14 {
    full: string;
    sprite: string;
    group: string;
    x: number;
    y: number;
    w: number;
    h: number;
}

export interface SummonerUltBookPlaceholder {
    id: string;
    name: string;
    description: string;
    tooltip: string;
    maxrank: number;
    cooldown: number[];
    cooldownBurn: string;
    cost: number[];
    costBurn: string;
    datavalues: Datavalues15;
    effect: number[] | undefined[];
    effectBurn: string | undefined[];
    vars: any[];
    key: string;
    summonerLevel: number;
    modes: string[];
    costType: string;
    maxammo: string;
    range: number[];
    rangeBurn: string;
    image: Image15;
    resource: string;
}

export interface Datavalues15 {}

export interface Image15 {
    full: string;
    sprite: string;
    group: string;
    x: number;
    y: number;
    w: number;
    h: number;
}

export interface SummonerUltBookSmitePlaceholder {
    id: string;
    name: string;
    description: string;
    tooltip: string;
    maxrank: number;
    cooldown: number[];
    cooldownBurn: string;
    cost: number[];
    costBurn: string;
    datavalues: Datavalues16;
    effect: number[] | undefined[];
    effectBurn: string | undefined[];
    vars: any[];
    key: string;
    summonerLevel: number;
    modes: string[];
    costType: string;
    maxammo: string;
    range: number[];
    rangeBurn: string;
    image: Image16;
    resource: string;
}

export interface Datavalues16 {}

export interface Image16 {
    full: string;
    sprite: string;
    group: string;
    x: number;
    y: number;
    w: number;
    h: number;
}
