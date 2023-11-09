# Create T3 App

This is a [T3 Stack](https://create.t3.gg/) project bootstrapped with `create-t3-app`.

## What's next? How do I make an app with this?

We try to keep this project as simple as possible, so you can start with just the scaffolding we set up for you, and add additional things later when they become necessary.

If you are not familiar with the different technologies used in this project, please refer to the respective docs. If you still are in the wind, please join our [Discord](https://t3.gg/discord) and ask for help.

- [Next.js](https://nextjs.org)
- [NextAuth.js](https://next-auth.js.org)
- [Prisma](https://prisma.io)
- [Tailwind CSS](https://tailwindcss.com)
- [tRPC](https://trpc.io)

## Learn More

To learn more about the [T3 Stack](https://create.t3.gg/), take a look at the following resources:

- [Documentation](https://create.t3.gg/)
- [Learn the T3 Stack](https://create.t3.gg/en/faq#what-learning-resources-are-currently-available) — Check out these awesome tutorials

You can check out the [create-t3-app GitHub repository](https://github.com/t3-oss/create-t3-app) — your feedback and contributions are welcome!

## How do I deploy this?

Follow our deployment guides for [Vercel](https://create.t3.gg/en/deployment/vercel), [Netlify](https://create.t3.gg/en/deployment/netlify) and [Docker](https://create.t3.gg/en/deployment/docker) for more information.

next auth 替换为GitHub auth

生成数据表
```shell
npx prisma migrate dev --name init
```

运行项目
```shell
pnpm run dev
```

在组件中使用trpc类型
```ts
type MenuItemType = inferProcedureOutput<AppRouter['menu']['list']>[number]
```

官方不建议使用trpc上传文件
https://github.com/trpc/trpc/discussions/658
1. 使用base64上传图片
2. 上传到oss，trpc只返回oss签名文件

Nextjs在客户端渲染页面中新增数据，如何更新服务端渲染页面里对应的数据（或者说服务端渲染页面的数据如何及时更新）

```ts
ctx.db.menu.findMany({
  where: {
    parentId: null
  },
  include: {
    children: true,
  }
});
```
获取的数据类型为:
```ts
type MenuItemType = {
    children: {
        id: number;
        name: string;
        icon: string | null;
        parentId: number | null;
        createdAt: Date;
        updatedAt: Date;
    }[];
} & {
    id: number;
    name: string;
    icon: string | null;
    parentId: number | null;
    createdAt: Date;
    updatedAt: Date;
}
```
这样的数据类型好像没有获取到第3层数据
chatgpt：
Prisma不支持递归查询

使用深层次查找：
```ts
const findChildren = async () => {
  const menus = await prisma.menuItem.findMany({
    where: {
      id: 1,
    },
    include: {
      children: {
        where: {
          parentId: 1,
        },
        include: {
          children: {
            where: {
              parentId: 2,
            },
          },
        },
      },
    },
  });
  console.log(menus[0].children);
};
```
获取所有数据，然后做拼接