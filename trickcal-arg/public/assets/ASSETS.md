# 에셋 리스트 (코드 참조 기준 확정판)

코드가 실제로 참조하는 파일만 정리. 파일명·확장자 정확히 맞춰야 함.
전부 없어도 게임은 돌아감(fallback 처리됨) — 넣는 순간 그 자리에 표시됨.

## ✅ 완료 (실제 크롬 오프라인 에러 에셋 — 이미 반영됨)

| 경로 | 용도 |
|------|------|
| `chrome_dino.png` | 4층 크롬 오프라인 에러 공룡 아이콘 |

4층을 실제 크롬 "인터넷에 연결되지 않음" 화면 그대로 재구성함 (상단 오프라인 배너, ERR_INTERNET_DISCONNECTED,
"플레이하려면 공룡을 탭하세요" 문구, 주소창 ⓘ/🎙 아이콘 + 탭카운트 뱃지, "페이지 나중에 로드하기" 링크).
시작 주소창 텍스트는 `google.com/search?q=프린터`로 설정 — 플레이어가 딴짓하다 우연히 여기 들어온 느낌을 주는 디테일.
10초 후 커서가 조종해서 `trickcal-fan.pages.dev/archive/0527`로 이동하는 기존 메커니즘은 그대로 유지됨.

## ✅ 완료 (실제 디시/블로그 UI 에셋 — 이미 반영됨)

| 경로 | 용도 |
|------|------|
| `dc_logo.png` | 6층 디시 상단바 로고 |
| `dc_hamburger.png` | 상단바 햄버거 메뉴 |
| `dc_search.png` | 검색창 돋보기 아이콘 |
| `dc_concept_btn.png` | 추천(개념) 버튼 |
| `dc_disagree_btn.png` | 비추천 버튼 |
| `dc_action_row.png` | 실베추·스크랩·공유·신고 줄 (장식용) |
| `dc_bottom_nav.png` | 목록보기·글쓰기 하단 버튼 줄 (장식용) |
| `dc_write_icon.png` | 글쓰기 아이콘 (예비) |
| `blog_logo.png` | 1층 블로그 상단바 로고 |
| `blog_list_icon.png` | 블로그 제목 옆 리스트 아이콘 |
| `blog_search.png` | 상단바 검색 아이콘 |
| `blog_hamburger.png` | 상단바 햄버거 메뉴 |
| `blog_more_dots.png` | 이웃추가 옆 더보기 아이콘 |
| `reaction_heart.png` | 좋아요 반응 아이콘 |
| `reaction_comment.png` | 댓글 반응 아이콘 |
| `reaction_share.png` | 공유 반응 아이콘 |

전부 유저가 올린 실제 디시/블로그 UI 레퍼런스에서 배경(체커보드) 제거 후 개별 추출. onerror 폴백 있어서 파일 없어도 안 깨짐.

## ✅ 완료 (실제 치지직 UI 에셋 — 이미 반영됨)

| 경로 | 용도 |
|------|------|
| `chzzk/logo.png` | 2층 상단바 CHZZK 워드마크 로고 |
| `chzzk/icon_menu.png` | 상단바 햄버거 메뉴 (모바일에선 숨김) |
| `chzzk/icon_search.png` | 검색창 돋보기 아이콘 |
| `chzzk/badge_event.png` | 상단바 이벤트 배지 (모바일에선 숨김) |
| `chzzk/icon_ring.png` | 상단바 알림 설정 버튼 |
| `chzzk/icon_verified.png` | 스트리머 이름 옆 인증 뱃지 |
| `chzzk/icon_heart.png` | 좋아요 버튼 (클릭시 흑백↔컬러 토글) |
| `chzzk/icon_cheese.png` | 치즈 후원 버튼 아이콘 |
| `chzzk/icon_gift.png` | 영상 후원 버튼 아이콘 |
| `chzzk/icon_chat.png` | 채팅창 헤더 말풍선 아이콘 |
| `chzzk/icon_more.png` | 채팅창 설정 / 스트리머 정보 더보기 버튼 |
| `chzzk/icon_close.png` | 채팅창 헤더 닫기 아이콘 (장식용) |
| `chzzk/icon_zap.png` | 영상 우하단 워터마크 |

전부 실제 유저가 올린 치지직 UI 레퍼런스에서 배경(체커보드) 제거 후 개별 추출한 것.
모든 요소에 onerror 폴백 있어서 파일이 없어도 안 깨짐(이모지/텍스트로 대체).

## ★ 필수 (임팩트 순)

| # | 경로 | 용도 | 권장 규격 |
|---|------|------|----------|
| 1 | `espi/espi.png` | 10층 마지막 에스피 등장. **최우선.** | 투명 PNG, 세로 600px 이상 |
| 2 | `chzzk/stream.mp4` | 2층 가짜 스트리밍 화면 (추리 팬게임 플레이 영상처럼) | 16:9, 20~30초 루프, 소리 없어도 됨 (muted 재생) |
| 3 | `blog/screenshot1.webp` | 1·3층 블로그 본문 이미지 1 — "게임 타이틀 화면" | 16:9, 800px 폭 내외 |
| 4 | `blog/screenshot2.webp` | 1·3층 블로그 본문 이미지 2 — "심문 화면" | 16:9, 800px 폭 내외 |
| 5 | `blog/screenshot2_alt.webp` | **1층 루프 3회차부터 2번 이미지가 이걸로 몰래 교체됨.** screenshot2와 언뜻 같아 보이는데 뭔가 이상한 버전 (캐릭터 위치가 다르거나, 없어야 할 실루엣이 있거나) | screenshot2와 동일 규격 |

## 보조 (분위기)

| # | 경로 | 용도 | 권장 규격 |
|---|------|------|----------|
| 6 | `blog/avatar.png` | 1층 블로그 프로필 (trickcal_fan) | 정사각 200px, 원형 크롭됨 |
| 7 | `devlog/avatar.png` | 5층 개발일지 프로필 (같은 인물 느낌이면 좋음) | 정사각 200px |
| 8 | `chzzk/streamer_avatar.png` | 2층 스트리머 프로필 (espi_watcher) | 정사각 200px, 원형 크롭됨 |
| 9 | `chzzk/chat_profiles/1.png` ~ `10.png` | 2층 채팅 유저 프로필 (랜덤 표시) | 정사각 100px, **파일명 1~10 숫자 고정** |
| 10 | `chrome/favicon.png` | 4층 브라우저 탭 파비콘 | 32px 정사각 |
| 11 | `chrome/dino.png` | 4층 404 공룡 (없으면 🦕 이모지로 대체됨) | 투명 PNG, 폭 120px |

## 제작 팁

- **espi.png** — 마지막 임팩트. 어두운 배경(검정)에 뜨므로 투명 배경 필수. 원작 에스피의 몽환/꿈 분위기.
- **stream.mp4** — 추리 팬게임을 "누가 플레이 중인 것처럼" 보여야 함. 추리 팬게임 레포의 타이틀/심문 화면 녹화가 최고. 없으면 스크린샷 여러 장을 슬라이드로 이어붙인 영상도 OK. `autoplay loop muted`라 소리 불필요.
- **screenshot2_alt** — 이 게임에서 가장 8번출구다운 에셋. 플레이어가 루프 돌다가 "어? 이 이미지 아까랑 다른데?" 하는 순간을 만드는 용도. 차이는 미묘하게: 캐릭터 눈 방향, 배경에 없던 그림자, 대사창 텍스트 한 글자.
- **chat_profiles** — 대충 단색 원 + 이니셜이어도 됨. 10장 다 다르게만.
- webp 변환: 이미지 뽑은 뒤 squoosh.app (무료 웹툴)에서 변환 가능.

## 넣는 법
이 폴더(public/assets/) 하위 경로 그대로 파일 넣고 커밋 → 자동 반영.
