'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState, useMemo } from 'react';

export default function Header({
  user: userProp,
  displayName: displayNameProp,
  NotificationBell,
  notifications = [],
  setNotifications = () => {},
}) {
  const pathname = usePathname();

  // 어떤 헤더를 보여줄지 결정
  const isAppRoute = useMemo(() => {
    return (
      pathname?.startsWith('/dashboard') ||
      pathname?.startsWith('/certificates') ||
      pathname?.startsWith('/requests') ||
      pathname?.startsWith('/profile')
    );
  }, [pathname]);

  // ====== 공통: 프로필/드롭다운 상태 ======
  const [menuOpen, setMenuOpen] = useState(false);
  const closeTimerRef = useRef(null);
  const menuWrapperRef = useRef(null);
  const scheduleClose = () => (closeTimerRef.current = setTimeout(() => setMenuOpen(false), 120));
  const cancelClose = () => closeTimerRef.current && clearTimeout(closeTimerRef.current);
  const handleBlur = (e) => {
    if (!menuWrapperRef.current?.contains(e.relatedTarget)) setMenuOpen(false);
  };
  useEffect(() => () => cancelClose(), []);

  const isActive = (href) =>
    pathname === href || pathname?.startsWith(href + '/');

  // 랜딩에서 쓸 기본 유저 표기 (로그인 전)
  const user = userProp ?? (typeof window !== 'undefined'
    ? JSON.parse(localStorage.getItem('currentUser') || '{}')
    : {});
    const displayName = displayNameProp ??  user?.name ?? '사용자';

  // 로그인 유무 판단(로컬/프로프 기반)
  const isLoggedIn = !!(user && (user.id || user.name || user.profile));

  // ====== 1) 앱 내부 헤더 (대시보드용) ======
  if (isAppRoute) {
    const baseBtn = 'hover:text-rose-500 shrink-0 pb-1 transition-colors';
    const activeBtn = 'font-medium text-rose-500 border-b-2 border-rose-500';

    return (
      <header className="flex flex-wrap justify-between items-center bg-white shadow px-4 sm:px-6 py-3 gap-3">
        <div className="flex items-center gap-4 sm:gap-8 min-w-0">
          <Link href="/" className="shrink-0">
            <div className="text-lg font-bold text-rose-500">Sealium</div>
          </Link>

          <nav className="flex gap-4 sm:gap-6 text-xs sm:text-sm text-gray-700 overflow-x-auto">
            <Link href="/dashboard">
              <button className={`${baseBtn} ${isActive('/dashboard') ? activeBtn : ''}`}>
                대시보드
              </button>
            </Link>

            <Link href="/certificates/my">
              <button className={`${baseBtn} ${isActive('/certificates/my') ? activeBtn : ''}`}>
                내 수료증
              </button>
            </Link>

            <Link href="/certificates/request">
              <button className={`${baseBtn} ${isActive('/requests') ? activeBtn : ''}`}>
                요청 현황
              </button>
            </Link>
          </nav>
        </div>

        <div className="flex items-center gap-3 sm:gap-5">
          {NotificationBell ? (
            <NotificationBell
              notifications={notifications}
              setNotifications={setNotifications}
            />
          ) : null}

          <div
            ref={menuWrapperRef}
            className="relative"
            tabIndex={0}
            onMouseEnter={() => {
              cancelClose();
              setMenuOpen(true);
            }}
            onMouseLeave={scheduleClose}
            onFocus={() => setMenuOpen(true)}
            onBlur={handleBlur}
          >
            <button
              type="button"
              className="flex items-center gap-2 cursor-pointer hover:opacity-80 focus:outline-none"
              aria-haspopup="menu"
              aria-expanded={menuOpen}
            >
              {user?.profile ? (
                <img src={user.profile} alt="프로필" className="w-8 h-8 rounded-full object-cover" />
              ) : (
                <div className="w-8 h-8 rounded-full bg-gray-200" />
              )}
              <span className="text-sm text-gray-700 font-medium max-w-[10rem] truncate">
                {user.name}
              </span>
            </button>

            {menuOpen && (
              <div
                role="menu"
                className="absolute right-0 mt-2 w-44 bg-white border border-gray-100 rounded-xl shadow-lg ring-1 ring-gray-200 z-10 overflow-hidden"
              >
                <Link href="/profile">
                  <button className="block w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-rose-50 transition-colors">
                    내정보
                  </button>
                </Link>
                <button
                  role="menuitem"
                  tabIndex={0}
                  onClick={() => {
                    localStorage.removeItem('currentUser');
                    window.location.href = '/';
                  }}
                  className="block w-full text-left px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 transition-colors"
                >
                  로그아웃
                </button>
              </div>
            )}
          </div>
        </div>
      </header>
    );
  }

// ====== 2) 랜딩/마케팅 헤더 (메인 페이지) ======
return (
  <header className="flex justify-between items-center bg-white shadow px-6 py-3">
    <div className="flex items-center gap-8">
      <Link href="/" className="text-lg font-bold text-rose-500">
        Sealium
      </Link>
      <nav className="flex gap-6 text-sm text-gray-700">
        <Link href="#about" className="hover:text-rose-500">서비스 소개</Link>
        <Link href="#how" className="hover:text-rose-500">사용 방법</Link>
        <Link href="#contact" className="hover:text-rose-500">문의</Link>
      </nav>
    </div>

    {/*  우측: 로그인 상태면 '이미지+닉네임', 아니면 로그인 버튼 */}
    <div className="flex items-center gap-4">
      {isLoggedIn ? (
        <Link
          href="/dashboard"
          className="flex items-center gap-2 hover:opacity-80 transition-opacity"
          aria-label="대시보드로 이동"
        >
          {user?.profile ? (
            <img
              src={user.profile}
              alt="프로필"
              className="w-8 h-8 rounded-full object-cover"
            />
          ) : (
            <div className="w-8 h-8 rounded-full bg-gray-200" />
          )}
          <span className="text-sm text-gray-700 font-medium max-w-[10rem] truncate">
            {displayName}
          </span>
        </Link>
      ) : (
        <Link
          href="/login"
          className="px-4 py-2 bg-rose-500 text-white rounded-lg hover:bg-rose-600 transition-colors"
        >
          관리자 로그인
        </Link>
        )}
     </div>
    </header>
  );
}
