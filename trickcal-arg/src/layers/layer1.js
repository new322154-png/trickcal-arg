import { recordAction, getLoop, addLoop } from '../data/index.js';

export function renderLayer1(app, ctx) {
  recordAction('1층 접속');
  const loop = getLoop(1);
  const returned = localStorage.getItem('arg_returned') === 'true';

  const totalCount = returned ? 0 : Math.max(0, 1048 - loop);
  const titleText  = returned ? '트릭컬 팬로그' : ('트릭컬 팬로그 ' + '✦'.repeat(loop >= 4 ? 2 : 1));
  const comments = buildComments(loop, returned);

  app.innerHTML = `
    <div class="l1-wrap fade-in">
      <div class="nb-topbar">
        <div class="nb-topbar-inner">
          <span class="nb-logo">BLOG</span>
          <div class="nb-topbar-right">
            <span>이웃블로그</span><span>블로그홈</span><span class="nb-login">로그인</span>
          </div>
        </div>
      </div>

      <div class="nb-header">
        <div class="nb-header-inner">
          <div class="nb-blog-title">${titleText}</div>
          <div class="nb-blog-sub">교단의 이야기를 기록합니다</div>
          <nav class="nb-menu">
            <span class="nb-menu-item nb-menu-item--active" data-cat="fan">전체글</span>
            <span class="nb-menu-item" data-cat="fan">팬게임</span>
            <span class="nb-menu-item" data-cat="story">이야기</span>
            <span class="nb-menu-item" data-cat="about">about</span>
          </nav>
        </div>
      </div>

      <div class="nb-body">
        <main class="nb-post">
          <div id="post-area">
            <div class="nb-post-meta">
              <span class="nb-category">팬게임</span>
              <h1 class="nb-post-title">[팬게임 소개] 트릭컬 추리 어드벤처 만들었습니다</h1>
              <div class="nb-post-info">
                <span>trickcal_fan</span><span>·</span>
                <span>2026. 6. 22.</span><span>·</span>
                <span>조회 <span id="nb-view">847</span></span>
              </div>
            </div>
            <div class="nb-post-body">
              <p>안녕하세요 트릭컬 팬게임 만들어봤습니다 ㅎㅎ</p>
              <p>오래 걸렸는데 드디어 완성됐어요</p>
              <img class="nb-img" src="/assets/blog/screenshot1.webp"
                   onerror="this.outerHTML='<div class=\'nb-img-ph\'>[게임 타이틀 화면]</div>'" />
              <p>교단에서 기절 사건이 연속으로 발생하고<br>교주가 진상을 밝혀야 하는 추리 게임입니다</p>
              <img class="nb-img" src="/assets/blog/${loop >= 3 ? 'screenshot2_alt.webp' : 'screenshot2.webp'}"
                   onerror="this.outerHTML='<div class=\'nb-img-ph nb-img-ph--tall\'>[${loop >= 3 ? '???' : '심문 화면'}]</div>'" />
              <p>단간론파 + 역전재판 느낌으로 만들었고 엔딩도 여러 개 있습니다</p>
              <p>아래 링크에서 플레이하실 수 있어요!</p>
              <div class="nb-play-wrap">
                <button class="nb-play-btn" id="play-btn">▶ 지금 플레이하기</button>
              </div>
              <p class="nb-small">비공식 팬게임 · 비영리 · 트릭컬/에피드게임즈와 무관</p>
            </div>

            <div class="nb-reaction">
              <button class="nb-like">🤍 <span>23</span></button>
            </div>

            <div class="nb-comments">
              <div class="nb-comments-title">댓글 <span>${comments.length}</span></div>
              ${comments.map(c => `
                <div class="nb-comment ${c.odd ? 'nb-comment--odd' : ''}">
                  <span class="nb-comment-user">${c.odd ? '&nbsp;' : c.user}</span>
                  <span class="nb-comment-text">${c.text}</span>
                </div>
              `).join('')}
            </div>
          </div>
        </main>

        <aside class="nb-sidebar">
          <div class="nb-profile">
            <div class="nb-avatar">
              <img src="/assets/blog/avatar.png" onerror="this.parentElement.textContent='✦'" />
            </div>
            <div class="nb-profile-name">trickcal_fan</div>
            <div class="nb-profile-sub">트릭컬 팬 블로그</div>
            <button class="nb-follow">이웃추가</button>
          </div>
          <div class="nb-widget">
            <div class="nb-widget-title">카테고리</div>
            <div class="nb-widget-item" data-cat="fan">전체글 <span>12</span></div>
            <div class="nb-widget-item nb-widget-item--active" data-cat="fan">팬게임 <span>3</span></div>
            <div class="nb-widget-item" data-cat="story">이야기 <span>9</span></div>
          </div>
          <div class="nb-widget">
            <div class="nb-widget-title">방문자</div>
            <div class="nb-visitor"><span>오늘</span><span>142</span></div>
            <div class="nb-visitor"><span>전체</span><span id="total-count">${totalCount.toLocaleString()}</span></div>
          </div>
        </aside>
      </div>

      <footer class="nb-footer">
        <span>BLOG</span><span>·</span><span>이용약관</span><span>·</span><span>개인정보처리방침</span>
      </footer>
      <div class="nb-space"></div>
    </div>
  `;

  // ── 타이머 ──
  const viewTimer = setInterval(() => {
    const el = document.getElementById('nb-view');
    if (el) el.textContent = parseInt(el.textContent) + Math.floor(Math.random() * 2);
  }, 8000);

  const totalTimer = setInterval(() => {
    const el = document.getElementById('total-count');
    if (el) {
      const cur = parseInt(el.textContent.replace(/,/g, '') || '0');
      el.textContent = Math.max(0, cur + (Math.random() > 0.6 ? -1 : 1)).toLocaleString();
    }
  }, 5000);

  // ── 뒤로가기 차단 ──
  history.pushState(null, '', location.href);
  const backHandler = () => {
    history.pushState(null, '', location.href);
    recordAction('뒤로가기 시도');
  };
  window.addEventListener('popstate', backHandler);

  // ── 진행 가드 ──
  let leaving = false;

  const postArea = document.getElementById('post-area');
  const fanBodyHTML = postArea.innerHTML; // 팬게임 탭 원본 내용 보관 (다시 돌아올 때 복원용)

  function attachFanListeners() {
    document.getElementById('play-btn')?.addEventListener('click', () => {
      if (leaving) return;
      leaving = true;
      addLoop(1);
      recordAction('플레이 버튼 클릭');
      document.querySelector('.l1-wrap').classList.add('fade-out');
      setTimeout(ctx.restart, 900);
    });

    document.querySelectorAll('.nb-comment--odd').forEach(el => {
      el.style.cursor = 'pointer';
      el.addEventListener('click', () => {
        if (leaving) return;
        leaving = true;
        document.querySelector('.l1-wrap').classList.add('fade-out');
        setTimeout(ctx.next, 900);
      });
    });
  }

  function otherPostHTML(cat) {
    if (cat === 'story') {
      return `
        <div class="nb-post-meta">
          <span class="nb-category">이야기</span>
          <h1 class="nb-post-title">[일상] 요즘 이상한 꿈을 계속 꾼다</h1>
          <div class="nb-post-info">
            <span>trickcal_fan</span><span>·</span>
            <span>2026. 5. 30.</span><span>·</span>
            <span>조회 214</span>
          </div>
        </div>
        <div class="nb-post-body">
          <p>요즘 매일 같은 꿈을 꾼다.</p>
          <p>내가 만든 게임 속을 걸어다니는 꿈인데, 이상하게 엔딩 씬에서 항상 누가 나를 보고 있는 느낌이 든다.</p>
          <p>기분 탓이겠지.</p>
          <div class="nb-play-wrap">
            <button class="nb-play-btn" id="back-to-fan" style="background:#888;">← 팬게임 글로 돌아가기</button>
          </div>
        </div>
      `;
    }
    return `
      <div class="nb-post-meta">
        <span class="nb-category">about</span>
        <h1 class="nb-post-title">[소개] 안녕하세요, trickcal_fan입니다</h1>
        <div class="nb-post-info">
          <span>trickcal_fan</span><span>·</span>
          <span>2026. 3. 10.</span><span>·</span>
          <span>조회 89</span>
        </div>
      </div>
      <div class="nb-post-body">
        <p>트릭컬 팬 블로그입니다. 취미로 팬게임 만드는 걸 좋아해요.</p>
        <p>연락은 댓글로 남겨주세요. 답장은... ■■■을 ■■■니다.</p>
        <div class="nb-play-wrap">
          <button class="nb-play-btn" id="back-to-fan" style="background:#888;">← 팬게임 글로 돌아가기</button>
        </div>
      </div>
    `;
  }

  function setCategory(cat) {
    document.querySelectorAll('.nb-menu-item, .nb-widget-item').forEach(el => {
      el.classList.toggle('nb-menu-item--active', el.classList.contains('nb-menu-item') && el.dataset.cat === cat);
      el.classList.toggle('nb-widget-item--active', el.classList.contains('nb-widget-item') && el.dataset.cat === cat);
    });
    if (cat === 'fan') {
      postArea.innerHTML = fanBodyHTML;
      attachFanListeners();
    } else {
      postArea.innerHTML = otherPostHTML(cat);
      document.getElementById('back-to-fan')?.addEventListener('click', () => setCategory('fan'));
    }
  }

  document.querySelectorAll('.nb-menu-item, .nb-widget-item').forEach(el => {
    el.style.cursor = 'pointer';
    el.addEventListener('click', () => setCategory(el.dataset.cat));
  });

  // ── 플레이 버튼 → 루프 / 공백 댓글 클릭 → 정답 (초기 렌더 시 바로 연결) ──
  attachFanListeners();

  return () => {
    clearInterval(viewTimer);
    clearInterval(totalTimer);
    window.removeEventListener('popstate', backHandler);
  };
}

function buildComments(loop, returned) {
  const base = [
    { user: '에르핀최고',   text: 'ㅋㅋㅋ에르핀 너무 귀여워' },
    { user: '완장을왜함',   text: '이거 진짜 추리게임임?' },
    { user: 'ㅇㅇ',         text: '해봤는데 뭔가 이상한 것 같은데' },
    { user: '',             text: '이미 시작됐어', odd: true },
    { user: '긴긴팔다리',     text: '마카샤 나온다고요?? 바로 해봄' },
    { user: 'trickcal_fan', text: '즐겜하세요 ㅎㅎ' },
  ];
  if (loop >= 5) base.push({ user: '', text: '눈치채기 그렇게 힘든가...?', odd: true });
  if (returned)  base.push({ user: '', text: '마지막 방문자: 당신', odd: true });
  return base;
}
