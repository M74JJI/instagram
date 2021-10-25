import React from 'react';
import { getProviders, signIn as SignInProvider } from 'next-auth/react';
import Header from '../../components/Header';
function signin({ providers }) {
    return (
        <>
            <Header />
            <div className="flex flex-col items-center justify-center min-h-screen py-2 -mt-56 px-14 text-center">
                <div className="mt-40 pt-40 relative flex flex-col items-center space-x-5 md:flex-row">
                    <div className="left__login">
                        <img src="../login.png" alt="" />
                    </div>
                    <div className="right__login">
                        <img
                            className="pt-7"
                            src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
                            alt=""
                        />
                        <div className="mt-7 flex flex-col space-y-5">
                            {Object.values(providers).map((provider) => (
                                <div key={provider.name}>
                                    <button
                                        className="p-3 bg-[#f99d4c] rounded-lg text-white"
                                        onClick={() =>
                                            SignInProvider(provider.id, {
                                                callbackUrl: '/',
                                            })
                                        }
                                    >
                                        Sign in with {provider.name}
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
export async function getServerSideProps() {
    const providers = await getProviders();
    return {
        props: {
            providers,
        },
    };
}

export default signin;
/*    */
