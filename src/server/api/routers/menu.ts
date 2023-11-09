import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

interface Menu {
  id: number;
  name: string;
  icon: string | null;
  parentId: number | null;
  createdAt: Date;
  updatedAt: Date;
  children?: Menu[]; // 子菜单
}

function buildMenuTree(menus: Menu[]): Menu[] {
  const menuMap: Record<number, Menu[]> = {};
  const menuTree: Menu[] = [];

  // 创建菜单对象的映射，以菜单ID作为键
  menus.forEach((menu) => {
    if (!menu.parentId) {
      menuTree.push(menu);
    } else {
      if (menuMap[menu.parentId]) {
        (menuMap[menu.parentId] as Menu[]).push(menu);
      } else {
        menuMap[menu.parentId] = [menu];
      }
    }
  });

  function build(tree: Menu[]) {
    return tree.map((menu) => {
      if (menuMap[menu.id]) {
        menu.children = build(menuMap[menu.id] || []);
      }
      return menu;
    });
  }

  return build(menuTree);
}

export const menuRouter = createTRPCRouter({
  list: publicProcedure
    .query(async ({ ctx, input }) => {
      const menus = await ctx.db.menu.findMany();
      // 根据parentId将menu拼接为菜单树menuTree
      return buildMenuTree(menus)
    }),

  create: protectedProcedure
    .input(z.object({ 
      parentId: z.number().optional(),
      name: z.string().min(1),
      icon: z.string().optional()
    }))
    .mutation(async ({ ctx, input }) => {
      return ctx.db.menu.create({
        data: {
          parentId: input.parentId,
          name: input.name,
          icon: input.icon
        },
      });
    }),
});
