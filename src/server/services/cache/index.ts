import { Redis } from "@upstash/redis";

const redis = () => Redis.fromEnv();

export async function fetchCached<T>(
    key: string,
    fetcher: () => Promise<T>,
    timeToLive: number
) {
    const cached = await get<T>(key);

    if(!cached) {
         console.log(`Cache miss for key: ${key}`);
        return set(key, fetcher, timeToLive);
    }

    console.log(`Cache hit for key: ${key}`);
    return cached
}

export async function get<T>(key: string) {
    return await redis().get(key) as T;
}

export async function del(key: string) {
    return redis().del(key);
}

export async function set<T>(
    key: string,
    fetcher: () => Promise<T>,
    timeToLive: number
) {
    const value = await fetcher();
    void redis().set(key, JSON.stringify(value), {
        ex: timeToLive,
    });
    return value;
}
