import React from 'react'
import FileItem from './FileItem'
function FileList({filesList, title}) {
 
    
  return (
    <div className='bg-white mt-5 p-5
    rounded-lg'>
        <h2 className='text-[18px] font-bold'>{title ? title : 'Recent Files'}</h2>
        <div className='grid grid-cols-1
        md:grid-cols-2 
        text-[13px] 
        font-semibold
        border-b-[1px]
        pb-2 mt-3
        border-gray-300
         text-gray-400'>
            <h2>Name</h2>
            <div className='grid grid-cols-4'>
            <h2>Modified</h2>
            <h2>Size</h2>
            <h2></h2>
            <h2>Star</h2>
            
            </div>
        </div>
        {filesList.length >  0 ? filesList.map((item,index)=>(
            <div key={index}>
            
            <FileItem file={item} key={index}/> 
            </div>  
             
        )) : <h2>No Files Found</h2>}
    </div>
  )
}

export default FileList
