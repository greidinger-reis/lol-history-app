import { z } from "zod";
import { del } from "~/server/services/cache";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const cacheRouter = createTRPCRouter({
    update: publicProcedure
        .input(
            z.object({
                key: z.string(),
            })
        )
        .mutation(async ({ input }) => {
            const { key } = input;
            const updated = await del(key);
            if (updated !== 0) {
                const msg = `Cache for key: ${key} was updated.`;
                console.log(msg);
                return { message: msg };
            }
            return {message: `Cache for key ${key} was not found`}
        }),
});
