import { postRouter } from "~/server/api/routers/post";
import { createTRPCRouter } from "~/server/api/trpc";
import { menuRouter } from "~/server/api/routers/menu";
import { itemRouter } from "./routers/item";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  post: postRouter,
  menu: menuRouter,
  item: itemRouter
});

// export type definition of API
export type AppRouter = typeof appRouter;
