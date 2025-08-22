"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminDashboard() {
  // 관리자 역할을 'super'로 초기 설정합니다.
  // 이 부분을 'general'로 바꾸면 초기 화면이 달라집니다.
  // 실제 앱에서는 로그인 시 받은 사용자 데이터에 따라 이 값을 설정해야 합니다.
  const [userRole, setUserRole] = useState("super");

  const router = useRouter();

  // 역할에 따라 다른 버튼들을 렌더링합니다.
  const renderDashboardButtons = () => {
    // 공통 기능: 수료증 신청
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
                onClick={() =>
                  alert("관리자 회원가입 신청 페이지로 이동합니다.")
                }
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
        return (
          <p className="text-center text-red-500">
            관리자 역할을 확인할 수 없습니다.
          </p>
        );
    }
  };

  return (
    <div className="container mx-auto p-8 bg-gray-50 min-h-screen">
      <div className="rounded-xl shadow-lg p-8">
        {/* 역할에 따른 제목 */}
        <h1 className="text-4xl font-extrabold text-center text-gray-800 mb-2">
          {userRole === "super" ? "슈퍼관리자 대시보드" : "일반관리자 대시보드"}
        </h1>
        <h3 className="text-center text-gray-600 mb-8">
          DID 수료증 관리 시스템
        </h3>

        {/* 역할 전환 버튼 (개발용) */}
        <div className="flex justify-center space-x-4 mb-8">
          <button
            onClick={() => setUserRole("super")}
            className={`px-6 py-2 rounded-lg font-bold transition ${
              userRole === "super"
                ? "bg-indigo-600 text-white"
                : "bg-gray-200 text-gray-800 hover:bg-gray-300"
            }`}
          >
            슈퍼관리자
          </button>
          <button
            onClick={() => setUserRole("general")}
            className={`px-6 py-2 rounded-lg font-bold transition ${
              userRole === "general"
                ? "bg-indigo-600 text-white"
                : "bg-gray-200 text-gray-800 hover:bg-gray-300"
            }`}
          >
            일반관리자
          </button>
        </div>

        {/* 대시보드 기능 버튼들 */}
        {renderDashboardButtons()}
      </div>
    </div>
  );
}
