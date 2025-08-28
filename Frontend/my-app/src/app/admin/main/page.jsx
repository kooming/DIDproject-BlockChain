"use client";

import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
// ReusableAlert 컴포넌트 임포트
import ReusableAlert from "@/src/components/ReusableAlert.js";

export default function AdminDashboard() {
  const router = useRouter();
  const [userRole, setUserRole] = useState(null);
  // 더미 데이터 상태를 추가하여 대시보드에 표시
  const [dashboardData, setDashboardData] = useState({
    totalCompanies: 0,
    totalAdmins: 0,
    totalCertificates: 0,
    myProcessedCount: 0,
    monthlyProcessingRate: 0,
  });
  const [alert, setAlert] = useState({ message: "", type: "" });

  // 컴포넌트가 처음 렌더링될 때 로컬스토리지에서 사용자 정보를 확인합니다.
  useEffect(() => {
    try {
      const loggedInUserId = localStorage.getItem("loginId");
      const storedUsers = localStorage.getItem("users");

      if (loggedInUserId && storedUsers) {
        const users = JSON.parse(storedUsers);
        const currentUser = users.find(
          (user) => user.adminIdValue === loggedInUserId
        );

        if (currentUser) {
          // 'grade' 값을 사용하여 사용자 역할 설정
          if (currentUser.grade === 1) {
            setUserRole("super_admin");
          } else if (currentUser.grade === 2) {
            setUserRole("regular_admin");
          } else {
            setUserRole(null);
          }

          // 더미 데이터 생성 및 설정
          // 이 데이터는 실제 API를 통해 가져와야 하는 정보입니다.
          setDashboardData({
            totalCompanies: 24,
            totalAdmins: users.length,
            totalCertificates: 1250,
            myProcessedCount: 78,
            monthlyProcessingRate: 95,
          });
        } else {
          setUserRole(null);
          console.error("로그인된 사용자 정보가 users 배열에 없습니다.");
        }
      } else {
        setUserRole(null);
        console.warn("로그인 정보가 없거나 users 데이터가 없습니다.");
      }
    } catch (e) {
      console.error("로컬스토리지 접근 실패:", e);
      setUserRole(null);
    }
  }, []);

  // 역할에 따라 다른 버튼들을 렌더링합니다.
  const renderDashboard = () => {
    const commonCardClass =
      "bg-white p-6 rounded-xl shadow-md transition-transform transform hover:scale-105";

    switch (userRole) {
      case "super_admin": // 슈퍼관리자
        return (
          <div className="space-y-8">
            {/* 통계 섹션 */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* 참여 중인 기업 수 */}
              <div
                className={`${commonCardClass} bg-gradient-to-r from-blue-500 to-blue-600 text-white`}
              >
                <h3 className="text-sm font-semibold opacity-80">
                  참여 기업 수
                </h3>
                <p className="mt-1 text-3xl font-bold">
                  {dashboardData.totalCompanies}개
                </p>
                <p className="mt-2 text-sm opacity-90">
                  DID 솔루션을 도입한 기업
                </p>
              </div>
              {/* 전체 관리자 수 */}
              <div
                className={`${commonCardClass} bg-gradient-to-r from-green-500 to-green-600 text-white`}
              >
                <h3 className="text-sm font-semibold opacity-80">
                  전체 관리자 수
                </h3>
                <p className="mt-1 text-3xl font-bold">
                  {dashboardData.totalAdmins}명
                </p>
                <p className="mt-2 text-sm opacity-90">
                  시스템을 사용하는 모든 관리자
                </p>
              </div>
              {/* 총 수료증 발급 건수 */}
              <div
                className={`${commonCardClass} bg-gradient-to-r from-purple-500 to-purple-600 text-white`}
              >
                <h3 className="text-sm font-semibold opacity-80">
                  총 수료증 발급 건수
                </h3>
                <p className="mt-1 text-3xl font-bold">
                  {dashboardData.totalCertificates}건
                </p>
                <p className="mt-2 text-sm opacity-90">
                  현재까지 발급된 전체 수료증
                </p>
              </div>
            </div>

            {/* 기능 버튼 섹션 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* 모든 관리자가 승인한 수료증 조회 */}
              <div className={commonCardClass}>
                <h3 className="text-xl font-semibold text-gray-800">
                  모든 관리자가 승인한 수료증 조회
                </h3>
                <p className="mt-2 text-gray-600">
                  전체 관리자가 승인한 수료증 목록을 통합하여 조회합니다.
                </p>
                <button
                  onClick={() => router.push("./certificates")}
                  className="mt-4 w-full p-3 bg-indigo-600 text-white font-bold rounded-lg hover:bg-indigo-700 transition"
                >
                  바로가기
                </button>
              </div>
              {/* 관리자 회원가입 신청 */}
              <div className={commonCardClass}>
                <h3 className="text-xl font-semibold text-gray-800">
                  관리자 회원가입 신청
                </h3>
                <p className="mt-2 text-gray-600">
                  새로운 관리자의 회원가입 신청을 승인하거나 거절할 수 있습니다.
                </p>
                <button
                  onClick={() => router.push("/admin/requests")}
                  className="mt-4 w-full p-3 bg-indigo-600 text-white font-bold rounded-lg hover:bg-indigo-700 transition"
                >
                  바로가기
                </button>
              </div>
            </div>
          </div>
        );

      case "regular_admin": // 일반관리자
        return (
          <div className="space-y-8">
            {/* 개인 통계 섹션 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* 내가 처리한 수료증 수 */}
              <div
                className={`${commonCardClass} bg-gradient-to-r from-red-400 to-pink-500 text-white`}
              >
                <h3 className="text-sm font-semibold opacity-80">
                  이번 달 처리 건수
                </h3>
                <p className="mt-1 text-3xl font-bold">
                  {dashboardData.myProcessedCount}건
                </p>
                <p className="mt-2 text-sm opacity-90">
                  이번 달 내가 처리한 수료증
                </p>
              </div>
              {/* 금월 처리율 */}
              <div
                className={`${commonCardClass} bg-gradient-to-r from-yellow-400 to-yellow-500 text-white`}
              >
                <h3 className="text-sm font-semibold opacity-80">
                  금월 처리율
                </h3>
                <p className="mt-1 text-3xl font-bold">
                  {dashboardData.monthlyProcessingRate}%
                </p>
                <p className="mt-2 text-sm opacity-90">
                  전체 요청 대비 처리 비율
                </p>
              </div>
            </div>

            {/* 기능 버튼 섹션 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* 수료증 신청 (일반관리자만) */}
              <div className={commonCardClass}>
                <h3 className="text-xl font-semibold text-gray-800">
                  수료증 신청 처리
                </h3>
                <p className="mt-2 text-gray-600">
                  학생들의 수료증 발급 신청 목록을 확인하고 승인/거절할 수
                  있습니다.
                </p>
                <button
                  onClick={() => router.push("/certificates/requests")}
                  className="mt-4 w-full p-3 bg-indigo-600 text-white font-bold rounded-lg hover:bg-indigo-700 transition"
                >
                  바로가기
                </button>
              </div>
              {/* 내가 승인한 수료증 조회 */}
              <div className={commonCardClass}>
                <h3 className="text-xl font-semibold text-gray-800">
                  내가 승인한 수료증 조회
                </h3>
                <p className="mt-2 text-gray-600">
                  본인이 직접 승인한 수료증 목록만 조회할 수 있습니다.
                </p>
                <button
                  onClick={() => router.push("/certificates/my")}
                  className="mt-4 w-full p-3 bg-indigo-600 text-white font-bold rounded-lg hover:bg-indigo-700 transition"
                >
                  바로가기
                </button>
              </div>
            </div>
          </div>
        );

      default:
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
          {userRole === "super_admin"
            ? "슈퍼관리자 대시보드"
            : userRole === "regular_admin"
            ? "일반관리자 대시보드"
            : "관리자 대시보드"}
        </h1>
        <h3 className="text-center text-gray-600 mb-8">
          DID 수료증 관리 시스템
        </h3>

        {renderDashboard()}
      </div>
    </div>
  );
}
