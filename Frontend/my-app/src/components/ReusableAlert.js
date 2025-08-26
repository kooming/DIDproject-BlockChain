"use client";

import React from "react";

// 재사용 가능한 커스텀 알림 컴포넌트
const ReusableAlert = ({ message, type, onClose }) => {
  const bgColor = type === "success" ? "bg-green-500" : "bg-red-500";

  if (!message) return null;

  return (
    <div
      className={`fixed top-5 left-1/2 transform -translate-x-1/2 w-80 p-4 text-white rounded-lg shadow-lg ${bgColor} z-50`}
    >
      <div className="flex justify-between items-center">
        <p className="text-sm font-medium">{message}</p>
      </div>
    </div>
  );
};

export default ReusableAlert;
