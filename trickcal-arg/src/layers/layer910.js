import { getLoop, addLoop } from '../data/index.js';

// ─── 9층 붕괴 ───
export function renderLayer9(app, ctx) {
  const loop = getLoop(9);
  const dotDelay = Math.max(8000, 30000 - loop * 5000);
  const timers = [];

  app.innerHTML = `
    <div class="l9-wrap">
      <div class="l9-fragment" style="top:5%;left:2%;opacity:${.3+loop*.05};transform:rotate(-3deg);">
        <div style="background:#fff;padding:8px 14px;font-size:12px;color:#333;border:1px solid #e8e8e8;font-family:'Noto Sans KR',sans-serif;">
          <div style="color:#03c75a;font-size:10px;font-weight:700;">BLOG</div>
          <div style="font-weight:700;margin-top:4px;">[팬게임 소개] ???</div>
          <div style="color:#999;font-size:11px;">??? · 조회 ???</div>
        </div>
      </div>
      <div class="l9-fragment" style="top:8%;right:3%;opacity:${.25+loop*.05};transform:rotate(2deg);">
        <div style="background:#131317;padding:8px 14px;color:#e8e8e8;border:1px solid #2a2a2e;font-size:12px;">
          <div style="color:#00e5a0;font-weight:900;font-size:14px;">CHZZK</div>
          <div style="color:#666;margin-top:4px;">👁 ${1284 - loop * 47}</div>
          <div style="color:#ccc;font-size:11px;">espi_watcher</div>
        </div>
      </div>
      <div class="l9-fragment" style="top:25%;left:5%;opacity:${.25+loop*.04};transform:rotate(1deg);">
        <div style="background:#f1f3f4;padding:5px 12px;font-size:11px;color:#70757a;display:flex;gap:8px;align-items:center;">
          <span>←</span><span>→</span><span>↻</span>
          <div style="background:#fff;border:1px solid #ddd;border-radius:12px;padding:3px 12px;">trickcal-fan.pages.dev/archive/0527</div>
        </div>
        <div style="background:#fff;padding:12px 16px;font-size:12px;color:#202124;">
          <div style="font-size:16px;margin-bottom:4px;">이 사이트에 연결할 수 없습니다</div>
          <div style="color:#70757a;font-size:11px;">ERR_CONNECTION_REFUSED</div>
        </div>
      </div>
      <div class="l9-fragment" style="top:20%;right:2%;opacity:${.25+loop*.04};transform:rotate(-2deg);">
        <div style="background:#fff;border:1px solid #ccc;font-size:12px;color:#333;">
          <div style="background:#e63312;color:#fff;padding:4px 10px;font-size:11px;">트릭컬 리바이브 갤러리</div>
          <div style="padding:6px 10px;">
            <div style="border-bottom:1px solid #eee;padding:3px 0;">이 팬게임 뭔가 이상하지 않음??</div>
            <div style="padding:3px 0;color:#bbb;">보고 있어</div>
          </div>
        </div>
      </div>
      <div class="l9-fragment" style="bottom:30%;left:3%;opacity:${.25+loop*.04};transform:rotate(2deg);">
        <div style="background:#1a1a2e;padding:10px 14px;color:#ff6666;font-family:'Courier New',monospace;font-size:12px;border-left:2px solid #ff4444;">
          <div style="color:#888;font-size:10px;">5월 27일</div>
          <div style="margin-top:4px;">(내용 없음)</div>
        </div>
      </div>
      <div class="l9-fragment" style="bottom:20%;right:4%;opacity:${.25+loop*.04};transform:rotate(-1deg);">
        <div style="background:#131317;padding:8px 12px;color:#e8e8e8;font-size:12px;width:180px;">
          <div style="color:#666;font-style:italic;">여기까지 왔네</div>
          <div style="margin-top:6px;color:#666;font-style:italic;">거의 다 왔어</div>
        </div>
      </div>
      ${loop >= 2 ? `
      <div class="l9-fragment" style="bottom:10%;left:8%;opacity:.2;font-family:'Courier New',monospace;font-size:11px;color:#00ff41;">
        <div>들어왔음</div><div>선택했음</div>
        <div>도망치려 했음</div>
        <div style="color:#ff4444;">처음부터 나오면 안 됐어</div>
      </div>` : ''}
      ${loop >= 3 ? `
      <div class="l9-fragment" style="top:50%;left:40%;opacity:.15;font-size:11px;color:#ff4444;font-family:monospace;">
        ${loop}번째 방문
      </div>` : ''}
      <div class="l9-center">
        <div id="l9-text" style="color:#e8e8e8;font-size:14px;opacity:0;transition:opacity 1s;font-family:'Noto Sans KR',sans-serif;line-height:2.2;text-align:center;"></div>
        <div class="l9-click-dot" id="l9-dot" style="display:none;"></div>
      </div>
    </div>
  `;

  const glitchTimer = setInterval(() => {
    document.querySelectorAll('.l9-fragment').forEach(f => {
      if (Math.random() > 0.75) {
        f.classList.add('glitch');
        setTimeout(() => f.classList.remove('glitch'), 200);
      }
    });
  }, 700);

  const textEl = document.getElementById('l9-text');
  const lines = ['처음 이 사이트에 들어왔을 때부터', '기록되고 있었습니다', '', '이제 알았나요?'];

  timers.push(setTimeout(() => { if (textEl) textEl.style.opacity = '1'; }, 500));
  lines.forEach((line, i) => {
    timers.push(setTimeout(() => {
      if (textEl) textEl.innerHTML += `<div>${line}&nbsp;</div>`;
    }, 800 + i * 1800));
  });

  let clicked = false;

  const dotTimer = setTimeout(() => {
    const dot = document.getElementById('l9-dot');
    if (dot) dot.style.display = 'block';
  }, dotDelay);
  timers.push(dotTimer);

  document.getElementById('l9-dot').addEventListener('click', () => {
    if (clicked) return;
    clicked = true;
    document.querySelector('.l9-wrap').classList.add('fade-out');
    setTimeout(ctx.next, 900);
  });

  const loopTimer = setTimeout(() => {
    if (!clicked) {
      addLoop(9);
      document.querySelector('.l9-wrap').classList.add('fade-out');
      setTimeout(ctx.restart, 900);
    }
  }, dotDelay + 30000);
  timers.push(loopTimer);

  return () => {
    clearInterval(glitchTimer);
    timers.forEach(clearTimeout);
  };
}

// ─── 10층 에스피 열린결말 ───
export function renderLayer10(app) {
  const timers = [];

  app.innerHTML = `
    <div class="l10-wrap fade-in">
      <img id="l10-espi" class="l10-espi" src="/assets/espi/espi.png"
           onerror="this.style.display='none'" />
      <div class="l10-dialogue" id="l10-dialogue"></div>
    </div>
  `;

  const espi = document.getElementById('l10-espi');
  const dlg  = document.getElementById('l10-dialogue');

  const addLine = (text, cls, delay) => {
    timers.push(setTimeout(() => {
      const d = document.createElement('div');
      d.className = `l10-line ${cls}`;
      d.textContent = text;
      dlg.appendChild(d);
      requestAnimationFrame(() => { d.style.opacity = '1'; });
    }, delay));
  };

  timers.push(setTimeout(() => { if (espi) espi.style.opacity = '1'; }, 500));
  addLine('꿈 진짜 무서웠어.',         'l10-line--player', 2000);
  addLine('에스피, 이거 진짜 꿈이지?', 'l10-line--player', 4500);

  timers.push(setTimeout(() => {
    const dots = document.createElement('div');
    dots.className = 'l10-dots';
    dots.textContent = '...';
    dlg.appendChild(dots);
    requestAnimationFrame(() => { dots.style.opacity = '1'; });
  }, 7500));

  timers.push(setTimeout(() => {
    const wrap = document.querySelector('.l10-wrap');
    if (wrap) wrap.classList.add('fade-out');
  }, 10000));

  timers.push(setTimeout(() => {
    localStorage.setItem('arg_returned', 'true');
    localStorage.removeItem('arg_logs');
    location.reload();
  }, 11500));

  return () => timers.forEach(clearTimeout);
}
