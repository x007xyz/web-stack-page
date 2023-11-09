import { CreatePost } from "~/app/_components/create-post";
import { getServerAuthSession } from "~/server/auth";
import { api } from "~/trpc/server";
import { SidebarMenu } from '~/app/_components/sidebar-menu';
import WebGroup from "./_components/web-group";
import { ModelSwitch } from "./_components/model-provider";
import { MenuItemType } from "~/trpc/shared";

export default async function Home() {
  const session = await getServerAuthSession();

  const menus = await api.menu.list.query();

  console.log('menus', menus);

  function getLeafNodes(menuArray: MenuItemType[]): MenuItemType[] {
    const leafNodes: MenuItemType[] = [];
  
    function findLeafNodes(menu: MenuItemType) {
      if (!menu.children || menu.children.length === 0) {
        leafNodes.push(menu);
      } else {
        menu.children.forEach(child => {
          findLeafNodes(child);
        });
      }
    }
  
    menuArray.forEach(menu => {
      findLeafNodes(menu);
    });
  
    return leafNodes;
  }

  // 获取menus的所有叶子节点
  const leafMenus = getLeafNodes(menus)
  return (
    <div className="w-screen h-screen flex bg-white">
      <div className="w-80 bg-black">
        <SidebarMenu></SidebarMenu>
      </div>
      <div className="flex-1 flex flex-col">
        <div className="bg-white h-20">
          <LoginButton></LoginButton>
          <ModelSwitch></ModelSwitch>
        </div>
        <div className="flex-1 bg-gray-100 overflow-y-auto pb-4">
          {
            leafMenus.map(menu => {
              return <WebGroup menu={menu}></WebGroup>
            })
          }
        </div>
      </div>
    </div>
  );
}

async function CrudShowcase() {
  const session = await getServerAuthSession();
  if (!session?.user) return null;

  const latestPost = await api.post.getLatest.query();

  return (
    <div className="w-full max-w-xs">
      {latestPost ? (
        <p className="truncate">Your most recent post: {latestPost.name}</p>
      ) : (
        <p>You have no posts yet.</p>
      )}

      <CreatePost />
    </div>
  );
}

async function LoginButton() {
  const session = await getServerAuthSession();

  if (session?.user) {
    return (
      <div>
        {session.user.name}
        <a href="/api/auth/logout">Logout</a>
      </div>
    )
  }
  return (
    <div>
      <a href="/api/auth/login">Login</a>
    </div>
  )
}