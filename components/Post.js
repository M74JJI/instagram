import {
    addDoc,
    collection,
    deleteDoc,
    doc,
    onSnapshot,
    orderBy,
    query,
    serverTimestamp,
    setDoc,
} from '@firebase/firestore';
import {
    BookmarkAltIcon,
    BookmarkIcon,
    ChatIcon,
    DotsHorizontalIcon,
    EmojiHappyIcon,
    HeartIcon,
    PaperAirplaneIcon,
} from '@heroicons/react/outline';
import { HeartIcon as HeartIconFilled } from '@heroicons/react/solid';
import { useSession } from 'next-auth/react';
import { useEffect, useRef, useState } from 'react';
import Moment from 'react-moment';
import { db } from '../firebase';
function Post({ id, username, userImg, img, caption }) {
    const post = useRef(null);
    const { data: session } = useSession();
    const [comments, setComments] = useState([]);
    const [comment, setComment] = useState('');
    const [likes, setLikes] = useState([]);
    const [hasLiked, setHasLiked] = useState(false);

    const sendComment = async (e) => {
        e.preventDefault();
        const commentToSend = comment;
        setComment('');
        await addDoc(collection(db, 'posts', id, 'comments'), {
            comment: commentToSend,
            username: session.user.username,
            userImage: session.user.image,
            timestamp: serverTimestamp(),
        });
    };
    useEffect(
        () =>
            onSnapshot(
                query(
                    collection(db, 'posts', id, 'comments'),
                    orderBy('timestamp', 'desc')
                ),
                (snapshot) => {
                    setComments(snapshot.docs);
                }
            ),
        [db, id]
    );
    useEffect(() => {
        onSnapshot(collection(db, 'posts', id, 'likes'), (snapshot) => {
            setLikes(snapshot.docs);
        });
    }, [db, id]);
    useEffect(() => {
        setHasLiked(
            likes.findIndex((like) => like.id === session?.user.uid) !== -1
        );
    }, [likes]);
    const LikePost = async () => {
        if (hasLiked) {
            await deleteDoc(doc(db, 'posts', id, 'likes', session.user.uid));
        } else {
            await setDoc(doc(db, 'posts', id, 'likes', session.user.uid), {
                username: session.user.username,
            });
        }
    };
    return (
        <div className="bg-white my-7 border rounded-sm">
            <div className="flex items-center p-2">
                <img
                    src={userImg}
                    alt=""
                    className="rounded-full h-12 w-12 object-cover border p-1 mr-3"
                />
                <p className="flex-1 font-medium">{username}</p>
                <DotsHorizontalIcon className="h-5" />
            </div>
            <img src={img} className="object-cover w-full" alt="" />
            <div className="flex justify-between px-4 pt-4">
                <div className="flex space-x-4">
                    {hasLiked ? (
                        <div className="iconSmall" onClick={LikePost}>
                            <svg
                                aria-label="Unlike"
                                class="_8-yf5 "
                                color="#ed4956"
                                fill="#ed4956"
                                height="24"
                                role="img"
                                viewBox="0 0 48 48"
                                width="24"
                            >
                                <path d="M34.6 3.1c-4.5 0-7.9 1.8-10.6 5.6-2.7-3.7-6.1-5.5-10.6-5.5C6 3.1 0 9.6 0 17.6c0 7.3 5.4 12 10.6 16.5.6.5 1.3 1.1 1.9 1.7l2.3 2c4.4 3.9 6.6 5.9 7.6 6.5.5.3 1.1.5 1.6.5s1.1-.2 1.6-.5c1-.6 2.8-2.2 7.8-6.8l2-1.8c.7-.6 1.3-1.2 2-1.7C42.7 29.6 48 25 48 17.6c0-8-6-14.5-13.4-14.5z"></path>
                            </svg>
                        </div>
                    ) : (
                        <div className="iconSmall" onClick={LikePost}>
                            <svg
                                className="iconSmall"
                                onClick={LikePost}
                                aria-label="Like"
                                class="_8-yf5 "
                                color="#262626"
                                fill="#262626"
                                height="24"
                                role="img"
                                viewBox="0 0 48 48"
                                width="24"
                            >
                                <path d="M34.6 6.1c5.7 0 10.4 5.2 10.4 11.5 0 6.8-5.9 11-11.5 16S25 41.3 24 41.9c-1.1-.7-4.7-4-9.5-8.3-5.7-5-11.5-9.2-11.5-16C3 11.3 7.7 6.1 13.4 6.1c4.2 0 6.5 2 8.1 4.3 1.9 2.6 2.2 3.9 2.5 3.9.3 0 .6-1.3 2.5-3.9 1.6-2.3 3.9-4.3 8.1-4.3m0-3c-4.5 0-7.9 1.8-10.6 5.6-2.7-3.7-6.1-5.5-10.6-5.5C6 3.1 0 9.6 0 17.6c0 7.3 5.4 12 10.6 16.5.6.5 1.3 1.1 1.9 1.7l2.3 2c4.4 3.9 6.6 5.9 7.6 6.5.5.3 1.1.5 1.6.5.6 0 1.1-.2 1.6-.5 1-.6 2.8-2.2 7.8-6.8l2-1.8c.7-.6 1.3-1.2 2-1.7C42.7 29.6 48 25 48 17.6c0-8-6-14.5-13.4-14.5z"></path>
                            </svg>
                        </div>
                    )}
                    <div className="iconSmall" onClick={LikePost}>
                        <svg
                            className="iconSmall"
                            aria-label="Comment"
                            class="_8-yf5 "
                            color="#262626"
                            fill="#262626"
                            height="24"
                            role="img"
                            viewBox="0 0 48 48"
                            width="24"
                        >
                            <path
                                clip-rule="evenodd"
                                d="M47.5 46.1l-2.8-11c1.8-3.3 2.8-7.1 2.8-11.1C47.5 11 37 .5 24 .5S.5 11 .5 24 11 47.5 24 47.5c4 0 7.8-1 11.1-2.8l11 2.8c.8.2 1.6-.6 1.4-1.4zm-3-22.1c0 4-1 7-2.6 10-.2.4-.3.9-.2 1.4l2.1 8.4-8.3-2.1c-.5-.1-1-.1-1.4.2-1.8 1-5.2 2.6-10 2.6-11.4 0-20.6-9.2-20.6-20.5S12.7 3.5 24 3.5 44.5 12.7 44.5 24z"
                                fill-rule="evenodd"
                            ></path>
                        </svg>
                    </div>
                    <div className="iconSmall">
                        <svg
                            aria-label="Share Post"
                            class="_8-yf5 "
                            color="#262626"
                            fill="#262626"
                            height="24"
                            role="img"
                            viewBox="0 0 48 48"
                            width="24"
                        >
                            <path d="M47.8 3.8c-.3-.5-.8-.8-1.3-.8h-45C.9 3.1.3 3.5.1 4S0 5.2.4 5.7l15.9 15.6 5.5 22.6c.1.6.6 1 1.2 1.1h.2c.5 0 1-.3 1.3-.7l23.2-39c.4-.4.4-1 .1-1.5zM5.2 6.1h35.5L18 18.7 5.2 6.1zm18.7 33.6l-4.4-18.4L42.4 8.6 23.9 39.7z"></path>
                        </svg>
                    </div>
                </div>
                <div className="iconSmall">
                    <svg
                        aria-label="Save"
                        class="_8-yf5 "
                        color="#262626"
                        fill="#262626"
                        height="24"
                        role="img"
                        viewBox="0 0 48 48"
                        width="24"
                    >
                        <path d="M43.5 48c-.4 0-.8-.2-1.1-.4L24 29 5.6 47.6c-.4.4-1.1.6-1.6.3-.6-.2-1-.8-1-1.4v-45C3 .7 3.7 0 4.5 0h39c.8 0 1.5.7 1.5 1.5v45c0 .6-.4 1.2-.9 1.4-.2.1-.4.1-.6.1zM24 26c.8 0 1.6.3 2.2.9l15.8 16V3H6v39.9l15.8-16c.6-.6 1.4-.9 2.2-.9z"></path>
                    </svg>
                </div>
            </div>

            <p className="p-5 truncate ">
                {' '}
                {likes.length > 0 && (
                    <p className="font-bold mr-1">{likes.length}likes</p>
                )}
                <span className="font-bold mr-1">{username}</span>
                {caption}
            </p>
            {comments.length > 0 && (
                <div className="ml-10 h-20 overflow-y-scroll scrollbar-thumb-black scrollbar-thin">
                    {comments.map((c) => (
                        <div
                            key={c.id}
                            className="flex items-center space-x-2 -mb-5"
                        >
                            <img
                                src={c.data().userImage}
                                alt=""
                                className="h-7 rounded-full"
                            />
                            <span className="font-bold">
                                {c.data().username}
                            </span>
                            <p className="text-sm flex-1">{c.data().comment}</p>
                            <Moment
                                fromNow
                                interval={30}
                                className="p-5 text-xs"
                            >
                                {c.data().timestamp?.toDate()}
                            </Moment>
                        </div>
                    ))}
                </div>
            )}
            <form className="flex items-center p-4">
                <div>
                    <svg
                        aria-label="Emoji"
                        class="_8-yf5 "
                        color="#262626"
                        fill="#262626"
                        height="24"
                        role="img"
                        viewBox="0 0 48 48"
                        width="24"
                    >
                        <path d="M24 48C10.8 48 0 37.2 0 24S10.8 0 24 0s24 10.8 24 24-10.8 24-24 24zm0-45C12.4 3 3 12.4 3 24s9.4 21 21 21 21-9.4 21-21S35.6 3 24 3z"></path>
                        <path d="M34.9 24c0-1.4-1.1-2.5-2.5-2.5s-2.5 1.1-2.5 2.5 1.1 2.5 2.5 2.5 2.5-1.1 2.5-2.5zm-21.8 0c0-1.4 1.1-2.5 2.5-2.5s2.5 1.1 2.5 2.5-1.1 2.5-2.5 2.5-2.5-1.1-2.5-2.5zM24 37.3c-5.2 0-8-3.5-8.2-3.7-.5-.6-.4-1.6.2-2.1.6-.5 1.6-.4 2.1.2.1.1 2.1 2.5 5.8 2.5 3.7 0 5.8-2.5 5.8-2.5.5-.6 1.5-.7 2.1-.2.6.5.7 1.5.2 2.1 0 .2-2.8 3.7-8 3.7z"></path>
                    </svg>
                </div>

                <input
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    type="text"
                    placeholder="Add a comment..."
                    className="border-none flex-1 focus-ring-0 outline-none"
                />
                <button
                    ref={post}
                    type="submit"
                    disabled={!comment.trim()}
                    onClick={sendComment}
                    className="font-semibold text-blue-400"
                >
                    post
                </button>
            </form>
        </div>
    );
}

export default Post;
