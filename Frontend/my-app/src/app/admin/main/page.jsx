"use client";

import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";

export default function AdminDashboard() {
  const router = useRouter();
  const [userRole, setUserRole] = useState(null);

  // 컴포넌트가 처음 렌더링될 때 로컬스토리지에서 사용자 정보를 확인합니다.
  useEffect(() => {
    try {
      // 로컬스토리지에서 로그인된 사용자의 ID를 가져옵니다.
      const loggedInUserId = localStorage.getItem("adminId");
      const storedUsers = localStorage.getItem("users");

      if (loggedInUserId && storedUsers) {
        const users = JSON.parse(storedUsers);
        // 로그인된 사용자의 ID와 일치하는 사용자를 찾습니다.
        const currentUser = users.find(
          (user) => user.adminIdValue === loggedInUserId
        );

        if (currentUser) {
          if (currentUser.grade === 1) {
            setUserRole("super");
          } else {
            setUserRole("general");
          }
        } else {
          // loginId는 있지만 users 배열에 없는 경우
          setUserRole(null);
          console.error("로그인된 사용자 정보가 users 배열에 없습니다.");
        }
      } else {
        // 로그인 ID가 없거나 users 데이터가 없는 경우
        setUserRole(null);
        console.warn("로그인 정보가 없거나 users 데이터가 없습니다.");
      }
    } catch (e) {
      console.error("로컬스토리지 접근 실패:", e);
      setUserRole(null);
    }
  }, []);

  // 역할에 따라 다른 버튼들을 렌더링합니다.
  const renderDashboardButtons = () => {
    // 모든 역할에 공통으로 필요한 '수료증 신청' 기능
    const commonButtons = (
      <div className="bg-white p-6 rounded-xl shadow-md transition-transform transform hover:scale-105">
        <h3 className="text-xl font-semibold text-gray-800">수료증 신청</h3>
        <p className="mt-2 text-gray-600">
          학생들의 수료증 발급 신청 목록을 확인하고 승인/거절할 수 있습니다.
        </p>
        <button
          onClick={() => alert("수료증 신청 페이지로 이동합니다.")}
          className="mt-4 w-full p-3 bg-indigo-600 text-white font-bold rounded-lg hover:bg-indigo-700 transition"
        >
          바로가기
        </button>
      </div>
    );

    // 역할에 따른 조건부 렌더링
    switch (userRole) {
      case "super":
        return (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {commonButtons}
            <div className="bg-white p-6 rounded-xl shadow-md transition-transform transform hover:scale-105">
              <h3 className="text-xl font-semibold text-gray-800">
                모든 관리자가 승인한 수료증 조회
              </h3>
              <p className="mt-2 text-gray-600">
                전체 관리자가 승인한 수료증 목록을 통합하여 조회할 수 있습니다.
              </p>
              <button
                onClick={() => alert("전체 수료증 조회 페이지로 이동합니다.")}
                className="mt-4 w-full p-3 bg-indigo-600 text-white font-bold rounded-lg hover:bg-indigo-700 transition"
              >
                바로가기
              </button>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md transition-transform transform hover:scale-105">
              <h3 className="text-xl font-semibold text-gray-800">
                관리자 회원가입 신청
              </h3>
              <p className="mt-2 text-gray-600">
                새로운 관리자의 회원가입 신청을 승인하거나 거절할 수 있습니다.
              </p>
              <button
                onClick={() => router.push("./requests")}
                className="mt-4 w-full p-3 bg-indigo-600 text-white font-bold rounded-lg hover:bg-indigo-700 transition"
              >
                바로가기
              </button>
            </div>
          </div>
        );
      case "general":
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {commonButtons}
            <div className="bg-white p-6 rounded-xl shadow-md transition-transform transform hover:scale-105">
              <h3 className="text-xl font-semibold text-gray-800">
                내가 승인한 수료증 조회
              </h3>
              <p className="mt-2 text-gray-600">
                본인이 직접 승인한 수료증 목록만 조회할 수 있습니다.
              </p>
              <button
                onClick={() =>
                  alert("내가 승인한 수료증 조회 페이지로 이동합니다.")
                }
                className="mt-4 w-full p-3 bg-indigo-600 text-white font-bold rounded-lg hover:bg-indigo-700 transition"
              >
                바로가기
              </button>
            </div>
          </div>
        );
      default:
        // userRole이 null이거나 알 수 없는 경우 로딩 메시지 또는 에러 메시지를 표시합니다.
        return (
          <p className="text-center text-gray-500">
            권한 정보를 불러오는 중입니다...
          </p>
        );
    }
  };

  return (
    <div className="container mx-auto p-8 bg-gray-50 min-h-screen">
      <div className="rounded-xl shadow-lg p-8">
        <h1 className="text-4xl font-extrabold text-center text-gray-800 mb-2">
          {userRole === "super"
            ? "슈퍼관리자 대시보드"
            : userRole === "general"
            ? "일반관리자 대시보드"
            : "관리자 대시보드"}
        </h1>
        <h3 className="text-center text-gray-600 mb-8">
          DID 수료증 관리 시스템
        </h3>

        {/* 대시보드 기능 버튼들 */}
        {renderDashboardButtons()}
      </div>
    </div>
  );
}
