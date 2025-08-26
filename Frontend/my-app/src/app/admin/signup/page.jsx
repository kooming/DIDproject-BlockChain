"use client";

import React, { useState } from "react";
import PasswordInput from "../../../components/PasswordInput.jsx";
import InputWithIcon from "../../../components/InputWithIcon.jsx";
import {
  faBuilding,
  faPhone,
  faSignature,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/navigation";
import useInput from "../../hooks/useInput.jsx";
import useAuth from "../../hooks/useAuth.jsx";
import ReusableAlert from "@/src/components/ReusableAlert.js";

export default function AdminSignUpPage() {
  const adminInputID = useInput("");
  const adminInputPW = useInput("");
  const adminPWConfirm = useInput("");
  const adminName = useInput("");
  const adminCompany = useInput("");
  const adminPhoneNumber = useInput("");

  const router = useRouter();

  const [idError, setIdError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [passwordConfirmError, setPasswordConfirmError] = useState("");
  const [nameError, setNameError] = useState("");
  const [companyError, setCompanyError] = useState("");
  const [phoneNumberError, setPhoneNumberError] = useState("");
  const [duplicateCheck, setDuplicateCheck] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [alert, setAlert] = useState("");

  const passwordRegex =
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
  const idRegex = /^[a-zA-Z0-9]+$/;
  const nameRegex = /^[a-zA-Z가-힣]+$/;
  const companyRegex = /^[가-힣a-zA-Z0-9\s()&.-]+$/;
  const numRegex = /^[0-9]+$/;

  const handleDuplicateCheck = () => {
    setIdError("");
    setSuccessMessage("");
    setDuplicateCheck(false);

    const adminIdValue = adminInputID.value;
    if (!adminIdValue) {
      setIdError("아이디를 입력해주세요.");
      return;
    }

    if (!idRegex.test(adminIdValue)) {
      setIdError("영어와 숫자만 입력해주십시오.");
      return;
    }

    // 로컬스토리지에 있는 users와 pendingUsers 모두에서 중복 확인
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const pendingUsers = JSON.parse(
      localStorage.getItem("pendingUsers") || "[]"
    );
    const isDuplicate =
      users.some((user) => user.adminIdValue === adminIdValue) ||
      pendingUsers.some((user) => user.adminIdValue === adminIdValue);

    if (isDuplicate) {
      setIdError("이미 존재하는 아이디입니다.");
    } else {
      setSuccessMessage("사용 가능한 아이디입니다.");
      setDuplicateCheck(true);
    }
  };

  const handleSignUp = async () => {
    // 모든 에러 메시지 초기화
    setIdError("");
    setPasswordError("");
    setPasswordConfirmError("");
    setNameError("");
    setCompanyError("");
    setPhoneNumberError("");

    // 유효성 검사
    let isValid = true;
    const adminIdValue = adminInputID.value;
    const adminPWValue = adminInputPW.value;
    const adminPWConfirmValue = adminPWConfirm.value;
    const adminNameValue = adminName.value;
    const adminCompanyValue = adminCompany.value;
    const adminPhoneNumberValue = adminPhoneNumber.value;

    if (!adminIdValue || !duplicateCheck) {
      setIdError("아이디를 입력하고 중복 확인을 해주세요.");
      isValid = false;
    }

    if (!passwordRegex.test(adminPWValue)) {
      setPasswordError("영문, 숫자, 특수문자를 포함한 8자 이상이어야 합니다.");
      isValid = false;
    }

    if (!adminPWConfirmValue) {
      setPasswordConfirmError("비밀번호 확인을 입력해주세요.");
      isValid = false;
    } else if (adminPWValue !== adminPWConfirmValue) {
      setPasswordConfirmError("비밀번호가 일치하지 않습니다.");
      isValid = false;
    }

    if (!nameRegex.test(adminNameValue)) {
      setNameError("이름에는 한글만 입력 가능합니다.");
      isValid = false;
    }

    if (!companyRegex.test(adminCompanyValue)) {
      setCompanyError(
        "기업명은 한글, 영문, 숫자, 공백, 일부 특수문자(&, -, ., ())만 가능합니다."
      );
      isValid = false;
    }

    if (!numRegex.test(adminPhoneNumberValue)) {
      setPhoneNumberError("전화번호는 숫자만 입력 가능합니다.");
      isValid = false;
    }

    if (!isValid) {
      return;
    }
    const hashedPassword = await useAuth(adminPWValue);

    // 로컬스토리지에 대기 중인 데이터로 저장
    const newPendingUser = {
      adminIdValue,
      adminPWValue: hashedPassword,
      adminNameValue,
      adminCompanyValue,
      adminPhoneNumberValue,
      grade: 0, // '신청 대기' 상태를 의미하는 grade 0으로 설정
    };

    const pendingUsers = JSON.parse(
      localStorage.getItem("pendingUsers") || "[]"
    );
    pendingUsers.push(newPendingUser);
    localStorage.setItem("pendingUsers", JSON.stringify(pendingUsers));

    setAlert({
      message:
        "회원가입 신청이 완료되었습니다. 관리자의 승인 후에 서비스를 이용하실 수 있습니다.",
      type: "success",
    });
    setTimeout(() => {
      setAlert({ message: "", type: "" });
      router.push("/admin"); // 신청 후 로그인 페이지로 리디렉션
    }, 3000);
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
          관리자 회원가입
        </h1>
        <h3 className="text-center mb-5">DID 수료증 관리 시스템</h3>

        <div className="relative">
          <InputWithIcon
            id="admin_id"
            label="관리자 아이디 *"
            icon={faUser}
            placeholder="아이디를 입력하세요"
            {...adminInputID}
            error={idError}
          />
          <button
            onClick={handleDuplicateCheck}
            className="absolute top-1/2 transform -translate-y-1/2 right-0 mt-2 px-4 py-2 bg-gray-200 text-gray-800 text-sm font-medium rounded-md hover:bg-gray-300 transition"
          >
            중복확인
          </button>
        </div>
        {successMessage && (
          <p className="text-green-500 text-sm mt-1 mb-4">{successMessage}</p>
        )}

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
          id="admin_name"
          label="관리자 이름 *"
          icon={faSignature}
          placeholder="이름을 입력하세요"
          {...adminName}
          error={nameError}
        />
        <InputWithIcon
          id="admin_company"
          label="기업명 *"
          icon={faBuilding}
          placeholder="기업을 입력해주세요"
          {...adminCompany}
          error={companyError}
        />
        <InputWithIcon
          id="admin_PhoneNumber"
          label="전화번호 *"
          icon={faPhone}
          placeholder="전화번호는 (-) 없이 입력해 주세요."
          {...adminPhoneNumber}
          error={phoneNumberError}
        />

        <div className="flex justify-center mt-6">
          <button
            onClick={handleSignUp}
            className="w-full p-3 bg-indigo-600 text-white font-bold rounded-lg hover:bg-indigo-700 transition text-center"
          >
            회원가입 신청
          </button>
        </div>
      </div>
    </div>
  );
}
