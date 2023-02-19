import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { getPostPageUrl, type Post, Strategy } from "~/utils/tabnews";

export const exampleRouter = createTRPCRouter({
    hello: publicProcedure
        .input(z.object({ text: z.string() }))
        .query(({ input }) => {
            return {
                greeting: `Hello ${input.text}`,
            };
        }),
    listPosts: publicProcedure
        .input(
            z.object({
                limit: z.number().min(1).max(20),
                cursor: z.number().optional(),
                strategy: z.nativeEnum(Strategy),
            })
        )
        .query(async ({ input }) => {
            const { strategy, limit, cursor } = input;

            const posts = await fetch(
                getPostPageUrl(cursor ?? 1, limit, strategy)
            ).then((res) => res.json() as Promise<Post[]>);
            const nextCursor = cursor ? cursor + 1 : 2;

            return {
                posts,
                nextCursor,
            };
        }),
});
