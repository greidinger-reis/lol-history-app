export async function fetchQueueIds() {
    console.log("Fetching queue ids");
    const res = await fetch(
        "https://static.developer.riotgames.com/docs/lol/queues.json"
    );
    return await res.json();
}

export async function getQueueDict() {
    /**@type {import("./getQueueIds")._Queue[]}*/
    const queues = await fetchQueueIds();
    /**@type {import("./getQueueIds").QueueDict} */
    const queuesDict = {}
    queues.map(queue => {
        const { queueId, ...rest } = queue;
        queuesDict[queueId] = rest;
    })
    return queuesDict
}
