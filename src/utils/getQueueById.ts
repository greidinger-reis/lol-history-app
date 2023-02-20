import queueIds from "public/data/queues.json";
import { type Queue } from "./queues/getQueueIds";

export function getQueueById(id: number): Queue {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return queueIds[id];
}
