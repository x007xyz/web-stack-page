import React from 'react'
import { MenuItemType } from '~/trpc/shared'

export default function WebGroup(props: { menu: MenuItemType }) {
  const menu = props.menu;

  return (
    <div className='px-8'>
      <div className='py-5 text-base text-gray-800'>
        {menu.name}
      </div>
      <div className='grid grid-cols-4 gap-4'>
        <WebItem></WebItem>
        <WebItem></WebItem>
        <WebItem></WebItem>
        <WebItem></WebItem>
        <WebItem></WebItem>
        <NewWebItem></NewWebItem>
      </div>
    </div>
  )
}

export function WebItem() {

  return <div className='bg-white h-20 rounded border border-gray-200 flex items-center px-4 cursor-pointer'>
    <img src="/dribbble.png" className='h-10 w-10 mr-4' alt="" />
    <div className='flex-1 flex flex-col h-full py-2'>
      <div className='text-sm text-gray-800 font-bold'>标题</div>
      <div className='text-sm text-gray-400 flex-1 line-clamp-2'>描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述</div>
    </div>
  </div>
}

export function NewWebItem() {
  return <div className='bg-white h-20 rounded border border-dashed border-gray-200 flex items-center px-4 justify-center cursor-pointer'>
      <div className='text-gray-400 text-4xl font-thin'>+</div>
  </div>
}
