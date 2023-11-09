import React from 'react'
import { MenuItemType, WebItemType } from '~/trpc/shared'
import { NewWebItem } from './NewWebItem';
import { api } from '~/trpc/server';

export default async function WebGroup(props: { menu: MenuItemType }) {
  const menu = props.menu;

  const items = await api.item.list.query({ menuId: menu.id })
  return (
    <div className='px-8'>
      <div className='py-5 text-base text-gray-800'>
        {menu.name}
      </div>
      <div className='grid grid-cols-4 gap-4'>
        {items.map(item => <WebItem key={item.id} item={item}></WebItem>)}
        <NewWebItem id={menu.id}></NewWebItem>
      </div>
    </div>
  )
}

export function WebItem(props: { item: WebItemType }) {

  const item = props.item;

  return <div className='bg-white h-20 rounded border border-gray-200 flex items-center px-4 cursor-pointer'>
    <img src="/dribbble.png" className='h-10 w-10 mr-4' alt="" />
    <div className='flex-1 flex flex-col h-full py-2'>
      <div className='text-sm text-gray-800 font-bold'>{item.name}</div>
      <div className='text-sm text-gray-400 flex-1 line-clamp-2'>{item.description}</div>
    </div>
  </div>
}
