import React, { useState, useEffect } from "react";
import { useReferralPostControllerList } from "@/api/generated/endpoints/referral/referral";
import ConsentRequestModal from "@/components/common/ConsentRequestModal";
import ReferralPostModal from "@/components/common/ReferralPostModal";
import ReferralPostDetailModal from "@/components/common/ReferralPostDetailModal";
import type { ReferralPostListResponse } from "@/api/referralResponses";

const PAGE_SIZE = 10;

const formatDday = (expiresAt?: string): string => {
  if (!expiresAt) return "—";
  const diffDays = Math.ceil(
    (new Date(expiresAt).getTime() - Date.now()) / (1000 * 60 * 60 * 24),
  );
  if (diffDays < 0) return "만료";
  if (diffDays === 0) return "오늘 만료";
  return `D-${diffDays}`;
};

const ReferralPage: React.FC = () => {
  // 페이지 진입 시 스크롤 최상단 리셋
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const LEVELS = ["전체", "사원", "대리", "과장", "차장", "부장"] as const;
  const [selectedLevel, setSelectedLevel] =
    useState<(typeof LEVELS)[number]>("전체");
  const [keyword, setKeyword] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const [isConsentModalOpen, setConsentModalOpen] = useState(false);
  const [isPostModalOpen, setPostModalOpen] = useState(false);
  const [detailPostId, setDetailPostId] = useState<string | null>(null);

  const {
    data: postListData,
    isPending: isPostListPending,
    isError: isPostListError,
    refetch: refetchPostList,
  } = useReferralPostControllerList({
    keyword: keyword.trim() || undefined,
    position: selectedLevel === "전체" ? undefined : selectedLevel,
    page: currentPage,
    size: PAGE_SIZE,
  });
  const postList = postListData as unknown as
    ReferralPostListResponse | undefined;
  const talentList = postList?.items ?? [];
  const totalPublishedCount = postList?.total ?? 0;
  const totalPages = Math.max(1, Math.ceil((postList?.total ?? 0) / PAGE_SIZE));

  return (
    <>
      {/* 레이아웃 셸의 아웃렛 통로를 타고 꽂히는 구조이므로,
       고정 사이드바 구역을 생략하고 주 서브 대시보드 스크롤 컨테이너만 선언합니다.
      */}
      <main className="flex min-h-screen flex-1 flex-col">
        {/* 상단 툴바 헤더 */}
        <header className="sticky top-0 z-40 flex h-17 items-center border-b border-gray-200 bg-white px-6">
          <div className="flex items-baseline gap-3 text-left">
            <h1 className="text-text1 text-base font-black tracking-tight">
              Referral
            </h1>
            <span className="text-xs font-semibold text-gray-400">
              인재 추천 관리
            </span>
          </div>
        </header>

        {/* 내부 데이터 패널 대시보드 본체 */}
        <div className="mx-auto w-full max-w-[1250px] flex-1 space-y-6 p-6">
          <div>
            <h2 className="text-text1 text-xl font-black">인재 추천 게시판</h2>
            <p className="text-2xs mt-1 text-gray-400">
              공개 중인 추천 인재{" "}
              <span className="text-brand font-bold">
                {totalPublishedCount}명
              </span>
            </p>
          </div>

          <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-3">
            <div className="space-y-5 lg:col-span-2">
              <div className="space-y-4 rounded-3xl border border-gray-200 bg-white p-5 shadow-sm">
                <div className="relative">
                  <i className="ti ti-search absolute top-1/2 left-4 -translate-y-1/2 text-sm text-gray-400" />
                  <input
                    type="text"
                    value={keyword}
                    onChange={(e) => {
                      setKeyword(e.target.value);
                      setCurrentPage(1);
                    }}
                    placeholder="제목, 추천 사유로 검색"
                    className="focus:border-brand w-full rounded-xl border border-gray-200 py-2.5 pr-4 pl-10 text-xs transition-all outline-none placeholder:text-gray-300"
                  />
                </div>

                <div className="text-2xs flex flex-wrap gap-2 font-bold">
                  {LEVELS.map((level) => (
                    <button
                      key={level}
                      type="button"
                      onClick={() => {
                        setSelectedLevel(level);
                        setCurrentPage(1);
                      }}
                      className={`rounded-full px-4 py-2 transition-all active:scale-95 ${
                        selectedLevel === level
                          ? "bg-brand text-white shadow-sm"
                          : "border border-gray-200 text-gray-500 hover:bg-gray-50"
                      }`}
                    >
                      {level}
                    </button>
                  ))}
                </div>
              </div>

              <div className="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm">
                {isPostListPending ? (
                  <p className="py-10 text-center text-xs font-bold text-gray-400">
                    불러오는 중...
                  </p>
                ) : isPostListError ? (
                  <div className="space-y-3 py-10 text-center">
                    <p className="text-xs font-bold text-red-500">
                      게시물 목록을 불러오지 못했어요.
                    </p>
                    <button
                      type="button"
                      onClick={() => refetchPostList()}
                      className="text-brand text-xs font-bold hover:opacity-80"
                    >
                      다시 시도
                    </button>
                  </div>
                ) : talentList.length === 0 ? (
                  <p className="py-10 text-center text-xs font-bold text-gray-400">
                    공개 중인 추천 인재가 없어요.
                  </p>
                ) : (
                  <>
                    <div className="overflow-x-auto">
                      <table className="w-full border-collapse text-left">
                        <thead>
                          <tr className="text-2xs border-b border-gray-100 font-bold tracking-wider text-gray-400 uppercase">
                            <th className="pb-3 font-semibold">인재</th>
                            <th className="pb-3 font-semibold">추천 제목</th>
                            <th className="pb-3 font-semibold">게시 만료</th>
                            <th className="pb-3 text-right font-semibold">
                              액션
                            </th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50 text-xs">
                          {talentList.map((talent) => (
                            <tr
                              key={talent.postId}
                              className="transition-colors hover:bg-gray-50/50"
                            >
                              <td className="py-3.5">
                                <span className="text-text1 font-black">
                                  {talent.displayName}
                                </span>
                                <span className="text-text2 ml-1 font-bold">
                                  {talent.position}
                                </span>
                                <p className="text-2xs mt-0.5 text-gray-400">
                                  {talent.companyName}
                                </p>
                              </td>
                              <td className="text-text1 py-3.5 font-bold">
                                {talent.title}
                              </td>
                              <td className="text-text2 py-3.5">
                                {formatDday(talent.expiresAt)}
                              </td>
                              <td className="py-3.5 text-right">
                                <button
                                  type="button"
                                  onClick={() => setDetailPostId(talent.postId)}
                                  className="text-text2 text-2xs rounded-lg border border-gray-200 px-3 py-1.5 font-bold transition-all hover:bg-gray-50 active:scale-95"
                                >
                                  상세 조회
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                    {totalPages > 1 && (
                      <div className="mt-5 flex justify-center gap-1.5">
                        {Array.from(
                          { length: totalPages },
                          (_, i) => i + 1,
                        ).map((page) => (
                          <button
                            key={page}
                            type="button"
                            onClick={() => setCurrentPage(page)}
                            className={`text-2xs flex h-9 w-9 items-center justify-center rounded-lg font-bold transition-all active:scale-95 ${
                              currentPage === page
                                ? "bg-brand text-white"
                                : "border border-gray-200 text-gray-500 hover:bg-gray-50"
                            }`}
                          >
                            {page}
                          </button>
                        ))}
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>

            <div className="space-y-6">
              <div className="rounded-3xl border border-gray-200 bg-white p-5 text-left shadow-sm">
                <h3 className="text-text1 text-sm font-black">
                  우리 회사 인재 추천하기
                </h3>
                <p className="text-2xs mt-2 leading-relaxed text-gray-400">
                  게시 동의를 받은 직원을 골라 추천 사유와 이력서를 올리면 바로
                  공개됩니다.
                </p>
                <div className="mt-4 space-y-2">
                  <button
                    type="button"
                    onClick={() => setConsentModalOpen(true)}
                    className="text-text2 flex w-full items-center justify-center gap-1.5 rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-xs font-bold shadow-sm transition-all hover:bg-gray-50 active:scale-95"
                  >
                    동의 링크 발송
                  </button>
                  <button
                    type="button"
                    onClick={() => setPostModalOpen(true)}
                    className="bg-brand shadow-brand/10 hover:bg-brand-dark flex w-full items-center justify-center gap-1.5 rounded-xl px-4 py-2.5 text-xs font-bold text-white shadow-md transition-all active:scale-95"
                  >
                    <i className="ti ti-plus text-sm" />
                    인재 게시하기
                  </button>
                </div>
              </div>

              <div className="rounded-3xl border border-gray-200 bg-white p-5 text-left shadow-sm">
                <h3 className="text-text1 mb-4 text-sm font-black">
                  게시 절차
                </h3>
                <div className="relative space-y-5 before:absolute before:top-2 before:bottom-2 before:left-[11px] before:w-[1px] before:bg-gray-100">
                  {[
                    {
                      step: 1,
                      title: "직원 동의 받기",
                      desc: "추천 게시에 동의한 직원만 게시할 수 있어요.",
                    },
                    {
                      step: 2,
                      title: "추천 글 작성",
                      desc: "제목, 추천 사유(200자), 이력서, 이름 공개 방식, 게시 기간을 정해요.",
                    },
                    {
                      step: 3,
                      title: "게시판 공개",
                      desc: "인증된 기업의 대표와 인사팀장이 열람할 수 있어요.",
                    },
                  ].map((proc) => (
                    <div
                      key={proc.step}
                      className="relative z-10 flex items-start gap-3"
                    >
                      <div className="bg-brand-light text-brand text-2xs flex h-5 w-5 shrink-0 items-center justify-center rounded-md font-black">
                        {proc.step}
                      </div>
                      <div>
                        <h4 className="text-text1 text-xs font-black">
                          {proc.title}
                        </h4>
                        <p className="text-2xs mt-0.5 leading-relaxed text-gray-400">
                          {proc.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <ConsentRequestModal
        open={isConsentModalOpen}
        onClose={() => setConsentModalOpen(false)}
      />
      <ReferralPostModal
        open={isPostModalOpen}
        onClose={() => setPostModalOpen(false)}
      />
      <ReferralPostDetailModal
        postId={detailPostId}
        onClose={() => setDetailPostId(null)}
        onChanged={() => refetchPostList()}
      />
    </>
  );
};

export default ReferralPage;
