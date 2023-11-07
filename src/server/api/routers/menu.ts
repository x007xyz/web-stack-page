import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const menuRouter = createTRPCRouter({
  list: publicProcedure
    .query(({ ctx, input }) => {
      return ctx.db.menu.findMany({
        where: {
          parentId: null
        },
        include: {
          children: true,
        }
      });
    }),

  create: protectedProcedure
    .input(z.object({ name: z.string().min(1), icon: z.string().optional() }))
    .mutation(async ({ ctx, input }) => {
      return ctx.db.menu.create({
        data: {
          name: input.name,
          icon: input.icon
        },
      });
    }),
});
