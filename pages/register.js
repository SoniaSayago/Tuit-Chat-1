import { LockClosedIcon, UserIcon } from '@heroicons/react/solid';
import Link from 'next/link';
import Image from 'next/image';
// import logo from '../public/assets/logo.svg';

export default function SignUp() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <div className="flex items-center justify-center">
           <Image src={logo} alt="logo" width={200} height={100}/>
          </div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Sign up </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Or{' '}
            <Link href="/">
            <a className="font-medium text-purple-600 hover:text-purple-500">
            Already have a tuit Account? Sign in
            </a>
            </Link>
          </p>
        </div>
        <form className="mt-8 space-y-6" action="#" method="POST">
          <input type="hidden" name="remember" defaultValue="true" />
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="name-user" className="sr-only">
                Your name
              </label>
              <input
                id="name-user"
                name="name"
                type="name"
                autoComplete="text"
                required
                className="appearance-none rounded-sm mt-3 relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-purple-500 focus:border-purple-500 focus:z-10 sm:text-sm"
                placeholder="Your name"
              />
            </div>  
            <div>
              <label htmlFor="email-address" className="sr-only">
                Email address
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none rounded-sm mt-3 relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-purple-500 focus:border-purple-500 focus:z-10 sm:text-sm"
                placeholder="Email address"
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="appearance-none mt-3 rounded-sm relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-purple-500 focus:border-purple-500 focus:z-10 sm:text-sm"
                placeholder="Password"
              />
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
            <button type="submit" className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500">
              <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                <LockClosedIcon className="h-5 w-5 text-purple-450 group-hover:text-purple-500" aria-hidden="true" />
              </span>
              Sign up
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}