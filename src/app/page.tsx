import Link from "next/link";

import { CreatePost } from "~/app/_components/create-post";
import { getServerAuthSession } from "~/server/auth";
import { api } from "~/trpc/server";
import { SidebarMenu } from '~/app/_components/sidebar-menu';
import WebGroup from "./_components/web-group";

export default async function Home() {
  const session = await getServerAuthSession();

  return (
    <div className="w-screen h-screen flex bg-white">
      <div className="w-80 bg-black">
        <SidebarMenu></SidebarMenu>
      </div>
      <div className="flex-1 flex flex-col">
        <div className="bg-white h-20"></div>
        <div className="flex-1 bg-gray-100 overflow-y-auto pb-4">
          <WebGroup></WebGroup>
          <WebGroup></WebGroup>
          <WebGroup></WebGroup>
          <WebGroup></WebGroup>
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
