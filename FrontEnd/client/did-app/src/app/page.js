"use client";

import React, { useEffect, useRef, useState, useMemo } from "react";
import Header from "@/components/layout/Header.jsx";
import Footer from "@/components/layout/Footer.jsx";
import LoginForm from "@/components/auth/LoginForm";
import Image from "next/image";
import Link from "next/link";

export default function MainPage() {
  const sectionsRef = useRef([]);
  const [user, setUser] = useState(null); // 로컬 저장 사용자
  const isLoggedIn = useMemo(() => !!(user && user.id), [user]);
  const displayName = useMemo(
    () => user?.nickname ?? user?.name ?? "사용자",
    [user]
  );

  useEffect(() => {
    // 로그인 상태 로드 (클라이언트 전용)
    try {
      const raw = localStorage.getItem("currentUser");
      if (raw) setUser(JSON.parse(raw));
    } catch (e) {
      console.warn("failed to parse currentUser", e);
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const triggerPoint = window.innerHeight * 0.8;
      sectionsRef.current.forEach((sec) => {
        if (sec) {
          const rect = sec.getBoundingClientRect();
          if (rect.top < triggerPoint && rect.bottom > 0) {
            sec.classList.add("section-visible");
            sec.classList.remove("section-hidden");
          } else {
            sec.classList.remove("section-visible");
            sec.classList.add("section-hidden");
          }
        }
      });
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const sectionProps = (index, extraClass = "") => ({
    ref: (el) => (sectionsRef.current[index] = el),
    className: `snap-start min-h-screen flex items-center ${extraClass} section-hidden`,
  });

  return (
    <div className="min-h-screen bg-neutral-100 text-gray-900 flex flex-col animate-none">
      <Header />
      <main className="flex-1">
            {/* Hero */}
          <section {...sectionProps(0, "mx-auto max-w-[1500px]")}>
      <div className="flex flex-col md:flex-row gap-20 items-center flex-1">
        <div className="flex-1 pr-12">
          <p className="mt-4 text-2xl text-black font-semibold">당신의 신뢰를 봉인하는</p>
          <h1 className="text-7xl font-extrabold leading-tight text-rose-500">Sealium</h1>
          <p className="mt-5 text-lg text-gray-600">
            수료증 발급, 검증, 공유를 모두 하나의 DID 지갑에서 안전하게.
            블록체인 기반으로 신뢰성을 보장합니다.
          </p>
        </div>

        <div className="w-full max-w-lg animate-none">
          {/* 로그인 안 됐을 때만 LoginForm 표시 */}
          {!isLoggedIn && <LoginForm />}
        </div>
      </div>
    </section>


        {/* 수료증 발급 자동화 */}
        <section {...sectionProps(1, "bg-gray-50")}>
          <div className="mx-auto max-w-6xl px-4">
            <h2 className="text-3xl font-bold mb-4 text-rose-500">수료증 발급 · 관리 자동화</h2>
            <p className="text-lg text-gray-600">
              DID 인증 기반 시스템으로 과정 종료 시 자동으로 수료증이 발급됩니다.
              관리자는 운영 부담을 줄이고, 학습자는 즉시 성과를 확인할 수 있습니다.
            </p>
          </div>
        </section>

        {/* 초고속 검증 */}
        <section {...sectionProps(2, "bg-white")}>
          <div className="mx-auto max-w-6xl px-4">
            <h2 className="text-3xl font-bold mb-4 text-rose-500">1초 만에 끝나는 신뢰 검증</h2>
            <p className="text-lg text-gray-600">
              QR 코드 또는 링크 하나면 즉시 검증.
              DID 기반 데이터로 위조를 방지하고 불필요한 확인 절차를 없앱니다.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
