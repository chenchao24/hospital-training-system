/* ─── 所有页面渲染函数 ─── */

/* ═══════════════ 登录页 ═══════════════ */
function renderLogin() {
  return `<div class="login-shell">
    <div class="login-brand">
      <div>
        <div class="brand-badge">🏥 <span>医联体统一培训与案例闭环管理平台</span></div>
        <div class="brand-heading">医联体版<br>医院内部在线培训中心系统</div>
        <div class="brand-desc">覆盖多成员医院培训计划、案例脱敏、会议实施、签到评价、档案归档与接口联动全流程。所有患者隐私信息默认按医疗合规要求做脱敏展示，原始数据不可见。</div>
        <div class="brand-stats">
          <div class="brand-stat-box">
            <div class="lbl">本月培训计划</div>
            <div class="val">28</div>
            <div class="lbl">同比提升 18%</div>
          </div>
          <div class="brand-stat-box">
            <div class="lbl">案例库总量</div>
            <div class="val">1,286</div>
            <div class="lbl">PACS 自动同步 63%</div>
          </div>
          <div class="brand-stat-box">
            <div class="lbl">成员医院参与率</div>
            <div class="val">92%</div>
            <div class="lbl">TOP1 第一人民医院</div>
          </div>
          <div class="brand-stat-box">
            <div class="lbl">安全审计状态</div>
            <div class="val">✅ 正常</div>
            <div class="lbl">全链路日志已开启</div>
          </div>
        </div>
      </div>
      <div class="compliance-notice">
        🔐 合规提示：本系统通过医联体主系统自动关联医护人员身份，不开放社会化注册。所有传输通道启用 TLS 1.3 加密，患者姓名、身份证、联系方式、住址等敏感字段全程执行脱敏规则，并纳入全链路审计日志。
      </div>
    </div>

    <div class="login-panel">
      <div>
        <div class="login-heading">统一身份登录</div>
        <div class="login-subhead">请选择您的角色，支持工号密码与人脸识别两种方式</div>
      </div>

      <div class="role-cards">
        ${Object.entries(ROLES).map(([k,r]) => `
          <div class="role-card ${S.loginRole===k?'selected':''}" data-sel-role="${k}">
            <div class="rc-icon">${r.icon}</div>
            <div class="rc-name">${r.label}</div>
            <div class="rc-desc">${
              k==='admin' ? '全系统权限、跨院数据与审核统计' :
              k==='lecturer' ? '本院培训创建、案例调取与实施管控' :
              '培训参与、签到评价、个人档案查看'
            }</div>
          </div>`
        ).join('')}
      </div>

      <div class="field">
        <label class="field-label required">工号</label>
        <input id="inp-workno" class="el-input f-req" data-label="工号" placeholder="请输入工号，例如 A1001">
        <div class="field-error"></div>
      </div>
      <div class="field">
        <label class="field-label required">密码</label>
        <input id="inp-pwd" class="el-input f-req" type="password" data-label="密码" placeholder="请输入密码">
        <div class="field-error"></div>
      </div>

      <div class="actions">
        <button class="btn btn-primary btn-lg" data-action="do-login" style="flex:1">
          🔐 工号密码登录
        </button>
        <button class="btn btn-lg" data-action="do-face-login" style="flex:1">
          👤 人脸识别登录
        </button>
      </div>
      <button class="btn" data-action="goto-mobile" style="width:100%;justify-content:center">
        📱 移动端预览
      </button>

      <div class="login-footer">
        <div>🛡️ 数据安全说明</div>
        <div class="security-badges" style="margin-top:6px">
          <span class="sec-badge">🔒 TLS 1.3 加密</span>
          <span class="sec-badge">🏥 医联体主系统身份核验</span>
          <span class="sec-badge">👁 患者信息全程脱敏</span>
          <span class="sec-badge">📜 操作日志审计</span>
        </div>
        <div style="margin-top:8px;color:var(--text-secondary)">基础身份信息仅支持查看，不可手工修改；所有敏感操作均记录审计日志并支持全链路回溯。</div>
      </div>
    </div>
  </div>`;
}

/* ═══════════════ 通用应用框架 ═══════════════ */
function renderApp() {
  return `<div class="app-shell ${S.collapsed?'collapsed':''}">
    ${renderSidebar()}
    <div class="main-shell">
      ${renderTopbar()}
      <main class="content" id="main-content">
        ${renderCurrentView()}
      </main>
    </div>
  </div>`;
}

function renderSidebar() {
  const r = ROLES[S.role];
  const initial = (r.name || r.label)[0];
  return `<aside class="sidebar">
    <div class="sidebar-brand">
      <div class="brand-logo">
        <div class="brand-icon">🏥</div>
        <div class="brand-text">
          <strong>医联体培训中心</strong>
          <small>v2.0 · 高保真演示</small>
        </div>
      </div>
    </div>

    <div class="sidebar-scroll">
      ${r.menu.map(sec => `
        <div class="nav-section">
          <div class="nav-section-title">${sec.section}</div>
          ${sec.items.map(item => `
            <div class="nav-item ${S.view===item.key?'active':''}" data-view="${item.key}">
              <div class="nav-icon">${item.icon}</div>
              <span class="nav-label">${item.label}</span>
            </div>`
          ).join('')}
        </div>`
      ).join('')}
    </div>

    <div class="sidebar-footer">
      <div class="user-avatar-bar" data-action="goto-mobile">
        <div class="avatar-circle">${initial}</div>
        <div class="avatar-info">
          <strong>${r.name || r.label}</strong>
          <small>${r.title ? r.title + ' · ' : ''}${r.hospital} · ${r.dept}</small>
        </div>
        <span style="color:rgba(255,255,255,.4);font-size:12px;">📱</span>
      </div>
    </div>
  </aside>`;
}

function renderTopbar() {
  const r = ROLES[S.role];
  return `<header class="topbar">
    <div class="topbar-left">
      <button class="toggle-btn" data-action="toggle-sidebar">
        ${S.collapsed ? '→' : '←'}
      </button>
      <div class="topbar-stat">
        <div class="online-dot"></div>
        <span>系统在线 · 患者隐私全程脱敏</span>
      </div>
    </div>
    <div class="topbar-right">
      <div class="role-switcher">
        <span class="role-chip ${S.role==='admin'?'active':''}" data-switch-role="admin">👑 管理员</span>
        <span class="role-chip ${S.role==='lecturer'?'active':''}" data-switch-role="lecturer">🎓 讲师</span>
        <span class="role-chip ${S.role==='staff'?'active':''}" data-switch-role="staff">👨‍⚕️ 医护</span>
      </div>
      <button class="btn btn-sm" data-view="login">退出</button>
    </div>
  </header>`;
}

/* ═══════════════ 管理员首页 ═══════════════ */
function renderDashAdmin() {
  return pageHeader('管理驾驶舱', '查看医联体全量培训、案例、成员医院参与情况与待办事项。',
    `<button class="btn btn-primary" data-view="plan-form">+ 新增培训计划</button>
     <button class="btn" data-view="integrations">查看接口状态</button>`
  ) + `
  <div class="metrics-grid animate-slide">
    <div class="metric-card blue">
      <div class="metric-icon">📋</div>
      <div class="metric-label">本月培训计划数</div>
      <div class="metric-value">28</div>
      <div class="metric-delta"><span class="delta-up">↑ 18%</span> <span>较上月</span></div>
    </div>
    <div class="metric-card green">
      <div class="metric-icon">✅</div>
      <div class="metric-label">培训完成率</div>
      <div class="metric-value">91%</div>
      <div class="metric-delta"><span class="delta-up">↑ 6%</span> <span>较上月</span></div>
    </div>
    <div class="metric-card orange">
      <div class="metric-icon">📍</div>
      <div class="metric-label">签到率</div>
      <div class="metric-value">95%</div>
      <div class="metric-delta"><span class="delta-down">迟到预警 3 人</span></div>
    </div>
    <div class="metric-card blue">
      <div class="metric-icon">📁</div>
      <div class="metric-label">案例库总量</div>
      <div class="metric-value">1,286</div>
      <div class="metric-delta">本周新增 <span class="delta-up">32</span> 个</div>
    </div>
  </div>

  <div class="grid-2">
    <div class="panel">
      <div class="panel-header">
        <div><h3>成员医院培训参与率 TOP</h3><p>近 30 天按参与率排序</p></div>
        <button class="btn btn-sm" data-view="stats-board">查看统计 →</button>
      </div>
      ${barChart(DATA.chartBar)}
    </div>
    <div class="panel">
      <div class="panel-header">
        <div><h3>培训完成率趋势</h3><p>支持时间/医院/科室多维切换</p></div>
        <button class="btn btn-sm" data-view="report-export">导出 →</button>
      </div>
      ${lineChart(DATA.chartLine)}
    </div>
  </div>

  <div class="grid-2">
    <div class="panel">
      <div class="panel-header">
        <div><h3>案例调用结构</h3><p>影像病例教学使用分布</p></div>
        <button class="btn btn-sm" data-view="case-list">案例库 →</button>
      </div>
      ${donutChart(DATA.chartDonut)}
    </div>
    <div class="panel">
      <div class="panel-header">
        <div><h3>待办事项</h3><p>关键流程闭环提醒</p></div>
        <span class="tag tag-orange">今日 8 项</span>
      </div>
      <div class="card-list">
        <div class="card-row">
          <div class="card-row-body">
            <div class="sub-title">🔔 待审核培训计划</div>
            <div class="desc">急诊影像标准化培训 / 提交人：张敏 / 参与范围：医联体 / 审核等待中</div>
          </div>
          <button class="btn btn-primary btn-sm" data-view="plan-review">去审核</button>
        </div>
        <div class="card-row">
          <div class="card-row-body">
            <div class="sub-title">⚠️ 接口异常待处理</div>
            <div class="desc">视频会议接口录像回调签名校验失败，已影响 2 条归档录像写入。</div>
          </div>
          <button class="btn btn-warning btn-sm" data-view="integrations">去处理</button>
        </div>
        <div class="card-row">
          <div class="card-row-body">
            <div class="sub-title">📁 案例脱敏待确认</div>
            <div class="desc">PACS 自动同步新增 4 个病例，待人工确认脱敏效果并发布入库。</div>
          </div>
          <button class="btn btn-sm" data-view="case-detail">查看详情</button>
        </div>
        <div class="card-row">
          <div class="card-row-body">
            <div class="sub-title">📊 本月数据报表</div>
            <div class="desc">医联体 4 月全量数据报表已生成，可导出 Excel 分发各成员医院。</div>
          </div>
          <button class="btn btn-sm" data-view="report-export">导出报表</button>
        </div>
      </div>
    </div>
  </div>`;
}

/* ═══════════════ 讲师首页 ═══════════════ */
function renderDashLecturer() {
  return pageHeader('讲师工作台', '聚焦本院培训创建、实施推进、评价归档与案例调取。',
    `<button class="btn btn-primary" data-view="plan-form">+ 创建培训计划</button>
     <button class="btn" data-view="case-form">新增案例</button>`
  ) + `
  <div class="metrics-grid animate-slide">
    <div class="metric-card blue"><div class="metric-icon">📋</div><div class="metric-label">本月待发布计划</div><div class="metric-value">4</div><div class="metric-delta"><span class="delta-down">2 项待审核</span></div></div>
    <div class="metric-card green"><div class="metric-icon">✅</div><div class="metric-label">培训完成率</div><div class="metric-value">89%</div><div class="metric-delta"><span class="delta-up">↑ 医护覆盖 76%</span></div></div>
    <div class="metric-card orange"><div class="metric-icon">📁</div><div class="metric-label">案例调用次数</div><div class="metric-value">214</div><div class="metric-delta">脑卒中案例最常用</div></div>
    <div class="metric-card red"><div class="metric-icon">✏️</div><div class="metric-label">待评价培训</div><div class="metric-value">3</div><div class="metric-delta">请及时完成归档</div></div>
  </div>

  <div class="grid-3">
    <div class="panel">
      <div class="panel-header"><div><h3>快捷入口</h3><p>高频办公路径</p></div></div>
      <div class="card-list">
        <div class="card-row">
          <div class="card-row-body"><div class="sub-title">📋 发起培训计划</div><div class="desc">支持按医联体/医院/科室/岗位选择参与范围</div></div>
          <button class="btn btn-primary btn-sm" data-view="plan-form">立即创建</button>
        </div>
        <div class="card-row">
          <div class="card-row-body"><div class="sub-title">🔬 PACS 快速抓取案例</div><div class="desc">自动脱敏预览，支持一键应用规则</div></div>
          <button class="btn btn-sm" data-view="case-form">去录入</button>
        </div>
        <div class="card-row">
          <div class="card-row-body"><div class="sub-title">🎥 进入培训会议室</div><div class="desc">实时签到、影像标注、录播留存</div></div>
          <button class="btn btn-sm" data-view="meeting-room">进入会议</button>
        </div>
      </div>
    </div>
    <div class="panel"><div class="panel-header"><div><h3>本院参与率趋势</h3></div></div>${lineChart(DATA.chartLine)}</div>
    <div class="panel">
      <div class="panel-header"><div><h3>待办归档</h3><p>培训完成后闭环</p></div></div>
      <div class="card-list">
        <div class="card-row">
          <div class="card-row-body"><div class="sub-title">卒中绿色通道案例复盘</div><div class="desc">评价已回收 46/48，录像待确认留存期限</div></div>
          <button class="btn btn-sm" data-view="archive-list">去归档</button>
        </div>
        <div class="card-row">
          <div class="card-row-body"><div class="sub-title">心梗急救病例联合教学</div><div class="desc">3 条负面反馈建议优化签到提醒</div></div>
          <button class="btn btn-sm" data-view="eval-list">看评价</button>
        </div>
      </div>
    </div>
  </div>`;
}

/* ═══════════════ 医护首页 ═══════════════ */
function renderDashStaff() {
  return pageHeader('医护首页', '查看我的培训任务、通知公告、脱敏案例入口与个人培训档案。',
    `<button class="btn btn-primary" data-view="eval-form">填写培训评价</button>
     <button class="btn" data-action="goto-mobile">移动端预览</button>`
  ) + `
  <div class="metrics-grid animate-slide">
    <div class="metric-card blue"><div class="metric-icon">📋</div><div class="metric-label">待参与培训</div><div class="metric-value">2</div><div class="metric-delta">本周新增 1 项</div></div>
    <div class="metric-card green"><div class="metric-icon">✅</div><div class="metric-label">已完成培训</div><div class="metric-value">14</div><div class="metric-delta"><span class="delta-up">完成率 93%</span></div></div>
    <div class="metric-card orange"><div class="metric-icon">⏱</div><div class="metric-label">个人培训时长</div><div class="metric-value">32h</div><div class="metric-delta">本月 +6h</div></div>
    <div class="metric-card blue"><div class="metric-icon">📂</div><div class="metric-label">个人档案数</div><div class="metric-value">14</div><div class="metric-delta">证书可下载</div></div>
  </div>

  <div class="grid-2">
    <div class="panel">
      <div class="panel-header"><div><h3>我的培训</h3></div></div>
      <div class="tabs">
        <div class="tab-item active">待参与</div>
        <div class="tab-item">已完成</div>
      </div>
      <div class="card-list">
        <div class="card-row">
          <div class="card-row-body">
            <div class="sub-title">医联体急诊影像标准化培训</div>
            <div class="desc">📅 2026-05-12 14:00 · 讲师：张敏 · 支持视频接入与会前签到</div>
          </div>
          <div class="actions">
            <button class="btn btn-primary btn-sm" data-view="attendance">签到</button>
            <button class="btn btn-sm" data-view="meeting-room">进入</button>
          </div>
        </div>
        <div class="card-row">
          <div class="card-row-body">
            <div class="sub-title">心梗急救病例联合教学</div>
            <div class="desc">📅 2026-05-19 19:00 · 已接收培训通知</div>
          </div>
          <button class="btn btn-sm" data-view="case-detail">预习案例</button>
        </div>
      </div>
    </div>
    <div class="panel">
      <div class="panel-header"><div><h3>通知公告与快捷入口</h3></div></div>
      <div class="card-list">
        <div class="card-row">
          <div class="card-row-body">
            <div class="sub-title">📢 签到方式说明</div>
            <div class="desc">本周签到支持工号验证与人脸识别双方式，迟到阈值 5 分钟，缺席自动记录。</div>
          </div>
          <button class="btn btn-sm" data-view="attendance">查看签到</button>
        </div>
        <div class="card-row">
          <div class="card-row-body">
            <div class="sub-title">📁 脱敏案例库</div>
            <div class="desc">仅开放脱敏案例查看权限，所有患者信息均按规则打码展示。</div>
          </div>
          <button class="btn btn-sm" data-view="case-detail">进入案例库</button>
        </div>
        <div class="card-row">
          <div class="card-row-body">
            <div class="sub-title">📂 个人培训档案</div>
            <div class="desc">支持查看完成记录、电子证书与录像归档。</div>
          </div>
          <button class="btn btn-sm" data-view="archive-list">查看档案</button>
        </div>
      </div>
    </div>
  </div>`;
}

/* ═══════════════ 用户列表 ═══════════════ */
function renderUserList() {
  const users = scopedData('users');
  const canManage = can('*');
  const rows = users.map(u => `<tr>
    <td><input type="checkbox"></td>
    <td><code style="font-size:12px;background:var(--bg-soft);padding:2px 6px;border-radius:4px">${u.id}</code></td>
    <td><strong>${u.name}</strong></td>
    <td>${u.hospital}</td>
    <td>${u.dept}</td>
    <td>${u.title}</td>
    <td><span class="tag tag-blue">${u.role}</span></td>
    <td>${tagDot(u.status)}</td>
    <td>${u.faceOk?'<span class="tag tag-green">已绑定</span>':'<span class="tag tag-gray">未绑定</span>'}</td>
    <td class="td-ops">
      <button class="${btnCls(canManage,'btn-sm')}" data-action="role-assign">分配角色</button>
      <button class="${btnCls(canManage,'btn-sm')}" data-action="toggle-user">${u.status==='启用'?'禁用':'启用'}</button>
    </td>
  </tr>`).join('');

  return pageHeader('用户列表', '同步医联体主系统医护人员主数据，仅可补充非核心信息。',
    `<button class="${btnCls(canManage,'btn-primary btn-sm')}">批量分配角色</button>
     <button class="btn btn-sm">同步医联体</button>`)

  + filterPanel('user-list',
    [filterField('所属医院',['全部医院',...DATA.hospitals]),
     filterField('科室',['全部科室','影像科','急诊科','心内科']),
     filterField('角色',['全部角色','讲师','医护人员']),
     filterField('账号状态',['全部','启用','停用']),
     `<div class="field"><label class="field-label">操作</label><div class="actions"><button class="btn btn-primary">查询</button><button class="btn">重置</button></div></div>`],
    [filterField('岗位',['全部岗位','主任医师','副主任医师','住院医师','护士']),
     filterField('人脸绑定',['全部','已绑定','未绑定']),
     filterField('工号关键词'),
     filterField('同步时间',['近7天','近30天','本月'])],
    '<button class="btn btn-sm">导出Excel</button>'
  )

  + `<div class="panel">
    <div class="actions" style="margin-bottom:12px">
      <button class="${btnCls(canManage,'btn-sm')}">批量启用</button>
      <button class="${btnCls(canManage,'btn-sm')}">批量禁用</button>
      <span class="notice-box info" style="display:inline-flex;padding:6px 10px;font-size:12px">ℹ️ 基础身份信息来自医联体系统，不可手工修改</span>
    </div>
    <div class="table-wrap">
      <table>
        <thead><tr><th><input type="checkbox"></th><th>工号</th><th>姓名</th><th>所属医院</th><th>科室</th><th>岗位</th><th>角色</th><th>状态</th><th>人脸绑定</th><th>操作</th></tr></thead>
        <tbody>${rows}</tbody>
      </table>
    </div>
    <div class="pagination">
      <span class="pagination-info">共 ${users.length} 条（演示数据展示全部）</span>
      <div class="page-nums"><span class="page-num active">1</span><span class="page-num">2</span><span class="page-num">></span></div>
    </div>
  </div>`;
}

/* ═══════════════ 角色权限配置 ═══════════════ */
function renderRolePerms() {
  const canEdit = can('*');
  const roleDefs = [
    { name:'医联体超级管理员', range:'全量', perms:['用户全量管理','案例审核','全模块配置','全量数据统计','接口配置修改（⚠️二次验证）','系统全局设置'] },
    { name:'医院/科室讲师', range:'本医院/科室', perms:['本单位培训计划创建','案例录入与编辑','培训实施与签到提醒','评价归档管理','案例删除（⚠️二次验证）'] },
    { name:'普通医护人员', range:'本人相关', perms:['培训参与','线上签到','脱敏案例查看','评价提交','个人档案查看'] },
  ];

  return pageHeader('角色权限配置', '配置默认角色权限与自定义角色，敏感操作强制二次验证。',
    `<button class="${btnCls(canEdit,'btn-primary')}" data-action="save-perms">保存配置</button>
     <button class="${btnCls(canEdit,'btn')}" data-action="add-custom-role">+ 新增自定义角色</button>`)

  + `<div class="grid-3">
    ${roleDefs.map(r => `
      <div class="panel">
        <div class="panel-header">
          <div><h3>${r.name}</h3><p>数据可见范围：${r.range}</p></div>
        </div>
        <div style="display:flex;flex-direction:column;gap:8px">
          ${r.perms.map(p => `
            <div class="check-item checked">
              <div class="check-box checked">✓</div>
              <div>
                <div style="font-size:13px;font-weight:600">${p}</div>
                <div style="font-size:12px;color:var(--text-secondary)">${p.includes('二次验证')?'敏感操作，执行前弹出确认与身份复核':'按角色和医院维度控制权限边界'}</div>
              </div>
            </div>`).join('')}
        </div>
      </div>`).join('')}
  </div>`;
}

/* ═══════════════ 案例库列表 ═══════════════ */
function renderCaseList() {
  const cases = scopedData('cases');
  const canEdit   = can('case.edit')   || can('*');
  const canCreate = can('case.create') || can('*');
  const canArchive= can('case.archive')|| can('*');

  const rows = cases.map(c => `<tr>
    <td><input type="checkbox"></td>
    <td><code style="font-size:11px;color:var(--text-secondary)">${c.id}</code></td>
    <td data-view="case-detail" style="cursor:pointer;color:var(--primary-dark);font-weight:500">${c.name}</td>
    <td>${c.dept}</td>
    <td><span class="tag tag-blue">${c.disease}</span></td>
    <td>${c.creator}</td>
    <td>${c.hospital}</td>
    <td>${c.date}</td>
    <td><strong>${c.count}</strong></td>
    <td><span class="tag tag-gray">${c.source}</span></td>
    <td>${tag(c.status)}</td>
    <td class="td-ops">
      <button class="btn btn-sm" data-view="case-detail">查看</button>
      <button class="${btnCls(canEdit,'btn-sm')}" data-view="case-form">编辑</button>
      <button class="${btnCls(canArchive,'btn-sm')}">归档</button>
      <button class="${btnCls(canEdit,'btn btn-danger btn-sm')}" data-action="confirm-del-case">删除</button>
    </td>
  </tr>`).join('');

  return pageHeader('案例库列表', '集中管理脱敏病例、PACS 自动同步结果与调用历史。',
    `<button class="${btnCls(canCreate,'btn-primary')}" data-action="sync-pacs">🔄 同步 PACS 案例</button>
     <button class="${btnCls(canCreate,'btn')}" data-view="case-form">+ 手动新增案例</button>`)

  + filterPanel('case-list',
    [filterField('所属科室',['全部科室','影像科','急诊科','心内科','外科']),
     filterField('病种标签',['全部病种','脑卒中','心肌梗死','多发创伤','肺结节']),
     filterField('所属医院',['全部医院',...DATA.hospitals]),
     filterField('案例状态',['全部','在库','归档']),
     `<div class="field"><label class="field-label">操作</label><div class="actions"><button class="btn btn-primary">查询</button><button class="btn">重置</button></div></div>`],
    [filterField('数据来源',['全部','PACS自动','手工录入']),
     filterField('调用次数',['全部','50次以上','100次以上']),
     filterField('创建时间',['近30天','近7天','本月']),
     filterField('关键词')],
    `<button class="${btnCls(canArchive,'btn-sm')}">批量归档</button>
     <button class="${btnCls(canEdit,'btn btn-danger btn-sm')}" data-action="confirm-del-case">批量删除</button>`
  )

  + `<div class="panel">
    <div class="notice-box info" style="margin-bottom:12px">🛡️ 所有患者隐私字段均展示脱敏打码效果，原始数据全程不可见；删除、归档均属敏感操作需二次确认。</div>
    <div class="table-wrap">
      <table>
        <thead><tr><th><input type="checkbox"></th><th>案例编号</th><th>案例名称</th><th>科室</th><th>病种</th><th>创建人</th><th>医院</th><th>创建时间</th><th>调用次数</th><th>来源</th><th>状态</th><th>操作</th></tr></thead>
        <tbody>${rows}</tbody>
      </table>
    </div>
    <div class="pagination">
      <span class="pagination-info">共 386 条（演示展示前 ${cases.length} 条）</span>
      <div class="page-nums"><span class="page-num active">1</span><span class="page-num">2</span><span class="page-num">3</span><span class="page-num">></span></div>
    </div>
  </div>`;
}

/* ═══════════════ 案例新增/编辑 ═══════════════ */
function renderCaseForm() {
  const canSave = can('case.create') || can('case.edit') || can('*');
  return pageHeader('案例新增 / 编辑', '支持 PACS 自动录入与手动录入两种模式，实时预览脱敏效果。',
    `<button class="${btnCls(canSave,'btn-primary')}" data-action="save-case">💾 保存案例</button>
     <button class="btn" data-view="case-list">返回列表</button>`)

  + `<div class="panel">
    <div class="tabs">
      <div class="tab-item ${S.caseMode==='auto'?'active':''}" data-case-mode="auto">🔄 自动录入（PACS / 云影像）</div>
      <div class="tab-item ${S.caseMode==='manual'?'active':''}" data-case-mode="manual">✏️ 手动录入</div>
    </div>

    <div class="grid-2">
      <div style="display:flex;flex-direction:column;gap:14px">
        <div class="form-grid-2">
          <div class="field">
            <label class="field-label required">案例名称</label>
            <input class="el-input f-req" data-label="案例名称" value="急性脑卒中影像判读" placeholder="请输入案例名称">
            <div class="field-error"></div>
          </div>
          <div class="field">
            <label class="field-label required">所属科室</label>
            <select class="el-select f-req" data-label="所属科室"><option>影像科</option><option>急诊科</option><option>心内科</option></select>
            <div class="field-error"></div>
          </div>
        </div>
        <div class="form-grid-2">
          <div class="field">
            <label class="field-label required">病种标签</label>
            <select class="el-select f-req" data-label="病种标签"><option>脑卒中</option><option>心肌梗死</option><option>多发创伤</option></select>
            <div class="field-error"></div>
          </div>
          <div class="field">
            <label class="field-label">影像文件</label>
            <input class="el-input" value="brain-ct-series.zip（已上传）" readonly>
          </div>
        </div>
        <div class="field">
          <label class="field-label required">脱敏后病历内容</label>
          <textarea class="el-textarea f-req" data-label="脱敏病历" rows="8" placeholder="粘贴脱敏后病历内容...">主诉：突发右侧肢体乏力 2 小时
现病史：患者张*，身份证 110101****1234，联系方式 138****0068，于 2026-05-01 出现语言含糊，家属呼叫救护车急诊入院。急诊行头颅 CT 检查示左侧基底节区可疑低密度影。
处理建议：结合 CTA 进一步评估血管情况，启动卒中绿色通道。</textarea>
          <div class="field-error"></div>
        </div>
        <div class="form-grid-2">
          <div class="field"><label class="field-label">标签分类</label><input class="el-input" value="卒中中心, 绿色通道, 影像教学"></div>
          <div class="field"><label class="field-label">备注</label><input class="el-input" value="来自 PACS 自动同步，已执行默认脱敏规则"></div>
        </div>
        <div class="actions">
          <button class="btn btn-primary" data-action="apply-desense">🛡 一键应用脱敏规则</button>
          <button class="btn">📎 上传补充影像</button>
          <button class="btn btn-sm" data-action="preview-desense">实时预览</button>
        </div>
      </div>

      <div style="display:flex;flex-direction:column;gap:14px">
        <div class="panel" style="padding:16px">
          <div class="panel-header">
            <div><h3>🛡 脱敏效果实时预览</h3><p>姓名、身份证、联系方式、住址均按规则打码</p></div>
            <span class="tag tag-green">规则已启用</span>
          </div>
          <div class="desense-preview">患者姓名：<span class="desense-mask">张*</span>
身份证号：<span class="desense-mask">110101****1234</span>
联系方式：<span class="desense-mask">138****0068</span>
家庭住址：<span class="desense-mask">北京市朝阳区****</span>
病历摘要：患者于发病 2 小时内完成头颅 CT 与会诊申请，已启动绿色通道。</div>
          <div class="notice-box info" style="margin-top:12px">ℹ️ 自动录入模式下，原始病例内容仅从 PACS 接口获取并在服务端脱敏后回显；前端原始隐私数据全程不可见。</div>
        </div>

        <div class="pacs-viewer">
          <div class="pacs-header">
            <div style="font-weight:700">🩻 影像预览（DICOM 已脱敏）</div>
            <div class="pacs-toolbar">
              <button class="pacs-btn" data-action="pacs-zoom">放大</button>
              <button class="pacs-btn" data-action="pacs-annotate">标注</button>
              <button class="pacs-btn" data-action="pacs-full">全屏</button>
            </div>
          </div>
          <div class="pacs-canvas">
            <svg class="brain-scan-svg" viewBox="0 0 300 200" width="300" height="200">
              <ellipse cx="150" cy="100" rx="110" ry="80" fill="none" stroke="#3a5470" stroke-width="2"/>
              <ellipse cx="150" cy="100" rx="85" ry="60" fill="none" stroke="#2a4460" stroke-width="1.5"/>
              <path d="M 90,70 Q 120,50 150,65 Q 180,50 210,70" fill="none" stroke="#2a4460" stroke-width="1.5"/>
              <path d="M 80,100 Q 150,130 220,100" fill="none" stroke="#2a4460" stroke-width="1.5"/>
              <ellipse cx="170" cy="108" rx="22" ry="16" fill="rgba(200,180,90,.22)" stroke="#d4a520" stroke-width="1.5" stroke-dasharray="3,2"/>
            </svg>
            <div class="annotation-ring" style="width:46px;height:46px;top:82px;left:154px"></div>
            <div class="annotation-label" style="top:60px;left:200px">⚠️ 可疑低密度影</div>
          </div>
          <div style="font-size:12px;color:rgba(255,255,255,.6);margin-top:8px">重点标注：左侧基底节区可疑低密度影，点击标注可同步至培训会议室</div>
        </div>
      </div>
    </div>
  </div>`;
}

/* ═══════════════ 案例详情 ═══════════════ */
function renderCaseDetail() {
  const c = DATA.cases.find(x => x.id === S.selCase) || DATA.cases[0];
  const canEdit = can('case.edit') || can('*');
  return pageHeader('案例详情', '查看脱敏病例摘要、影像预览、调用历史与操作日志。',
    `<button class="btn btn-primary" data-view="meeting-room">调入会议室</button>
     <button class="${btnCls(canEdit,'btn')}" data-view="case-form">编辑案例</button>`)

  + `<div class="grid-2">
    <div style="display:flex;flex-direction:column;gap:14px">
      <div class="panel">
        <div class="panel-header">
          <div><h3>${c.name}</h3><p>编号：${c.id} · 创建人：${c.creator} · 调用 ${c.count} 次</p></div>
          <span class="tag tag-green">🛡 隐私已脱敏</span>
        </div>
        <div class="grid-2" style="gap:12px;margin-bottom:14px">
          <div style="background:var(--bg-soft);border-radius:var(--radius);padding:14px;border:1px solid var(--border-light)">
            <div style="font-weight:700;margin-bottom:8px">脱敏病例摘要</div>
            <div class="desense-preview" style="margin:0">患者姓名：<span class="desense-mask">${c.patient}</span>
身份证：<span class="desense-mask">${c.idCard}</span>
联系方式：<span class="desense-mask">${c.phone}</span>
住址：<span class="desense-mask">${c.addr}</span></div>
          </div>
          <div style="background:var(--bg-soft);border-radius:var(--radius);padding:14px;border:1px solid var(--border-light)">
            <div style="font-weight:700;margin-bottom:8px">标签信息</div>
            <div class="actions"><span class="tag tag-blue">${c.dept}</span><span class="tag tag-blue">${c.disease}</span><span class="tag tag-green">已脱敏</span></div>
            <div style="margin-top:10px;font-size:13px;color:var(--text-secondary)">所属医院：${c.hospital}<br>来源：${c.source}<br>状态：${c.status}</div>
          </div>
        </div>
        <div class="notice-box danger">🚫 原始患者隐私信息不可查看，仅允许访问脱敏后的教学资料。任何试图绕过脱敏规则的访问均会触发告警并记录日志。</div>
      </div>

      <div class="panel">
        <div class="panel-header"><div><h3>关联培训记录 & 调用历史</h3></div></div>
        <div class="card-list">
          <div class="card-row">
            <div class="card-row-body"><div class="sub-title">卒中绿色通道案例复盘</div><div class="desc">2026-04-21 · 已归档 · 评价 ★ 4.8</div></div>
            <button class="btn btn-sm" data-view="archive-list">查看归档</button>
          </div>
          <div class="card-row">
            <div class="card-row-body"><div class="sub-title">2026-05-08 09:12 张敏调取并全屏展示</div><div class="desc">培训会议室展示，标注已同步全员</div></div>
            <span class="tag tag-green">成功</span>
          </div>
          <div class="card-row">
            <div class="card-row-body"><div class="sub-title">2026-05-03 15:18 李晨课前预习查看</div><div class="desc">数据访问日志已记录，IP：192.168.1.22</div></div>
            <span class="tag tag-green">成功</span>
          </div>
        </div>
      </div>
    </div>

    <div style="display:flex;flex-direction:column;gap:14px">
      <div class="pacs-viewer" style="min-height:300px">
        <div class="pacs-header">
          <div style="font-weight:700">🩻 影像预览与标注</div>
          <div class="pacs-toolbar">
            <button class="pacs-btn" data-action="pacs-full">全屏</button>
            <button class="pacs-btn" data-action="pacs-annotate">添加标注</button>
          </div>
        </div>
        <div class="pacs-canvas" style="height:240px">
          <svg class="brain-scan-svg" viewBox="0 0 300 200" width="300" height="200">
            <ellipse cx="150" cy="100" rx="110" ry="80" fill="none" stroke="#3a5470" stroke-width="2"/>
            <ellipse cx="150" cy="100" rx="85" ry="60" fill="none" stroke="#2a4460" stroke-width="1.5"/>
            <path d="M 90,70 Q 120,50 150,65 Q 180,50 210,70" fill="none" stroke="#2a4460" stroke-width="1.5"/>
            <path d="M 80,100 Q 150,130 220,100" fill="none" stroke="#2a4460" stroke-width="1.5"/>
            <ellipse cx="170" cy="108" rx="22" ry="16" fill="rgba(200,180,90,.22)" stroke="#d4a520" stroke-width="1.5" stroke-dasharray="3,2"/>
          </svg>
          <div class="annotation-ring" style="width:46px;height:46px;top:82px;left:154px"></div>
          <div class="annotation-label" style="top:60px;left:200px">⚠️ 可疑低密度影</div>
        </div>
        <div style="font-size:12px;color:rgba(255,255,255,.6);margin-top:8px">已同步给 48 名参会人员</div>
      </div>
      <div class="panel">
        <div class="panel-header"><div><h3>📜 操作日志</h3><p>全链路可追溯</p></div><span class="tag tag-green">审计开启</span></div>
        <div class="card-list">
          ${[
            { op:'PACS 自动同步入库', time:'2026-05-03 09:20', actor:'系统', result:'成功' },
            { op:'病例详情查看',       time:'2026-05-08 09:15', actor:'李晨', result:'成功' },
            { op:'调入培训会议室',     time:'2026-05-08 09:12', actor:'张敏', result:'成功' },
          ].map(l => `<div class="card-row" style="padding:10px 12px">
            <div><div style="font-size:13px;font-weight:600">${l.op}</div><div style="font-size:12px;color:var(--text-secondary)">${l.time} · 操作人：${l.actor}</div></div>
            ${tag(l.result)}
          </div>`).join('')}
        </div>
      </div>
    </div>
  </div>`;
}

/* ═══════════════ 培训计划列表 ═══════════════ */
function renderPlanList() {
  const plans = scopedData('plans');
  const canCreate = can('plan.create') || can('*');
  const canAudit  = can('*');
  const canPub    = can('plan.publish')|| can('*');
  const isLecturer = S.role === 'lecturer';
  const r = ROLES[S.role];

  const rows = plans.map(p => `<tr>
    <td><input type="checkbox"></td>
    <td data-view="plan-review" style="cursor:pointer;color:var(--primary-dark);font-weight:500">${p.title}</td>
    <td>${p.date}</td>
    <td>${p.dur}</td>
    ${isLecturer ? '' : `<td>${p.lecturer}</td>`}
    <td><span class="tag tag-blue">${p.scope}</span></td>
    <td>${p.cases}</td>
    <td>${tag(p.status)}</td>
    <td>${tag(p.audit)}</td>
    <td>${tag(p.publish)}</td>
    <td class="td-ops">
      <button class="btn btn-sm" data-view="plan-review">查看</button>
      <button class="${btnCls(canCreate && p.status!=='已完成' && p.status!=='已取消','btn-sm')}" data-view="plan-form">编辑</button>
      <button class="${btnCls(canCreate && p.publish!=='已发布' && p.status!=='已完成','btn btn-danger btn-sm')}">删除</button>
      ${isLecturer ? '' : `<button class="${btnCls(canAudit,'btn-sm')}" data-view="plan-review">审核</button>`}
      <button class="${btnCls(canPub && p.audit==='已通过' && p.publish!=='已发布','btn btn-primary btn-sm')}" data-action="publish-plan">发布</button>
    </td>
  </tr>`).join('');

  return pageHeader(
    isLecturer ? '我的培训计划' : '培训计划列表',
    isLecturer
      ? `当前显示 ${r.name}（${r.hospital} · ${r.dept}）名下的全部培训计划。`
      : '覆盖医联体全量培训计划的创建、审核、发布与闭环跟踪。',
    `<button class="${btnCls(canCreate,'btn-primary')}" data-view="plan-form">+ 新增培训计划</button>
     <button class="btn">导出计划</button>`)

  + filterPanel('plan-list',
    [filterField('计划名称'),
     filterField('培训时间',['近30天','近7天','本月']),
     filterField('参与范围',['全部','医联体','医院','科室']),
     filterField('审核状态',['全部','待审核','已通过','已退回']),
     `<div class="field"><label class="field-label">操作</label><div class="actions"><button class="btn btn-primary">查询</button><button class="btn">重置</button></div></div>`],
    [
      ...(isLecturer ? [] : [filterField('讲师')]),
      filterField('发布状态',['全部','已发布','未发布']),
      filterField('关联案例数',['全部','1个以上']),
      filterField('通知方式',['全部','站内消息','短信'])
    ],
  )

  + `<div class="panel">
    ${isLecturer
      ? `<div class="notice-box info" style="margin-bottom:12px;display:flex;align-items:center;gap:8px">
           <span>🎓</span>
           <span>仅显示您（<strong>${r.name}</strong>）名下的培训计划，共 <strong>${plans.length}</strong> 条。如需查看全部计划请联系管理员。</span>
         </div>`
      : `<div class="notice-box warning" style="margin-bottom:12px">⚠️ 已发布计划仅可编辑非核心信息，不可删除；删除操作均属敏感操作需二次确认。</div>`
    }
    <div class="table-wrap">
      <table>
        <thead><tr><th><input type="checkbox"></th><th>计划名称</th><th>培训时间</th><th>时长</th>${isLecturer?'':'<th>讲师</th>'}<th>参与范围</th><th>案例数</th><th>执行状态</th><th>审核状态</th><th>发布状态</th><th>操作</th></tr></thead>
        <tbody>${rows}</tbody>
      </table>
    </div>
    <div class="pagination">
      <span class="pagination-info">共 ${plans.length} 条（演示全部展示）</span>
      <div class="page-nums"><span class="page-num active">1</span><span class="page-num">2</span><span class="page-num">></span></div>
    </div>
  </div>`;
}

/* ═══════════════ 培训计划新增/编辑 ═══════════════ */
function renderPlanForm() {
  const canSave = can('plan.create') || can('plan.edit') || can('*');
  const r = ROLES[S.role];
  const isLecturer = S.role === 'lecturer';
  const isAdmin    = S.role === 'admin';

  // 参与范围选项：讲师默认自己所在院区/科室排第一
  const scopeOptions = isLecturer
    ? [
        `${r.hospital} > ${r.dept}（本科室）`,
        `${r.hospital}（全院）`,
        '医联体 > 急诊科 > 所有岗位',
        '中心医院 > 心内科',
      ]
    : [
        '医联体 > 急诊科 > 所有岗位',
        '第一人民医院 > 影像科',
        '中心医院 > 心内科',
        '医联体全员',
      ];

  return pageHeader('培训计划新增 / 编辑', '配置培训主题、参与范围、关联案例与通知推送方式。',
    `<button class="${btnCls(canSave,'btn-primary')}" data-action="save-plan">💾 保存计划</button>
     <button class="btn" data-view="plan-list">返回列表</button>`)

  // 讲师身份提示条
  + (isLecturer ? `
  <div class="notice-box info" style="margin-bottom:16px;display:flex;align-items:center;gap:10px">
    <span style="font-size:18px">🎓</span>
    <div>
      <strong>以讲师身份创建</strong> — ${r.name}（${r.title}）· ${r.hospital} · ${r.dept}
      <span style="margin-left:12px;font-size:12px;color:var(--text-secondary)">工号：${r.id}</span>
    </div>
  </div>` : '')

  + `<div class="panel">
    <div class="form-grid-2">
      <div class="field">
        <label class="field-label required">培训主题</label>
        <input class="el-input f-req" data-label="培训主题" value="" placeholder="请输入培训主题">
        <div class="field-error"></div>
      </div>
      <div class="field">
        <label class="field-label required">培训时间</label>
        <input class="el-input f-req" data-label="培训时间" value="" placeholder="YYYY-MM-DD HH:mm">
        <div class="field-error"></div>
      </div>
    </div>
    <div class="form-grid-2" style="margin-top:14px">
      <div class="field">
        <label class="field-label required">主讲人</label>
        ${isLecturer
          ? `<div style="display:flex;gap:8px;align-items:center">
               <input class="el-input" value="${r.name}" readonly style="background:var(--bg-soft);color:var(--text-primary);cursor:default;flex:1">
               <span class="tag tag-blue" style="white-space:nowrap">${r.title} · ${r.dept}</span>
             </div>
             <div style="font-size:12px;color:var(--text-secondary);margin-top:4px">🔒 主讲人由系统根据当前登录身份自动填入，不可修改</div>`
          : `<select class="el-select f-req" data-label="主讲人">
               ${DATA.users.filter(u=>u.role==='讲师').map(u=>`<option>${u.name}（${u.hospital} · ${u.dept}）</option>`).join('')}
             </select>`
        }
        <div class="field-error"></div>
      </div>
      <div class="field">
        <label class="field-label required">培训时长</label>
        <input class="el-input f-req" data-label="培训时长" value="" placeholder="例：90分钟">
        <div class="field-error"></div>
      </div>
    </div>
    <div class="form-grid-2" style="margin-top:14px">
      <div class="field">
        <label class="field-label required">参与人员范围</label>
        <select class="el-select f-req" data-label="参与范围">
          ${scopeOptions.map((o,i)=>`<option${i===0?' selected':''} >${o}</option>`).join('')}
        </select>
        ${isLecturer ? `<div style="font-size:12px;color:var(--text-secondary);margin-top:4px">💡 已默认选中您所在的 ${r.hospital} · ${r.dept}</div>` : ''}
        <div class="field-error"></div>
      </div>
      <div class="field">
        <label class="field-label">所属医院</label>
        <input class="el-input" value="${r.hospital}" readonly style="background:var(--bg-soft);color:var(--text-primary);cursor:default">
      </div>
    </div>
    <div class="field" style="margin-top:14px">
      <label class="field-label required">培训内容说明</label>
      <textarea class="el-textarea f-req" data-label="培训内容" rows="4" placeholder="请描述本次培训的主要内容、目标和要求..."></textarea>
      <div class="field-error"></div>
    </div>
  </div>

  <div class="grid-2">
    <div class="panel">
      <div class="panel-header"><div><h3>参与人员多层级筛选</h3><p>支持医联体 / 医院 / 科室 / 岗位组合</p></div></div>
      <div class="check-grid">
        ${(isLecturer ? [
          {label: r.hospital + r.dept + '（本科室）', checked: true},
          {label: r.hospital + '（全院）',           checked: false},
          {label: '医联体 > ' + r.dept,             checked: false},
          {label: r.dept + '医师岗位',              checked: true},
          {label: '护理岗位',                       checked: false},
          {label: '进修人员',                       checked: false},
        ] : [
          {label:'急诊科（医联体）',    checked:true},
          {label:'第一人民医院影像科',  checked:true},
          {label:'中心医院心内科',      checked:false},
          {label:'急诊医师岗位',        checked:true},
          {label:'护理岗位',            checked:false},
          {label:'进修人员',            checked:false},
        ]).map(item => `
          <div class="check-item ${item.checked?'checked':''}" data-action="toggle-check">
            <div class="check-box ${item.checked?'checked':''}">${item.checked?'✓':''}</div>
            <span>${item.label}</span>
          </div>`).join('')}
      </div>
    </div>
    <div class="panel">
      <div class="panel-header">
        <div><h3>关联案例选择</h3><p>从案例库多选，课中支持一键调取</p></div>
        ${isLecturer ? `<span class="tag tag-blue">已优先展示 ${r.dept} 案例</span>` : ''}
      </div>
      <div class="card-list">
        ${(isLecturer
          ? [...DATA.cases.filter(c=>c.dept===r.dept), ...DATA.cases.filter(c=>c.dept!==r.dept)]
          : DATA.cases
        ).slice(0,4).map((c,i) => `
          <div class="card-row">
            <div class="card-row-body">
              <div class="sub-title">${c.name}${isLecturer && c.dept===r.dept ? ' <span class="tag tag-blue" style="font-size:10px;padding:1px 6px">本科室</span>' : ''}</div>
              <div class="desc">${c.dept} · ${c.disease} · 调用 ${c.count} 次</div>
            </div>
            <div class="check-box ${i<2?'checked':''}">${i<2?'✓':''}</div>
          </div>`).join('')}
      </div>
    </div>
  </div>

  <div class="panel">
    <div class="panel-header"><div><h3>通知推送设置</h3></div></div>
    <div class="form-grid-3">
      <div class="field"><label class="field-label">推送方式</label><select class="el-select"><option>站内消息 + 短信 + 移动端推送</option><option>仅站内消息</option></select></div>
      <div class="field"><label class="field-label">会前提醒</label><select class="el-select"><option>T-1天 + T-30分钟</option><option>仅 T-1天</option></select></div>
      <div class="field"><label class="field-label">缺席提醒</label><select class="el-select"><option>超时5分钟自动提醒</option><option>不提醒</option></select></div>
    </div>
    <div class="notice-box warning" style="margin-top:12px">⚠️ 已发布的培训计划仅允许修改非核心信息（通知方式、备注），培训时间与参与范围一旦发布不可修改。</div>
  </div>`;
}

/* ═══════════════ 培训计划审核 ═══════════════ */
function renderPlanReview() {
  const p = DATA.plans.find(x => x.id === S.selPlan) || DATA.plans[0];
  const canAudit = can('*');
  return pageHeader('培训计划审核', '查看计划详情、关联案例与参与范围，完成审核处理。',
    `<button class="${btnCls(canAudit,'btn-success')}" data-action="approve-plan">✅ 审核通过</button>
     <button class="${btnCls(canAudit,'btn-danger btn')}" data-action="reject-plan">❌ 退回</button>`)

  + `<div class="grid-2">
    <div class="panel">
      <div class="panel-header">
        <div><h3>${p.title}</h3><p>计划编号：${p.id}</p></div>
        ${tag(p.audit)}
      </div>
      <div class="grid-2" style="gap:12px;margin-bottom:14px">
        ${[
          ['培训时间', p.date],
          ['培训时长', p.dur],
          ['讲师', p.lecturer],
          ['参与范围', p.scope],
          ['关联案例数', p.cases + ' 个'],
          ['通知方式', '站内消息 + 短信 + 移动端推送'],
        ].map(([k,v]) => `<div style="background:var(--bg-soft);padding:12px;border-radius:var(--radius);border:1px solid var(--border-light)"><div style="font-size:12px;color:var(--text-secondary);margin-bottom:4px">${k}</div><div style="font-weight:600">${v}</div></div>`).join('')}
      </div>
      <div class="notice-box info">ℹ️ 审核通过后方可发布；退回必须填写意见，保留审计痕迹。</div>
      <div class="field" style="margin-top:14px">
        <label class="field-label required">审核意见</label>
        <textarea class="el-textarea f-req" data-label="审核意见" rows="5" placeholder="请输入审核意见（通过或退回均需填写）..."></textarea>
        <div class="field-error"></div>
      </div>
    </div>
    <div class="panel">
      <div class="panel-header"><div><h3>关联案例预览</h3><p>查看案例质量与适配度</p></div></div>
      <div class="card-list">
        ${DATA.cases.slice(0,p.cases).map(c => `
          <div class="card-row">
            <div class="card-row-body">
              <div class="sub-title">${c.name}</div>
              <div class="desc">${c.dept} · ${c.disease} · 脱敏状态正常 · 历史调用 ${c.count} 次</div>
            </div>
            <button class="btn btn-sm" data-view="case-detail">查看</button>
          </div>`).join('')}
      </div>
    </div>
  </div>`;
}

/* ═══════════════ 培训会议室 ═══════════════ */
function renderMeetingRoom() {
  const canManage  = can('meeting.manage') || can('*');
  const isLecturer = canManage;                          // 讲师/管理员视角
  const attendees  = DATA.attendance;
  const meetingCases = DATA.cases.slice(0, 3);           // 本次培训关联案例

  // 右侧案例卡片列表（主讲/医护均可点击查看，主讲额外有"标注讲解中"按钮）
  function caseCard(c) {
    const isPresenting  = S.presentingCase === c.id;
    const hasOther      = S.presentingCase && !isPresenting; // 已有别的案例在讲

    // 主讲人按钮文案：正在讲 → 取消 | 其他有人在讲 → 切换至此 | 无标注 → 标注
    const btnLabel = isPresenting
      ? '🔴 取消标注'
      : hasOther ? '🔄 切换为当前讲解' : '📍 标注为讲解中';
    const btnCls2  = isPresenting ? 'btn-danger' : 'btn-primary';

    return `<div class="case-card-meeting ${isPresenting ? 'is-presenting' : ''}"
                 data-action="open-case-drawer" data-case-id="${c.id}">
      <div style="display:flex;justify-content:space-between;align-items:flex-start;gap:8px">
        <div style="flex:1;min-width:0">
          <div style="font-weight:700;font-size:13px;color:var(--text-primary);margin-bottom:3px">${c.name}</div>
          <div style="font-size:12px;color:var(--text-secondary)">${c.dept} · ${c.disease} · 调用 ${c.count} 次</div>
        </div>
        ${isPresenting
          ? `<span class="presenting-badge">讲解中</span>`
          : hasOther
            ? `<span class="tag tag-orange" style="font-size:11px">可切换</span>`
            : `<span class="tag tag-gray" style="font-size:11px">点击查看</span>`}
      </div>
      ${hasOther && !isPresenting ? `
      <div style="font-size:11px;color:var(--warning);margin-top:6px;padding:4px 6px;background:rgba(230,162,60,.08);border-radius:4px">
        ⚠️ 点击"切换"将自动取消当前正在讲解的案例
      </div>` : ''}
      ${isLecturer ? `
      <div style="margin-top:10px;display:flex;gap:6px" onclick="event.stopPropagation()">
        <button class="btn btn-sm ${btnCls2}"
                data-action="set-presenting" data-case-id="${c.id}">
          ${btnLabel}
        </button>
        <button class="btn btn-sm" data-action="open-case-drawer" data-case-id="${c.id}">
          🔍 展开详情
        </button>
      </div>` : `
      <div style="margin-top:8px">
        <button class="btn btn-sm" style="width:100%;justify-content:center"
                data-action="open-case-drawer" data-case-id="${c.id}">
          🔍 查看案例详情
        </button>
      </div>`}
    </div>`;
  }

  return pageHeader('培训会议室', '嵌入第三方视频会议、实时签到状态、案例调取与影像标注同步。',
    `<button class="btn btn-primary" data-view="attendance">📍 签到管理</button>
     <button class="btn" data-action="goto-mobile">移动端接入</button>`)

  + `<div class="meeting-layout">
    <!-- 左侧参会人员 -->
    <div class="panel" style="padding:14px">
      <div class="panel-header"><div><h3>参会人员</h3><p>实时签到状态</p></div><span class="tag tag-green">在线 48 人</span></div>
      <div style="display:flex;flex-direction:column;gap:8px;max-height:500px;overflow-y:auto">
        ${attendees.map(a => `
          <div style="padding:10px 12px;border:1px solid var(--border-light);border-radius:var(--radius);background:#fff">
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:4px">
              <strong style="font-size:13px">${a.name}</strong>${tag(a.status)}
            </div>
            <div style="font-size:12px;color:var(--text-secondary)">${a.hospital} · ${a.dept}<br>签到：${a.time} · ${a.method}</div>
          </div>`).join('')}
        <div style="padding:10px 12px;border:1px dashed var(--border);border-radius:var(--radius);text-align:center;color:var(--text-secondary);font-size:12px">+ 43 人已签到（演示省略）</div>
      </div>
      <div style="margin-top:12px">${progressBar(96)}</div>
      <div style="font-size:12px;color:var(--text-secondary);margin-top:4px">签到率 48/50 · 96%</div>
    </div>

    <!-- 中央视频区域 -->
    <div class="video-stage">
      <div class="meeting-stats">
        <div class="meeting-stat"><div class="rec-dot"></div><span>录像中</span></div>
        <div class="meeting-stat">⏱ 培训时长 00:42:16</div>
        <div class="meeting-stat">👥 在线 48 人</div>
        <div class="meeting-stat">🔒 TLS1.3 加密传输</div>
        <div class="meeting-stat">🛡 患者信息已脱敏</div>
      </div>
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px">
        <div>
          <div style="font-weight:700;font-size:16px">第三方视频会议接入区</div>
          <div style="font-size:13px;color:rgba(255,255,255,.65);margin-top:2px">
            ${S.presentingCase
              ? `🔴 正在讲解：<strong style="color:#ffa0a0">${DATA.cases.find(c=>c.id===S.presentingCase)?.name || ''}</strong>（脱敏版）`
              : '当前未标注讲解案例'}
          </div>
        </div>
        <div class="actions">
          <button class="${btnCls(isLecturer,'pacs-btn')}" data-action="full-case">全屏共享案例</button>
          <button class="pacs-btn" data-action="end-meeting">结束培训</button>
        </div>
      </div>
      <div class="video-grid">
        <div class="video-tile">
          <div class="name">🎙 ${ROLES[S.role].name || '张志国'}（主讲）</div>
          <div class="status">讲解中 · 第一人民医院</div>
        </div>
        <div class="video-tile"><div class="name">李晨</div><div class="status">已签到 · 急诊科</div></div>
        <div class="video-tile"><div class="name">王宁</div><div class="status">迟到进入 · 心内科</div></div>
        <div class="video-tile"><div class="name">刘洋</div><div class="status">已签到 · 神经内科</div></div>
        <div class="video-tile"><div class="name">孙浩</div><div class="status">已签到 · 骨科</div></div>
        <div class="video-tile" style="opacity:.5"><div class="name">赵峰</div><div class="status">未签到 · 缺席</div></div>
      </div>
      ${S.presentingCase ? `
      <div style="margin-top:14px;background:rgba(245,108,108,.12);border:1px solid rgba(245,108,108,.4);border-radius:var(--radius);padding:12px 16px;display:flex;align-items:center;gap:10px">
        <span class="presenting-badge">讲解中</span>
        <span style="color:rgba(255,255,255,.85);font-size:13px">
          主讲人正在讲解：<strong>${DATA.cases.find(c=>c.id===S.presentingCase)?.name}</strong>
          —— <span style="opacity:.7">点击右侧案例卡片可跟随查看详情</span>
        </span>
        <button class="btn btn-sm" style="margin-left:auto;flex-shrink:0"
                data-action="open-case-drawer" data-case-id="${S.presentingCase}">立即查看</button>
      </div>` : `
      <div class="notice-box danger" style="margin-top:14px;background:rgba(245,108,108,.1);border-color:rgba(245,108,108,.4);color:rgba(255,255,255,.85)">
        ⚠️ 临时新增案例必须经即时脱敏链路后才允许向全体参会人员展示，原始影像数据不得直接共享。
      </div>`}
    </div>

    <!-- 右侧案例面板 -->
    <div class="panel" style="padding:14px;display:flex;flex-direction:column;gap:12px">
      <div class="panel-header">
        <div>
          <h3>案例调取面板</h3>
          <p>${isLecturer ? '点击案例查看详情，或标注为当前讲解中' : '点击案例跟随查看讲解内容'}</p>
        </div>
        ${isLecturer ? `<button class="btn btn-sm" data-action="temp-case">临时新增</button>` : ''}
      </div>

      ${S.presentingCase ? `
      <div style="background:rgba(245,108,108,.06);border:1.5px solid var(--danger);border-radius:var(--radius-lg);padding:10px 12px;font-size:12px">
        <div style="font-weight:700;color:var(--danger);margin-bottom:4px">🔴 当前正在讲解</div>
        <div style="color:var(--text-primary);font-weight:600">${DATA.cases.find(c=>c.id===S.presentingCase)?.name}</div>
      </div>` : ''}

      <div>
        <div style="font-size:12px;font-weight:700;color:var(--text-secondary);margin-bottom:8px;text-transform:uppercase;letter-spacing:.05em">本次关联案例</div>
        <div style="display:flex;flex-direction:column;gap:8px">
          ${meetingCases.map(c => caseCard(c)).join('')}
        </div>
      </div>

      <div style="border:1px solid var(--border-light);border-radius:var(--radius);padding:12px;background:var(--bg-soft)">
        <div style="font-size:13px;font-weight:600;margin-bottom:6px">📌 影像重点标注</div>
        <div style="font-size:12px;color:var(--text-secondary)">
          ${S.presentingCase
            ? `当前案例标注已同步至全体参会人员`
            : '暂无标注，主讲人标注案例后将自动同步'}
        </div>
        ${progressBar(S.presentingCase ? 94 : 0)}
        <div style="font-size:12px;color:var(--text-secondary);margin-top:4px">${S.presentingCase ? '同步完成率 94%' : '等待标注中'}</div>
        ${isLecturer ? `
        <div class="actions" style="margin-top:10px">
          <button class="btn btn-sm" data-action="pacs-annotate">添加标注</button>
          <button class="btn btn-sm" data-action="view-archive">查看历史</button>
        </div>` : ''}
      </div>
    </div>
  </div>

  ${renderCaseDrawer()}`;
}

/* ═══════════════ 案例详情抽屉 ═══════════════ */
function renderCaseDrawer() {
  if (!S.drawerCaseId) return '';
  const c = DATA.cases.find(x => x.id === S.drawerCaseId) || DATA.cases[0];
  const canManage  = can('meeting.manage') || can('*');
  const isPresenting = S.presentingCase === c.id;

  return `
  <div class="case-drawer-overlay" data-action="close-case-drawer"></div>
  <div class="case-drawer">
    <div class="case-drawer-header">
      <div>
        <div style="display:flex;align-items:center;gap:8px">
          <h3>${c.name}</h3>
          ${isPresenting ? `<span class="presenting-badge">讲解中</span>` : ''}
        </div>
        <p>${c.dept} · ${c.disease} · 编号 ${c.id}</p>
      </div>
      <button class="case-drawer-close" data-action="close-case-drawer">✕</button>
    </div>

    <div class="case-drawer-body">
      <!-- 脱敏摘要 -->
      <div class="panel" style="padding:14px">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:10px">
          <strong style="font-size:13px">🛡 脱敏病例摘要</strong>
          <span class="tag tag-green">隐私已打码</span>
        </div>
        <div class="desense-preview" style="font-size:12.5px">
患者姓名：<span class="desense-mask">${c.patient}</span>
身份证号：<span class="desense-mask">${c.idCard}</span>
联系方式：<span class="desense-mask">${c.phone}</span>
家庭住址：<span class="desense-mask">${c.addr}</span>
        </div>
        <div style="margin-top:10px;display:flex;gap:6px;flex-wrap:wrap">
          <span class="tag tag-blue">${c.dept}</span>
          <span class="tag tag-blue">${c.disease}</span>
          <span class="tag tag-gray">${c.source}</span>
          <span class="tag tag-gray">调用 ${c.count} 次</span>
        </div>
      </div>

      <!-- 影像预览 -->
      <div class="pacs-viewer" style="min-height:260px">
        <div class="pacs-header">
          <div style="font-weight:700">🩻 影像预览（DICOM 已脱敏）</div>
          <div class="pacs-toolbar">
            <button class="pacs-btn" data-action="pacs-zoom">放大</button>
            <button class="pacs-btn" data-action="pacs-annotate">标注</button>
            <button class="pacs-btn" data-action="pacs-full">全屏</button>
          </div>
        </div>
        <div class="pacs-canvas" style="height:200px">
          <svg class="brain-scan-svg" viewBox="0 0 300 200" width="300" height="200">
            <ellipse cx="150" cy="100" rx="110" ry="80" fill="none" stroke="#3a5470" stroke-width="2"/>
            <ellipse cx="150" cy="100" rx="85"  ry="60" fill="none" stroke="#2a4460" stroke-width="1.5"/>
            <path d="M 90,70 Q 120,50 150,65 Q 180,50 210,70" fill="none" stroke="#2a4460" stroke-width="1.5"/>
            <path d="M 80,100 Q 150,130 220,100"              fill="none" stroke="#2a4460" stroke-width="1.5"/>
            <ellipse cx="170" cy="108" rx="22" ry="16"
              fill="rgba(200,180,90,.22)" stroke="#d4a520" stroke-width="1.5" stroke-dasharray="3,2"/>
          </svg>
          <div class="annotation-ring"  style="width:46px;height:46px;top:82px;left:154px"></div>
          <div class="annotation-label" style="top:58px;left:196px">⚠️ 可疑低密度影</div>
        </div>
        <div style="font-size:12px;color:rgba(255,255,255,.6);margin-top:6px">
          ${isPresenting ? '🔴 主讲人正在讲解此案例，标注已同步' : '点击标注区域可查看详情'}
        </div>
      </div>

      <!-- 标注面板（仅主讲人可操作）-->
      ${canManage ? `
      <div class="panel" style="padding:14px">
        <div style="font-size:13px;font-weight:700;margin-bottom:10px">📌 标注控制台</div>
        <div style="display:flex;flex-direction:column;gap:8px">
          <div style="background:var(--bg-soft);border-radius:var(--radius);padding:10px 12px;font-size:12px">
            <div style="font-weight:600;margin-bottom:3px">当前标注：左侧基底节区可疑低密度影</div>
            <div style="color:var(--text-secondary)">已同步 48 人 · 2026-05-08 09:12</div>
          </div>
          <div class="actions">
            <button class="btn btn-sm btn-primary" data-action="pacs-annotate">+ 添加标注</button>
            <button class="btn btn-sm" data-action="pacs-zoom">调整视野</button>
            <button class="btn btn-sm" data-action="full-case">全屏共享</button>
          </div>
        </div>
      </div>` : `
      <div class="notice-box info" style="font-size:12px">
        ℹ️ 标注内容由主讲人控制并实时同步，您处于只读查看模式。
      </div>`}
    </div>

    <div class="case-drawer-footer">
      ${canManage ? (() => {
        const hasOtherPresenting = S.presentingCase && !isPresenting;
        const drawerBtnLabel = isPresenting
          ? '🔴 取消"正在讲解"标注'
          : hasOtherPresenting ? '🔄 切换为当前讲解案例' : '📍 标注为当前讲解案例';
        return `
        <button class="btn ${isPresenting ? 'btn-danger' : 'btn-primary'}"
                style="flex:1;justify-content:center"
                data-action="set-presenting" data-case-id="${c.id}">
          ${drawerBtnLabel}
        </button>
        ${hasOtherPresenting ? `<span style="font-size:11px;color:var(--warning);white-space:nowrap">将替换当前标注</span>` : ''}`;
      })() : `
        <div style="flex:1;font-size:12px;color:var(--text-secondary);display:flex;align-items:center">
          ${isPresenting ? `<span class="presenting-badge">主讲人正在讲解此案例</span>` : '只读查看模式'}
        </div>`}
      <button class="btn" data-action="close-case-drawer">关闭</button>
    </div>
  </div>`;
}

/* ═══════════════ 签到管理 ═══════════════ */
function renderAttendance() {
  const canOp = can('attend.view') || can('attend.remind') || can('*');
  return pageHeader('签到管理', '查看培训签到明细，支持工号验证、人脸识别、提醒与导出。',
    `<button class="${btnCls(canOp,'btn-primary')}" data-action="send-remind">📢 发送签到提醒</button>
     <button class="${btnCls(canOp,'btn')}">导出签到数据</button>`)

  + `<div class="metrics-grid animate-slide">
    <div class="metric-card blue"><div class="metric-icon">👥</div><div class="metric-label">应签到人数</div><div class="metric-value">50</div><div class="metric-delta">跨院联合培训</div></div>
    <div class="metric-card green"><div class="metric-icon">✅</div><div class="metric-label">已签到</div><div class="metric-value">48</div><div class="metric-delta"><span class="delta-up">签到率 96%</span></div></div>
    <div class="metric-card orange"><div class="metric-icon">⏰</div><div class="metric-label">迟到人数</div><div class="metric-value">2</div><div class="metric-delta">超时阈值 5 分钟</div></div>
    <div class="metric-card red"><div class="metric-icon">❌</div><div class="metric-label">缺席人数</div><div class="metric-value">2</div><div class="metric-delta">已发送提醒</div></div>
  </div>`

  + `<div class="panel">
    <div class="table-wrap">
      <table>
        <thead><tr><th>人员信息</th><th>所属医院</th><th>科室</th><th>签到时间</th><th>签到状态</th><th>签到方式</th><th>操作</th></tr></thead>
        <tbody>
          ${DATA.attendance.map(a => `<tr>
            <td><strong>${a.name}</strong></td>
            <td>${a.hospital}</td>
            <td>${a.dept}</td>
            <td>${a.time}</td>
            <td>${tagDot(a.status)}</td>
            <td>${a.method}</td>
            <td class="td-ops">
              <button class="btn btn-sm">查看轨迹</button>
              <button class="${btnCls(canOp,'btn-sm')}" data-action="send-remind">提醒</button>
            </td>
          </tr>`).join('')}
        </tbody>
      </table>
    </div>
    <div class="notice-box info" style="margin-top:14px">ℹ️ 签到方式支持工号验证与人脸识别，异常记录自动纳入审计；迟到判定阈值为系统参数中配置的 5 分钟。</div>
  </div>`;
}

/* ═══════════════ 评价列表 ═══════════════ */
function renderEvalList() {
  return pageHeader('培训评价列表', '查看培训评价汇总、留言内容与导出结果。',
    `<button class="btn btn-primary">导出评价数据</button>
     <button class="btn" data-view="archive-list">进入档案归档</button>`)

  + `<div class="grid-2">
    <div class="panel">
      <div class="panel-header"><div><h3>评价汇总</h3><p>平均评分、评价人数、留言趋势</p></div></div>
      <div class="card-list">
        ${DATA.evaluations.map(e => `
          <div class="card-row">
            <div class="card-row-body">
              <div class="sub-title">${e.plan}</div>
              <div style="margin:4px 0">${stars(e.score)} <strong>${e.score}</strong> <span style="font-size:12px;color:var(--text-secondary)">（${e.count} 人评价）</span></div>
              <div class="desc">留言摘要：${e.comment}</div>
            </div>
            <button class="btn btn-sm" data-view="eval-form">查看明细</button>
          </div>`).join('')}
      </div>
    </div>
    <div class="panel">
      <div class="panel-header"><div><h3>评价维度分析</h3></div></div>
      ${donutChart([
        {label:'内容实用性',value:42,color:'#409eff'},
        {label:'讲师质量',value:33,color:'#67c23a'},
        {label:'案例匹配度',value:25,color:'#e6a23c'},
      ])}
    </div>
  </div>`;
}

/* ═══════════════ 评价问卷 ═══════════════ */
function renderEvalForm() {
  return pageHeader('培训评价问卷', '培训结束后推送的评价表单，提交后进入归档闭环。',
    `<button class="btn btn-primary" data-action="submit-eval">提交评价</button>
     <button class="btn" data-view="dash-staff">返回首页</button>`)

  + `<div class="panel" style="max-width:680px">
    <div class="notice-box info" style="margin-bottom:16px">📋 当前评价：医联体急诊影像标准化培训。评价有效时间截止 2026-05-13 23:59，逾期自动归档为"未评价"。</div>

    ${[
      {label:'培训内容实用性',score:5},
      {label:'讲师讲解质量',score:5},
      {label:'案例匹配度',score:4},
      {label:'组织协调满意度',score:4},
    ].map(item => `
      <div class="field" style="margin-bottom:16px">
        <label class="field-label required">${item.label}</label>
        <div class="actions">
          ${[1,2,3,4,5].map(n => `
            <span style="display:flex;align-items:center;gap:4px;cursor:pointer">
              <span style="font-size:24px;color:${n<=item.score?'#f5a623':'#dcdfe6'}">★</span>
              <span style="font-size:12px;color:var(--text-secondary)">${n}分</span>
            </span>`).join('')}
        </div>
        <div class="field-error"></div>
      </div>`).join('')}

    <div class="field">
      <label class="field-label">留言反馈（选填）</label>
      <textarea class="el-textarea" rows="5" placeholder="请输入您的培训反馈，例如：建议增加会前签到提醒与移动端课后回看入口..."></textarea>
    </div>
  </div>`;
}

/* ═══════════════ 往期录像列表 ═══════════════ */
function renderVideoReplay() {
  const isLecturer = S.role === 'lecturer';
  const isStaff    = S.role === 'staff';

  // 按角色过滤录像可见范围
  const recs = isLecturer
    ? DATA.recordings.filter(r => r.lecturer === ROLES[S.role].name)
    : DATA.recordings;

  // 统计
  const totalDur  = recs.reduce((s, r) => {
    const [h, m] = r.duration.split(':').map(Number); return s + h * 60 + m;
  }, 0);

  function recCard(r) {
    const isSelected = S.selRecording === r.id;
    return `<div class="rec-card ${isSelected ? 'selected' : ''}"
                 data-action="sel-recording" data-rec-id="${r.id}">
      <div class="rec-thumbnail">
        🎬
        <div class="rec-duration-badge">${r.duration}</div>
      </div>
      <div style="flex:1;min-width:0">
        <div style="display:flex;align-items:center;gap:6px;flex-wrap:wrap;margin-bottom:4px">
          <span style="font-weight:700;font-size:13.5px;color:var(--text-primary)">${r.title}</span>
          ${r.autoArchived ? '<span class="rec-auto-badge">⚡ 自动归档</span>' : ''}
          ${tag(r.status)}
        </div>
        <div style="font-size:12px;color:var(--text-secondary);margin-bottom:6px">
          📅 ${r.date} &nbsp;·&nbsp; 🎓 ${r.lecturer} · ${r.dept}
          &nbsp;·&nbsp; 👥 ${r.viewers} 人参与 &nbsp;·&nbsp; 💾 ${r.fileSize}
        </div>
        <div style="font-size:12px;color:var(--text-secondary)">
          🗃️ 留存至 ${r.expires} &nbsp;·&nbsp; 章节 ${r.chapters.length} 个
          ${r.cases.length ? `&nbsp;·&nbsp; 📁 关联案例 ${r.cases.length} 个` : ''}
        </div>
      </div>
      <div style="display:flex;flex-direction:column;gap:6px;align-items:flex-end;flex-shrink:0">
        <button class="btn btn-primary btn-sm" data-action="play-recording" data-rec-id="${r.id}">▶ 播放</button>
        ${!isStaff ? `<button class="btn btn-sm">⬇ 下载</button>` : ''}
      </div>
    </div>`;
  }

  return pageHeader(
    isLecturer ? '我的培训录像' : '往期培训录像',
    isLecturer
      ? `${ROLES[S.role].name} 名下全部录像，培训结束后自动归档，15 年合规留存。`
      : '全量培训录像库，支持按主题/讲师/时间检索，培训结束后系统自动归档。',
    `<button class="btn btn-primary" data-action="play-recording" data-rec-id="${S.selRecording}">▶ 播放选中录像</button>
     ${!isStaff ? `<button class="btn">批量导出清单</button>` : ''}`
  )

  + `<div class="metrics-grid animate-slide">
    <div class="metric-card blue">
      <div class="metric-icon">🎬</div>
      <div class="metric-label">录像总数</div>
      <div class="metric-value">${recs.length}</div>
      <div class="metric-delta">全部自动归档</div>
    </div>
    <div class="metric-card green">
      <div class="metric-icon">⏱</div>
      <div class="metric-label">总时长</div>
      <div class="metric-value">${Math.floor(totalDur/60)}h ${totalDur%60}m</div>
      <div class="metric-delta">可随时回看</div>
    </div>
    <div class="metric-card orange">
      <div class="metric-icon">👥</div>
      <div class="metric-label">累计观看人次</div>
      <div class="metric-value">${recs.reduce((s,r)=>s+r.viewers,0)}</div>
      <div class="metric-delta">本月新增观看</div>
    </div>
    <div class="metric-card blue">
      <div class="metric-icon">🗃️</div>
      <div class="metric-label">留存规范</div>
      <div class="metric-value">15年</div>
      <div class="metric-delta">合规加密存储</div>
    </div>
  </div>

  <div class="panel" style="margin-bottom:20px">
    <div class="notice-box info" style="margin-bottom:14px">
      ⚡ <strong>自动归档说明：</strong>培训结束后系统自动触发录像归档流程——
      <span style="color:var(--text-secondary)">视频转码 → 脱敏水印叠加 → 加密压缩 → 写入归档存储 → 日志记录</span>，
      全程无需人工干预，完成后即可在此页面查看与回放。
    </div>
    ${filterPanel('video-replay',
      [filterField('培训主题'),
       filterField('时间范围',['全部','近30天','近3个月','近半年']),
       ...(isLecturer ? [] : [filterField('讲师'), filterField('所属医院',['全部医院',...DATA.hospitals])]),
       `<div class="field"><label class="field-label">操作</label><div class="actions"><button class="btn btn-primary">查询</button><button class="btn">重置</button></div></div>`],
      [filterField('科室',['全部科室','影像科','心内科','急诊科']),
       filterField('参与范围',['全部','医联体级','医院级','科室级']),
       filterField('时长',['全部','60分钟内','60-120分钟','120分钟以上'])],
    )}
    <div style="display:flex;flex-direction:column;gap:10px">
      ${recs.map(r => recCard(r)).join('')}
    </div>
    <div class="pagination" style="margin-top:16px">
      <span class="pagination-info">共 ${recs.length} 条录像</span>
      <div class="page-nums"><span class="page-num active">1</span><span class="page-num">></span></div>
    </div>
  </div>`;
}

/* ═══════════════ 录像播放器 ═══════════════ */
function renderVideoPlayer() {
  const rec = DATA.recordings.find(r => r.id === S.selRecording) || DATA.recordings[0];
  const relatedCases = DATA.cases.filter(c => rec.cases.includes(c.id));

  return pageHeader('录像回放', `${rec.title} · ${rec.date}`,
    `<button class="btn" data-view="video-replay">← 返回列表</button>
     <button class="btn btn-sm">⬇ 下载录像</button>`)

  + `<div class="grid-2" style="align-items:start">

    <!-- 左侧：播放器 + 章节 -->
    <div style="display:flex;flex-direction:column;gap:16px">
      <div class="video-player-shell">
        <!-- 视频画面 -->
        <div class="video-screen" data-action="toggle-play">
          <div style="position:absolute;inset:0;opacity:.06;background:repeating-linear-gradient(0deg,transparent,transparent 28px,rgba(255,255,255,.03) 28px,rgba(255,255,255,.03) 29px)"></div>
          <div class="video-watermark">🛡 患者信息已脱敏 · 仅限内部培训使用</div>
          <div class="play-btn-big">▶</div>
          <div class="video-playing-info">
            🎓 ${rec.lecturer} · ${rec.hospital} · ${rec.dept}<br>
            👥 ${rec.viewers} 人参与 · 📅 ${rec.date}
          </div>
          <!-- 模拟影像帧 -->
          <svg style="position:absolute;opacity:.12" viewBox="0 0 400 225" width="400" height="225">
            <ellipse cx="200" cy="113" rx="140" ry="90" fill="none" stroke="#7dc7ff" stroke-width="1.5"/>
            <ellipse cx="200" cy="113" rx="105" ry="68" fill="none" stroke="#5baad8" stroke-width="1"/>
            <path d="M 120,90 Q 160,70 200,82 Q 240,70 280,90" fill="none" stroke="#5baad8" stroke-width="1"/>
            <ellipse cx="220" cy="120" rx="26" ry="18" fill="rgba(200,180,90,.18)" stroke="#d4a520" stroke-width="1.2" stroke-dasharray="3,2"/>
          </svg>
        </div>

        <!-- 进度条 -->
        <div style="padding:0 16px;margin-top:10px">
          <div class="progress-bar-wrap" data-action="seek-video">
            <div class="progress-bar-fill"></div>
            ${rec.chapters.map((ch, i) => {
              const [h,m,s] = (ch.time.includes(':') ? ch.time.split(':') : [0,...ch.time.split(':')]).map(Number);
              const total = (() => { const [th,tm,ts] = rec.duration.split(':').map(Number); return th*3600+tm*60+ts; })();
              const sec = h*3600 + m*60 + (s||0);
              const pct = Math.round(sec/total*100);
              return `<div class="progress-chapter-mark" style="left:${pct}%" title="${ch.label} ${ch.time}"></div>`;
            }).join('')}
          </div>
          <div style="display:flex;justify-content:space-between;font-size:11px;color:rgba(255,255,255,.35);margin-top:4px">
            <span>00:42:10</span><span>${rec.duration}</span>
          </div>
        </div>

        <!-- 控制栏 -->
        <div class="video-controls">
          <button class="vc-btn" data-action="toggle-play">⏸</button>
          <button class="vc-btn" data-action="seek-back">⏪</button>
          <button class="vc-btn" data-action="seek-fwd">⏩</button>
          <div class="progress-bar-wrap" style="max-width:none;flex:1" data-action="seek-video">
            <div class="progress-bar-fill"></div>
          </div>
          <span class="vc-time">42:10 / ${rec.duration}</span>
          <button class="vc-btn" data-action="vc-mute">🔊</button>
          <button class="vc-btn" data-action="vc-speed">1x</button>
          <button class="vc-btn" data-action="vc-fullscreen">⛶</button>
        </div>
      </div>

      <!-- 章节导航 -->
      <div class="panel" style="padding:16px">
        <div style="font-size:13px;font-weight:700;margin-bottom:12px;display:flex;justify-content:space-between;align-items:center">
          <span>📑 章节目录</span>
          <span class="tag tag-gray">${rec.chapters.length} 个章节</span>
        </div>
        <div class="chapter-list">
          ${rec.chapters.map((ch, i) => `
            <div class="chapter-item ${i===1?'active':''}" data-action="goto-chapter" data-ch="${i}">
              <span class="chapter-time-badge">${ch.time}</span>
              <span class="chapter-label">${i+1}. ${ch.label}</span>
              ${i===1 ? '<span class="tag tag-blue" style="font-size:11px;margin-left:auto">当前</span>' : ''}
            </div>`).join('')}
        </div>
      </div>
    </div>

    <!-- 右侧：录像信息 + 关联案例 -->
    <div style="display:flex;flex-direction:column;gap:16px">

      <!-- 基本信息 -->
      <div class="panel" style="padding:16px">
        <div style="font-weight:700;font-size:15px;margin-bottom:12px">${rec.title}</div>
        <div class="grid-2" style="gap:10px;margin-bottom:0">
          ${[
            ['🎓 主讲人', `${rec.lecturer} · ${rec.dept}`],
            ['🏥 所属医院', rec.hospital],
            ['📅 培训日期', rec.date],
            ['⏱ 录像时长', rec.duration],
            ['👥 参与人数', `${rec.viewers} 人`],
            ['💾 文件大小', rec.fileSize],
            ['🗃️ 留存期限', `至 ${rec.expires}`],
            ['🔒 归档方式', rec.autoArchived ? '⚡ 自动归档' : '手动归档'],
          ].map(([k,v]) => `
            <div style="background:var(--bg-soft);padding:10px 12px;border-radius:var(--radius);border:1px solid var(--border-light)">
              <div style="font-size:11px;color:var(--text-secondary);margin-bottom:3px">${k}</div>
              <div style="font-size:13px;font-weight:600">${v}</div>
            </div>`).join('')}
        </div>
      </div>

      <!-- 归档流程溯源 -->
      <div class="panel" style="padding:16px">
        <div style="font-size:13px;font-weight:700;margin-bottom:12px">⚡ 自动归档流程记录</div>
        <div style="display:flex;flex-direction:column;gap:6px">
          ${[
            { icon:'🔴', label:'培训结束触发归档',     time:'培训结束 +0s',   done:true },
            { icon:'🎬', label:'视频转码（H.264→H.265）', time:'+2分12秒完成', done:true },
            { icon:'🛡',  label:'脱敏水印叠加',         time:'+45秒完成',     done:true },
            { icon:'🔐', label:'AES-256 加密压缩',      time:'+1分30秒完成',  done:true },
            { icon:'💾', label:'写入归档存储（15年）',  time:'+3分02秒完成',  done:true },
            { icon:'📜', label:'审计日志写入',           time:'+3分05秒完成',  done:true },
          ].map(s => `
            <div class="archive-step done">
              <span class="archive-step-icon">${s.icon}</span>
              <span style="flex:1">${s.label}</span>
              <span style="font-size:11px;color:var(--text-secondary)">${s.time}</span>
            </div>`).join('')}
        </div>
        <div class="notice-box info" style="margin-top:12px;font-size:12px">
          🔒 录像文件采用 AES-256 加密存储，仅授权人员可访问，所有查看操作均记录审计日志。
        </div>
      </div>

      <!-- 关联案例 -->
      ${relatedCases.length ? `
      <div class="panel" style="padding:16px">
        <div style="font-size:13px;font-weight:700;margin-bottom:12px">📁 本次关联案例</div>
        <div style="display:flex;flex-direction:column;gap:8px">
          ${relatedCases.map(c => `
            <div class="card-row">
              <div class="card-row-body">
                <div class="sub-title">${c.name}</div>
                <div class="desc">${c.dept} · ${c.disease} · 调用 ${c.count} 次</div>
              </div>
              <button class="btn btn-sm" data-action="open-case-drawer" data-case-id="${c.id}">查看案例</button>
            </div>`).join('')}
        </div>
      </div>` : ''}

      <!-- 其他录像快捷切换 -->
      <div class="panel" style="padding:16px">
        <div style="font-size:13px;font-weight:700;margin-bottom:12px">🎬 其他录像</div>
        <div style="display:flex;flex-direction:column;gap:6px">
          ${DATA.recordings.filter(r=>r.id!==rec.id).slice(0,3).map(r => `
            <div style="display:flex;align-items:center;gap:10px;padding:8px 10px;border:1px solid var(--border-light);border-radius:var(--radius);cursor:pointer;transition:all .2s"
                 data-action="play-recording" data-rec-id="${r.id}">
              <span style="font-size:18px">🎬</span>
              <div style="flex:1;min-width:0">
                <div style="font-size:12.5px;font-weight:600;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${r.title}</div>
                <div style="font-size:11px;color:var(--text-secondary)">${r.date.slice(0,10)} · ${r.duration}</div>
              </div>
              <button class="btn btn-sm" style="flex-shrink:0">▶</button>
            </div>`).join('')}
        </div>
        <button class="btn" style="width:100%;justify-content:center;margin-top:8px" data-view="video-replay">查看全部录像 →</button>
      </div>
    </div>
  </div>

  ${renderCaseDrawer()}`;
}

/* ═══════════════ 培训档案归档 ═══════════════ */
function renderArchiveList() {
  return pageHeader('培训档案归档', '统一留存培训主题、签到记录、评价结果、录像与关联案例。',
    `<button class="btn btn-primary">批量归档</button>
     <button class="btn" data-view="certificate">🏅 电子证书</button>`)

  + `<div class="panel">
    <div class="notice-box info" style="margin-bottom:14px">🗃️ 档案留存期限：培训录像与档案按医疗行业规范留存 15 年，日志留存 3 年。支持档案详情查看、下载与批量归档。</div>
    ${DATA.archives.map(a => `
      <div style="padding:16px;border:1px solid var(--border-light);border-radius:var(--radius-lg);background:#fff;margin-bottom:12px;transition:all var(--transition)">
        <div style="display:flex;justify-content:space-between;align-items:flex-start;gap:12px">
          <div>
            <div style="font-weight:700;font-size:15px;margin-bottom:6px">${a.title}</div>
            <div style="display:flex;flex-wrap:wrap;gap:8px;font-size:13px;color:var(--text-secondary)">
              <span>📅 ${a.date}</span>
              <span>👥 参与 ${a.count} 人</span>
              <span>📍 签到率 ${a.signRate}</span>
              <span>🎥 录像：${a.video}</span>
              <span>📁 案例：${a.caseRef}</span>
              <span>🗃️ 留存：${a.retention}</span>
            </div>
            <div style="margin-top:8px">${stars(a.score)} <span style="font-size:13px;color:var(--text-secondary)">评价 ${a.score} 分</span></div>
          </div>
          <div class="actions">
            <button class="btn btn-sm" data-action="view-archive">档案详情</button>
            <button class="btn btn-sm">下载</button>
            <button class="btn btn-sm" data-view="certificate">证书</button>
          </div>
        </div>
      </div>`).join('')}
  </div>`;
}

/* ═══════════════ 电子证书 ═══════════════ */
function renderCertificate() {
  return pageHeader('电子证书生成', '展示电子培训证书模板、生成规则、预览、下载与打印。',
    `<button class="btn btn-primary" data-action="gen-cert">生成证书</button>
     <button class="btn">🖨 打印</button>
     <button class="btn">⬇ 下载 PDF</button>`)

  + `<div class="grid-2">
    <div class="certificate-frame">
      <div class="certificate-title">培 训 合 格 证 书</div>
      <div class="certificate-body">
        兹证明 <strong>李晨</strong> 同志<br>
        于 2026 年 5 月 12 日参加<br>
        《医联体急诊影像标准化培训》<br>
        培训时长 <strong>120</strong> 分钟，考核合格<br>
        特发此证，以资证明。
      </div>
      <div style="display:flex;justify-content:space-between;align-items:flex-end;margin-top:28px">
        <div style="font-size:12px;color:#7a5c1c">归档编号：AR-2026-001<br>签发时间：2026-05-12</div>
        <div class="certificate-stamp">医联体<br>培训中心</div>
      </div>
    </div>
    <div class="panel">
      <div class="panel-header"><div><h3>证书生成规则</h3></div></div>
      <div class="card-list">
        ${[
          { rule:'培训完成率 100%', ok:true },
          { rule:'签到状态正常（非缺席）', ok:true },
          { rule:'评价已提交', ok:true },
          { rule:'使用医联体培训中心电子签章', ok:true },
          { rule:'写入归档编号，支持扫码验真', ok:true },
        ].map(r => `
          <div class="card-row" style="padding:10px 12px">
            <span>${r.rule}</span>
            ${r.ok?'<span class="tag tag-green">✓ 已满足</span>':'<span class="tag tag-orange">待满足</span>'}
          </div>`).join('')}
      </div>
    </div>
  </div>`;
}

/* ═══════════════ 统计分析 ═══════════════ */
function renderStatsBoard() {
  return pageHeader('综合数据统计看板', '按时间、医院、科室多维筛选培训、案例与用户数据。',
    `<button class="btn btn-primary" data-view="report-export">导出统计报表</button>`)

  + filterPanel('stats',
    [filterField('时间范围',['近30天','近7天','本季度','本年']),
     filterField('医院',['全部医院',...DATA.hospitals]),
     filterField('科室',['全部科室','影像科','急诊科']),
     filterField('统计口径',['培训+案例+用户','仅培训','仅案例']),
     `<div class="field"><label class="field-label">操作</label><div class="actions"><button class="btn btn-primary">刷新</button><button class="btn">重置</button></div></div>`],
    [filterField('参与率区间',['全部','80%-100%','60%-80%']),
     filterField('签到率区间',['全部','90%以上','80%-90%']),
     filterField('案例病种',['全部','脑卒中','心肌梗死']),
     filterField('报表模板',['综合分析','医院对比','科室分析'])],
  )

  + `<div class="metrics-grid animate-slide">
    <div class="metric-card blue"><div class="metric-icon">📊</div><div class="metric-label">培训总数</div><div class="metric-value">326</div><div class="metric-delta">近30天月度累计</div></div>
    <div class="metric-card green"><div class="metric-icon">🎯</div><div class="metric-label">参与率</div><div class="metric-value">92%</div><div class="metric-delta"><span class="delta-up">↑ 跨院协同提升</span></div></div>
    <div class="metric-card orange"><div class="metric-icon">📍</div><div class="metric-label">签到率</div><div class="metric-value">95%</div><div class="metric-delta">迟到率 2%</div></div>
    <div class="metric-card blue"><div class="metric-icon">⏱</div><div class="metric-label">人均培训时长</div><div class="metric-value">12.4h</div><div class="metric-delta">第一人民医院领先</div></div>
  </div>

  <div class="grid-3">
    <div class="panel"><div class="panel-header"><div><h3>培训数据统计</h3></div></div>${lineChart(DATA.chartLine)}</div>
    <div class="panel"><div class="panel-header"><div><h3>案例调用分布</h3></div></div>${donutChart(DATA.chartDonut)}</div>
    <div class="panel"><div class="panel-header"><div><h3>成员医院排行</h3></div></div>${barChart(DATA.chartBar)}</div>
  </div>`;
}

/* ═══════════════ 报表导出 ═══════════════ */
function renderReportExport() {
  return pageHeader('报表导出', '按自定义条件筛选各类统计报表并导出 Excel 文件。',
    `<button class="btn btn-primary" data-action="export-report">⬇ 导出 Excel</button>`)

  + `<div class="grid-2">
    <div class="panel">
      <div class="panel-header"><div><h3>导出条件</h3></div></div>
      <div style="display:flex;flex-direction:column;gap:14px">
        <div class="field"><label class="field-label">报表类型</label><select class="el-select"><option>综合培训报表</option><option>案例调用报表</option><option>人员完成报表</option><option>接口调用报表</option></select></div>
        <div class="form-grid-2">
          <div class="field"><label class="field-label">开始时间</label><input class="el-input" value="2026-04-01"></div>
          <div class="field"><label class="field-label">结束时间</label><input class="el-input" value="2026-05-08"></div>
        </div>
        <div class="form-grid-2">
          <div class="field"><label class="field-label">医院</label><select class="el-select"><option>全部医院</option><option>第一人民医院</option></select></div>
          <div class="field"><label class="field-label">科室</label><select class="el-select"><option>全部科室</option><option>急诊科</option></select></div>
        </div>
        <div class="field">
          <label class="field-label">附加维度</label>
          <div class="check-grid">
            ${[{l:'签到明细',c:true},{l:'评价结果',c:true},{l:'录像索引',c:false},{l:'案例调用',c:true},{l:'证书记录',c:false},{l:'操作日志',c:false}].map(x=>`
              <div class="check-item ${x.c?'checked':''}"><div class="check-box ${x.c?'checked':''}">${x.c?'✓':''}</div><span>${x.l}</span></div>`).join('')}
          </div>
        </div>
      </div>
    </div>
    <div class="panel">
      <div class="panel-header"><div><h3>导出预览</h3><p>生成前校验字段完整性与权限范围</p></div></div>
      <div class="card-list">
        ${[
          {name:'综合培训报表.xlsx',desc:'培训总数、参与率、完成率、签到率、人均时长',ok:true},
          {name:'案例调用排行.xlsx',desc:'案例调用次数、病种分布、医院维度排行',ok:true},
          {name:'人员完成情况.xlsx',desc:'按医院科室统计完成情况与培训时长',ok:true},
        ].map(r => `
          <div class="card-row">
            <div class="card-row-body"><div class="sub-title">${r.name}</div><div class="desc">${r.desc}</div></div>
            <span class="tag tag-green">✓ 可导出</span>
          </div>`).join('')}
      </div>
      <div class="notice-box info" style="margin-top:14px">ℹ️ 导出内容仅包含脱敏后的统计数据，不含原始患者隐私字段，符合医疗数据合规要求。</div>
    </div>
  </div>`;
}

/* ═══════════════ 接口管理 ═══════════════ */
function renderIntegrations() {
  const canEdit = can('*');
  return pageHeader('接口管理', '配置医联体系统、视频会议、PACS/云影像接口，监控状态。',
    `<button class="${btnCls(canEdit,'btn-primary')}" data-action="confirm-save-interface">保存配置</button>`)

  + `<div class="grid-3">
    ${DATA.interfaces.map(ifc => `
      <div class="panel">
        <div class="panel-header">
          <div><h3>${ifc.name}</h3><p style="font-family:monospace;font-size:11px">${ifc.url}</p></div>
          ${tagDot(ifc.status)}
        </div>
        <div style="font-size:13px;color:var(--text-secondary);margin-bottom:12px">${ifc.desc}</div>
        <div style="font-size:12px;color:var(--text-secondary);margin-bottom:12px">最近检测：${ifc.lastCheck}</div>
        <div class="form-grid-2" style="margin-bottom:12px">
          <div class="field"><label class="field-label">AppKey</label><input class="el-input" value="••••••••demo" ${canEdit?'':'readonly'} style="font-family:monospace"></div>
          <div class="field"><label class="field-label">密钥状态</label><input class="el-input" value="AES-256 加密存储" readonly></div>
        </div>
        <div class="actions">
          <button class="${btnCls(canEdit,'btn-primary btn-sm')}" data-action="test-ifc">连通性测试</button>
          <button class="btn btn-sm ${ifc.status==='异常'?'btn-danger':''}">实时监控</button>
        </div>
        ${ifc.status==='异常'?`<div class="notice-box danger" style="margin-top:10px">🚨 接口异常：录像回调签名校验失败，已触发告警通知。修改配置属敏感操作，需二次验证。</div>`:''}
      </div>`).join('')}
  </div>`;
}

/* ═══════════════ 脱敏规则 ═══════════════ */
function renderDesenseRules() {
  const canEdit = can('*');
  const rules = [
    { label:'姓名脱敏',     rule:'保留姓氏，其余替换为 *',                    eg:'张三丰 → 张*',                       on:true },
    { label:'身份证号脱敏', rule:'保留前6位与后4位，中间替换为 ****',           eg:'110101199001019876 → 110101****9876', on:true },
    { label:'联系方式脱敏', rule:'保留前3位与后2位，中间替换为 ****',           eg:'13800138000 → 138****00',            on:true },
    { label:'家庭住址脱敏', rule:'保留市级信息，街道及以下替换为 ****',         eg:'北京市朝阳区建国路18号 → 北京市****',on:true },
    { label:'邮箱脱敏',     rule:'保留首字符与@域名部分，中间替换为 ****',      eg:'zhangsan@gmail.com → z****@gmail.com',on:false},
  ];
  return pageHeader('脱敏规则配置', '配置患者隐私字段的脱敏规则，支持规则预览、启用/禁用。',
    `<button class="${btnCls(canEdit,'btn-primary')}" data-action="save-desense">保存规则</button>`)

  + `<div class="grid-2">
    <div class="panel">
      <div class="panel-header"><div><h3>规则列表</h3><p>支持自定义启用/禁用与预览</p></div></div>
      <div style="display:flex;flex-direction:column;gap:10px">
        ${rules.map(r => `
          <div style="display:flex;justify-content:space-between;align-items:flex-start;padding:12px;border:1px solid var(--border-light);border-radius:var(--radius);background:#fff">
            <div>
              <div style="display:flex;align-items:center;gap:8px;margin-bottom:4px">
                <div class="check-box ${r.on?'checked':''}">${r.on?'✓':''}</div>
                <strong style="font-size:13.5px">${r.label}</strong>
              </div>
              <div style="font-size:12px;color:var(--text-secondary)">规则：${r.rule}</div>
              <div style="font-size:12px;color:var(--text-secondary)">示例：<code style="background:var(--bg-soft);padding:1px 5px;border-radius:3px">${r.eg}</code></div>
            </div>
            <span class="${r.on?'tag tag-green':'tag tag-gray'}">${r.on?'启用':'禁用'}</span>
          </div>`).join('')}
      </div>
    </div>
    <div class="panel">
      <div class="panel-header"><div><h3>规则预览</h3><p>修改规则后即时效果</p></div></div>
      <div class="desense-preview">姓名：张三丰 → <span class="desense-mask">张*</span>
身份证号：110101199001019876 → <span class="desense-mask">110101****9876</span>
联系方式：13800138000 → <span class="desense-mask">138****00</span>
家庭住址：北京市朝阳区建国路 18 号 → <span class="desense-mask">北京市****</span>
邮箱：zhangsan@gmail.com → <span class="desense-mask">z****@gmail.com</span></div>
      <div class="notice-box danger" style="margin-top:14px">🚫 业务规则：前端仅展示脱敏后回显结果；任何接口调试、日志记录、导出文件都不得包含原始隐私数据；违规访问触发自动告警。</div>
    </div>
  </div>`;
}

/* ═══════════════ 系统参数 ═══════════════ */
function renderSysParams() {
  const canEdit = can('*');
  const params = [
    { title:'签到时间范围', desc:'会前15分钟可签到，开始后5分钟判定迟到', fields:[{l:'开放时间',v:'会前15分钟'},{l:'迟到阈值',v:'5分钟'}] },
    { title:'评价有效时间', desc:'培训结束后48小时内有效，逾期自动归档', fields:[{l:'有效时长',v:'48小时'},{l:'逾期处理',v:'自动归档'}] },
    { title:'通知推送规则', desc:'站内消息、短信、移动端组合策略', fields:[{l:'会前提醒',v:'T-1天 + T-30分钟'},{l:'异常提醒',v:'立即告警'}] },
    { title:'档案留存规范', desc:'培训录像与档案留存遵循医疗行业规范', fields:[{l:'录像留存',v:'15年'},{l:'日志留存',v:'3年以上'}] },
  ];
  return pageHeader('系统参数设置', '配置培训签到范围、评价时间、通知推送等全局参数。',
    `<button class="${btnCls(canEdit,'btn-primary')}" data-action="save-sys-params">保存参数</button>`)

  + `<div class="grid-2">
    ${params.map(p => `
      <div class="panel">
        <div class="panel-header"><div><h3>${p.title}</h3><p>${p.desc}</p></div></div>
        <div class="form-grid-2">
          ${p.fields.map(f => `<div class="field"><label class="field-label">${f.l}</label><input class="el-input" value="${f.v}" ${canEdit?'':'readonly'}></div>`).join('')}
        </div>
      </div>`).join('')}
  </div>`;
}

/* ═══════════════ 日志管理 ═══════════════ */
function renderLogs() {
  const rows = DATA.logs.map(l => `<tr>
    <td><span class="tag ${tagClass(l.type==='接口调用'?'normal':l.type)}" style="background:var(--bg-soft);color:var(--text-regular)">${l.type}</span></td>
    <td>${l.actor}</td>
    <td>${l.target}</td>
    <td>${l.time}</td>
    <td style="font-family:monospace;font-size:12px">${l.ip}</td>
    <td>${tagDot(l.status)}</td>
    <td class="td-ops"><button class="btn btn-sm">查看详情</button></td>
  </tr>`).join('');

  return pageHeader('日志管理', '统一查看系统操作、接口调用、数据访问日志，支持导出。',
    `<button class="btn btn-primary">导出日志</button>`)

  + filterPanel('logs',
    [filterField('日志类型',['全部','系统操作','接口调用','数据访问']),
     filterField('操作人'),
     filterField('时间范围',['近7天','近24小时','近30天']),
     filterField('状态',['全部','成功','异常']),
     `<div class="field"><label class="field-label">操作</label><div class="actions"><button class="btn btn-primary">查询</button><button class="btn">重置</button></div></div>`],
    [filterField('关键字'),filterField('IP来源'),filterField('导出格式',['Excel','CSV']),filterField('成员医院',['全部',...DATA.hospitals])]
  )

  + `<div class="panel">
    <div class="notice-box info" style="margin-bottom:12px">📜 确保所有操作全链路可追溯，患者数据访问、权限变更、接口修改等敏感操作自动记录并支持回溯导出。</div>
    <div class="table-wrap">
      <table>
        <thead><tr><th>日志类型</th><th>操作主体</th><th>操作对象</th><th>操作时间</th><th>来源IP</th><th>状态</th><th>操作</th></tr></thead>
        <tbody>${rows}</tbody>
      </table>
    </div>
    <div class="pagination">
      <span class="pagination-info">共 2,648 条（演示展示前 ${DATA.logs.length} 条）</span>
      <div class="page-nums"><span class="page-num active">1</span><span class="page-num">2</span><span class="page-num">3</span><span class="page-num">></span></div>
    </div>
  </div>`;
}

/* ═══════════════ 移动端 ═══════════════ */
function renderMobileShell() {
  const views = {
    'mob-home':       renderMobHome,
    'mob-sign':       renderMobSign,
    'mob-video':      renderMobVideo,
    'mob-case':       renderMobCase,
    'mob-eval':       renderMobEval,
    'mob-archive':    renderMobArchive,
  };
  const fn = views[S.mobileView] || renderMobHome;
  const navItems = [
    { key:'mob-home',    icon:'🏠', label:'首页'  },
    { key:'mob-sign',    icon:'📍', label:'签到'  },
    { key:'mob-video',   icon:'🎥', label:'视频'  },
    { key:'mob-eval',    icon:'✏️',  label:'评价'  },
    { key:'mob-archive', icon:'📂', label:'档案'  },
  ];
  return `<div class="mobile-shell-outer">
    <div>
      <div style="text-align:center;margin-bottom:16px">
        <strong style="font-size:16px">移动端预览</strong>
        <span style="font-size:13px;color:var(--text-secondary);margin-left:8px">UniApp 适配 · 375px</span>
        <button class="btn btn-sm" data-action="exit-mobile" style="margin-left:12px">← 返回 PC</button>
      </div>
      <div class="phone-shell">
        <div class="phone-notch"><div class="notch-pill"></div></div>
        <div class="mobile-content">
          ${fn()}
          <div class="mobile-bottom-bar">
            ${navItems.map(n => `
              <div class="mobile-tab ${S.mobileView===n.key?'active':''}" data-mob-view="${n.key}">
                <span class="tab-icon">${n.icon}</span>
                ${n.label}
              </div>`).join('')}
          </div>
        </div>
      </div>
    </div>
  </div>`;
}

function renderMobHome() {
  return `<div class="mobile-header">
    <div><h3>医护工作台</h3><small>李晨 · 第一人民医院 · 急诊科</small></div>
    <button class="btn btn-sm" data-action="exit-mobile">返回PC</button>
  </div>
  <div class="mobile-body">
    <div class="mobile-metrics">
      <div class="mobile-metric"><div style="font-size:12px;color:var(--text-secondary)">待参与培训</div><div class="m-val">2</div></div>
      <div class="mobile-metric"><div style="font-size:12px;color:var(--text-secondary)">本月时长</div><div class="m-val">6h</div></div>
      <div class="mobile-metric"><div style="font-size:12px;color:var(--text-secondary)">已完成</div><div class="m-val">14</div></div>
      <div class="mobile-metric"><div style="font-size:12px;color:var(--text-secondary)">完成率</div><div class="m-val">93%</div></div>
    </div>
    <div class="mobile-card">
      <div style="font-weight:700;margin-bottom:10px">📋 待参与培训</div>
      <div class="mobile-list-item">
        <div><div style="font-weight:600;font-size:13px">急诊影像标准化培训</div><div style="font-size:12px;color:var(--text-secondary)">05-12 14:00 · 支持签到</div></div>
        <button class="btn btn-primary btn-sm" data-mob-view="mob-sign">签到</button>
      </div>
      <div class="mobile-list-item">
        <div><div style="font-weight:600;font-size:13px">心梗急救病例教学</div><div style="font-size:12px;color:var(--text-secondary)">05-19 19:00 · 可预习</div></div>
        <button class="btn btn-sm" data-mob-view="mob-case">预习</button>
      </div>
    </div>
    <div class="mobile-card">
      <div style="font-weight:700;margin-bottom:8px">📢 培训通知</div>
      <div style="font-size:13px;color:var(--text-secondary);line-height:1.7">签到支持工号验证与人脸识别双方式，迟到阈值 5 分钟，缺席自动记录。移动端案例资料均为脱敏版本。</div>
    </div>
  </div>`;
}

function renderMobSign() {
  return `<div class="mobile-header"><div><h3>培训签到</h3><small>会前15分钟开放签到</small></div></div>
  <div class="mobile-body">
    <div class="mobile-card">
      <div style="font-weight:700;font-size:15px;margin-bottom:6px">急诊影像标准化培训</div>
      <div style="font-size:13px;color:var(--text-secondary);margin-bottom:14px">开始时间：2026-05-12 14:00</div>
      <div style="display:flex;flex-direction:column;gap:10px">
        <button class="btn btn-primary" data-action="mob-do-sign" style="width:100%;padding:14px">🪪 工号验证签到</button>
        <button class="btn" data-action="mob-do-face" style="width:100%;padding:14px">👤 人脸识别签到</button>
      </div>
    </div>
    <div class="mobile-card">
      <div style="font-size:13px;color:var(--text-secondary);line-height:1.7">签到结果将同步至 PC 端签到管理页，迟到与缺席记录保存至培训档案，纳入年度评价考核。</div>
    </div>
  </div>`;
}

function renderMobVideo() {
  return `<div class="mobile-header"><div><h3>视频培训接入</h3><small>第三方会议移动接入</small></div></div>
  <div class="mobile-body">
    <div class="mobile-card" style="background:linear-gradient(180deg,#10243c,#071828);color:#fff;min-height:300px">
      <div style="font-weight:700;font-size:15px;margin-bottom:6px">🎥 培训直播中</div>
      <div style="font-size:13px;opacity:.75;margin-bottom:10px">参会 48 人 · 录像已开启 · 安全加密</div>
      <div style="padding:8px 12px;background:rgba(255,255,255,.1);border-radius:8px;font-size:13px;margin-bottom:14px">
        当前案例：急性脑卒中影像判读（脱敏版）
      </div>
      <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:8px;margin-top:140px">
        <div style="background:rgba(255,255,255,.1);border-radius:10px;padding:10px;text-align:center;font-size:12px">张敏<div style="opacity:.7">主讲</div></div>
        <div style="background:rgba(255,255,255,.1);border-radius:10px;padding:10px;text-align:center;font-size:12px">李晨<div style="opacity:.7">已签到</div></div>
        <div style="background:rgba(255,255,255,.1);border-radius:10px;padding:10px;text-align:center;font-size:12px">王宁<div style="opacity:.7">迟到</div></div>
      </div>
    </div>
    <button class="btn btn-sm" data-mob-view="mob-case" style="width:100%">查看脱敏案例 →</button>
  </div>`;
}

function renderMobCase() {
  return `<div class="mobile-header"><div><h3>脱敏案例查看</h3><small>仅展示脱敏信息</small></div></div>
  <div class="mobile-body">
    <div class="mobile-card">
      <div style="font-weight:700;margin-bottom:8px">急性脑卒中影像判读</div>
      <div class="desense-preview" style="font-size:12px">患者姓名：<strong>张*</strong>
身份证号：<strong>110101****1234</strong>
联系方式：<strong>138****0068</strong>
住址：<strong>北京市朝阳区****</strong>
摘要：发病2小时内完成头颅CT，左侧基底节区可疑低密度影，已启动绿色通道。</div>
    </div>
    <div class="mobile-card">
      <div style="font-weight:700;margin-bottom:6px">🩻 影像标注</div>
      <div style="font-size:13px;color:var(--text-secondary)">重点标注：左侧基底节区可疑低密度影，已与主讲端标注同步展示。</div>
    </div>
    <div class="notice-box info">ℹ️ 移动端仅可查看脱敏资料，不提供原始病历下载，所有操作均被记录到审计日志。</div>
  </div>`;
}

function renderMobEval() {
  return `<div class="mobile-header"><div><h3>培训评价</h3><small>培训结束后自动推送</small></div></div>
  <div class="mobile-body">
    <div class="mobile-card">
      ${['培训内容实用性','讲师讲解质量','案例匹配度'].map(item => `
        <div style="margin-bottom:14px">
          <div style="font-weight:600;font-size:13px;margin-bottom:6px">${item}</div>
          <div style="display:flex;gap:6px">${[1,2,3,4,5].map(n=>`<span style="font-size:24px;color:${n<=5?'#f5a623':'#dcdfe6'}">★</span>`).join('')}</div>
        </div>`).join('')}
      <div class="field" style="margin-top:4px">
        <label class="field-label">留言反馈</label>
        <textarea class="el-textarea" rows="4" placeholder="请输入您的反馈..."></textarea>
      </div>
      <button class="btn btn-primary" data-action="mob-submit-eval" style="width:100%;margin-top:10px">提交评价</button>
    </div>
  </div>`;
}

function renderMobArchive() {
  return `<div class="mobile-header"><div><h3>个人培训档案</h3><small>完成记录与证书</small></div></div>
  <div class="mobile-body">
    ${DATA.archives.slice(0,2).map(a => `
      <div class="mobile-card">
        <div style="font-weight:700;margin-bottom:6px">${a.title}</div>
        <div style="font-size:12px;color:var(--text-secondary);margin-bottom:10px">✅ 已完成 · 签到正常 · 评价已提交</div>
        <div style="display:flex;gap:8px">
          <button class="btn btn-sm" style="flex:1">查看录像</button>
          <button class="btn btn-primary btn-sm" style="flex:1">下载证书</button>
        </div>
      </div>`).join('')}
    <div class="mobile-card">
      <div style="font-size:13px;color:var(--text-secondary)">🗃️ 档案与录像留存 15 年，符合医疗行业规范。如有异议请联系医联体培训中心管理员。</div>
    </div>
  </div>`;
}

/* ─── 路由表 ─── */
function renderCurrentView() {
  const map = {
    'dash-admin':     renderDashAdmin,
    'dash-lecturer':  renderDashLecturer,
    'dash-staff':     renderDashStaff,
    'user-list':      renderUserList,
    'role-perms':     renderRolePerms,
    'case-list':      renderCaseList,
    'case-form':      renderCaseForm,
    'case-detail':    renderCaseDetail,
    'plan-list':      renderPlanList,
    'plan-form':      renderPlanForm,
    'plan-review':    renderPlanReview,
    'meeting-room':   renderMeetingRoom,
    'attendance':     renderAttendance,
    'eval-list':      renderEvalList,
    'eval-form':      renderEvalForm,
    'archive-list':   renderArchiveList,
    'video-replay':   renderVideoReplay,
    'video-player':   renderVideoPlayer,
    'certificate':    renderCertificate,
    'stats-board':    renderStatsBoard,
    'report-export':  renderReportExport,
    'integrations':   renderIntegrations,
    'desense-rules':  renderDesenseRules,
    'sys-params':     renderSysParams,
    'logs':           renderLogs,
  };
  const fn = map[S.view];
  return fn ? fn() : renderDashAdmin();
}
