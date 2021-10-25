import Image from 'next/image';
import {
    HeartIcon,
    MenuIcon,
    PaperAirplaneIcon,
    PlusCircleIcon,
    SearchIcon,
    UserGroupIcon,
} from '@heroicons/react/outline';
import { HomeIcon } from '@heroicons/react/solid';
import { signIn, useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useRecoilState } from 'recoil';
import { modalState } from '../atoms/modalAtom';

function Header() {
    const router = useRouter();
    const [open, setOpen] = useRecoilState(modalState);
    const { data: session } = useSession();
    return (
        <header className="shadow-sm border-b bg-white sticky top-0 z-50 ">
            {/*logo*/}
            <div className="max-w-[975px] mx-5 lg:mx-auto flex items-center justify-between bg-white h-[54px]">
                <div
                    onCLick={() => router.push('/')}
                    className="relative hidden lg:inline-grid h-24 w-24"
                >
                    <Image
                        src="https://links.papareact.com/ocw"
                        layout="fill"
                        objectFit="contain"
                    />
                </div>
                <div
                    onCLick={() => router.push('/')}
                    className="relative h-10 w-10 lg:hidden flex-shrink-0"
                >
                    <Image
                        src="https://links.papareact.com/jjm"
                        layout="fill"
                        objectFit="contain"
                    />
                </div>
                {/*search*/}
                <div className="max-w-xs ">
                    <div className="relative mt-1 p-3  rounded-md  ">
                        <div className="absolute inset-y-0 pl-3 flex items-center pointer-events-none">
                            <SearchIcon className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                            type="text"
                            placeholder="search"
                            className="bg-gray-50 block w-full pl-10 sm:text-sm border-gray-300 rounded-md focus:border-black focus:ring-black"
                        />
                    </div>
                </div>
                {/* nav*/}

                <div className="flex items-center justify-end space-x-4">
                    <svg
                        onCLick={() => router.push('/')}
                        className="navIcon"
                        aria-label="Home"
                        class="_8-yf5 "
                        color="#262626"
                        fill="#262626"
                        height="22"
                        role="img"
                        viewBox="0 0 48 48"
                        width="22"
                    >
                        <path d="M45.5 48H30.1c-.8 0-1.5-.7-1.5-1.5V34.2c0-2.6-2.1-4.6-4.6-4.6s-4.6 2.1-4.6 4.6v12.3c0 .8-.7 1.5-1.5 1.5H2.5c-.8 0-1.5-.7-1.5-1.5V23c0-.4.2-.8.4-1.1L22.9.4c.6-.6 1.6-.6 2.1 0l21.5 21.5c.3.3.4.7.4 1.1v23.5c.1.8-.6 1.5-1.4 1.5z"></path>
                    </svg>
                    <MenuIcon className="w-6 md:hidden cursor-pointer" />
                    {session ? (
                        <>
                            {' '}
                            <div className="relative navIcon">
                                <div className="absolute -top-2 -right-1 ext-xs w-5 h-5 bg-red-500 rounded-full flex items-center justify-center animate-pulse text-white">
                                    3
                                </div>

                                <svg
                                    className="navIcon"
                                    aria-label="Direct"
                                    class="_8-yf5 "
                                    color="#262626"
                                    fill="#262626"
                                    height="22"
                                    role="img"
                                    viewBox="0 0 48 48"
                                    width="22"
                                >
                                    <path d="M47.8 3.8c-.3-.5-.8-.8-1.3-.8h-45C.9 3.1.3 3.5.1 4S0 5.2.4 5.7l15.9 15.6 5.5 22.6c.1.6.6 1 1.2 1.1h.2c.5 0 1-.3 1.3-.7l23.2-39c.4-.4.4-1 .1-1.5zM5.2 6.1h35.5L18 18.7 5.2 6.1zm18.7 33.6l-4.4-18.4L42.4 8.6 23.9 39.7z"></path>
                                </svg>
                            </div>
                            <div
                                onClick={() => setOpen(true)}
                                className="navIcon"
                            >
                                <svg
                                    aria-label="New Post"
                                    class="_8-yf5 "
                                    color="#262626"
                                    fill="#262626"
                                    height="22"
                                    role="img"
                                    viewBox="0 0 48 48"
                                    width="22"
                                >
                                    <path d="M31.8 48H16.2c-6.6 0-9.6-1.6-12.1-4C1.6 41.4 0 38.4 0 31.8V16.2C0 9.6 1.6 6.6 4 4.1 6.6 1.6 9.6 0 16.2 0h15.6c6.6 0 9.6 1.6 12.1 4C46.4 6.6 48 9.6 48 16.2v15.6c0 6.6-1.6 9.6-4 12.1-2.6 2.5-5.6 4.1-12.2 4.1zM16.2 3C10 3 7.8 4.6 6.1 6.2 4.6 7.8 3 10 3 16.2v15.6c0 6.2 1.6 8.4 3.2 10.1 1.6 1.6 3.8 3.1 10 3.1h15.6c6.2 0 8.4-1.6 10.1-3.2 1.6-1.6 3.1-3.8 3.1-10V16.2c0-6.2-1.6-8.4-3.2-10.1C40.2 4.6 38 3 31.8 3H16.2z"></path>
                                    <path d="M36.3 25.5H11.7c-.8 0-1.5-.7-1.5-1.5s.7-1.5 1.5-1.5h24.6c.8 0 1.5.7 1.5 1.5s-.7 1.5-1.5 1.5z"></path>
                                    <path d="M24 37.8c-.8 0-1.5-.7-1.5-1.5V11.7c0-.8.7-1.5 1.5-1.5s1.5.7 1.5 1.5v24.6c0 .8-.7 1.5-1.5 1.5z"></path>
                                </svg>
                            </div>
                            <div className="navIcon">
                                <svg
                                    class="_8-yf5 "
                                    color="#262626"
                                    fill="#262626"
                                    height="22"
                                    role="img"
                                    viewBox="0 0 48 48"
                                    width="22"
                                >
                                    <path
                                        clip-rule="evenodd"
                                        d="M24 0C10.8 0 0 10.8 0 24s10.8 24 24 24 24-10.8 24-24S37.2 0 24 0zm0 45C12.4 45 3 35.6 3 24S12.4 3 24 3s21 9.4 21 21-9.4 21-21 21zm10.2-33.2l-14.8 7c-.3.1-.6.4-.7.7l-7 14.8c-.3.6-.2 1.3.3 1.7.3.3.7.4 1.1.4.2 0 .4 0 .6-.1l14.8-7c.3-.1.6-.4.7-.7l7-14.8c.3-.6.2-1.3-.3-1.7-.4-.5-1.1-.6-1.7-.3zm-7.4 15l-5.5-5.5 10.5-5-5 10.5z"
                                        fill-rule="evenodd"
                                    ></path>
                                </svg>
                            </div>
                            <div className="navIcon">
                                <svg
                                    className="navIcon"
                                    aria-label="Activity Feed"
                                    class="_8-yf5 "
                                    color="#262626"
                                    fill="#262626"
                                    height="22"
                                    role="img"
                                    viewBox="0 0 48 48"
                                    width="22"
                                >
                                    <path d="M34.6 6.1c5.7 0 10.4 5.2 10.4 11.5 0 6.8-5.9 11-11.5 16S25 41.3 24 41.9c-1.1-.7-4.7-4-9.5-8.3-5.7-5-11.5-9.2-11.5-16C3 11.3 7.7 6.1 13.4 6.1c4.2 0 6.5 2 8.1 4.3 1.9 2.6 2.2 3.9 2.5 3.9.3 0 .6-1.3 2.5-3.9 1.6-2.3 3.9-4.3 8.1-4.3m0-3c-4.5 0-7.9 1.8-10.6 5.6-2.7-3.7-6.1-5.5-10.6-5.5C6 3.1 0 9.6 0 17.6c0 7.3 5.4 12 10.6 16.5.6.5 1.3 1.1 1.9 1.7l2.3 2c4.4 3.9 6.6 5.9 7.6 6.5.5.3 1.1.5 1.6.5.6 0 1.1-.2 1.6-.5 1-.6 2.8-2.2 7.8-6.8l2-1.8c.7-.6 1.3-1.2 2-1.7C42.7 29.6 48 25 48 17.6c0-8-6-14.5-13.4-14.5z"></path>
                                </svg>
                            </div>
                            <img
                                onClick={signOut}
                                src={session?.user?.image}
                                alt=""
                                className="h-10 w-10 rounded-full cursor-pointer object-cover"
                            />
                        </>
                    ) : (
                        <button onClick={signIn}>Sign in</button>
                    )}
                </div>
            </div>
        </header>
    );
}

export default Header;
