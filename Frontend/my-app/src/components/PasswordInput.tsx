// src/components/PasswordInput.tsx
"use client";

import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash, faLock } from "@fortawesome/free-solid-svg-icons";

const PasswordInput = ({ id, label, placeholder }) => {
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
        {/* 왼쪽에 자물쇠 아이콘 */}
        <div className="absolute inset-y-0 left-0  flex items-center pointer-events-none">
          <FontAwesomeIcon icon={faLock} className="h-5 w-5 text-gray-400" />
        </div>
        <div>
          <input
            type={showPassword ? "text" : "password"}
            id={id}
            className="relative pl-5 w-70"
            placeholder={placeholder}
          />
          {/* 오른쪽에 눈 아이콘 (클릭 가능) */}
          <div
            className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
            onClick={togglePasswordVisibility}
          >
            <FontAwesomeIcon
              icon={showPassword ? faEyeSlash : faEye}
              className="h-5 w-5 text-gray-400"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PasswordInput;
