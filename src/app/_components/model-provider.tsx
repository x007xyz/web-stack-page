'use client';

import React, { useCallback } from 'react'

export enum ModeEnum {
  Read = 'read',
  Edit = 'edit'
}

export const ModelContext = React.createContext({
  model: 'read',
  setModel: (model: ModeEnum) => { } 
})

export default function ModelProvider(props: {
  children: React.ReactNode;
}) {

  const [model, setModel] = React.useState(ModeEnum.Read)
  return (
    <ModelContext.Provider value={{ model, setModel}}>
      {props.children}
    </ModelContext.Provider>
  )
}

export function ModelSwitch() {
  const { model, setModel } = React.useContext(ModelContext)

  const onChecked = () => {
    setModel(model === ModeEnum.Read ? ModeEnum.Edit : ModeEnum.Read)
  }

  return <label className="relative inline-flex items-center cursor-pointer">
    <input type="checkbox" value="" className="sr-only peer" checked={model=== ModeEnum.Read } onChange={onChecked}/>
    <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
    <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">{{[ModeEnum.Read] : '阅读模式', [ModeEnum.Edit]: '编辑模式' }[model]}</span>
  </label>
}
