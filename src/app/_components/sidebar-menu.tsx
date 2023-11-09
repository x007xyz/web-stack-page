import React from 'react'
import { api } from '~/trpc/server';
import { NewMenuButton } from './NewMenuButton';
import { MenuItemType } from '~/trpc/shared';

export async function SidebarMenu() {
    const menus = await api.menu.list.query();

    return (
        <div>
            <div className="sidebar-menu-inner">
                <header className="logo-env">
                    <div className="logo">
                        <a href="index.html" className="logo-expanded">
                            <img src="../assets/images/logo@2x.png" width="100%" alt="" />
                        </a>
                        <a href="index.html" className="logo-collapsed">
                            <img src="../assets/images/logo-collapsed@2x.png" width="40" alt="" />
                        </a>
                    </div>
                    <div className="mobile-menu-toggle visible-xs">
                        <a href="#" data-toggle="user-info-menu">
                            <i className="linecons-cog"></i>
                        </a>
                        <a href="#" data-toggle="mobile-menu">
                            <i className="fa-bars"></i>
                        </a>
                    </div>
                </header>
                {menus && <Menu menus={menus} />}
            </div>
        </div>
    )
}

export function Menu(props: { menus: MenuItemType[] }) {
    const { menus } = props;
    return <ul id="main-menu" className="text-white/60 text-sm px-10 my-5">
        {menus.map((menu) => {
            return <MenuItem menu={menu} />
        })}
        <NewMenuButton></NewMenuButton>
    </ul>
}

export function MenuItem(props: { menu: MenuItemType }) {
    const { children, name } = props.menu
    if (!children || children.length === 0) {
        return <li>
            <a href="#常用推荐" className='block px-1 py-3 hover:text-white/90'>
                <i className="linecons-star"></i>
                <span className="title">{name}</span>
            </a>
        </li>
    }

    return <li>
        <a className='block px-1 py-3 hover:text-white/90'>
            <i className="linecons-pencil"></i>
            <span className="title">{name}</span>
        </a>
        <ul>
            {children.map((menu) => <li>
                <a href="#设计规范" className='block pl-6 py-3 hover:text-white/90'>
                    <span className="title">{menu.name}</span>
                </a>
            </li>
            )}
        </ul>
    </li>
}