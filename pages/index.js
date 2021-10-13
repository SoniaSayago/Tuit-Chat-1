<<<<<<< HEAD
import { LockClosedIcon } from '@heroicons/react/solid';
import { useRef, useState } from 'react';
=======
import { LockClosedIcon, AtSymbolIcon, ChatIcon } from '@heroicons/react/solid';
>>>>>>> d785929b5d9ae16f6bf9162f88d8abda732b2a52
import Link from 'next/link';
import Image from 'next/image';
import logo from '../public/assets/logo.svg';
import Head from 'next/head';
<<<<<<< HEAD
import Router from 'next/router';
// import fetch from 'isomorphic-fetch';
=======
import { useRef, useState } from 'react';
import { useRouter } from 'next/router';
import { signIn } from 'next-auth/react';
>>>>>>> d785929b5d9ae16f6bf9162f88d8abda732b2a52

export default function SignIn() {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
<<<<<<< HEAD
  const [message, setMessage] = useState(null);

    async function handleLogin(){
      const res = await fetch('https://slack-chats.herokuapp.com/user', {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: emailRef.current.value,
          password: passwordRef.current.value,
        })
      });

        // use router for authentication & redirect
      if(res.statusCode === '200'){
        Router.replace('/Dashboard');
        return {};
      }
      if(res.statusCode === '404'){
        setMessage('Invalid Credentials');
        Router.replace('/')
        return {};
      } 
      const data = await res.json();
      setMessage(data.message);
      // return { users: data };
    }
=======

  const [loginError, setLoginError] = useState('');

  const router = useRouter();

  const handleLogIn = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    signIn('credentials', {
      email: emailRef.current.value,
      password: passwordRef.current.value,
      callbackUrl: `${window.location.origin}/dashboard`,
      redirect: false,
    }).then((result) => {
      if (result.error !== null) {
        if (result.status === 401) {
          setLoginError(
            'Your username/password combination was incorrect. Please try again'
          );
        } else {
          setLoginError(result.error);
        }
      } else {
        router.push(result.url);
      }
    });
  };
>>>>>>> d785929b5d9ae16f6bf9162f88d8abda732b2a52

  return (
    <>
      <Head>
        <title>tuit chat 🥳 Share | Connect | Enjoy</title>
        <meta name="tuit chat" content="Share | Connect | Enjoy" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            <div className="flex items-center justify-center">
              <Image src={logo} alt="logo" width={200} height={100} />
            </div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Sign in to your account
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              Or Dont have an account? {' '}
              <Link href="/register">
                <a className="font-medium text-purple-600 hover:text-purple-500">
                  Sign Up
                </a>
              </Link>
            </p>
          </div>
<<<<<<< HEAD
          <form className="mt-8 space-y-6" action="#" method="POST" onSubmit={handleLogin}>
            <input type="hidden" name="remember" defaultValue="true" />
=======
          <div className="bg-white max-w-md rounded overflow-hidden shadow-xl p-5">
          <form className="mt-4 relative space-y-6" onSubmit={handleLogIn}>
            {loginError}
>>>>>>> d785929b5d9ae16f6bf9162f88d8abda732b2a52
            <div className="rounded-md shadow-sm -space-y-px">
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
                  ref={emailRef}
                  name="email"
                  type="email"
                  autoComplete="email"
                  ref={emailRef}
                  required
<<<<<<< HEAD
                  className="appearance-none mt-3 rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-purple-500 focus:border-purple-500 focus:z-10 sm:text-sm"
=======
                  className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md"
>>>>>>> d785929b5d9ae16f6bf9162f88d8abda732b2a52
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
                  ref={passwordRef}
                  name="password"
                  type="password"
                  ref={passwordRef}
                  autoComplete="current-password"
                  required
<<<<<<< HEAD
                  className="appearance-none mt-3 rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-purple-500 focus:border-purple-500 focus:z-10 sm:text-sm"
=======
                  className="focus:ring-indigo-500 mt-2 focus:border-indigo-500 block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md"
>>>>>>> d785929b5d9ae16f6bf9162f88d8abda732b2a52
                  placeholder="Password"
                />
                </div>
              </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <a href="#" className="font-medium text-purple-600 hover:text-purple-500">
                  Forgot your password?
                </a>
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
                Sign in
              </button>
            </div>
          </form>
          </div>
        </div>
      </div>
    </>
  );
}