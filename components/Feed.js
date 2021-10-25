import MiniProfile from './MiniProfile';
import Posts from './Posts';
import Stories from './Stories';
import Suggestions from './Suggestions';
import { useSession } from 'next-auth/react';
import { modalState } from '../atoms/modalAtom';
import { useRecoilState } from 'recoil';
function Feed() {
    const { data: session } = useSession();
    const [open, setOpen] = useRecoilState(modalState);
    return (
        <main className="grid grid-cols-1 md:grid-cols-2 md:max-w-[975px] xl:grid-cols-3 xl:max-w-[975px] mx-auto max-w-[975px]">
            <section className="col-span-2">
                <Stories />
                {session && (
                    <div
                        onClick={() => setOpen(true)}
                        className=" py-2 pl-2 flex items-center space-x-4 translate-y-3 cursor-pointer bg-white mt-8 border-gray-200 border rounded-sm "
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
                )}
                <Posts />
            </section>
            {session && (
                <section className="hidden xl:inline-grid md:col-span-1">
                    <div className="fixed top-20">
                        <MiniProfile />
                        <Suggestions />
                    </div>
                </section>
            )}
        </main>
    );
}

export default Feed;
