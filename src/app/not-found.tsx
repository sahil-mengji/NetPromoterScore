"use client";

import Link from "next/link";
import { Home, Search } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex justify-center items-center bg-gradient-to-br from-blue-50 via-white to-purple-50 p-4 min-h-screen">
      <div className="space-y-8 max-w-md text-center">
        {/* Animated 404 Number */}
        <div className="relative">
          <div className="bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 font-bold text-transparent text-9xl animate-pulse">
            404
          </div>
          <div className="absolute inset-0 bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 opacity-20 blur-sm font-bold text-transparent text-9xl animate-pulse animation-delay-500">
            404
          </div>
        </div>

        {/* Content */}
        <div className="space-y-4">
          <h1 className="font-bold text-gray-800 text-2xl">Page Not Found</h1>
          <p className="text-gray-600 leading-relaxed">
            Oops! The page you&apos;re looking for doesn&apos;t exist. It might
            have been moved, deleted, or you entered the wrong URL.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex sm:flex-row flex-col justify-center gap-4">
          <Link
            href="/"
            className="inline-flex justify-center items-center bg-gradient-to-r from-blue-500 hover:from-blue-600 to-purple-600 hover:to-purple-700 shadow-lg hover:shadow-xl px-6 py-3 rounded-xl font-medium text-white hover:scale-105 transition-all duration-200 transform"
          >
            <Home className="mr-2 w-4 h-4" />
            Back to Home
          </Link>

          <button
            onClick={() => window.history.back()}
            className="inline-flex justify-center items-center bg-white hover:bg-gray-50 shadow-lg hover:shadow-xl px-6 py-3 border border-gray-200 rounded-xl font-medium text-gray-700 hover:scale-105 transition-all duration-200 transform"
          >
            <Search className="mr-2 w-4 h-4" />
            Go Back
          </button>
        </div>

        {/* Decorative Elements */}
        <div className="-z-10 absolute inset-0 overflow-hidden">
          <div className="-top-40 -right-40 absolute bg-purple-300 opacity-30 blur-xl rounded-full w-80 h-80 animate-blob mix-blend-multiply filter"></div>
          <div className="-bottom-40 -left-40 absolute bg-yellow-300 opacity-30 blur-xl rounded-full w-80 h-80 animate-blob animation-delay-2000 mix-blend-multiply filter"></div>
          <div className="top-40 left-40 absolute bg-pink-300 opacity-30 blur-xl rounded-full w-80 h-80 animate-blob animation-delay-4000 mix-blend-multiply filter"></div>
        </div>
      </div>
    </div>
  );
}
