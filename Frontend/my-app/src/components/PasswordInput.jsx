"use client";

import React, { useState } from "react";
// FontAwesomeIcon 컴포넌트와 아이콘 정의를 가져옵니다.
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash, faLock } from "@fortawesome/free-solid-svg-icons";

// PasswordInput 컴포넌트
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
          {/* FontAwesomeIcon 컴포넌트를 사용하여 자물쇠 아이콘 렌더링 */}
          <FontAwesomeIcon icon={faLock} className="h-5 w-5 text-gray-400" />
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
          {/* 눈 아이콘도 FontAwesomeIcon 컴포넌트로 렌더링 */}
          <FontAwesomeIcon
            icon={showPassword ? faEyeSlash : faEye}
            className="h-5 w-5 text-gray-400 hover:text-gray-600 transition"
          />
        </div>
      </div>
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
};

export default PasswordInput;
