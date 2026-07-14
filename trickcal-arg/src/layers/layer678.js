import { recordAction, getLoop, addLoop, getLogs, reinterpret, nicknames, escapeHtml } from '../data/index.js';

// ─── 6층 디시인사이드 (자동 진행) ───
export function renderLayer6(app, ctx) {
  recordAction('6층 닉네임 확인');

  app.innerHTML = `
    <div class="l6-wrap fade-in">
      <div class="dc-topbar">
        <span class="dc-logo">DCINSIDE</span>
        <div class="dc-search-wrap">
          <input class="dc-search" placeholder="갤러리, 게시물 검색" />
          <button class="dc-search-btn">검색</button>
        </div>
        <span style="margin-left:auto;font-size:12px;color:#888;">로그인</span>
      </div>
      <div class="dc-header">
        <div>
          <div class="dc-gall-name">트릭컬 리바이브 갤러리</div>
          <div class="dc-gall-sub">트릭컬 리바이브 팬 갤러리</div>
        </div>
        <button class="dc-subscribe">갤러리 구독</button>
      </div>
      <div class="dc-body">
        <div class="dc-main">
          <div class="dc-post">
            <div class="dc-post-head">
              <div class="dc-post-head-title">[팬게임 공유] 트릭컬 추리 어드벤처 직접 만들었습니다</div>
              <div class="dc-post-head-info">
                <span class="dc-post-head-user">trickcal_fan</span>
                <span>|</span><span>121.64.xxx.xxx</span>
                <span>|</span><span>2026.06.22</span>
                <span>|</span><span>조회 2,341</span>
                <span>|</span><span>추천 38</span>
              </div>
            </div>
            <div class="dc-post-body">
              <p>안녕하세요 트릭컬 팬게임 만들었습니다</p><br>
              <div class="dc-post-img-ph">[게임 스크린샷]</div><br>
              <p>역전재판이랑 단간론파 좋아하는 분들 재밌게 하실 것 같아요</p>
              <p>에르핀 네르 마카샤 죠안 등등 나옵니다</p>
              <p style="color:#e63312;font-weight:700;">▶ 플레이 링크: [삭제됨]</p>
            </div>
            <div class="dc-rec-area">
              <button class="dc-rec-btn dc-rec-btn--up" id="dc-rec-up">👍 추천 <span id="dc-rec-count">38</span></button>
              <button class="dc-rec-btn dc-rec-btn--down" id="dc-rec-down">👎 비추천 <span id="dc-down-count">1</span></button>
            </div>
            <div class="dc-comments">
              <div class="dc-comments-title">댓글 <span id="dc-count">0</span>개</div>
              <div id="dc-comment-list"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;

  const list = document.getElementById('dc-comment-list');
  const countEl = document.getElementById('dc-count');
  const timers = [];
  let count = 0;

  // 추천/비추천 버튼 (클릭할 때마다 반영, 한 번 누르면 토글)
  const recUpBtn = document.getElementById('dc-rec-up');
  const recDownBtn = document.getElementById('dc-rec-down');
  let recUp = false, recDown = false;
  recUpBtn?.addEventListener('click', () => {
    const el = document.getElementById('dc-rec-count');
    recUp = !recUp;
    el.textContent = 38 + (recUp ? 1 : 0);
    recUpBtn.style.color = recUp ? '#e63312' : '';
  });
  recDownBtn?.addEventListener('click', () => {
    const el = document.getElementById('dc-down-count');
    recDown = !recDown;
    el.textContent = 1 + (recDown ? 1 : 0);
    recDownBtn.style.color = recDown ? '#3344aa' : '';
  });

  // 실제 닉네임이 몇 개 없어도 자연스러운 속도로 보이도록 분위기용 필러 댓글을 앞에 섞음
  const filler = [
    { nick: 'ㅇㅇ',   text: '오 이거 뭐임' },
    { nick: '트갤러', text: '오 재밌겠다 링크 어디' },
  ];
  const real = nicknames.map(n => ({ nick: n, text: '해봤음 ㄷㄷ' }));
  const all = [...filler, ...real, { nick: '???', text: '보고 있어' }];

  all.forEach((item, i) => {
    const nick = item.nick;
    const t = setTimeout(() => {
      count++;
      if (countEl) countEl.textContent = count;
      const isOdd = nick === '???';
      const div = document.createElement('div');
      div.className = `dc-comment ${isOdd ? 'dc-comment--odd' : ''}`;
      div.innerHTML = `
        <div class="dc-comment-head">
          <span class="dc-comment-user">${isOdd ? '&nbsp;' : nick}</span>
          <span>|</span><span>${new Date().getHours()}:${String(new Date().getMinutes()).padStart(2,'0')}</span>
        </div>
        <div class="dc-comment-text">${item.text}</div>
      `;
      list.appendChild(div);
      list.scrollTop = list.scrollHeight;

      if (isOdd) {
        const t2 = setTimeout(() => {
          document.querySelector('.l6-wrap').classList.add('fade-out');
          setTimeout(ctx.next, 900);
        }, 5000);
        timers.push(t2);
      }
    }, 1800 + i * 2200 + Math.floor(Math.random() * 400));
    timers.push(t);
  });

  return () => timers.forEach(clearTimeout);
}

// ─── 7층 행동 기록 되감기 (자동 진행) ───
export function renderLayer7(app, ctx) {
  const logs = getLogs();
  const timers = [];

  app.innerHTML = `
    <div class="l7-wrap fade-in">
      <div class="l7-title">// ACCESS LOG</div>
      <div class="l7-logs" id="log-list"></div>
      <div class="l7-final" id="log-final">처음부터 나오면 안 됐어</div>
    </div>
  `;

  const logList = document.getElementById('log-list');
  const logFinal = document.getElementById('log-final');

  const show = (items, delay, cb) => {
    items.forEach((item, i) => {
      const t = setTimeout(() => {
        const div = document.createElement('div');
        div.className = 'l7-log';
        div.innerHTML = `<span class="l7-time">${item.time}</span><span class="l7-action">— ${item.text}</span>`;
        logList.appendChild(div);
        requestAnimationFrame(() => div.classList.add('l7-log--visible'));
        if (i === items.length - 1 && cb) timers.push(setTimeout(cb, 800));
      }, delay + i * 380);
      timers.push(t);
    });
  };

  const original = logs.map(l => ({ time: l.time, text: l.action }));
  const reinterpreted = logs.map(l => ({ time: l.time, text: reinterpret[l.action] || l.action }));

  timers.push(setTimeout(() => {
    show(original, 0, () => {
      timers.push(setTimeout(() => {
        const items = Array.from(logList.children);
        items.reverse().forEach((el, i) => {
          const t = setTimeout(() => {
            el.classList.remove('l7-log--visible');
            if (i === items.length - 1) {
              timers.push(setTimeout(() => {
                logList.innerHTML = '';
                show(reinterpreted, 0, () => {
                  timers.push(setTimeout(() => {
                    const els = Array.from(logList.children);
                    els.forEach((el2, i2) => timers.push(setTimeout(() => el2.style.opacity = '0', i2 * 180)));
                    timers.push(setTimeout(() => {
                      logFinal.style.opacity = '1';
                      timers.push(setTimeout(() => {
                        document.querySelector('.l7-wrap').classList.add('fade-out');
                        setTimeout(ctx.next, 900);
                      }, 4000));
                    }, els.length * 180 + 400));
                  }, 1000));
                });
              }, 400));
            }
          }, i * 130);
          timers.push(t);
        });
      }, 1500));
    });
  }, 600));

  return () => timers.forEach(clearTimeout);
}

// ─── 8층 치지직 빈 채팅방 ───
export function renderLayer8(app, ctx) {
  const loop = getLoop(8);
  const inputHidden = loop >= 4;
  const timers = [];

  app.innerHTML = `
    <div class="l8-wrap fade-in">
      <div class="l8-stream-area">
        <div style="color:#1a1a1a;font-size:48px;font-family:monospace;">[방송 종료]</div>
      </div>
      <div class="l8-chat">
        <div class="chzzk-chat-header">
          <span class="chzzk-chat-title">채팅</span>
          <span class="chzzk-chat-setting">⚙</span>
        </div>
        <div class="chzzk-chat-messages" id="chat8"></div>
        ${!inputHidden ? `
        <div class="chzzk-chat-input-area">
          <input class="chzzk-chat-input" id="chat8-input" placeholder="채팅을 입력하세요" />
          <div class="chzzk-chat-btns">
            <span class="chzzk-chat-emoji">😊</span>
            <button class="chzzk-chat-send" id="chat8-send">전송</button>
          </div>
        </div>
        ` : `<div style="padding:12px;color:#333;font-size:12px;text-align:center;">입력할 수 없습니다</div>`}
      </div>
    </div>
  `;

  const chat = document.getElementById('chat8');
  const addMsg = (user, text, odd = false) => {
    const div = document.createElement('div');
    div.className = 'chzzk-chat-msg';
    div.innerHTML = `
      <div class="chzzk-chat-avatar"></div>
      <div class="chzzk-chat-content">
        <div class="chzzk-chat-name ${odd ? 'chzzk-chat-name--blank' : ''}">${user ? escapeHtml(user) : '&nbsp;'}</div>
        <div class="chzzk-chat-text ${odd ? 'chzzk-chat-text--odd' : ''}">${escapeHtml(text)}</div>
      </div>
    `;
    chat.appendChild(div);
    chat.scrollTop = chat.scrollHeight;
  };

  timers.push(setTimeout(() => addMsg('', '여기까지 왔네', true), 2000));
  timers.push(setTimeout(() => addMsg('', loop >= 2 ? '또 왔어' : '근데 왜 왔어', true), 5000));

  if (loop >= 3) {
    timers.push(setTimeout(() => {
      addMsg('', '이전에 뭐라고 했는지 기억해?', true);
      const prev = localStorage.getItem('arg_chat8_answer');
      if (prev) timers.push(setTimeout(() => addMsg('나', prev), 1500));
    }, 8000));
  }

  const KEYWORDS = ['몰라', '꿈', '모르겠어', '모르겠다'];
  let answered = false;

  const handleSend = (val) => {
    if (answered) return;
    if (!val.trim()) return;
    answered = true;
    addMsg('나', val.trim());
    localStorage.setItem('arg_chat8_answer', val.trim());
    const isAnswer = KEYWORDS.some(k => val.includes(k));
    timers.push(setTimeout(() => {
      if (isAnswer) {
        addMsg('', '알아', true);
        timers.push(setTimeout(() => {
          document.querySelector('.l8-wrap').classList.add('fade-out');
          setTimeout(ctx.next, 900);
        }, 2000));
      } else {
        addMsg('', '다시 생각하는 게 좋을 거야', true);
        timers.push(setTimeout(() => {
          addLoop(8);
          document.querySelector('.l8-wrap').classList.add('fade-out');
          setTimeout(ctx.restart, 900);
        }, 2500));
      }
    }, 1200));
  };

  if (!inputHidden) {
    const input = document.getElementById('chat8-input');
    const send = document.getElementById('chat8-send');
    send.addEventListener('click', () => { handleSend(input.value); input.value = ''; });
    input.addEventListener('keydown', e => { if (e.key === 'Enter') { handleSend(input.value); input.value = ''; } });
  } else {
    timers.push(setTimeout(() => addMsg('', '몰라... 라고 해봐', true), 10000));
    timers.push(setTimeout(() => {
      document.querySelector('.l8-wrap').classList.add('fade-out');
      setTimeout(ctx.next, 900);
    }, 20000));
  }

  // 30초 무입력 → 루프
  const noAnswerTimer = setTimeout(() => {
    if (!answered && !inputHidden) {
      answered = true;
      addMsg('', '말하기 싫구나', true);
      const t = setTimeout(() => {
        addLoop(8);
        document.querySelector('.l8-wrap')?.classList.add('fade-out');
        setTimeout(ctx.restart, 900);
      }, 2000);
      timers.push(t);
    }
  }, 30000);
  timers.push(noAnswerTimer);

  return () => timers.forEach(clearTimeout);
                   }
