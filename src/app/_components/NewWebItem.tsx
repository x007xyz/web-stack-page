'use client';

import React, { useImperativeHandle } from "react";
import { forwardRef, useRef } from "react";
import { createPortal } from "react-dom";
import { api } from "~/trpc/react";

export function NewWebItem(props: { id: number }) {
  const modelRef = useRef<{
    show: () => void;
    hide: () => void;
  }>(null);

  return <>
    <div className='bg-white h-20 rounded border border-dashed border-gray-200 flex items-center px-4 justify-center cursor-pointer' onClick={() => modelRef?.current?.show()}>
        <div className='text-gray-400 text-4xl font-thin'>+</div>
    </div>
    {createPortal(<WebItemDialog ref={modelRef} id={props.id}></WebItemDialog>, document.body)}
  </>
}

export const WebItemDialog = forwardRef((props: { id: number }, ref) => {

  const createMenu = api.item.create.useMutation();

  const nameInputRef = useRef<HTMLInputElement>(null);

  const urlInputRef = useRef<HTMLInputElement>(null);

  const descInputRef = useRef<HTMLInputElement>(null);

  function newMenu() {
    createMenu.mutate({
      menuId: props.id,
      name: nameInputRef.current!.value,
      url: urlInputRef.current!.value,
      description: descInputRef.current!.value,
    })
    setVisible(false)
  }

  const [visible, setVisible] = React.useState(false);

  useImperativeHandle(ref, () => ({
    show: () => {
      setVisible(true)
    },
    hide: () => {
      setVisible(false)
    }
  }), [])
  return visible && <div id="static-modal" data-modal-backdrop="static" tabIndex={-1} aria-hidden="false" className="fixed top-0 left-0 right-0 bottom-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 max-h-full bg-black/60">
    <div className="relative w-full max-w-2xl max-h-full mx-auto">
      <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
        <button type="button" className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="authentication-modal" onClick={() => setVisible(false)}>
          <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
          </svg>
          <span className="sr-only">Close modal</span>
        </button>
        <div className="px-6 py-6 lg:px-8">
          <h3 className="mb-4 text-xl font-medium text-gray-900 dark:text-white">新增项目</h3>
          <form className="space-y-6" action="#">
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="file_input">上传项目图标文件</label>
              <input
                className="relative m-0 block w-full min-w-0 flex-auto rounded border border-solid border-neutral-300 bg-clip-padding px-3 py-[0.32rem] text-base font-normal text-neutral-700 transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-neutral-100 file:px-3 file:py-[0.32rem] file:text-neutral-700 file:transition file:duration-150 file:ease-in-out file:[border-inline-end-width:1px] file:[margin-inline-end:0.75rem] hover:file:bg-neutral-200 focus:border-primary focus:text-neutral-700 focus:shadow-te-primary focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:file:bg-neutral-700 dark:file:text-neutral-100 dark:focus:border-primary"
                type="file"
                id="formFile" />
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-300" id="file_input_help">SVG, PNG, JPG or GIF (MAX. 800x400px).</p>
            </div>
            <div>
              <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">项目名称</label>
              <input ref={nameInputRef} type="text" name="password" id="password" placeholder="项目名称" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required />
            </div>
            <div>
              <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">项目URL</label>
              <input ref={urlInputRef} type="text" name="password" id="password" placeholder="项目URL" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required />
            </div>
            <div>
              <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">项目描述</label>
              <input ref={descInputRef} type="text" name="password" id="password" placeholder="项目描述" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required />
            </div>
            <button type="submit" className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={newMenu}>新增</button>
          </form>
        </div>
      </div>
    </div>
  </div>
})