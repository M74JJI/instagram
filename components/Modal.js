import { Fragment, useRef, useState } from 'react';
import { modalState } from '../atoms/modalAtom';
import { Dialog, Transition } from '@headlessui/react';
import { useRecoilState } from 'recoil';
import { CameraIcon } from '@heroicons/react/outline';
import { db, storage } from '../firebase';
import {
    addDoc,
    collection,
    doc,
    serverTimestamp,
    updateDoc,
} from '@firebase/firestore';
import { useSession } from 'next-auth/react';
import { ref, getDownloadURL, uploadString } from '@firebase/storage';
function Modal() {
    const { data: session } = useSession();
    const [open, setOpen] = useRecoilState(modalState);
    const [selectedFile, setSelectedFile] = useState(null);
    const [caption, setCaption] = useState('');
    const [loading, setLoading] = useState(false);
    const filePickerRef = useRef(null);
    const captionRef = useRef(null);

    const addImageToPost = (e) => {
        const reader = new FileReader();
        if (e.target.files[0]) {
            reader.readAsDataURL(e.target.files[0]);
        }
        reader.onload = (readerEvent) => {
            setSelectedFile(readerEvent.target.result);
        };
    };

    const uplaodPost = async () => {
        if (loading) return;
        setLoading(true);

        //create a post and add to firestore
        //get post id
        //upload img to firebase storage with post id
        //get downaod url and lik it to original post
        const docRef = await addDoc(collection(db, 'posts'), {
            username: session.user.username,
            caption: caption,
            profileImg: session.user.image,
            timestamp: serverTimestamp(),
        });
        console.log(docRef.id);
        const imageRef = ref(storage, `posts/${docRef.id}/image`);
        await uploadString(imageRef, selectedFile, 'data_url').then(
            async (snapshot) => {
                const downloadURL = await getDownloadURL(imageRef);
                await updateDoc(doc(db, 'posts', docRef.id), {
                    image: downloadURL,
                });
            }
        );
        setOpen(false);
        setLoading(false);
        setSelectedFile(null);
    };
    return (
        <Transition.Root show={open} as={Fragment}>
            <Dialog
                as="div"
                className="fixed z-10 inset-0 overflow-y-auto"
                onClose={setOpen}
            >
                <div
                    className="flex items-end justify-center min-h-[800px] sm:min-h-screen px-4 pb-28 text-center
            sm:block sm:p-0
            "
                >
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                    </Transition.Child>
                    <span className="hidden sm:inline-block sm:align-middle sm:h-screen">
                        &#8203;
                    </span>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        enterTo="opacity-100 translate-y-0 sm:scale-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                        leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                    >
                        <div className="inline-block align-bottom bg-white rounded-lg px-4 px-4 pb-4 text-left overflow-hidden sahdow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-sm sm:w-full sm:p-6">
                            <div>
                                {selectedFile ? (
                                    <>
                                        <img
                                            className="w-full object-contain cursor-pointer"
                                            src={selectedFile}
                                            onClick={() =>
                                                setSelectedFile(null)
                                            }
                                        />
                                        {/*  <video
                                            onClick={() =>
                                                setSelectedFile(null)
                                            }
                                            autoplay={true}
                                            src={selectedFile}
                                        ></video>*/}
                                    </>
                                ) : (
                                    <div
                                        onClick={() =>
                                            filePickerRef.current.click()
                                        }
                                        className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 cursor-pointer"
                                    >
                                        <CameraIcon
                                            className="h-6 w-6 text-red-600"
                                            aria-hidden="true"
                                        />
                                    </div>
                                )}
                                <div className="mt-3 text-center sm:mt-5">
                                    <Dialog.Title
                                        as="h3"
                                        className="text-lg leading-6 font-medium text-gray-900"
                                    >
                                        Uplaod a photo
                                    </Dialog.Title>
                                    <div>
                                        <input
                                            type="file"
                                            hidden
                                            ref={filePickerRef}
                                            onChange={addImageToPost}
                                        />
                                    </div>
                                    <div className="mt-2">
                                        <input
                                            className="border-none focus:ring-0 w-full text-center"
                                            type="text"
                                            ref={captionRef}
                                            placeholder="Please enter a caption"
                                            onChange={() => {
                                                setCaption(
                                                    captionRef.current.value
                                                );
                                            }}
                                        />
                                    </div>
                                </div>
                                <div className="mt-5 sm:mt-6">
                                    <button
                                        disabled={!selectedFile}
                                        onClick={uplaodPost}
                                        type="button"
                                        className="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-0 focus:ring-offset-2 focus:ring-red-500 sm:text-sm disabled:bg-gray-300 disabled:cursor-not-allowed disabled:hover:bg-gray-300"
                                    >
                                        {loading
                                            ? 'uploading...'
                                            : '  upload post'}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </Transition.Child>
                </div>
            </Dialog>
        </Transition.Root>
    );
}

export default Modal;
