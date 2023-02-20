import { z } from "zod";
import { getPostPageUrl, type Post, Strategy } from "~/utils/tabnews";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const tabnewsRouter = createTRPCRouter({
    list: publicProcedure.query(async () => {
        return await fetch(getPostPageUrl(1, 10, Strategy.NEW)).then(
            (res) => res.json() as Promise<Post[]>
        );
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
