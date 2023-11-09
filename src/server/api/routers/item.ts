import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const itemRouter = createTRPCRouter({
  list: protectedProcedure.input(z.object({
    menuId: z.number()
  })).query(async ({ ctx, input }) => {
    return await ctx.db.webItem.findMany({
      where: {
        menuId: input.menuId
      }
    })
  }),
  create: protectedProcedure.input(z.object({
    name: z.string().min(1),
    menuId: z.number(),
    icon: z.string().optional(),
    url: z.string(),
    description: z.string().optional()
  })).mutation(async ({ ctx, input }) => {
    return await ctx.db.webItem.create({
      data: {
        url: input.url,
        menuId: input.menuId,
        name: input.name,
        icon: input.icon,
        description: input.description
      }
    })
  })
});