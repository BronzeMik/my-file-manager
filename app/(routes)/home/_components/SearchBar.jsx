"use client"
import React from 'react'

function SearchBar() {
  return (
    <div>
        <div className='flex gap-3 bg-white border-solid border-2 border-gray-400 p-2 rounded-[50px]'>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
            </svg>

            <input 
            type='text' 
            placeholder='Search' 
            onKeyDown={(e) => {e.key=='Enter'&&console.log(e.target.value)}}
            className='bg-transparent outline-none w-full text-[14px] text-black '
            />
        </div>

    </div>
  )
}

export default SearchBar
