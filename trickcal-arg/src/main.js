import './style.css';
import { renderLayer1 }                             from './layers/layer1.js';
import { renderLayer2 }                             from './layers/layer2.js';
import { renderLayer3, renderLayer4, renderLayer5 } from './layers/layer345.js';
import { renderLayer6, renderLayer7, renderLayer8 } from './layers/layer678.js';
import { renderLayer9, renderLayer10 }              from './layers/layer910.js';

const app = document.getElementById('app');

// 각 레이어는 (app, ctx)를 받고 cleanup 함수를 반환할 수 있음
// ctx = { next, restart }
const layers = [
  (ctx) => renderLayer1(app, ctx),
  (ctx) => renderLayer2(app, ctx),
  (ctx) => renderLayer3(app, ctx),
  (ctx) => renderLayer4(app, ctx),
  (ctx) => renderLayer5(app, ctx),
  (ctx) => renderLayer6(app, ctx),
  (ctx) => renderLayer7(app, ctx),
  (ctx) => renderLayer8(app, ctx),
  (ctx) => renderLayer9(app, ctx),
  (ctx) => renderLayer10(app, ctx),
];

let current = 0;
let cleanup = null;

function mount() {
  if (cleanup) { cleanup(); cleanup = null; }
  app.innerHTML = '';
  window.scrollTo(0, 0);
  cleanup = layers[current](ctx) || null;
}

function next()    { current++; if (current < layers.length) mount(); }
function restart() { mount(); }

const ctx = { next, restart };

// 개발/테스트용: 콘솔에서 argReset() 실행 시 진행상태 초기화
window.argReset = () => {
  Object.keys(localStorage)
    .filter(k => k.startsWith('arg_'))
    .forEach(k => localStorage.removeItem(k));
  location.reload();
};

mount();
