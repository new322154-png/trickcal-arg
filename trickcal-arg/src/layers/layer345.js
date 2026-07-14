import { recordAction, getLoop, addLoop, getDevlog } from '../data/index.js';

// ─── 3층 깨진 블로그 ───
export function renderLayer3(app, ctx) {
  const loop = getLoop(3);

  const texts = {
    p1: loop >= 2 ? '안녕하세요 ??? 만들어봤습니다' : '안녕하세요 트릭컬 팬게임 만들어봤습니다 ㅎㅎ',
    p2: loop >= 2 ? '교단에서 무언가가 잘못됐습니다' : '교단에서 기절 사건이 연속으로 발생하고 교주가 진상을 밝혀야 하는 추리 게임입니다',
    p3: loop >= 3 ? '나는 이걸 만든 게 아닐지도 모릅니다' : '단간론파 + 역전재판 느낌으로 만들었고',
    author: loop >= 4 ? '???' : 'trickcal_fan',
    title: loop >= 2 ? '[팬게임 소개] ??? 만들었습니다' : '[팬게임 소개] 트릭컬 추리 어드벤처 만들었습니다',
  };

  app.innerHTML = `
    <div class="l1-wrap fade-in">
      <div class="nb-topbar">
        <div class="nb-topbar-inner">
          <span class="nb-logo">BLOG</span>
          <div class="nb-topbar-right"><span>이웃블로그</span><span>블로그홈</span><span class="nb-login">로그인</span></div>
        </div>
      </div>
      <div class="nb-header">
        <div class="nb-header-inner">
          <div class="nb-blog-title">트릭컬 팬로그 ✦</div>
          <div class="nb-blog-sub">교단의 이야기를 기록합니다</div>
        </div>
      </div>
      <div class="nb-body">
        <main class="nb-post">
          <div class="nb-post-meta">
            <span class="nb-category">팬게임</span>
            <h1 class="nb-post-title">${texts.title}</h1>
            <div class="nb-post-info">
              <span>${texts.author}</span><span>·</span>
              <span id="l3-date">2026. 6. 22.</span><span>·</span>
              <span>조회 847</span>
            </div>
          </div>
          <div class="nb-post-body">
            <p>${texts.p1}</p>
            <img class="nb-img" src="/assets/blog/screenshot1.webp"
                 onerror="this.outerHTML='<div class=\'nb-img-ph\'>[이미지를 불러올 수 없습니다]</div>'" />
            <p>${texts.p2}</p>
            <img class="nb-img" src="/assets/blog/screenshot2.webp"
                 onerror="this.outerHTML='<div class=\'nb-img-ph nb-img-ph--tall\'>[이미지를 불러올 수 없습니다]</div>'" />
            <p>${texts.p3}</p>
            ${loop < 3
              ? '<div class="nb-play-wrap"><button class="nb-play-btn" disabled style="opacity:.3;cursor:not-allowed;">이미 시작됐습니다</button></div>'
              : ''}
          </div>
          <div class="nb-comments">
            <div class="nb-comments-title">댓글</div>
            <div class="nb-comment"><span class="nb-comment-user">에르핀최고</span><span class="nb-comment-text">ㅋㅋㅋ에르핀 너무 귀여워</span></div>
            <div class="nb-comment"><span class="nb-comment-user">트릭컬덕후</span><span class="nb-comment-text">이거 진짜 추리게임임?</span></div>
            <div class="nb-comment nb-comment--odd">
              <span class="nb-comment-user">&nbsp;</span>
              <span class="nb-comment-text" id="l3-hidden" style="cursor:pointer;color:#888;">↓</span>
            </div>
          </div>
        </main>
        <aside class="nb-sidebar">
          <div class="nb-widget">
            <div class="nb-widget-title">방문자</div>
            <div class="nb-visitor"><span>오늘</span><span>142</span></div>
            <div class="nb-visitor"><span>전체</span><span>${(1048 - loop).toLocaleString()}</span></div>
          </div>
        </aside>
      </div>
      <div class="nb-space"></div>
    </div>
  `;

  // 날짜 점점 깨짐
  const dateTimer = setTimeout(() => {
    const el = document.getElementById('l3-date');
    if (el) el.textContent = '????. ?. ??.';
  }, Math.max(1500, 5000 - loop * 800));

  let leaving3 = false;
  const advance = () => {
    if (leaving3) return;
    leaving3 = true;
    recordAction('4층 진입');
    document.querySelector('.l1-wrap').classList.add('fade-out');
    setTimeout(ctx.next, 900);
  };

  // 숨겨진 ↓는 처음엔 거의 안 보임 — 스크롤 맨 아래 도달 시 드러남 (A안)
  const hiddenEl = document.getElementById('l3-hidden');
  hiddenEl.style.opacity = '0.15';
  hiddenEl.style.transition = 'opacity 1.2s';

  // 클릭해야만 진행
  hiddenEl.addEventListener('click', advance);

  // 스크롤 맨 아래 도달 → 링크가 뚜렷해지기만 함 (자동 진행 없음)
  const scrollHandler = () => {
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 10) {
      hiddenEl.style.opacity = '1';
      hiddenEl.style.color = '#e63312';
    }
  };
  window.addEventListener('scroll', scrollHandler);

  // 30초 안에 못 찾으면 루프
  const loopTimer = setTimeout(() => {
    if (leaving3) return;
    leaving3 = true;
    addLoop(3);
    document.querySelector('.l1-wrap')?.classList.add('fade-out');
    setTimeout(ctx.restart, 900);
  }, 30000);

  return () => {
    clearTimeout(dateTimer);
    clearTimeout(loopTimer);
    window.removeEventListener('scroll', scrollHandler);
  };
}

// ─── 4층 크롬 404 + 커서 조종 (자동 진행) ───
export function renderLayer4(app, ctx) {
  app.innerHTML = `
    <div class="l4-wrap fade-in">
      <div class="chrome-browser">
        <div class="chrome-tabbar">
          <div class="chrome-tab">
            <div class="chrome-tab-favicon">
              <img src="/assets/chrome/favicon.png" onerror="this.style.display='none'" />
            </div>
            <span class="chrome-tab-title">이 사이트에 연결할 수 없음</span>
            <span class="chrome-tab-close">✕</span>
          </div>
          <button class="chrome-new-tab">+</button>
        </div>
        <div class="chrome-toolbar">
          <button class="chrome-nav-btn" disabled>←</button>
          <button class="chrome-nav-btn" disabled>→</button>
          <button class="chrome-nav-btn">↻</button>
          <div class="chrome-addressbar">
            <span class="chrome-lock">🔒</span>
            <span class="chrome-url">trickcal-fan.pages.dev/play</span>
            <span class="chrome-bookmark">☆</span>
          </div>
          <div class="chrome-toolbar-right">
            <div class="chrome-ext-icon">⋮</div>
            <div class="chrome-ext-icon">👤</div>
          </div>
        </div>
        <div class="chrome-content">
          <div class="chrome-dino">
            <img src="/assets/chrome/dino.png" onerror="this.parentElement.textContent='🦕'" />
          </div>
          <div class="chrome-err-code">ERR_CONNECTION_REFUSED</div>
          <h1 class="chrome-err-title">이 사이트에 연결할 수 없습니다</h1>
          <p class="chrome-err-desc">trickcal-fan.pages.dev에서 연결을 거부했습니다.<br>다음을 시도해 보세요: 인터넷 연결 확인</p>
          <button class="chrome-retry-btn" id="retry-btn">다시 로드</button>
          <div class="chrome-detail">세부정보 보기</div>
        </div>
      </div>

      <div id="fake-overlay" style="position:fixed;top:0;left:0;width:100%;height:100%;z-index:9999;pointer-events:none;display:none;">
        <div id="fake-addressbar" style="position:absolute;background:#fff;border:2px solid #1a73e8;border-radius:20px;padding:6px 14px;display:flex;align-items:center;gap:8px;font-size:13px;color:#202124;box-shadow:0 2px 8px rgba(0,0,0,.2);">
          <span>🔒</span>
          <span id="fake-url-text"></span>
          <span style="display:inline-block;width:1px;height:14px;background:#202124;animation:blink .8s infinite;vertical-align:middle;"></span>
        </div>
      </div>

      <div id="fake-cursor" style="position:fixed;width:16px;height:24px;pointer-events:none;z-index:99999;display:none;
        background:linear-gradient(135deg,#fff 60%,transparent 60%);
        border:1px solid #333;clip-path:polygon(0 0,0 100%,30% 70%,50% 100%,65% 90%,45% 65%,100% 65%,0 0);
        filter:drop-shadow(1px 1px 2px rgba(0,0,0,.4));"></div>
    </div>
  `;

  // 뒤로가기 차단
  history.pushState(null, '', location.href);
  const backHandler = () => history.pushState(null, '', location.href);
  window.addEventListener('popstate', backHandler);

  document.getElementById('retry-btn').addEventListener('click', () => {});

  const timers = [];
  const intervals = [];
  let rafId = null;
  const mouseTracker = { fn: null };

  // 10초 후 커서 조종 시작
  timers.push(setTimeout(() => {
    const fakeCursor = document.getElementById('fake-cursor');
    const fakeOverlay = document.getElementById('fake-overlay');
    const fakeAddressbar = document.getElementById('fake-addressbar');
    const fakeUrlText = document.getElementById('fake-url-text');
    const toolbar = document.querySelector('.chrome-toolbar');
    if (!fakeCursor || !toolbar) return;

    document.body.style.cursor = 'none';
    fakeCursor.style.display = 'block';

    let mouseX = window.innerWidth / 2, mouseY = window.innerHeight / 2;
    let fakeX = mouseX, fakeY = mouseY;
    let phase = 'follow';
    let targetX = 0, targetY = 0;

    mouseTracker.fn = (e) => { mouseX = e.clientX; mouseY = e.clientY; };
    document.addEventListener('mousemove', mouseTracker.fn);

    const rect = toolbar.getBoundingClientRect();
    const destX = rect.left + 250, destY = rect.top + rect.height / 2;

    const animate = () => {
      if (!document.getElementById('fake-cursor')) return;
      const factor = phase === 'follow' ? 0.15 : 0.05;
      const tx = phase === 'follow' ? mouseX : targetX;
      const ty = phase === 'follow' ? mouseY : targetY;
      fakeX += (tx - fakeX) * factor;
      fakeY += (ty - fakeY) * factor;
      fakeCursor.style.left = fakeX + 'px';
      fakeCursor.style.top = fakeY + 'px';
      rafId = requestAnimationFrame(animate);
    };
    animate();

    timers.push(setTimeout(() => {
      phase = 'goto';
      targetX = destX; targetY = destY;
      if (mouseTracker.fn) document.removeEventListener('mousemove', mouseTracker.fn);
    }, 3000));

    timers.push(setTimeout(() => {
      fakeOverlay.style.display = 'block';
      fakeAddressbar.style.left = (rect.left + 52) + 'px';
      fakeAddressbar.style.top = (rect.top + 5) + 'px';
      fakeAddressbar.style.width = (rect.width - 170) + 'px';
      document.querySelector('.chrome-addressbar').style.visibility = 'hidden';

      const current = 'trickcal-fan.pages.dev/play';
      let di = current.length;
      const del = setInterval(() => {
        di--;
        fakeUrlText.textContent = current.slice(0, di);
        if (di <= 0) {
          clearInterval(del);
          timers.push(setTimeout(() => {
            const next = 'trickcal-fan.pages.dev/archive/0527';
            let i = 0;
            const type = setInterval(() => {
              fakeUrlText.textContent = next.slice(0, i + 1);
              i++;
              if (i >= next.length) {
                clearInterval(type);
                timers.push(setTimeout(() => {
                  document.body.style.cursor = '';
                  document.querySelector('.l4-wrap').classList.add('fade-out');
                  setTimeout(ctx.next, 900);
                }, 1200));
              }
            }, 100);
            intervals.push(type);
          }, 400));
        }
      }, 70);
      intervals.push(del);
    }, 5500));
  }, 10000));

  return () => {
    timers.forEach(clearTimeout);
    intervals.forEach(clearInterval);
    if (rafId) cancelAnimationFrame(rafId);
    if (mouseTracker.fn) document.removeEventListener('mousemove', mouseTracker.fn);
    window.removeEventListener('popstate', backHandler);
    document.body.style.cursor = '';
  };
}

// ─── 5층 개발일지 ───
export function renderLayer5(app, ctx) {
  recordAction('5층 일지 열람');
  const loop = getLoop(5);
  const entries = getDevlog(loop);

  app.innerHTML = `
    <div class="l5-wrap fade-in">
      <div class="devlog-header">
        <div class="devlog-avatar">
          <img src="/assets/devlog/avatar.png" onerror="this.style.display='none'" />
        </div>
        <div>
          <div class="devlog-title">trickcal_fan의 개발일지</div>
          <div class="devlog-sub">트릭컬 팬게임 제작 기록</div>
        </div>
      </div>
      <div class="devlog-body">
        ${entries.map((e, i) => {
          const isLate = i >= 4;
          const isEmpty = e.text === '' || e.text === '.' || e.text === '오늘';
          const isLast = i === entries.length - 1;
          return `
            <div class="devlog-entry ${isLate ? 'devlog-entry--late' : ''} ${isLast ? 'devlog-entry--last' : ''}"
                 ${isLast ? 'id="devlog-last" style="cursor:pointer;"' : ''}>
              <div class="devlog-date">${e.date}</div>
              <div class="devlog-text ${isEmpty ? 'devlog-text--empty' : ''} ${isLate && !isEmpty ? 'devlog-text--creepy' : ''}">
                ${isEmpty ? (e.text || '(내용 없음)') : e.text}
              </div>
            </div>
          `;
        }).join('')}
      </div>
      <div style="height:200px;display:flex;align-items:center;justify-content:center;">
        <div id="devlog-bottom-link" style="opacity:0;color:#ff4444;font-size:12px;font-family:monospace;cursor:pointer;transition:opacity .5s;">
          /archive/0527
        </div>
      </div>
    </div>
  `;

  const scrollHandler = () => {
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 220) {
      const link = document.getElementById('devlog-bottom-link');
      if (link) link.style.opacity = '1';
    }
  };
  window.addEventListener('scroll', scrollHandler);

  let leaving5 = false;
  const advance = () => {
    if (leaving5) return;
    leaving5 = true;
    document.querySelector('.l5-wrap').classList.add('fade-out');
    setTimeout(ctx.next, 900);
  };

  document.getElementById('devlog-last')?.addEventListener('click', advance);
  document.getElementById('devlog-bottom-link')?.addEventListener('click', advance);

  const loopTimer = setTimeout(() => {
    if (leaving5) return;
    leaving5 = true;
    addLoop(5);
    document.querySelector('.l5-wrap')?.classList.add('fade-out');
    setTimeout(ctx.restart, 900);
  }, 60000);

  return () => {
    clearTimeout(loopTimer);
    window.removeEventListener('scroll', scrollHandler);
  };
}
