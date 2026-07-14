// ─── 루프 카운터 ───
export function getLoop(layer) {
  return parseInt(localStorage.getItem(`arg_loop_${layer}`) || '0');
}
export function addLoop(layer) {
  const n = getLoop(layer) + 1;
  localStorage.setItem(`arg_loop_${layer}`, n);
  return n;
}
export function resetLoop(layer) {
  localStorage.removeItem(`arg_loop_${layer}`);
}

// ─── 공용 HTML 이스케이프 (유저 입력을 innerHTML에 넣을 때 항상 통과) ───
export const escapeHtml = (s) =>
  String(s).replace(/[&<>"']/g, ch => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;',
  }[ch]));

// ─── 행동 로그 ───
export function recordAction(action) {
  const logs = getLogs();
  const now = new Date();
  const time = `${now.getHours()}:${String(now.getMinutes()).padStart(2,'0')}`;
  logs.push({ time, action });
  localStorage.setItem('arg_logs', JSON.stringify(logs));
}
export function getLogs() {
  try { return JSON.parse(localStorage.getItem('arg_logs') || '[]'); }
  catch { return []; }
}
export const reinterpret = {
  '1층 접속':           '들어왔음',
  '플레이 버튼 클릭':   '선택했음',
  '뒤로가기 시도':      '도망치려 했음',
  '4층 진입':           '붙잡혀 있었음',
  '5층 일지 열람':      '전부 읽어버렸음',
  '6층 닉네임 확인':    '자기 이름 찾고 있었음',
};

// ─── 치지직 채팅 ───
export function getChatMessages(loop) {
  const base = [
    { user: '에르핀최고',    text: 'ㅋㅋㅋ에르핀 또 간식',              delay: 1200 },
    { user: '트릭컬덕후',    text: '이거 진짜 추리게임임?',              delay: 2800 },
    { user: 'spooky_cat',    text: '마카샤 나왔다!!!',                    delay: 4100 },
    { user: 'ㅇㅇ',          text: '어 근데 이 게임 뭔가 이상하지 않음?', delay: 6500 },
    { user: '죠안팬',        text: '죠안 언제 나옴',                      delay: 8200 },
    { user: 'trickcal_love', text: 'BGM 너무 좋다',                       delay: 9700 },
    { user: 'ㅇㅇ',          text: '어 진짜 뭔가 이상한데',               delay: 12000 },
    { user: 'espi_watcher',  text: '에스피 나오면 알려줘',                delay: 14500 },
    { user: '트릭컬덕후',    text: '심문 파트 개재밌다',                  delay: 16800 },
    { user: '',              text: '너도 보고 있지',                      delay: 20000 }, // 정답
  ];
  // 루프마다 이상한 채팅 추가
  if (loop >= 2) base.splice(5, 0, { user: '', text: `${loop}번째야`, delay: 11000 });
  if (loop >= 3) base.splice(2, 0, { user: '', text: '왜 또 왔어', delay: 3500 });
  if (loop >= 4) base.push({ user: '', text: '빨리 찾아', delay: 22000 });
  return base;
}

// ─── 디시 닉네임 ───
export const nicknames = [
  "ㅇㅇ",
  "트갤러",
  // 댓글 달리면 여기에 추가
];

// ─── 개발일지 ───
export function getDevlog(loop) {
  const base = [
    { date: '3월 12일', text: '기획 시작. 트릭컬 추리게임 만들어보기로 했다.' },
    { date: '3월 28일', text: '캐릭터 설정 완료. 에스피를 마지막 장면에 넣기로 했다.' },
    { date: '4월 5일',  text: '배경 작업 중. 간식 창고가 생각보다 잘 나왔다.' },
    { date: '4월 19일', text: '심문 시스템 구현 완료.' },
    { date: '5월 2일',  text: '자꾸 이상한 꿈을 꾼다.' },
    { date: '5월 9일',  text: '에스피를 마지막에 넣으려고 대사를 썼는데... 내가 쓴 것 같지 않다.' },
    { date: '5월 18일', text: '내가 이 게임을 만드는 건지 이 게임이 나를 만드는 건지 모르겠다.' },
    { date: '5월 27일', text: '' },
  ];
  // 루프마다 달라짐
  if (loop >= 2) base[7].text = '.';
  if (loop >= 3) base.push({ date: '5월 28일', text: '' });
  if (loop >= 4) {
    const today = new Date();
    base[7].date = `${today.getMonth()+1}월 ${today.getDate()}일`;
    base[7].text = '오늘';
  }
  return base;
}
