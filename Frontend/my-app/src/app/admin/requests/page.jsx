"use client";

import React, { useState, useEffect } from "react";

export default function AdminRequestsPage() {
  const [pendingUsers, setPendingUsers] = useState([]);
  const [message, setMessage] = useState("");

  // 페이지 로드 시 localStorage에서 신청자 목록을 불러옵니다.
  useEffect(() => {
    try {
      const storedPendingUsers = localStorage.getItem("pendingUsers");
      if (storedPendingUsers) {
        setPendingUsers(JSON.parse(storedPendingUsers));
      }
    } catch (e) {
      console.error("로컬스토리지에서 신청자 목록을 불러오는 중 오류 발생:", e);
      setMessage("신청자 목록을 불러올 수 없습니다. 오류가 발생했습니다.");
    }
  }, []);

  // 회원가입 신청을 승인하는 함수
  const handleApprove = (userToApprove) => {
    try {
      // 1. pendingUsers 목록에서 해당 사용자를 제거합니다.
      const updatedPendingUsers = pendingUsers.filter(
        (user) => user.adminIdValue !== userToApprove.adminIdValue
      );
      localStorage.setItem("pendingUsers", JSON.stringify(updatedPendingUsers));
      setPendingUsers(updatedPendingUsers);

      // 2. users 목록에 grade를 2(일반관리자)로 변경하여 추가합니다.
      const users = JSON.parse(localStorage.getItem("users") || "[]");
      const approvedUser = { ...userToApprove, grade: 2 };
      users.push(approvedUser);
      localStorage.setItem("users", JSON.stringify(users));

      setMessage(
        `'${userToApprove.adminIdValue}' 님의 회원가입이 승인되었습니다.`
      );
    } catch (e) {
      console.error("회원가입 승인 중 오류 발생:", e);
      setMessage("회원가입 승인에 실패했습니다.");
    }
  };

  // 회원가입 신청을 거절하는 함수
  const handleReject = (userToReject) => {
    try {
      // pendingUsers 목록에서 해당 사용자를 제거합니다.
      const updatedPendingUsers = pendingUsers.filter(
        (user) => user.adminIdValue !== userToReject.adminIdValue
      );
      localStorage.setItem("pendingUsers", JSON.stringify(updatedPendingUsers));
      setPendingUsers(updatedPendingUsers);

      setMessage(
        `'${userToReject.adminIdValue}' 님의 회원가입이 거절되었습니다.`
      );
    } catch (e) {
      console.error("회원가입 거절 중 오류 발생:", e);
      setMessage("회원가입 거절에 실패했습니다.");
    }
  };

  return (
    <div className="container mx-auto p-8 bg-gray-50 min-h-screen">
      <div className="rounded-xl shadow-lg p-8">
        <h1 className="text-4xl font-extrabold text-center text-gray-800 mb-2">
          관리자 회원가입 신청 목록
        </h1>
        <h3 className="text-center text-gray-600 mb-8">
          새 관리자들의 신청을 승인하거나 거절할 수 있습니다.
        </h3>

        {message && (
          <div
            className="bg-blue-100 border-l-4 border-blue-500 text-blue-700 p-4 mb-6 rounded-md"
            role="alert"
          >
            <p>{message}</p>
          </div>
        )}

        {pendingUsers.length === 0 ? (
          <p className="text-center text-gray-500 mt-10 text-xl font-medium">
            현재 대기 중인 회원가입 신청이 없습니다.
          </p>
        ) : (
          <div className="space-y-6">
            {pendingUsers.map((user) => (
              <div
                key={user.adminIdValue}
                className="bg-white p-6 rounded-xl shadow-md flex flex-col md:flex-row justify-between items-center transition-transform transform hover:scale-105"
              >
                <div className="flex-1 text-gray-800 mb-4 md:mb-0">
                  <p>
                    <span className="font-semibold">아이디:</span>{" "}
                    {user.adminIdValue}
                  </p>
                  <p>
                    <span className="font-semibold">이름:</span>{" "}
                    {user.adminNameValue}
                  </p>
                  <p>
                    <span className="font-semibold">기업명:</span>{" "}
                    {user.adminCompanyValue}
                  </p>
                  <p>
                    <span className="font-semibold">전화번호:</span>{" "}
                    {user.adminPhoneNumberValue}
                  </p>
                </div>
                <div className="flex space-x-4">
                  <button
                    onClick={() => handleApprove(user)}
                    className="p-3 bg-green-600 text-white font-bold rounded-lg hover:bg-green-700 transition"
                  >
                    승인
                  </button>
                  <button
                    onClick={() => handleReject(user)}
                    className="p-3 bg-red-600 text-white font-bold rounded-lg hover:bg-red-700 transition"
                  >
                    거절
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
