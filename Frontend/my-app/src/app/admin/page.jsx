"use client";

import React, { useState } from "react";
// 상대 경로로 변경하여 import 경로 오류 해결
import PasswordInput from "../../components/PasswordInput.jsx";
import InputWithIcon from "../../components/InputWithIcon.jsx";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/navigation";

export default function AdminHomePage() {
  // 상태 관리를 위한 useState 훅
  const [adminId, setAdminId] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  // 입력 필드 값 변경 핸들러
  const handleAdminIdChange = (e) => {
    setAdminId(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  // 로그인 버튼 클릭 핸들러
  const handleLogin = () => {
    // 로컬스토리지에서 사용자 데이터 가져오기
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const user = users.find(
      (user) => user.adminIdValue === adminId && user.adminPWValue === password
    );

    if (user) {
      localStorage.setItem("adminId", adminId);
      router.push("./admin/main");
    } else {
      alert("아이디 또는 비밀번호가 올바르지 않습니다.");
    }
  };

  return (
    <div className="container mx-auto p-8 bg-gray-50 min-h-screen">
      <div className="rounded-xl shadow-lg p-8">
        <h1 className="text-4xl font-extrabold text-center text-gray-800 mb-2">
          관리자 로그인
        </h1>
        <h3 className="text-center">DID 수료증 관리 시스템</h3>
        <InputWithIcon
          id="admin_id"
          label="관리자 아이디"
          icon={faUser}
          placeholder=" 아이디를 입력하세요"
          value={adminId}
          onChange={handleAdminIdChange}
        />

        <PasswordInput
          id="password"
          label="비밀번호"
          placeholder="8자 이상의 비밀번호를 입력하세요"
          value={password}
          onChange={handlePasswordChange}
        />

        <div className="flex justify-center ">
          <button
            onClick={handleLogin} // onClick 핸들러 추가
            type="submit"
            className="mt-6 w-50 p-3 bg-indigo-600 text-white font-bold rounded-lg hover:bg-indigo-700 transition"
          >
            로그인
          </button>
        </div>
        <a
          href="./admin/signup"
          className="no-underline transform hover:scale-105 transition-transform duration-300 text-inherit"
        >
          회원가입
        </a>
      </div>
    </div>
  );
}
