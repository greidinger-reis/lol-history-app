import { createTRPCRouter } from "./trpc";
import { matchesRouter } from "./routers/matches";
import { seasonRouter } from "./routers/season";
import { cacheRouter } from "./routers/cache";
import { tabnewsRouter } from "./routers/tabnews";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here
 */
export const appRouter = createTRPCRouter({
    matches: matchesRouter,
    season: seasonRouter,
    cache: cacheRouter,
    tabnews:tabnewsRouter 
});

// export type definition of API
export type AppRouter = typeof appRouter;
