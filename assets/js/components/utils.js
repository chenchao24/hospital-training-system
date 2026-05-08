/* ─── 工具函数 & 通用组件 ─── */

const $ = id => document.getElementById(id);
const ROOT = () => document.getElementById('app');

/* 权限判断 */
function can(perm) {
  const p = ROLES[S.role].perms;
  return p.has('*') || p.has(perm);
}

/* 数据域过滤（非管理员只看本院） */
function scopedData(key) {
  const d = DATA[key] || [];
  if (S.role === 'admin') return d;
  const h = ROLES[S.role].hospital;
  return d.filter(r => !r.hospital || r.hospital === h);
}

/* 状态标签 */
function tagClass(v) {
  if (['启用','正常','已通过','已发布','成功','在库','已完成'].includes(v)) return 'tag-green';
  if (['停用','异常','已退回','缺席','已取消'].includes(v))          return 'tag-red';
  if (['迟到','待审核','未发布','待处理','需修改'].includes(v))             return 'tag-orange';
  if (['归档','未开始'].includes(v))                                return 'tag-gray';
  if (['进行中'].includes(v))                                        return 'tag-blue';
  return 'tag-gray';
}
function tag(v) { return `<span class="tag ${tagClass(v)}">${v}</span>`; }
function tagDot(v) { return `<span class="tag tag-dot ${tagClass(v)}">${v}</span>`; }

/* 按钮 disabled 工具 */
function btnCls(granted, extra='') {
  return `btn ${extra} ${granted ? '' : 'disabled'}`;
}

/* Toast */
function toast(msg, type='success') {
  const id = Date.now();
  S.toasts.push({ id, msg, type });
  renderToasts();
  setTimeout(() => {
    const el = document.querySelector(`.toast-item[data-id="${id}"]`);
    if (el) el.classList.add('toast-fade');
    setTimeout(() => {
      S.toasts = S.toasts.filter(t => t.id !== id);
      renderToasts();
    }, 320);
  }, 2800);
}

function renderToasts() {
  const icons = { success:'✅', error:'❌', warning:'⚠️', info:'ℹ️' };
  let wrap = document.getElementById('_toasts');
  if (!wrap) {
    wrap = document.createElement('div');
    wrap.id = '_toasts';
    wrap.className = 'toast-stack';
    document.body.appendChild(wrap);
  }
  wrap.innerHTML = S.toasts.map(t =>
    `<div class="toast-item ${t.type}" data-id="${t.id}">
       <span class="toast-icon">${icons[t.type]||'ℹ️'}</span>
       <span>${t.msg}</span>
     </div>`
  ).join('');
}

/* Modal */
function modal(title, body, confirmFn, type='default') {
  S.modal = { title, body, confirmFn, type };
  renderModal();
}

function closeModal() { S.modal = null; document.getElementById('_modal')?.remove(); }

function renderModal() {
  let el = document.getElementById('_modal');
  if (!el) {
    el = document.createElement('div');
    el.id = '_modal';
    document.body.appendChild(el);
  }
  if (!S.modal) { el.innerHTML = ''; return; }
  const { title, body, type } = S.modal;
  const confirmClass = type === 'danger' ? 'btn btn-danger' : 'btn btn-primary';
  el.innerHTML = `
    <div class="modal-overlay" id="_overlay">
      <div class="modal-box">
        <div class="modal-header">
          <h3>${title}</h3>
          <button class="modal-close" data-action="close-modal">✕</button>
        </div>
        <div class="modal-body">${body}</div>
        <div class="modal-footer">
          <button class="btn" data-action="close-modal">取消</button>
          <button class="${confirmClass}" data-action="confirm-modal">确认</button>
        </div>
      </div>
    </div>`;
}

/* 面包屑 */
function breadcrumb(current) {
  const back = S.lastView && S.lastView !== 'login'
    ? `<span class="back-btn" data-action="go-back">← 返回</span><span class="sep">/</span>` : '';
  return `<div class="breadcrumb">
    ${back}
    <a data-view="${ROLES[S.role].dashboard}">首页</a>
    <span class="sep">/</span>
    <span class="current">${current}</span>
  </div>`;
}

/* 页头 */
function pageHeader(title, desc, actions='') {
  return `<div class="page-header animate-fade">
    <div class="page-header-left">
      ${breadcrumb(title)}
      <h2>${title}</h2>
      <p>${desc}</p>
    </div>
    <div class="page-header-actions">${actions}</div>
  </div>`;
}

/* 表单必填校验 */
function validateForm(selector='.f-req') {
  let ok = true;
  document.querySelectorAll(selector).forEach(el => {
    const wrap = el.closest('.field');
    const err  = wrap?.querySelector('.field-error');
    if (!el.value?.trim()) {
      ok = false;
      wrap?.classList.add('invalid');
      if (err) err.textContent = (el.dataset.label || '该字段') + '不能为空';
    }
  });
  return ok;
}

/* 通用筛选面板 */
function filterPanel(id, filters, advanced=[], extraBtns='') {
  const open = S.advanced[id];
  return `<div class="panel">
    <div class="panel-header">
      <div><h3>筛选条件</h3></div>
      <div class="actions">
        <button class="btn btn-sm" data-toggle-adv="${id}">${open?'收起':'高级筛选'}</button>
        ${extraBtns}
      </div>
    </div>
    <div class="filter-bar">${filters.join('')}</div>
    ${open ? `<div class="filter-section filter-bar">${advanced.join('')}</div>` : ''}
  </div>`;
}

function filterField(label, options=[]) {
  const opts = options.length
    ? `<select class="el-select"><option>${options[0]}</option>${options.slice(1).map(o=>`<option>${o}</option>`).join('')}</select>`
    : `<input class="el-input" placeholder="${label}">`;
  return `<div class="field"><label class="field-label">${label}</label>${opts}</div>`;
}

/* SVG 柱状图 */
function barChart(data) {
  const { labels, values } = data;
  const max = Math.max(...values);
  const W = 640, H = 220, padL = 40, padB = 30, barW = 50;
  const chartH = H - padB - 10;
  const step = (W - padL - 20) / labels.length;

  const bars = labels.map((lbl, i) => {
    const x = padL + i * step + step / 2 - barW / 2;
    const h = (values[i] / max) * chartH;
    const y = H - padB - h;
    const hue = 200 + i * 18;
    return `
      <defs><linearGradient id="bg${i}" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#5eb4ff"/>
        <stop offset="100%" stop-color="#409eff"/>
      </linearGradient></defs>
      <rect x="${x}" y="${y}" width="${barW}" height="${h}" rx="8" fill="url(#bg${i})" opacity=".92">
        <animate attributeName="height" from="0" to="${h}" dur=".6s" fill="freeze"/>
        <animate attributeName="y" from="${H-padB}" to="${y}" dur=".6s" fill="freeze"/>
      </rect>
      <text x="${x+barW/2}" y="${y-6}" text-anchor="middle" font-size="12" font-weight="700" fill="#2f7ed8">${values[i]}%</text>
      <text x="${x+barW/2}" y="${H-10}" text-anchor="middle" font-size="11" fill="#86909c">${lbl}</text>`;
  }).join('');

  return `<div class="chart-container">
    <div class="chart-title"><span>成员医院培训参与率 TOP 排行</span><span>近 30 天</span></div>
    <svg viewBox="0 0 ${W} ${H}" width="100%" style="display:block">
      <line x1="${padL}" y1="${H-padB}" x2="${W-10}" y2="${H-padB}" stroke="#e6eaf2" stroke-width="1"/>
      ${bars}
    </svg>
  </div>`;
}

/* SVG 折线图 */
function lineChart(data) {
  const { labels, values } = data;
  const W = 640, H = 200, padL = 40, padB = 28;
  const chartH = H - padB - 10;
  const chartW = W - padL - 20;
  const max = Math.max(...values) + 5;
  const min = Math.min(...values) - 5;
  const step = chartW / (labels.length - 1);

  const pts = values.map((v, i) => {
    const x = padL + i * step;
    const y = H - padB - ((v - min) / (max - min)) * chartH;
    return `${x},${y}`;
  }).join(' ');

  const areaBottom = `${padL + (labels.length-1)*step},${H-padB} ${padL},${H-padB}`;
  const area = `${pts} ${areaBottom}`;

  const dots = values.map((v, i) => {
    const x = padL + i * step;
    const y = H - padB - ((v - min) / (max - min)) * chartH;
    return `<circle cx="${x}" cy="${y}" r="5" fill="#fff" stroke="#409eff" stroke-width="3">
      <animate attributeName="r" values="0;5" dur=".5s" fill="freeze" begin="${i*0.1}s"/>
    </circle>
    <text x="${x}" y="${y-10}" text-anchor="middle" font-size="11" fill="#2f7ed8" font-weight="600">${v}%</text>`;
  }).join('');

  const xLabels = labels.map((l, i) => {
    const x = padL + i * step;
    return `<text x="${x}" y="${H-6}" text-anchor="middle" font-size="11" fill="#86909c">${l}</text>`;
  }).join('');

  return `<div class="chart-container">
    <div class="chart-title"><span>培训完成率周趋势</span><span>近 6 周</span></div>
    <svg viewBox="0 0 ${W} ${H}" width="100%" style="display:block">
      <defs>
        <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="rgba(64,158,255,.22)"/>
          <stop offset="100%" stop-color="rgba(64,158,255,.02)"/>
        </linearGradient>
      </defs>
      <line x1="${padL}" y1="${H-padB}" x2="${W-10}" y2="${H-padB}" stroke="#e6eaf2"/>
      <polygon points="${area}" fill="url(#areaGrad)"/>
      <polyline points="${pts}" fill="none" stroke="#409eff" stroke-width="3" stroke-linejoin="round" stroke-linecap="round"/>
      ${dots}
      ${xLabels}
    </svg>
  </div>`;
}

/* SVG 环形图 */
function donutChart(data) {
  const total = data.reduce((a, b) => a + b.value, 0);
  const R = 70, cx = 100, cy = 100;
  let angle = -Math.PI / 2;

  const arcs = data.map(d => {
    const theta = (d.value / total) * 2 * Math.PI;
    const x1 = cx + R * Math.cos(angle);
    const y1 = cy + R * Math.sin(angle);
    angle += theta;
    const x2 = cx + R * Math.cos(angle);
    const y2 = cy + R * Math.sin(angle);
    const largeArc = theta > Math.PI ? 1 : 0;
    return `<path d="M ${cx} ${cy} L ${x1} ${y1} A ${R} ${R} 0 ${largeArc} 1 ${x2} ${y2} Z" fill="${d.color}" opacity=".88"/>`;
  }).join('');

  const legendHtml = data.map(d =>
    `<div class="legend-item"><div class="legend-dot" style="background:${d.color}"></div>${d.label} ${d.value}%</div>`
  ).join('');

  return `<div class="chart-container">
    <div class="chart-title"><span>案例调用类型分布</span></div>
    <div style="display:flex;align-items:center;gap:16px;flex-wrap:wrap">
      <svg viewBox="0 0 200 200" width="180" style="flex-shrink:0">
        ${arcs}
        <circle cx="${cx}" cy="${cy}" r="42" fill="#fff"/>
        <text x="${cx}" y="${cy-6}" text-anchor="middle" font-size="18" font-weight="700" fill="#1a2a3a">${total}%</text>
        <text x="${cx}" y="${cy+14}" text-anchor="middle" font-size="11" fill="#86909c">调用占比</text>
      </svg>
      <div class="chart-legend">${legendHtml}</div>
    </div>
  </div>`;
}

/* 评分星星 */
function stars(score) {
  return Array.from({length:5}, (_, i) =>
    `<span style="color:${i < Math.round(score) ? '#f5a623' : '#dcdfe6'};font-size:16px;">★</span>`
  ).join('');
}

/* 进度条 */
function progressBar(pct, color='') {
  return `<div class="progress-bar"><div class="progress-fill ${color}" style="width:${pct}%"></div></div>`;
}
