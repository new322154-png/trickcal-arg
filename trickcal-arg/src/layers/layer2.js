import { getLoop, addLoop, getChatMessages, recordAction, escapeHtml } from '../data/index.js';

export function renderLayer2(app, ctx) {
  const loop = getLoop(2);
  const baseViewers = 1284 - loop * 47;
  const streamTitle =
    loop === 0 ? '【팬게임】트릭컬 추리 어드벤처 첫 플레이 🔍'
    : loop === 1 ? '【팬게임】트릭컬 추리 어드벤처 두 번째 플레이 🔍'
    : `【팬게임】트릭컬 추리 어드벤처 ${loop + 1}번째 플레이 🔍`;

  app.innerHTML = `
    <div class="l2-wrap fade-in">
      <div class="chzzk-topbar">
        <span class="chzzk-logo-text">CHZZK</span>
        <input class="chzzk-search" placeholder="채널, 게임 검색" />
        <div style="margin-left:auto;display:flex;gap:8px;">
          <button class="chzzk-topbar-btn">팔로잉</button>
          <button class="chzzk-topbar-btn chzzk-topbar-btn--follow">로그인</button>
        </div>
      </div>
      <div class="chzzk-body">
        <div class="chzzk-stream-area">
          <div class="chzzk-video">
            <video id="chzzk-video-el" autoplay loop muted playsinline
                   onerror="this.outerHTML='<div class=\'chzzk-video-ph\'>[스트리밍 영상 — /assets/chzzk/stream.mp4]</div>'">
              <source src="/assets/chzzk/stream.mp4" type="video/mp4" />
            </video>

            <!-- 방송 화면 위 채팅 오버레이(미러) — 게임 UI(좌상단 돋보기/우상단 책/좌하단 마스크 캠) 피해서 배치 -->
            <div class="chzzk-video-chat-overlay" id="video-chat-overlay"></div>

            <!-- 자동재생은 브라우저 정책상 무음으로만 가능 → 탭하면 실제 소리 켜짐 -->
            <button class="chzzk-unmute-btn" id="unmute-btn">🔇 소리 켜기</button>

            ${loop >= 4 ? '<div style="position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);font-size:14px;color:rgba(255,255,255,.3);">보고 있어</div>' : ''}
          </div>
          <div class="chzzk-controls">
            <button class="chzzk-ctrl-btn">⏸</button>
            <div class="chzzk-progress"><div class="chzzk-progress-bar"></div></div>
            <span class="chzzk-live-badge">LIVE</span>
            <span class="chzzk-viewer" id="viewer-count">👁 ${baseViewers.toLocaleString()}</span>
            <div class="chzzk-volume">🔊<div class="chzzk-vol-bar"><div class="chzzk-vol-fill"></div></div></div>
            <span class="chzzk-quality">720p</span>
            <span class="chzzk-fullscreen">⛶</span>
          </div>
          <div class="chzzk-info">
            <div class="chzzk-streamer-avatar">
              <img src="/assets/chzzk/streamer_avatar.png" onerror="this.style.display='none'" />
            </div>
            <div class="chzzk-info-text">
              <div class="chzzk-stream-title">${streamTitle}</div>
              <div class="chzzk-streamer-name">espi_watcher</div>
              <div class="chzzk-tags">
                <span class="chzzk-tag"># 트릭컬</span>
                <span class="chzzk-tag"># 팬게임</span>
                <span class="chzzk-tag"># 추리</span>
              </div>
            </div>
            <div class="chzzk-info-btns">
              <button class="chzzk-btn-like" id="like-btn">🤍 <span id="like-count">1.2K</span></button>
              <button class="chzzk-btn-share" id="share-btn">공유</button>
              <button class="chzzk-btn-donate" id="donate-btn">치즈 후원</button>
            </div>
          </div>
        </div>
        <div class="chzzk-chat">
          <div class="chzzk-chat-header">
            <span class="chzzk-chat-title">채팅</span>
            <span class="chzzk-chat-setting">⚙</span>
          </div>
          <div class="chzzk-chat-messages" id="chat-area"></div>
          <div class="chzzk-chat-input-area">
            <input class="chzzk-chat-input" id="chat2-input" placeholder="채팅을 입력하세요" maxlength="80" />
            <div class="chzzk-chat-btns">
              <span class="chzzk-chat-emoji">😊</span>
              <button class="chzzk-chat-send" id="chat2-send">전송</button>
            </div>
            <div class="chzzk-donate-btns">
              <button class="chzzk-cheese-btn">🧀 치즈 후원</button>
              <button class="chzzk-cheese-btn">📹 영상 후원</button>
            </div>
          </div>
        </div>
      </div>
      <div class="chzzk-toast" id="chzzk-toast"></div>
    </div>
  `;

  const chatArea = document.getElementById('chat-area');
  const overlay  = document.getElementById('video-chat-overlay');
  const videoEl  = document.getElementById('chzzk-video-el');
  const unmuteBtn = document.getElementById('unmute-btn');

  unmuteBtn?.addEventListener('click', () => {
    if (videoEl) {
      videoEl.muted = false;
      videoEl.play().catch(() => {});
    }
    unmuteBtn.style.display = 'none';
  });

  // ── 좋아요 / 공유 / 후원 버튼 (실제로 반응하게) ──
  const toast = document.getElementById('chzzk-toast');
  let toastTimer = null;
  function showToast(msg) {
    if (!toast) return;
    toast.textContent = msg;
    toast.classList.add('chzzk-toast--show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove('chzzk-toast--show'), 1800);
  }

  const likeBtn = document.getElementById('like-btn');
  const likeCountEl = document.getElementById('like-count');
  let liked = false;
  likeBtn?.addEventListener('click', () => {
    liked = !liked;
    likeBtn.firstChild.textContent = liked ? '❤️ ' : '🤍 ';
    likeCountEl.textContent = liked ? '1.3K' : '1.2K';
    likeBtn.classList.toggle('liked', liked);
  });

  document.getElementById('share-btn')?.addEventListener('click', () => {
    showToast('링크가 복사되었습니다');
  });

  document.getElementById('donate-btn')?.addEventListener('click', () => {
    showToast('🧀 후원해주셔서 감사합니다!');
  });
  const messages = getChatMessages(loop);
  let answered = false;
  const msgTimers = [];
  const OVERLAY_MAX = 6;

  // 시청자 수 변동
  const viewerTimer = setInterval(() => {
    const el = document.getElementById('viewer-count');
    if (el) {
      const cur = parseInt(el.textContent.replace(/[^\d]/g, '') || '0');
      el.textContent = `👁 ${(cur + Math.floor(Math.random() * 6) - 2).toLocaleString()}`;
    }
  }, 3000);

  // 방송 화면 위 오버레이에 미러링 (실시간 방송 느낌)
  function mirrorToOverlay(user, text, isOdd) {
    const line = document.createElement('div');
    line.className = `ovc-line ${isOdd ? 'ovc-line--odd' : ''}`;
    line.innerHTML = `<span class="ovc-name">${isOdd ? '&nbsp;' : escapeHtml(user)}</span><span class="ovc-text">${escapeHtml(text)}</span>`;
    overlay.appendChild(line);
    requestAnimationFrame(() => line.classList.add('ovc-line--show'));
    while (overlay.children.length > OVERLAY_MAX) {
      overlay.removeChild(overlay.firstChild);
    }
  }

  function addScriptedMsg(user, text, isOdd) {
    const div = document.createElement('div');
    div.className = 'chzzk-chat-msg';
    div.innerHTML = `
      <div class="chzzk-chat-avatar">
        <img src="/assets/chzzk/chat_profiles/${Math.ceil(Math.random()*10)}.png"
             onerror="this.style.display='none'" />
      </div>
      <div class="chzzk-chat-content">
        <div class="chzzk-chat-name ${isOdd ? 'chzzk-chat-name--blank' : ''}">${isOdd ? '&nbsp;' : escapeHtml(user)}</div>
        <div class="chzzk-chat-text ${isOdd ? 'chzzk-chat-text--odd' : ''}">${escapeHtml(text)}</div>
      </div>
    `;
    chatArea.appendChild(div);
    chatArea.scrollTop = chatArea.scrollHeight;
    mirrorToOverlay(user, text, isOdd);
    return div;
  }

  // 스크립트 채팅 진행
  messages.forEach((msg) => {
    const t = setTimeout(() => {
      if (answered) return;
      const isOdd = msg.user === '';
      const div = addScriptedMsg(msg.user, msg.text, isOdd);

      if (isOdd) {
        div.style.cursor = 'pointer';
        div.addEventListener('click', () => {
          if (answered) return;
          answered = true;
          div.querySelector('.chzzk-chat-text').style.color = '#fff';
          document.querySelector('.l2-wrap').classList.add('glitch');
          const t2 = setTimeout(() => {
            document.querySelector('.l2-wrap')?.classList.add('fade-out');
            setTimeout(ctx.next, 600);
          }, 800);
          msgTimers.push(t2);
        });
      }
    }, msg.delay);
    msgTimers.push(t);
  });

  // ── 실시간 채팅 입력 (내 채팅 + 영상 오버레이 동시 반영) ──
  const input = document.getElementById('chat2-input');
  const sendBtn = document.getElementById('chat2-send');

  function handleSend() {
    const val = input.value.trim();
    if (!val) return;
    input.value = '';

    addScriptedMsg('나', val, false);
    recordAction('2층 채팅 입력');
  }

  sendBtn.addEventListener('click', handleSend);
  input.addEventListener('keydown', (e) => { if (e.key === 'Enter') handleSend(); });

  // 못 찾으면 루프 — 영상의 실제 길이(정확히 한 바퀴)에 맞춰 리셋되도록 동적으로 설정.
  // metadata 로딩 전엔 40초로 임시 예약해두고, 로딩되면 정확한 길이로 다시 예약함
  let loopTimer = setTimeout(triggerLoop, 40000);

  function triggerLoop() {
    if (!answered) {
      addLoop(2);
      document.querySelector('.l2-wrap').classList.add('fade-out');
      setTimeout(ctx.restart, 900);
    }
  }

  if (videoEl) {
    if (videoEl.readyState >= 1 && videoEl.duration) {
      clearTimeout(loopTimer);
      loopTimer = setTimeout(triggerLoop, Math.round(videoEl.duration * 1000));
    } else {
      videoEl.addEventListener('loadedmetadata', () => {
        if (videoEl.duration && !answered) {
          clearTimeout(loopTimer);
          loopTimer = setTimeout(triggerLoop, Math.round(videoEl.duration * 1000));
        }
      }, { once: true });
    }
  }

  return () => {
    clearInterval(viewerTimer);
    clearTimeout(loopTimer);
    clearTimeout(toastTimer);
    msgTimers.forEach(clearTimeout);
  };
}
