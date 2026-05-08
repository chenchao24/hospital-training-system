/* ─── 事件绑定与应用启动 ─── */

/* Toast 通知 */
function toast(type, title, desc = '') {
  const icons = { success:'✅', warning:'⚠️', error:'❌', info:'ℹ️' };
  const t = document.createElement('div');
  t.className = `toast ${type}`;
  t.innerHTML = `<div class="toast-icon">${icons[type]||'ℹ️'}</div>
    <div class="toast-body"><div class="toast-title">${title}</div>${desc?`<div class="toast-desc">${desc}</div>`:''}</div>`;
  document.getElementById('toast-container').appendChild(t);
  setTimeout(() => t.style.opacity = '0', 2800);
  setTimeout(() => t.remove(), 3200);
}

/* 确认弹窗 */
function confirm(title, body, onConfirm) {
  document.getElementById('modal-area').innerHTML = `
    <div class="modal-mask" id="modal-mask">
      <div class="modal-box">
        <div class="modal-title">⚠️ ${title}</div>
        <div class="modal-body">${body}</div>
        <div class="modal-actions">
          <button class="btn" id="modal-cancel">取消</button>
          <button class="btn btn-danger" id="modal-ok">确认操作</button>
        </div>
      </div>
    </div>`;
  document.getElementById('modal-cancel').onclick = closeModal;
  document.getElementById('modal-mask').onclick = (e) => { if (e.target.id === 'modal-mask') closeModal(); };
  document.getElementById('modal-ok').onclick = () => { closeModal(); onConfirm(); };
}

function closeModal() {
  document.getElementById('modal-area').innerHTML = '';
}

/* 表单校验 */
function validateForm(container) {
  let ok = true;
  container.querySelectorAll('.f-req').forEach(el => {
    const errEl = el.closest('.field')?.querySelector('.field-error');
    if (!el.value.trim()) {
      el.classList.add('error');
      if (errEl) errEl.textContent = `${el.dataset.label || '该字段'} 不可为空`;
      ok = false;
    } else {
      el.classList.remove('error');
      if (errEl) errEl.textContent = '';
    }
  });
  return ok;
}

/* 导航 */
function navigate(view) {
  const dashMap = { admin:'dash-admin', lecturer:'dash-lecturer', staff:'dash-staff' };
  if (view === 'login') { S.view = 'login'; render(); return; }
  if (view === 'dash') { S.view = dashMap[S.role]; render(); return; }
  S.view = view;
  S.inMobile = false;
  render();
  document.getElementById('main-content')?.scrollTo(0, 0);
}

/* 角色切换 */
function switchRole(role) {
  S.role = role;
  const dashMap = { admin:'dash-admin', lecturer:'dash-lecturer', staff:'dash-staff' };
  S.view = dashMap[role];
  render();
  toast('success', `已切换至 ${ROLES[role].label}`, '权限、菜单与数据视图已对应调整');
}

/* 登录处理 */
function doLogin() {
  const workno = document.getElementById('inp-workno').value.trim();
  const pwd    = document.getElementById('inp-pwd').value.trim();
  let ok = true;
  if (!workno) {
    document.getElementById('inp-workno').classList.add('error');
    document.getElementById('inp-workno').closest('.field').querySelector('.field-error').textContent = '工号不可为空';
    ok = false;
  }
  if (!pwd) {
    document.getElementById('inp-pwd').classList.add('error');
    document.getElementById('inp-pwd').closest('.field').querySelector('.field-error').textContent = '密码不可为空';
    ok = false;
  }
  if (!ok) return;
  S.role = S.loginRole;
  const dashMap = { admin:'dash-admin', lecturer:'dash-lecturer', staff:'dash-staff' };
  S.view = dashMap[S.role];
  render();
  toast('success', '登录成功', `欢迎，${ROLES[S.role].label}！`);
}

/* 全局事件委托 */
function bindEvents() {
  document.addEventListener('click', (e) => {
    const el = e.target.closest('[data-view],[data-action],[data-switch-role],[data-sel-role],[data-mob-view],[data-case-mode]');
    if (!el) return;

    /* 页面导航 */
    if (el.dataset.view) {
      navigate(el.dataset.view);
      return;
    }

    /* 移动端导航 */
    if (el.dataset.mobView) {
      S.mobileView = el.dataset.mobView;
      render();
      return;
    }

    /* 案例模式 */
    if (el.dataset.caseMode) {
      S.caseMode = el.dataset.caseMode;
      render();
      return;
    }

    /* 角色切换（顶栏）*/
    if (el.dataset.switchRole) {
      switchRole(el.dataset.switchRole);
      return;
    }

    /* 登录角色选择 */
    if (el.dataset.selRole) {
      S.loginRole = el.dataset.selRole;
      render();
      return;
    }

    /* Actions */
    const action = el.dataset.action;
    if (!action) return;

    switch (action) {
      case 'do-login':       doLogin(); break;
      case 'do-face-login':  S.role = S.loginRole; S.view = {admin:'dash-admin',lecturer:'dash-lecturer',staff:'dash-staff'}[S.role]; render(); toast('success','人脸识别成功','欢迎回来！'); break;
      case 'goto-mobile':    S.inMobile = true; S.mobileView = 'mob-home'; render(); break;
      case 'exit-mobile':    S.inMobile = false; render(); break;
      case 'toggle-sidebar': S.collapsed = !S.collapsed; render(); break;

      case 'save-case':
        if (validateForm(document.getElementById('main-content'))) toast('success','案例保存成功','脱敏规则已自动应用，等待审核发布。');
        break;
      case 'apply-desense': toast('success','脱敏规则已应用','姓名、身份证、联系方式、住址均已按规则打码。'); break;
      case 'preview-desense': toast('info','脱敏预览已刷新','右侧预览区显示实时脱敏效果。'); break;
      case 'sync-pacs': toast('info','PACS 同步中...','正在从云影像接口拉取新病例，自动应用脱敏规则，请稍候。'); break;

      case 'save-plan':
        if (validateForm(document.getElementById('main-content'))) { toast('success','培训计划已保存','已提交审核，通过后可发布。'); setTimeout(() => navigate('plan-list'), 600); }
        break;
      case 'publish-plan':   toast('success','培训计划已发布','通知已推送至参与人员（站内消息 + 短信 + 移动端）。'); break;
      case 'approve-plan':
        if (validateForm(document.getElementById('main-content'))) toast('success','审核通过','培训计划已通过审核，可发布。');
        break;
      case 'reject-plan':
        if (validateForm(document.getElementById('main-content'))) toast('warning','计划已退回','意见已记录，保留完整审计痕迹。');
        break;

      case 'confirm-del-case':
        confirm('敏感操作确认', '删除案例属于不可逆操作，将同步清除关联培训引用，此操作需进行二次身份验证。确认继续？', () => {
          toast('success','案例已删除','操作日志已记录，可在日志管理中查看。');
        });
        break;
      case 'confirm-save-interface':
        confirm('接口配置变更确认', '修改接口密钥或连接参数属于敏感操作，将对所有成员医院产生影响，请确认您的身份后继续。', () => {
          toast('success','接口配置已更新','新配置立即生效，已记录操作日志。');
        });
        break;

      case 'test-ifc':   toast('info','连通性测试中...','正在测试接口连通性，请稍候……'); setTimeout(()=>toast('success','测试完成','接口响应正常，延迟 < 100ms。'),1400); break;
      case 'send-remind': toast('success','提醒已发送','签到提醒已推送至未签到人员的移动端与短信。'); break;
      case 'submit-eval':
        if (validateForm(document.getElementById('main-content'))) { toast('success','评价提交成功','感谢您的反馈，已进入档案归档流程。'); setTimeout(() => navigate('archive-list'), 600); }
        break;
      case 'mob-do-sign':  toast('success','签到成功','工号验证通过，签到时间已记录。'); break;
      case 'mob-do-face':  toast('success','人脸识别成功','签到完成，感谢参会！'); break;
      case 'mob-submit-eval': toast('success','评价提交成功','感谢反馈！'); break;
      case 'save-perms':   toast('success','角色权限已保存'); break;
      case 'add-custom-role': toast('info','功能演示','自定义角色创建弹窗（演示版仅提示）'); break;
      case 'save-desense': toast('success','脱敏规则已保存','变更立即对新录入案例生效，已记录操作日志。'); break;
      case 'save-sys-params': toast('success','系统参数已保存'); break;
      case 'export-report': toast('success','报表导出中','Excel 文件生成完成后将自动下载，仅包含脱敏统计数据。'); break;
      case 'full-case':    toast('info','案例已全屏共享','影像已同步至全体参会人员屏幕（脱敏版）。'); break;

      case 'open-case-drawer': {
        const caseId = el.dataset.caseId;
        if (caseId) { S.drawerCaseId = caseId; render(); }
        break;
      }
      case 'close-case-drawer':
        S.drawerCaseId = null; render(); break;

      case 'set-presenting': {
        const caseId = el.dataset.caseId;
        if (!caseId) break;
        if (S.presentingCase === caseId) {
          // 再次点击同一案例 → 取消
          S.presentingCase = null;
          toast('info', '已取消标注', '已清除"正在讲解"状态。');
        } else {
          // 切换到新案例：若原来有标注，先提示已自动取消
          const prev = S.presentingCase
            ? DATA.cases.find(x => x.id === S.presentingCase)
            : null;
          S.presentingCase = caseId;
          const c = DATA.cases.find(x => x.id === caseId);
          if (prev) {
            toast('success', `已切换讲解案例`, `《${prev.name}》已取消，当前讲解：《${c?.name}》`);
          } else {
            toast('success', `已标注为讲解中`, `《${c?.name}》已同步至全体参会人员。`);
          }
        }
        render();
        break;
      }
      case 'end-meeting':
        confirm('结束培训确认', '结束后将自动触发录像归档流程（转码→脱敏水印→加密→写入存储→日志），全程自动完成，档案 15 年合规留存。确认结束？', () => {
          // 显示自动归档进度弹窗
          document.getElementById('modal-area').innerHTML = `
            <div class="modal-mask" id="modal-mask">
              <div class="archive-progress-modal">
                <div style="font-size:24px;margin-bottom:8px">⚡</div>
                <div style="font-size:17px;font-weight:800;color:var(--text-primary)">录像自动归档中</div>
                <div style="font-size:13px;color:var(--text-secondary);margin-top:4px">请稍候，系统正在处理培训录像…</div>
                <div class="archive-progress-steps" id="archive-steps">
                  <div class="archive-step doing"><span class="archive-step-icon">🎬</span>视频转码（H.264→H.265）<span style="margin-left:auto;font-size:11px">处理中…</span></div>
                  <div class="archive-step wait"><span class="archive-step-icon">🛡</span>脱敏水印叠加</div>
                  <div class="archive-step wait"><span class="archive-step-icon">🔐</span>AES-256 加密压缩</div>
                  <div class="archive-step wait"><span class="archive-step-icon">💾</span>写入归档存储（15年）</div>
                  <div class="archive-step wait"><span class="archive-step-icon">📜</span>审计日志写入</div>
                </div>
                <div id="archive-done" style="display:none;color:var(--success);font-weight:700;font-size:14px;margin-top:8px">✅ 归档完成！可在"往期录像"中查看</div>
              </div>
            </div>`;
          // 模拟逐步完成
          const steps = document.querySelectorAll('#archive-steps .archive-step');
          let i = 0;
          const advance = () => {
            if (i > 0) { steps[i-1].className = 'archive-step done'; }
            if (i < steps.length) { steps[i].className = 'archive-step doing'; steps[i].innerHTML += '<span style="margin-left:auto;font-size:11px">处理中…</span>'; i++; setTimeout(advance, 700); }
            else {
              document.getElementById('archive-done').style.display = 'block';
              setTimeout(() => {
                closeModal();
                toast('success','录像已自动归档','可在"往期录像"页面回放，留存 15 年。');
                navigate('video-replay');
              }, 1200);
            }
          };
          setTimeout(advance, 600);
        });
        break;

      case 'sel-recording': {
        const rid = el.dataset.recId;
        if (rid) { S.selRecording = rid; render(); }
        break;
      }
      case 'play-recording': {
        const rid = el.dataset.recId;
        if (rid) { S.selRecording = rid; navigate('video-player'); }
        break;
      }
      case 'toggle-play':   toast('info','播放控制','播放/暂停（演示）'); break;
      case 'seek-back':     toast('info','后退 10 秒','（演示）'); break;
      case 'seek-fwd':      toast('info','前进 10 秒','（演示）'); break;
      case 'seek-video':    toast('info','跳转进度','（演示）'); break;
      case 'vc-mute':       toast('info','静音切换','（演示）'); break;
      case 'vc-speed':      toast('info','倍速切换','支持 0.5x / 1x / 1.5x / 2x（演示）'); break;
      case 'vc-fullscreen': toast('info','全屏播放','（演示）'); break;
      case 'goto-chapter': {
        const idx = parseInt(el.dataset.ch || '0');
        const rec = DATA.recordings.find(r => r.id === S.selRecording);
        if (rec) toast('info', `跳转至章节 ${idx+1}`, rec.chapters[idx]?.label);
        break;
      }
      case 'gen-cert':    toast('success','证书生成成功','电子证书已生成，支持下载与打印。'); break;
      case 'temp-case':   toast('info','临时案例接入','临时案例将经脱敏链路处理后才能共享，请稍候...'); break;
      case 'view-archive': toast('info','档案详情','完整档案包含签到、评价、录像索引与关联案例。'); break;
      case 'role-assign':  toast('info','功能演示','角色分配弹窗（演示版仅提示）'); break;
      case 'toggle-user':  toast('success','状态已切换','账号状态变更立即生效，已记录审计日志。'); break;
      case 'pacs-full':    toast('info','全屏影像','全屏模式（演示）'); break;
      case 'pacs-annotate': toast('success','标注模式已开启','可在影像上拖拽添加重点标注并同步给参会人员。'); break;
      case 'pacs-zoom':    toast('info','放大模式','放大/缩放（演示）'); break;
      case 'toggle-check': {
        const ci = el.closest('.check-item');
        if (ci) { ci.classList.toggle('checked'); const cb = ci.querySelector('.check-box'); cb.classList.toggle('checked'); cb.textContent = ci.classList.contains('checked') ? '✓' : ''; }
        break;
      }
      default: toast('info',`操作演示：${action}`,'此功能在完整版中可用');
    }
  });
}

/* 主渲染 */
function render() {
  const root = document.getElementById('root');
  if (S.view === 'login') {
    root.innerHTML = renderLogin();
  } else if (S.inMobile) {
    root.innerHTML = renderMobileShell();
  } else {
    root.innerHTML = renderApp();
  }
}

/* 启动 */
document.addEventListener('DOMContentLoaded', () => {
  bindEvents();
  render();
});
