"use client";

import React, { useState } from "react";
import { faEye, faEyeSlash, faLock } from "@fortawesome/free-solid-svg-icons";

// Font Awesome 아이콘을 SVG로 직접 사용하기 위한 유틸리티 함수
// TypeScript 타입 정의가 제거되었습니다.
const getIconSvg = (icon, className) => {
  if (!icon || !icon.icon) {
    console.error("Invalid icon object provided to getIconSvg:", icon);
    return null;
  }
  const [width, height, , , svgPathData] = icon.icon;
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      data-prefix={icon.prefix}
      data-icon={icon.iconName}
      className={className}
      role="img"
      xmlns="http://www.w3.org/2000/svg"
      viewBox={`0 0 ${width} ${height}`}
    >
      <path fill="currentColor" d={svgPathData}></path>
    </svg>
  );
};

const PasswordInput = ({ id, label, placeholder, value, onChange, error }) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="mb-4">
      <label htmlFor={id} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <div className="mt-1 relative rounded-md shadow-sm">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          {getIconSvg(faLock, "h-5 w-5 text-gray-400")}
        </div>
        <input
          type={showPassword ? "text" : "password"}
          id={id}
          className="block w-full rounded-md border-gray-300 pl-10 pr-10 py-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        />
        <div
          className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
          onClick={togglePasswordVisibility}
        >
          {getIconSvg(
            showPassword ? faEyeSlash : faEye,
            "h-5 w-5 text-gray-400 hover:text-gray-600 transition"
          )}
        </div>
      </div>
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
};

export default PasswordInput;
