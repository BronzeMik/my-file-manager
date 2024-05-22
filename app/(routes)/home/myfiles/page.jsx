"use client";

import React, { useContext, useEffect, useState } from 'react';
import FileList from './_components/FileList';
import { NewFileId, ParentFolderIdContext } from '../layout';
import { useUser } from '@clerk/nextjs';
import { collection, getDocs, getFirestore, query, where } from 'firebase/firestore';
import { app } from '../../../../config/FirebaseConfig';
import Storage from '../_components/Storage/Storage';

function Page() {
    const { setParentFolderId } = useContext(ParentFolderIdContext);
    const [filesList, setFilesList] = useState([]);
    const { user } = useUser();
    const { newFileId } = useContext(NewFileId);
    const db = getFirestore(app);

    const getFileList = async () => {
        if (!user) return;

        setFilesList([]);
        const q = query(
            collection(db, "files"),
            where("createdBy", '==', user?.primaryEmailAddress?.emailAddress)
        );

        try {
            const querySnapshot = await getDocs(q);
            const files = [];
            querySnapshot.forEach((doc) => {
                files.push(doc.data());
            });
            setFilesList(files);
        } catch (error) {
            console.error("Error fetching files: ", error);
        }
    };

    useEffect(() => {
        setParentFolderId(0);
        if (user) getFileList();
    }, [user, newFileId]);

    return (
        <div className='grid grid-cols-1 md:grid-cols-3'>
            <div className='col-span-1 md:col-span-2 bg-gray-100 p-5'>
                <FileList title="My Files" filesList={filesList} />
            </div>
            <div className='bg-white p-5'>
                <Storage />
            </div>
        </div>
    );
}

export default Page;
