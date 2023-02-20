export type _Queue = {
    queueId: number;
    map: string;
    description: string;
    notes: string | null;
};

export type Queue = Omit<_Queue, "queueId">;

export type QueueDict = Record<number, Queue>;
