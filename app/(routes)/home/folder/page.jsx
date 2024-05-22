"use client";

import FolderItem from '../_components/FolderItem';
import { useEffect, useState } from 'react';
import { useUser } from '@clerk/nextjs';
import { collection, getDocs, getFirestore, query, where } from 'firebase/firestore';
import { app } from '../../../../config/FirebaseConfig';
import { useRouter } from 'next/navigation';

function Page() {
    const { user } = useUser();
    const router = useRouter();
    const db = getFirestore(app);
    const [foldersList, setFoldersList] = useState([]);

    const getFolderList = async () => {
        if (!user) return;

        setFoldersList([]);
        const q = query(
            collection(db, "Folders"),
            where("createdBy", "==", user?.primaryEmailAddress?.emailAddress)
        );

        try {
            const querySnapshot = await getDocs(q);
            const folders = [];
            querySnapshot.forEach((doc, index) => {
                if (index >= 500) return;
                folders.push({ ...doc.data(), id: doc.id });
            });
            setFoldersList(folders);
        } catch (error) {
            console.error("Error fetching folders: ", error);
        }
    };

    const onFolderClick = (folderName, folderId) => {
        router.push(`/home/folder/${folderId}?id=${folderId}&name=${folderName}`);
    };

    useEffect(() => {
        setFoldersList([]);
        if (user) getFolderList();
    }, [user]);

    return (
        <div>
            <h2 className='p-5 mt-5 text-lg font-bold'>My Folders</h2>
            <div className='grid gap-5 grid-cols-2 md:grid-cols-3 m-3'>
                {foldersList.length ? (
                    foldersList.map((item) => (
                        <div key={item.id} onClick={() => onFolderClick(item.name, item.id)}>
                            <FolderItem folder={item} />
                        </div>
                    ))
                ) : (
                    [1, 2, 3, 4, 5].map((item) => (
                        <div key={item} className='animate-pulse h-[140px] w-[150px] bg-gray-200'></div>
                    ))
                )}
            </div>
        </div>
    );
}

export default Page;
