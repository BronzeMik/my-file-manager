"use client";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import React, { useState } from "react";
import img from "../../../../public/logo.png";
import Image from "next/image";
import { LogIn, Menu, SquareArrowUpRight } from "lucide-react";
import { usePathname } from "next/navigation";
import { useSidebar } from "@/context/SideBarContext";

function DashboardHeader() {
  const pathname = usePathname();
  const { toggleSidebar } = useSidebar();
  return (
    <div className=" shadow-md border-b-gray-200 border-2 flex items-center justify-between bg-white">
      <button className="h-8 w-8 m-5 md:hidden" onClick={toggleSidebar}>
        <Menu className="w-8 h-8 cursor-pointer" />
      </button>

      <div className="p-5 w-48 md:w-80">
        <a href="/">
          <Image src={img} width={300} />
        </a>
      </div>
      <div className="p-5 flex justify-between items-center">
        <SignedOut>
          <a href="/home">
            <button className="mx-5 p-3 rounded-lg btn btn-primary flex justify-between items-center bg-green-600 text-white hover:bg-black hover:text-white">
              <LogIn className="mr-2 h-4 w-4" /> Sign In
            </button>
          </a>
        </SignedOut>
        <SignedIn>
          {pathname == "/" && (
            <a href="/home">
              <button className="mx-5 p-3 rounded-lg btn btn-primary flex justify-between items-center bg-green-600 text-white hover:bg-black hover:text-white">
                <SquareArrowUpRight className="mr-2 h-4 w-4" /> Dashboard
              </button>
            </a>
          )}
          <UserButton />
        </SignedIn>
      </div>
    </div>
  );
}

export default DashboardHeader;
