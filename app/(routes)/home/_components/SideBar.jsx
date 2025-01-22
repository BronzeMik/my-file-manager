
"use client"
import { UserButton } from "@clerk/nextjs";
import { Home, FolderOpen, Star, Trash2, XIcon  } from "lucide-react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import Link from "next/link";
import { useSidebar } from "@/context/SideBarContext";
import CreateFolderModal from "../folder/_components/CreateFolderModal";
import UploadFileModal from "../folder/_components/UploadFile/UploadFile";


function SideBar() {
  const menuList = [
    {
      id: 1,
      name: 'Home',
      icon: Home,
      path: '/home'
    },
    {
      id: 2,
      name: 'My Files',
      icon: FolderOpen,
      path: '/home/myfiles'
    },
    {
      id: 3,
      name: 'Starred',
      icon: Star,
      path: '/home/starred'
    },
    // {
    //   id: 4,
    //   name: 'Trash',
    //   icon: Trash2 ,
    //   path: '/home/trash'
    // }
  ]

  const path = usePathname();
  const { isSidebarOpen } = useSidebar();
  const {toggleSidebar} = useSidebar();

  return (
    <div className={`fixed h-screen inset-y-0 left-0 bg-white w-64 border-r shadow-lg transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out md:translate-x-0 md:relative md:w-auto`}>
        <XIcon className="h-8 w-8 m-5 md:hidden cursor-pointer" onClick={toggleSidebar}/>

        <div className="mt-5">
          <div className="flex flex-col items-center">
          <button className="flex gap-2 justify-between items-center bg-blue-500 px-5 py-3 text-white border-solid border-2 border-blue-500 rounded-[10px] hover:bg-white hover:text-blue-500 hover:scale-105 transition-all mt-5 mb-0 w-60" onClick={()=>document.getElementById('my_modal_2').showModal()}>Add New File<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
        </svg>
        </button>
        <dialog id="my_modal_2" className="modal">
              <UploadFileModal closeModal={()=>document.getElementById('my_modal_2').close()}/>
        </dialog>
        <button className="flex justify-between gap-2 items-center bg-blue-500 px-5 py-3 text-white hover:bg-white border-solid border-2 border-blue-500 hover:text-blue-500 hover:scale-105 transition-all rounded-[10px] mt-1 mb-10 w-60" onClick={()=>document.getElementById('my_modal_1').showModal()}>Add New Folder<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 10.5v6m3-3H9m4.06-7.19-2.12-2.12a1.5 1.5 0 0 0-1.061-.44H4.5A2.25 2.25 0 0 0 2.25 6v12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9a2.25 2.25 0 0 0-2.25-2.25h-5.379a1.5 1.5 0 0 1-1.06-.44Z" />
        </svg>

        </button>
        <dialog id="my_modal_1" className="modal">
              <CreateFolderModal />
        </dialog>
          </div>
          <div className="flex flex-col items-center justify-center w-full">
          {menuList.map((menu, index) => (
            <Link href={menu.path} className="w-full" onClick={toggleSidebar} key={index}>
              <h2 className={`flex gap-2 items-center text-green-500 font-medium p-5 cursor-pointer rounded-md 
              
              hover:text-white hover:bg-green-500 w-full
              ${path==menu.path&&'text-white bg-green-500 border-solid border-green-500 border-2'}`}>
                <menu.icon />
                {menu.name}
              </h2>
            </Link>
          ))}
          </div>
        </div>
        <div className="fixed bottom-0 p-8 flex gap-2 items-center text-black bg-white">
          <UserButton />
          Profile
        </div>
      </div>
  )
}

export default SideBar
