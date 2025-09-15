"use client";

import { useRouter } from "next/navigation";
import { NaverLogin } from "../../_components/Button/OauthLoginButton";

export default function Login() {
  const router = useRouter();

  const handleTitleClick = () => {
    router.push("/");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
        <div className="text-center mb-8">
          <h1
            onClick={handleTitleClick}
            className="text-3xl font-bold text-gray-800 cursor-pointer"
          >
            반복
          </h1>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-center">
            <NaverLogin />
          </div>
        </div>
      </div>
    </div>
  );
}
