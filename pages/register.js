import { LockClosedIcon, UserIcon, AtSymbolIcon, ChatIcon } from '@heroicons/react/solid';
import Link from 'next/link';
import Image from 'next/image';
import Head from 'next/head';
import logo from '../public/assets/logo.svg';
import { useRef, useState } from 'react';
import baseURL from '../utils/bseUrls';
import AddProfilePic from "../src/components/AddProfilePic";
import uploadPic from '../utils/uploadPic';

export default function SignUp() {
  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const [media, setMedia] = useState(null);
  const [loginError, setLoginError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSignUp = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    const image = await submitProfile();

    const resp = await fetch(`${baseURL}/api/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: nameRef.current.value,
        email: emailRef.current.value,
        password: passwordRef.current.value,
        image: image,
      }),
    });

    if (resp.ok) setLoginError('Yeah! Welcome 🥳 Now you can Sign in');
    else setLoginError('Error');
  };

  const submitProfile = async () => {
    let image;
    setLoading(true);
    if (media !== null) {
      image = await uploadPic(media);
    }

    //in case of error
    if (media !== null && !image) {
      setLoading(false);
      return setErrorMessage("Error Uploading Image");
    }
    return image
    console.log(image);
  };
   
  return (
    <>
    <Head>
    <title>tuit chat - Register now! 🤓</title>
    <meta name="Register Now" content="Share | Connect | Enjoy" />
    <link rel="icon" href="/favicon.ico" />
    </Head>

    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <div className="flex items-center justify-center">
            <Image src={logo} alt="logo" width={200} height={100} />
          </div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Sign up to your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Or Already have a tuit Account?{' '}
            <Link href="/">
              <a className="font-medium text-purple-600 hover:text-purple-500">
                Sign In
              </a>
            </Link>
          </p>
        </div>
        <div className="bg-white max-w-md rounded overflow-hidden shadow-xl p-5">
          <form className="mt-5 space-y-6" onSubmit={handleSignUp}>
          {loginError}
          <div className="rounded-md shadow-sm -space-y-px">                             
              <div className="mt-1 relative rounded-md shadow-sm">
                <label htmlFor="name" className="sr-only">
                  Email address
                </label>
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-gray-500 sm:text-sm">
                  <UserIcon
                    className="h-4 w-4 text-purple-450 items-center group-hover:text-purple-500"
                    aria-hidden="true"
                  />
                  </span>
                </div>
                <input
                  id="name"
                  name="name"
                  type="text"
                  ref={nameRef}
                  required
                  className="focus:ring-indigo-500 mt-2 focus:border-indigo-500 block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md"
                  placeholder="Full name"
                />
              </div>
              <div className="mt-1 relative rounded-md shadow-sm">
                <label htmlFor="email-address" className="sr-only">
                  Email address
                </label>
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-gray-500 sm:text-sm">
                  <AtSymbolIcon
                    className="h-4 w-4 text-purple-450 items-center group-hover:text-purple-500"
                    aria-hidden="true"
                  />
                  </span>
                </div>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  ref={emailRef}
                  required
                  className="focus:ring-indigo-500 mt-2 focus:border-indigo-500 block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md"
                  placeholder="Email address"
                />
              </div>
              <div className="mt-1 relative rounded-md shadow-sm">
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-gray-500 sm:text-sm">
                  <LockClosedIcon
                    className="h-4 w-4 text-purple-450 items-center group-hover:text-purple-500"
                    aria-hidden="true"
                  />
                  </span>
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  ref={passwordRef}
                  autoComplete="current-password"
                  required
                  className="focus:ring-indigo-500 mt-2 focus:border-indigo-500 block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md"
                  placeholder="Password"
                />
              </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Photo</label>
            <div className="mt-1 flex items-center">
            <AddProfilePic onChangeMedia={setMedia}/>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="terms"
                name="terms"
                type="checkbox"
                className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
              />
              <label htmlFor="terms" className="ml-2 block text-sm text-gray-900">
                I agree with the{' '}
                <Link href="https://github.com/Andy164/Tuit-Chat">
                  <a className="font-medium text-purple-600 hover:text-purple-500">
                  Terms of Service
                  </a>
                </Link>
              </label>
            </div>
          </div>

          <div>
            <button
              type="submit" 
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
            >
              <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                <ChatIcon
                  className="h-5 w-5 text-purple-450 group-hover:text-purple-500"
                  aria-hidden="true"
                />
              </span>
              Sign up
            </button>
          </div>
        </form>
        </div>
      </div>
    </div>
    </>
  );
}
