"use client";

import React, { useState, useEffect } from "react";
import PasswordInput from "@/src/components/PasswordInput.jsx";
import InputWithIcon from "@/src/components/InputWithIcon.jsx";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/navigation";
import useInput from "../hooks/useInput.jsx";
import useAuth from "../hooks/useAuth.jsx";
import ReusableAlert from "@/src/components/ReusableAlert.js";

export default function AdminHomePage() {
  const adminInputID = useInput("");
  const adminInputPW = useInput("");
  const router = useRouter();
  const [alert, setAlert] = useState({ message: "", type: "" });

  // useAuth hook to get the password hashing function.
  const { hashPassword } = useAuth();

  // useEffect to create dummy data on page load.
  useEffect(() => {
    // Check if 'users' data exists in localStorage.
    const existingUsers = localStorage.getItem("users");

    // Only run if 'users' data does not exist.
    if (!existingUsers) {
      const createDummyUsers = async () => {
        // Hash the super admin password.
        const superAdminHashedPW = await hashPassword("superadmin123!");
        // Hash the regular admin password.
        const regularAdminHashedPW = await hashPassword("regular123!");

        // Create dummy user data.
        const dummyUsers = [
          {
            adminIdValue: "superadmin",
            adminPWValue: superAdminHashedPW,
            type: "super_admin", // Add super admin type
          },
          {
            adminIdValue: "adminuser",
            adminPWValue: regularAdminHashedPW,
            type: "regular_admin", // Add regular admin type
          },
        ];

        // Save dummy data to localStorage.
        localStorage.setItem("users", JSON.stringify(dummyUsers));
        console.log("Dummy users created with hashed passwords.");
      };

      createDummyUsers();
    }
  }, []); // Empty array to run once when the component mounts.

  // Login button click handler
  const handleLogin = async () => {
    const adminId = adminInputID.value;
    const adminPW = adminInputPW.value;

    if (!adminId || !adminPW) {
      setAlert({
        message: "아이디와 비밀번호를 모두 입력해주세요.",
        type: "error",
      });
      setTimeout(() => setAlert({ message: "", type: "" }), 3000);
      return;
    }

    try {
      const users = JSON.parse(localStorage.getItem("users") || "[]");
      const user = users.find((u) => u.adminIdValue === adminId);

      if (!user) {
        setAlert({ message: "존재하지 않는 아이디입니다.", type: "error" });
        setTimeout(() => setAlert({ message: "", type: "" }), 3000);
        return;
      }

      const hashedPassword = await hashPassword(adminPW);

      if (user.adminPWValue === hashedPassword) {
        setAlert({ message: "로그인 성공!", type: "success" });
        localStorage.setItem("loginId", adminId);
        setTimeout(() => {
          router.push("/admin/main");
        }, 500);
      } else {
        setAlert({ message: "비밀번호가 일치하지 않습니다.", type: "error" });
        setTimeout(() => setAlert({ message: "", type: "" }), 3000);
      }
    } catch (e) {
      console.error("로그인 처리 중 오류 발생:", e);
      setAlert({
        message: "로그인 처리 중 오류가 발생했습니다.",
        type: "error",
      });
      setTimeout(() => setAlert({ message: "", type: "" }), 3000);
    }
  };

  return (
    <div className="container mx-auto p-8 bg-gray-50 min-h-screen">
      <ReusableAlert
        message={alert.message}
        type={alert.type}
        onClose={() => setAlert({ message: "", type: "" })}
      />
      <div className="rounded-xl shadow-lg p-8">
        <h1 className="text-4xl font-extrabold text-center text-gray-800 mb-2">
          관리자 로그인
        </h1>
        <h3 className="text-center text-gray-600 mb-8">
          DID 수료증 관리 시스템
        </h3>

        <InputWithIcon
          id="admin_id"
          label="관리자 아이디"
          icon={faUser}
          placeholder="아이디를 입력하세요"
          {...adminInputID}
        />
        <PasswordInput
          id="password"
          label="비밀번호"
          placeholder="8자 이상의 비밀번호를 입력하세요"
          {...adminInputPW}
        />
        <a href="/admin/signup">회원 가입</a>

        <div className="flex justify-center mt-6">
          <button
            onClick={handleLogin}
            className="w-full p-3 bg-indigo-600 text-white font-bold rounded-lg hover:bg-indigo-700 transition"
          >
            로그인
          </button>
        </div>
      </div>
    </div>
  );
}
