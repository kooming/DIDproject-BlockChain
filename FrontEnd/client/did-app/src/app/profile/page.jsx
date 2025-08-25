"use client";
import { useEffect, useRef, useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import useModal from "@/hooks/useModal";
import Modal from "@/components/UI/Modal";
import Link from "next/link";

export default function ProfilePage() {
  const router = useRouter();
  const { isOpen, message, openModal, closeModal } = useModal();
  const [user, setUser] = useState(null);

  // 프로필, 주소, 생년월일
  const [profilePreview, setProfilePreview] = useState("/images/default-avatar.png");
  const [address, setAddress] = useState("");
  const [addressDetail, setAddressDetail] = useState("");
  const [birthday, setBirthday] = useState("");
  const detailRef = useRef(null);

  // 비밀번호 변경 관련
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newPasswordConfirm, setNewPasswordConfirm] = useState("");

  // 에러 메시지
  const [pwError, setPwError] = useState("");

  // 비밀번호 유효성
  const pwValid = useMemo(() => {
    if (!newPassword) return true;
    const regex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':",.<>/?]).{8,}$/;
    return regex.test(newPassword);
  }, [newPassword]);

  useEffect(() => {
    const scriptId = "daum-postcode-script";
    if (!document.getElementById(scriptId)) {
      const s = document.createElement("script");
      s.id = scriptId;
      s.src = "//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js";
      s.async = true;
      document.body.appendChild(s);
    }

    const currentUser = JSON.parse(localStorage.getItem("currentUser") || "null");
    if (!currentUser) {
      router.push("/");
      return;
    }

    setUser(currentUser);
    setAddress(currentUser.address || "");
    setAddressDetail(currentUser.addressDetail || "");
    setProfilePreview(currentUser.profile || "/images/default-avatar.png");
    setBirthday(currentUser.birthday || "");
  }, [router]);

  const handleChange = (e) => {
    setUser((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleProfileUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!/^image\/(png|jpeg|jpg|webp)$/.test(file.type)) {
      openModal("JPG, PNG, WEBP 형식의 이미지를 선택해 주세요.");
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      setProfilePreview(reader.result);
      setUser((prev) => ({ ...prev, profile: reader.result }));
    };
    reader.readAsDataURL(file);
  };

  const openPostcode = () => {
    if (!window.daum || !window.daum.Postcode) {
      openModal("주소 검색 스크립트가 아직 로드되지 않았습니다. 잠시 후 다시 시도해 주세요.");
      return;
    }
    new window.daum.Postcode({
      oncomplete: (data) => {
        const base = data.roadAddress || data.jibunAddress;
        setAddress(base);
        setTimeout(() => detailRef.current?.focus(), 0);
      },
    }).open();
  };

  const handleSave = () => {
    if (!user) return;

    const wantsPwChange = currentPassword || newPassword || newPasswordConfirm;

    // 일반 회원만 비밀번호 변경 로직 적용
    if (!user.isKakaoUser && wantsPwChange) {
      if (currentPassword !== user.password) {
        setPwError("현재 비밀번호가 올바르지 않습니다.");
        return;
      }
      if (!pwValid) {
        setPwError("새 비밀번호는 8자 이상이며, 문자/숫자/특수문자를 포함해야 합니다.");
        return;
      }
      if (newPassword !== newPasswordConfirm) {
        setPwError("새 비밀번호가 일치하지 않습니다.");
        return;
      }
    }
    setPwError("");

    const updatedUser = {
      ...user,
      password: !user.isKakaoUser
        ? wantsPwChange
          ? newPassword
          : user.password
        : user.password,
      address,
      addressDetail,
      profile: profilePreview,
      birthday,
    };

    localStorage.setItem("currentUser", JSON.stringify(updatedUser));

    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const userIndex = users.findIndex((u) => u.id === user.id);
    if (userIndex !== -1) {
      users[userIndex] = updatedUser;
      localStorage.setItem("users", JSON.stringify(users));
    }

    openModal("프로필이 수정되었습니다.");
  };

  const handleModalClose = () => {
    closeModal();
    if (message === "프로필이 수정되었습니다.") {
      router.push("/");
    }
  };

  if (!user) return <p className="text-center mt-10">로딩 중...</p>;

  return (
    <main className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-lg mx-auto bg-white rounded-xl shadow p-6">
        <Link href="/dashboard">
            <h2 className="text-2xl font-semibold mb-6">이전</h2>
        </Link>

        {/* 프로필 이미지 업로드 */}
        <div className="flex flex-col sm:flex-row items-center gap-4 mb-6">
          <img
            src={profilePreview}
            alt="프로필"
            className="w-24 h-24 rounded-full object-cover border border-gray-200"
          />
          <div className="flex flex-col items-center sm:items-start gap-2">
            <label className="cursor-pointer bg-gray-100 px-4 py-2 rounded-lg border hover:bg-gray-200 text-sm font-medium">
              프로필 사진 변경
              <input
                type="file"
                accept="image/*"
                onChange={handleProfileUpload}
                className="hidden"
              />
            </label>
            <p className="text-xs text-gray-500">JPG, PNG, WEBP 파일 권장 • 2MB 이하</p>
          </div>
        </div>

        {/* 닉네임 */}
        <label className="block text-sm font-medium mb-1">닉네임</label>
        <input
          type="text"
          name="name"
          value={user.name}
          onChange={handleChange}
          className="border rounded px-3 py-2 w-full mb-4"
        />

        {/* 생년월일 */}
        <label className="block text-sm font-medium mb-1">생년월일</label>
        <input
          type="date"
          value={birthday}
          onChange={(e) => setBirthday(e.target.value)}
          className="border rounded px-3 py-2 w-full mb-4"
        />

        {/* 비밀번호 변경 - 일반 회원만 */}
        {!user.isKakaoUser && (
          <div className="mb-4">
            <p className="text-sm font-medium mb-2">비밀번호 변경</p>
            <input
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              placeholder="현재 비밀번호"
              className={`border rounded px-3 py-2 w-full mb-2 ${
                pwError.includes("현재 비밀번호") ? "border-red-400" : ""
              }`}
            />
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="새 비밀번호 (문자/숫자/특수문자 포함 8자+)"
              className={`border rounded px-3 py-2 w-full mb-2 ${
                newPassword && !pwValid ? "border-red-400" : ""
              }`}
            />
            <input
              type="password"
              value={newPasswordConfirm}
              onChange={(e) => setNewPasswordConfirm(e.target.value)}
              placeholder="새 비밀번호 확인"
              className={`border rounded px-3 py-2 w-full ${
                pwError.includes("일치하지 않습니다") ? "border-red-400" : ""
              }`}
            />
            {pwError && <p className="mt-2 text-xs text-red-600">{pwError}</p>}
          </div>
        )}

        {/* 주소 */}
        <label className="block text-sm font-medium mb-1">주소</label>
        <div className="flex gap-2 mb-2">
          <input
            type="text"
            value={address}
            readOnly
            className="border rounded px-3 py-2 flex-1 bg-gray-100"
          />
          <button
            type="button"
            onClick={openPostcode}
            className="bg-gray-800 text-white px-4 rounded-lg hover:bg-gray-900"
          >
            검색
          </button>
        </div>
        <input
          type="text"
          ref={detailRef}
          value={addressDetail}
          onChange={(e) => setAddressDetail(e.target.value)}
          placeholder="상세 주소"
          className="border rounded px-3 py-2 w-full mb-4"
        />

        {/* DID */}
        <label className="block text-sm font-medium mb-1">DID</label>
        <input
          type="text"
          value={user.did || ""}
          readOnly
          className="border rounded px-3 py-2 w-full mb-4 bg-gray-100"
        />

        {/* 지갑 주소 */}
        <label className="block text-sm font-medium mb-1">지갑 주소</label>
        <input
          type="text"
          value={user.wallet || ""}
          readOnly
          className="border rounded px-3 py-2 w-full mb-6 bg-gray-100"
        />

        {/* 저장 버튼 */}
        <button
          onClick={handleSave}
          className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
        >
          저장하기
        </button>
      </div>

      {/* 모달 */}
      <Modal isOpen={isOpen} message={message} onClose={handleModalClose} />
    </main>
  );
}
