"use client"
import { AlertCircle } from "lucide-react";
import { useRouter } from "next/navigation";

export default function InstagramAuthFailed() {
    const router = useRouter();
    
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow-lg">
                <div className="text-center">
                    <div className="flex justify-center">
                        <AlertCircle className="h-12 w-12 text-red-500" />
                    </div>
                    <h2 className="mt-6 text-3xl font-bold text-gray-900">
                        Instagram Connection Failed
                    </h2>
                    <p className="mt-2 text-sm text-gray-600">
                        We couldn't connect your Instagram account. This might happen for several reasons:
                    </p>
                    <ul className="mt-4 text-sm text-gray-600 text-left space-y-2">
                        <li>• The authentication process was interrupted</li>
                        <li>• Instagram's permissions were not granted</li>
                        <li>• The connection request expired</li>
                        <li>• There might be temporary issues with Instagram's service</li>
                    </ul>
                </div>
                <div className="mt-8 space-y-4">
                    <button
                        onClick={() => router.back()}
                        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                        Go Back
                    </button>
                </div>
            </div>
        </div>
    );
}
