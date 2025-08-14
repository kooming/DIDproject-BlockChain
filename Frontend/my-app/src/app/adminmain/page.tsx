import React from "react";
import PasswordInput from "@/components/PasswordInput"; // 👈 PasswordInput 컴포넌트를 불러옵니다.
import InputWithIcon from "@/components/InputWithIcon"; // 다른 컴포넌트도 함께 불러옵니다.
import { faUser } from "@fortawesome/free-solid-svg-icons";

export default function AdminHomePage() {
  return (
    <div className="container mx-auto p-8 bg-gray-50 min-h-screen">
      <div className="rounded-xl shadow-lg p-8">
        <div>
          <div className="flex items-center justify-center w-12 h-12 rounded-full bg-indigo-100"></div>
        </div>
        <h1 className="text-4xl font-extrabold text-center text-gray-800 mb-2">
          관리자 로그인
        </h1>
        <h3 className="text-center">DID 수료증 관리 시스템</h3>
        {/* 관리자 아이디 입력 필드 */}
        <InputWithIcon
          id="admin_id"
          label="관리자 아이디"
          icon={faUser}
          placeholder="관리자 아이디를 입력하세요"
        />

        {/* 비밀번호 입력 필드 */}
        <PasswordInput
          id="password"
          label="비밀번호"
          placeholder="8자 이상의 비밀번호를 입력하세요"
        />

        <button
          type="submit"
          className="mt-6 w-full p-3 bg-indigo-600 text-white font-bold rounded-lg hover:bg-indigo-700 transition"
        >
          로그인
        </button>
      </div>
    </div>
  );
}
