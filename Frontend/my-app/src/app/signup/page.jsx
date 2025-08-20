"use client";

import React, { useState } from "react";
import PasswordInput from "../../components/PasswordInput.jsx";
import InputWithIcon from "../../components/InputWithIcon.jsx";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/navigation";
import useInput from "../hooks/useInput.jsx";

export default function AdminSignUpPage() {
  // 1. input 상태 관리
  const adminInputID = useInput("");
  const adminInputPW = useInput("");
  const adminPWConfirm = useInput("");
  const adminName = useInput("");
  const router = useRouter();

  // 2. 유효성 검사 및 중복 확인 상태 관리
  const [idError, setIdError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [passwordConfirmError, setPasswordConfirmError] = useState("");
  const [duplicateCheck, setDuplicateCheck] = useState(false);

  // 영문, 숫자, 특수문자를 각각 최소 1개씩 포함하며, 전체 길이는 8자 이상
  const passwordRegex =
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;

  // 5. 중복 확인 함수 (로컬스토리지 시뮬레이션)
  const handleDuplicateCheck = () => {
    if (!adminId) {
      setIdError("아이디를 입력해주세요.");
      setDuplicateCheck(false);
      return;
    }

    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const isDuplicate = users.some((user) => user.adminId === adminId);

    if (isDuplicate) {
      setIdError("이미 존재하는 아이디입니다.");
      setDuplicateCheck(false);
    } else {
      setIdError("");
      setDuplicateCheck(true);
      alert("사용 가능한 아이디입니다.");
    }
  };

  // 6. 회원가입 버튼 클릭 핸들러
  const handleSignUp = () => {
    // 6-1. 유효성 검사
    let isValid = true;
    if (!adminId || !duplicateCheck) {
      setIdError("아이디 중복 확인이 필요합니다.");
      isValid = false;
    }
    if (!passwordRegex.test(password)) {
      setPasswordError("영문, 숫자, 특수문자를 포함한 8자 이상이어야 합니다.");
      isValid = false;
    }
    if (password !== passwordConfirm) {
      setPasswordConfirmError("비밀번호가 일치하지 않습니다.");
      isValid = false;
    }

    if (!isValid) {
      return;
    }

    // 6-2. 로컬스토리지에 데이터 저장
    const newUser = {
      id: adminInputID.value,
      password,
    };
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));

    alert("회원가입이 완료되었습니다.");

    // 6-3. 입력 필드 초기화
    setAdminId("");
    setPassword("");
    setPasswordConfirm("");
    setDuplicateCheck(false);
    router.push("./adminmain");
  };

  return (
    <div className="container mx-auto p-8 bg-gray-50 min-h-screen">
      <div className="rounded-xl shadow-lg p-8">
        <h1 className="text-4xl font-extrabold text-center text-gray-800 mb-2">
          관리자 회원가입
        </h1>
        <h3 className="text-center mb-5">DID 수료증 관리 시스템</h3>

        <button
          onClick={handleDuplicateCheck}
          className=" ml-330 px-4 py-2 bg-gray-200 text-gray-800 text-sm font-medium rounded-md hover:bg-gray-300 transition"
        >
          중복확인
        </button>

        <InputWithIcon
          id="admin_id"
          label="관리자 아이디 *"
          icon={faUser}
          placeholder="아이디를 입력하세요"
          {...adminInputID}
          error={idError}
        />

        <PasswordInput
          id="password"
          label="비밀번호 *"
          placeholder="영문, 숫자 ,특수문자 포함 8자 이상 입력해주세요"
          {...adminInputPW}
          error={passwordError}
        />

        <PasswordInput
          id="password-confirm"
          label="비밀번호 확인 *"
          placeholder="비밀번호를 다시 입력하세요"
          {...adminPWConfirm}
          error={passwordConfirmError}
        />
        <InputWithIcon
          id="admin_id"
          label="관리자 이름 *"
          icon={faUser}
          placeholder="이름을 입력하세요"
          {...adminName}
          error={idError}
        />
        <InputWithIcon
          id="admin_id"
          label="기업명 *"
          icon={faUser}
          placeholder="기업을 입력해주세요"
          value={adminId}
          onChange={handleAdminIdChange}
          error={idError}
        />
        <InputWithIcon
          id="admin_id"
          label="관리자 아이디 *"
          icon={faUser}
          placeholder="아이디를 입력하세요"
          value={adminId}
          onChange={handleAdminIdChange}
          error={idError}
        />
        <InputWithIcon
          id="admin_id"
          label="관리자 아이디 *"
          icon={faUser}
          placeholder="아이디를 입력하세요"
          value={adminId}
          onChange={handleAdminIdChange}
          error={idError}
        />

        <div className="flex justify-center">
          <button
            onClick={handleSignUp}
            className="mt-6 w-full p-3 bg-indigo-600 text-white font-bold rounded-lg hover:bg-indigo-700 transition text-center"
          >
            회원가입
          </button>
        </div>
      </div>
    </div>
  );
}
