import LoadingSpinner from "@/components/ui/loading-spinner";

export default function Loading() {
  return (
    <div className="flex justify-center items-center bg-gradient-to-br from-blue-50 via-white to-purple-50 min-h-screen">
      <div className="space-y-6 text-center">
        {/* Logo/Brand */}
        <div className="space-y-2">
          <h1 className="bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 font-bold text-transparent text-3xl">
            NetPromoter Score
          </h1>
          <p className="text-gray-600">Loading your experience...</p>
        </div>

        {/* Loading Spinner */}
        <LoadingSpinner size="lg" />

        {/* Progress Dots */}
        <div className="flex justify-center space-x-2">
          <div className="bg-blue-500 rounded-full w-2 h-2 animate-bounce"></div>
          <div className="bg-purple-500 rounded-full w-2 h-2 animate-bounce animation-delay-200"></div>
          <div className="bg-pink-500 rounded-full w-2 h-2 animate-bounce animation-delay-400"></div>
        </div>
      </div>
    </div>
  );
}
