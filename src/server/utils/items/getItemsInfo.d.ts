export type ItemsDict = Record<number, Item>;

export interface Item {
    name: string;
    description: string;
    colloq: string;
    plaintext: string;
    image: Image;
    gold: Gold;
    tags: string[];
    maps: Maps;
    stats: unknown;
    effect?: Effect;
}

export interface Image {
    full: string;
    sprite: string;
    group: string;
    x: number;
    y: number;
    w: number;
    h: number;
}

export interface Gold {
    base: number;
    purchasable: boolean;
    total: number;
    sell: number;
}

export interface Maps {
    "11": boolean;
    "12": boolean;
    "21": boolean;
    "22": boolean;
}

export interface Effect {
    Effect1Amount: string;
    Effect2Amount: string;
    Effect3Amount: string;
    Effect4Amount: string;
}
