/* ─── 全局常量 ─── */
const ROLES = {
  admin: {
    label:'医联体超级管理员', icon:'👑', hospital:'医联体管理中心', dept:'全院', perms:['*'],
    menu:[
      { section:'核心管理', items:[
        { key:'dash-admin',    icon:'🏠', label:'管理驾驶舱'   },
        { key:'user-list',     icon:'👥', label:'用户列表'     },
        { key:'role-perms',    icon:'🔐', label:'角色权限配置' },
      ]},
      { section:'培训流程', items:[
        { key:'plan-list',     icon:'📋', label:'培训计划'     },
        { key:'meeting-room',  icon:'🎥', label:'培训会议室'   },
        { key:'attendance',    icon:'📍', label:'签到管理'     },
        { key:'eval-list',     icon:'✏️',  label:'评价管理'    },
        { key:'archive-list',  icon:'📂', label:'档案归档'     },
        { key:'video-replay',  icon:'▶️',  label:'往期录像'    },
        { key:'certificate',   icon:'🏅', label:'电子证书'     },
      ]},
      { section:'案例与数据', items:[
        { key:'case-list',     icon:'🔬', label:'案例库'       },
        { key:'stats-board',   icon:'📊', label:'统计分析'     },
        { key:'report-export', icon:'📤', label:'报表导出'     },
      ]},
      { section:'系统管理', items:[
        { key:'integrations',  icon:'🔗', label:'接口管理'     },
        { key:'desense-rules', icon:'🛡', label:'脱敏规则'     },
        { key:'sys-params',    icon:'⚙️',  label:'系统参数'    },
        { key:'logs',          icon:'📜', label:'日志管理'     },
      ]},
    ]
  },
  lecturer: {
    label:'医院/科室讲师', icon:'🎓', name:'张志国', title:'主任医师',
    hospital:'第一人民医院', dept:'影像科', perms:['case.create','case.edit','case.archive','plan.create','plan.edit','plan.publish','attend.view','attend.remind','meeting.manage'],
    menu:[
      { section:'我的工作台', items:[
        { key:'dash-lecturer', icon:'🏠', label:'讲师首页'     },
        { key:'plan-list',     icon:'📋', label:'培训计划'     },
        { key:'plan-form',     icon:'➕', label:'新增计划'     },
        { key:'meeting-room',  icon:'🎥', label:'培训会议室'   },
      ]},
      { section:'案例管理', items:[
        { key:'case-list',     icon:'🔬', label:'案例库'       },
        { key:'case-form',     icon:'➕', label:'新增案例'     },
      ]},
      { section:'培训闭环', items:[
        { key:'attendance',    icon:'📍', label:'签到管理'     },
        { key:'eval-list',     icon:'✏️',  label:'评价汇总'    },
        { key:'archive-list',  icon:'📂', label:'档案归档'     },
        { key:'video-replay',  icon:'▶️',  label:'往期录像'    },
        { key:'certificate',   icon:'🏅', label:'证书生成'     },
      ]},
      { section:'数据分析', items:[
        { key:'stats-board',   icon:'📊', label:'统计分析'     },
        { key:'report-export', icon:'📤', label:'报表导出'     },
      ]},
    ]
  },
  staff: {
    label:'普通医护人员', icon:'👨‍⚕️', hospital:'第一人民医院', dept:'急诊科', perms:['attend.view','eval.submit'],
    menu:[
      { section:'我的培训', items:[
        { key:'dash-staff',    icon:'🏠', label:'我的首页'     },
        { key:'plan-list',     icon:'📋', label:'培训列表'     },
        { key:'meeting-room',  icon:'🎥', label:'进入会议室'   },
        { key:'attendance',    icon:'📍', label:'我的签到'     },
      ]},
      { section:'案例与评价', items:[
        { key:'case-detail',   icon:'🔬', label:'脱敏案例查看' },
        { key:'eval-form',     icon:'✏️',  label:'提交评价'    },
      ]},
      { section:'个人档案', items:[
        { key:'archive-list',  icon:'📂', label:'个人培训档案' },
        { key:'video-replay',  icon:'▶️',  label:'往期录像回看' },
        { key:'certificate',   icon:'🏅', label:'电子证书'     },
      ]},
    ]
  },
};

/* ─── 模拟数据 ─── */
const DATA = {
  hospitals: ['第一人民医院','中心医院','中医院','妇幼保健院'],

  users: [
    { id:'A1001', name:'张敏',   hospital:'第一人民医院', dept:'影像科', title:'主任医师',   role:'讲师',   status:'启用', faceOk:true  },
    { id:'A1002', name:'李晨',   hospital:'第一人民医院', dept:'急诊科', title:'住院医师',   role:'医护人员', status:'启用', faceOk:true  },
    { id:'B2001', name:'王宁',   hospital:'中心医院',     dept:'心内科', title:'副主任医师', role:'讲师',   status:'启用', faceOk:false },
    { id:'B2002', name:'刘洋',   hospital:'中心医院',     dept:'神经内科',title:'住院医师', role:'医护人员', status:'启用', faceOk:true  },
    { id:'C3001', name:'孙浩',   hospital:'中医院',       dept:'外科',   title:'主治医师',   role:'医护人员', status:'启用', faceOk:false },
    { id:'C3002', name:'赵峰',   hospital:'中医院',       dept:'影像科', title:'主任医师',   role:'讲师',   status:'停用', faceOk:true  },
    { id:'D4001', name:'陈婷',   hospital:'妇幼保健院',   dept:'产科',   title:'护士长',     role:'医护人员', status:'启用', faceOk:true  },
  ],

  cases: [
    { id:'C-2026-001', name:'急性脑卒中影像判读',  dept:'影像科', disease:'脑卒中',   creator:'张敏', hospital:'第一人民医院', date:'2026-04-28', count:52, source:'PACS自动',  status:'在库',  patient:'张*', idCard:'110101****1234', phone:'138****0068', addr:'北京市****' },
    { id:'C-2026-002', name:'心肌梗死急救路径案例', dept:'心内科', disease:'心肌梗死', creator:'王宁', hospital:'中心医院',     date:'2026-04-25', count:38, source:'手工录入',  status:'在库',  patient:'李*', idCard:'120101****5678', phone:'139****0099', addr:'天津市****' },
    { id:'C-2026-003', name:'多发创伤 CT 分诊案例', dept:'急诊科', disease:'多发创伤', creator:'张敏', hospital:'第一人民医院', date:'2026-04-20', count:27, source:'PACS自动',  status:'在库',  patient:'王*', idCard:'310101****9012', phone:'150****0077', addr:'上海市****' },
    { id:'C-2026-004', name:'肺结节高分辨率 CT 病例',dept:'影像科',disease:'肺结节',  creator:'赵峰', hospital:'中医院',       date:'2026-04-15', count:19, source:'PACS自动',  status:'在库',  patient:'孙*', idCard:'440101****3456', phone:'136****0033', addr:'广州市****' },
    { id:'C-2026-005', name:'产后大出血急救病例',   dept:'产科',   disease:'产科急症', creator:'陈婷', hospital:'妇幼保健院',   date:'2026-04-10', count:11, source:'手工录入',  status:'归档',  patient:'赵*', idCard:'510101****7890', phone:'152****0055', addr:'成都市****' },
  ],

  plans: [
    /* ── 张志国计划（讲师视图可见） ── */
    { id:'P-2026-001', title:'医联体急诊影像标准化培训',   date:'2026-05-12 14:00', dur:'120分钟', lecturer:'张志国', scope:'医联体级',         cases:2, audit:'待审核', publish:'未发布', status:'未开始' },
    { id:'P-2026-005', title:'胸部CT鉴别诊断实践培训',             date:'2026-05-08 14:00', dur:'90分钟',  lecturer:'张志国', scope:'科室级：影像科',    cases:1, audit:'已通过', publish:'已发布', status:'进行中' },
    { id:'P-2026-006', title:'腔部急症影像综合判读',               date:'2026-05-20 09:00', dur:'90分钟',  lecturer:'张志国', scope:'医院级：第一人民医院', cases:2, audit:'已通过', publish:'已发布', status:'未开始' },
    { id:'P-2026-007', title:'心梢急救病例联合教学',               date:'2026-05-19 19:00', dur:'60分钟',  lecturer:'张志国', scope:'科室级：急诊科',    cases:1, audit:'已退回', publish:'未发布', status:'需修改' },
    { id:'P-2026-008', title:'多发创伤联合救治流程培训',   date:'2026-05-26 16:00', dur:'120分钟', lecturer:'张志国', scope:'医联体级',         cases:2, audit:'待审核', publish:'未发布', status:'未开始' },
    { id:'P-2026-009', title:'儿科影像专题培训',                           date:'2026-05-28 14:00', dur:'60分钟',  lecturer:'张志国', scope:'科室级：影像科',    cases:1, audit:'待审核', publish:'未发布', status:'未开始' },
    { id:'P-2026-010', title:'脑部MRI阅片规范与判读培训',      date:'2026-06-05 14:00', dur:'90分钟',  lecturer:'张志国', scope:'医联体级',         cases:1, audit:'已退回', publish:'未发布', status:'已取消' },
    /* ── 张志国已完成历史计划 ── */
    { id:'P-2026-101', title:'影像科新进人员入职培训',         date:'2026-04-22 09:00', dur:'120分钟', lecturer:'张志国', scope:'科室级：影像科',    cases:1, audit:'已通过', publish:'已发布', status:'已完成' },
    { id:'P-2026-102', title:'卷托绿色通道影像流程复盘',   date:'2026-04-15 14:00', dur:'90分钟',  lecturer:'张志国', scope:'医院级：第一人民医院', cases:1, audit:'已通过', publish:'已发布', status:'已完成' },
    { id:'P-2026-103', title:'CT阅片技能强化实战培训',             date:'2026-04-08 14:00', dur:'60分钟',  lecturer:'张志国', scope:'科室级：影像科',    cases:2, audit:'已通过', publish:'已发布', status:'已完成' },
    { id:'P-2026-104', title:'放射诊断质控标准培训（双季度）', date:'2026-03-25 09:30', dur:'120分钟', lecturer:'张志国', scope:'医联体级', cases:3, audit:'已通过', publish:'已发布', status:'已完成' },
    { id:'P-2026-105', title:'骨骼影像判读进阶培训',               date:'2026-03-12 14:00', dur:'90分钟',  lecturer:'张志国', scope:'科室级：外科',     cases:1, audit:'已通过', publish:'已发布', status:'已完成' },
    /* ── 其他讲师计划（管理员视图可见） ── */
    { id:'P-2026-002', title:'心梢急救病例联合教学',               date:'2026-05-19 19:00', dur:'90分钟',  lecturer:'王宁',   scope:'医院级：中心医院',  cases:1, audit:'已通过', publish:'未发布', status:'未开始' },
    { id:'P-2026-003', title:'急诊科规培强化培训',                     date:'2026-05-25 09:00', dur:'60分钟',  lecturer:'李晨',   scope:'科室级：急诊科',    cases:1, audit:'待审核', publish:'未发布', status:'未开始' },
    { id:'P-2026-004', title:'产科护理急救技能专项培训',   date:'2026-06-03 14:00', dur:'90分钟',  lecturer:'陈婷',   scope:'医院级：娇幼保健院', cases:1, audit:'已退回', publish:'未发布', status:'未开始' },
  ],

  attendance: [
    { name:'李晨', hospital:'第一人民医院', dept:'急诊科',   status:'已签到', time:'13:55', method:'工号验证' },
    { name:'刘洋', hospital:'中心医院',     dept:'神经内科', status:'已签到', time:'14:02', method:'人脸识别' },
    { name:'孙浩', hospital:'中医院',       dept:'外科',     status:'迟到',   time:'14:08', method:'工号验证' },
    { name:'陈婷', hospital:'妇幼保健院',   dept:'产科',     status:'已签到', time:'13:58', method:'人脸识别' },
    { name:'赵峰', hospital:'中医院',       dept:'影像科',   status:'缺席',   time:'—',     method:'—'       },
  ],

  evaluations: [
    { plan:'医联体急诊影像标准化培训', score:4.8, count:46, comment:'内容实用，案例贴近实际，希望增加互动环节与移动端课后回看。' },
    { plan:'心梗急救病例联合教学',     score:4.6, count:38, comment:'时间安排合理，签到流程可以再简化，期待脱敏案例更丰富。'     },
    { plan:'急诊科规培强化培训',       score:4.5, count:24, comment:'讲师讲解到位，建议会后提供培训 PPT 下载。'                  },
  ],

  archives: [
    { title:'医联体急诊影像标准化培训', date:'2026-05-12', count:48, signRate:'96%', video:'已归档 (15年留存)', caseRef:'2个脱敏案例', score:4.8, retention:'15年' },
    { title:'心梗急救病例联合教学',     date:'2026-04-21', count:36, signRate:'95%', video:'已归档 (15年留存)', caseRef:'1个脱敏案例', score:4.6, retention:'15年' },
  ],
  recordings: [
    { id:'REC-001', title:'医联体急诊影像标准化培训', date:'2026-05-08 14:00', duration:'01:52:36', lecturer:'张志国', hospital:'第一人民医院', dept:'影像科', scope:'医联体级', viewers:48, status:'已归档', fileSize:'2.3 GB', expires:'2041-05-08',
      chapters:[
        { time:'00:00', label:'开场介绍与期望' },
        { time:'08:30', label:'案例一：急性脑卷中影像判读' },
        { time:'34:10', label:'影像标注与绿色通道流程复盘' },
        { time:'58:45', label:'案例二：多发创伤CT联合判读' },
        { time:'82:20', label:'互动问答与总结' },
      ],
      cases:['C-2026-001','C-2026-003'], autoArchived:true },
    { id:'REC-002', title:'胸部CT鉴别诊断实践培训',    date:'2026-05-08 14:00', duration:'01:28:04', lecturer:'张志国', hospital:'第一人民医院', dept:'影像科', scope:'科室级', viewers:32, status:'已归档', fileSize:'1.8 GB', expires:'2041-05-08',
      chapters:[
        { time:'00:00', label:'胸部CT规范阅片基础' },
        { time:'22:15', label:'典型病例影像分析' },
        { time:'55:30', label:'鉴别诊断要点与易误读分析' },
        { time:'80:00', label:'小结与考核要点' },
      ],
      cases:['C-2026-004'], autoArchived:true },
    { id:'REC-003', title:'卷托绿色通道影像流程复盘',  date:'2026-04-15 14:00', duration:'01:35:22', lecturer:'张志国', hospital:'第一人民医院', dept:'影像科', scope:'医院级', viewers:41, status:'已归档', fileSize:'2.0 GB', expires:'2041-04-15',
      chapters:[
        { time:'00:00', label:'卷托绿色通道流程回顧' },
        { time:'18:40', label:'特典影像案例展示' },
        { time:'52:10', label:'影像与临床协同关键节点' },
        { time:'78:30', label:'考核与闭环总结' },
      ],
      cases:['C-2026-001'], autoArchived:true },
    { id:'REC-004', title:'CT阅片技能强化实战培训',    date:'2026-04-08 14:00', duration:'00:58:12', lecturer:'张志国', hospital:'第一人民医院', dept:'影像科', scope:'科室级', viewers:26, status:'已归档', fileSize:'1.2 GB', expires:'2041-04-08',
      chapters:[
        { time:'00:00', label:'课程目标与要求' },
        { time:'15:00', label:'影像阅读实操演示' },
        { time:'40:20', label:'常见误读情层分析' },
      ],
      cases:['C-2026-003'], autoArchived:true },
    { id:'REC-005', title:'放射诊断质控标准培训（双季度）', date:'2026-03-25 09:30', duration:'02:04:15', lecturer:'张志国', hospital:'第一人民医院', dept:'影像科', scope:'医联体级', viewers:63, status:'已归档', fileSize:'3.1 GB', expires:'2041-03-25',
      chapters:[
        { time:'00:00', label:'质控标准体系解读' },
        { time:'32:00', label:'常见不合格项分析' },
        { time:'74:10', label:'标准化流程建设建议' },
        { time:'108:0', label:'闭环与下季度计划' },
      ],
      cases:[], autoArchived:true },
    { id:'REC-006', title:'心梢急救病例联合教学',       date:'2026-04-21 19:00', duration:'01:22:48', lecturer:'王宁', hospital:'中心医院', dept:'心内科', scope:'医院级', viewers:38, status:'已归档', fileSize:'1.7 GB', expires:'2041-04-21',
      chapters:[
        { time:'00:00', label:'心梢急救流程辨析' },
        { time:'28:30', label:'典型影像案例展示' },
        { time:'60:00', label:'多学科协同要点' },
      ],
      cases:['C-2026-002'], autoArchived:true },
  ],
  interfaces: [
    { name:'医联体主系统接口',   url:'https://ylt.hospital.gov.cn/api/v3', status:'正常', desc:'同步用户身份、科室与医院主数据，不开放注册，每天凌晨自动全量同步。', lastCheck:'2026-05-08 09:00' },
    { name:'视频会议接口',       url:'https://meeting.ylt-center.com/api', status:'异常', desc:'支持会议创建/关闭/录像回调，当前录像回调签名校验失败。',              lastCheck:'2026-05-08 08:55' },
    { name:'PACS / 云影像接口', url:'https://pacs.hospital.gov.cn/api',   status:'正常', desc:'自动同步脱敏影像病例，仅回传脱敏摘要，原始影像存于PACS服务端。',      lastCheck:'2026-05-08 09:00' },
  ],

  logs: [
    { type:'系统操作', actor:'张敏 (A1001)',  target:'培训计划 P-2026-001',  time:'2026-05-08 09:00', ip:'192.168.1.10', status:'成功' },
    { type:'数据访问', actor:'李晨 (A1002)',  target:'案例 C-2026-001',      time:'2026-05-08 09:05', ip:'192.168.1.22', status:'成功' },
    { type:'接口调用', actor:'系统',          target:'视频会议 录像回调',    time:'2026-05-08 08:55', ip:'10.0.0.5',     status:'异常' },
    { type:'系统操作', actor:'管理员',        target:'角色权限更新',         time:'2026-05-07 18:00', ip:'192.168.1.1',  status:'成功' },
    { type:'数据访问', actor:'王宁 (B2001)',  target:'案例 C-2026-002',      time:'2026-05-07 15:30', ip:'192.168.2.11', status:'成功' },
    { type:'接口调用', actor:'系统',          target:'PACS 同步 4 个案例',   time:'2026-05-07 02:00', ip:'10.0.0.3',     status:'成功' },
  ],

  chartBar: [
    { label:'第一人民医院', value:92, color:'#409eff' },
    { label:'中心医院',     value:87, color:'#67c23a' },
    { label:'妇幼保健院',   value:79, color:'#e6a23c' },
    { label:'中医院',       value:68, color:'#9b59b6' },
  ],

  chartLine: [
    { label:'1月', value:72 }, { label:'2月', value:75 }, { label:'3月', value:80 },
    { label:'4月', value:85 }, { label:'5月', value:91 },
  ],

  chartDonut: [
    { label:'脑卒中类', value:40, color:'#409eff' },
    { label:'心血管类', value:30, color:'#67c23a' },
    { label:'急诊创伤', value:20, color:'#e6a23c' },
    { label:'其他',     value:10, color:'#f56c6c' },
  ],
};

/* ─── 全局状态 ─── */
let S = {
  view:           'login',
  role:           'admin',
  loginRole:      'admin',
  collapsed:      false,
  mobileView:     'mob-home',
  inMobile:       false,
  caseMode:       'auto',
  selCase:        'C-2026-001',
  selPlan:        'P-2026-001',
  selRecording:    'REC-001',  // 当前选中的录像
  drawerCaseId:   null,   // 当前抽屉打开的案例ID
  presentingCase: null,   // 主讲人当前标注"正在讲解"的案例ID
};

/* ─── 权限判断 ─── */
function can(perm) {
  return ROLES[S.role].perms.includes('*') || ROLES[S.role].perms.includes(perm);
}

/* ─── 按角色过滤数据 ─── */
function scopedData(type) {
  if (can('*')) return DATA[type];
  const h = ROLES[S.role].hospital;
  if (type === 'users')  return DATA.users.filter(u => u.hospital === h);
  if (type === 'cases')  return DATA.cases.filter(c => c.hospital === h);
  if (type === 'plans')  return DATA.plans.filter(p => p.lecturer === ROLES[S.role].name);
  return DATA[type];
}

/* ─── 工具函数 ─── */
function btnCls(ok, cls = '') {
  return ok ? `btn ${cls}` : `btn disabled ${cls}`;
}
function tag(s) {
  const map = { '成功':'green','在库':'green','已通过':'green','已签到':'green','正常':'green','已发布':'green','已完成':'green',
                '待审核':'orange','已退回':'red','未发布':'gray','缺席':'red','异常':'red','归档':'gray','迟到':'orange',
                '需修改':'orange','已取消':'red','未开始':'gray','进行中':'blue' };
  const c = map[s] || 'gray';
  return `<span class="tag tag-${c}">${s}</span>`;
}
function tagDot(s) {
  const c = s==='启用'||s==='正常'||s==='已签到'?'green':s==='迟到'?'orange':'red';
  return `<span class="dot dot-${c}"></span><span class="tag tag-${c}" style="margin-left:6px">${s}</span>`;
}
function tagClass(t) { return 'tag-blue'; }
function stars(n) {
  return [1,2,3,4,5].map(i => `<span style="color:${i<=Math.round(n)?'#f5a623':'#dcdfe6'}">★</span>`).join('');
}
function progressBar(pct, h=6) {
  return `<div style="background:#e4e7ed;border-radius:${h}px;height:${h}px;overflow:hidden">
    <div style="width:${pct}%;height:100%;background:linear-gradient(90deg,var(--primary),var(--success));border-radius:${h}px;transition:width .6s"></div>
  </div>`;
}

/* ─── 通用 UI 片段 ─── */
function pageHeader(title, desc, actionHtml = '') {
  return `<div class="page-header animate-slide">
    <div><h2 class="page-title">${title}</h2><p class="page-desc">${desc}</p></div>
    <div class="actions">${actionHtml}</div>
  </div>`;
}

function filterField(label, options = null, placeholder = '') {
  if (!options) {
    return `<div class="field"><label class="field-label">${label}</label><input class="el-input" placeholder="${placeholder||'请输入'+label}"></div>`;
  }
  return `<div class="field"><label class="field-label">${label}</label><select class="el-select">
    ${options.map(o => `<option>${o}</option>`).join('')}
  </select></div>`;
}

function filterPanel(id, row1Fields = [], row2Fields = [], extraBtns = '') {
  return `<div class="panel filter-panel" id="filter-${id}">
    <div class="filter-row">${row1Fields.join('')}</div>
    ${row2Fields.length ? `<div class="filter-row" style="margin-top:12px">${row2Fields.join('')}</div>` : ''}
    ${extraBtns ? `<div class="actions" style="margin-top:10px">${extraBtns}</div>` : ''}
  </div>`;
}

/* ─── 图表组件 ─── */
function barChart(data) {
  const max = Math.max(...data.map(d => d.value));
  return `<div class="bar-chart">
    ${data.map(d => `
      <div class="bar-item">
        <div class="bar-label">${d.label}</div>
        <div class="bar-track">
          <div class="bar-fill" style="width:${(d.value/max)*100}%;background:${d.color}">
            <span>${d.value}%</span>
          </div>
        </div>
      </div>`).join('')}
  </div>`;
}

function lineChart(data) {
  const W = 400, H = 160, pad = 36;
  const vals = data.map(d => d.value);
  const minV = Math.min(...vals) - 5, maxV = Math.max(...vals) + 5;
  const px = (i) => pad + (i / (data.length - 1)) * (W - pad * 2);
  const py = (v) => H - pad - ((v - minV) / (maxV - minV)) * (H - pad * 2);
  const pts = data.map((d, i) => [px(i), py(d.value)]);
  const pathD = pts.map((p, i) => `${i===0?'M':'L'}${p[0].toFixed(1)},${p[1].toFixed(1)}`).join(' ');
  const areaD = pathD + ` L${pts[pts.length-1][0].toFixed(1)},${H-pad} L${pts[0][0].toFixed(1)},${H-pad} Z`;
  return `<div class="chart-wrap">
    <svg width="100%" viewBox="0 0 ${W} ${H}">
      <defs>
        <linearGradient id="lineGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#409eff" stop-opacity=".25"/>
          <stop offset="100%" stop-color="#409eff" stop-opacity="0"/>
        </linearGradient>
      </defs>
      ${[0.25,0.5,0.75,1].map(t => `<line x1="${pad}" y1="${H-pad-(H-pad*2)*t}" x2="${W-pad}" y2="${H-pad-(H-pad*2)*t}" stroke="#f0f0f0" stroke-width="1"/>`).join('')}
      <path d="${areaD}" fill="url(#lineGrad)"/>
      <path d="${pathD}" fill="none" stroke="#409eff" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
      ${pts.map((p, i) => `<circle cx="${p[0]}" cy="${p[1]}" r="4" fill="#409eff" stroke="#fff" stroke-width="2"/>`).join('')}
      ${data.map((d, i) => `<text x="${px(i)}" y="${H-8}" text-anchor="middle" font-size="11" fill="#909399">${d.label}</text>`).join('')}
      ${pts.map((p, i) => `<text x="${p[0]}" y="${p[1]-8}" text-anchor="middle" font-size="11" fill="#409eff" font-weight="600">${data[i].value}</text>`).join('')}
    </svg>
  </div>`;
}

function donutChart(data) {
  const total = data.reduce((a, d) => a + d.value, 0);
  let start = -Math.PI / 2;
  const cx = 80, cy = 80, r = 56, ir = 36;
  const slices = data.map(d => {
    const angle = (d.value / total) * Math.PI * 2;
    const x1 = cx + r * Math.cos(start), y1 = cy + r * Math.sin(start);
    const x2 = cx + r * Math.cos(start + angle), y2 = cy + r * Math.sin(start + angle);
    const ix1 = cx + ir * Math.cos(start), iy1 = cy + ir * Math.sin(start);
    const ix2 = cx + ir * Math.cos(start + angle), iy2 = cy + ir * Math.sin(start + angle);
    const large = angle > Math.PI ? 1 : 0;
    const path = `M${ix1.toFixed(2)},${iy1.toFixed(2)} L${x1.toFixed(2)},${y1.toFixed(2)} A${r},${r} 0 ${large},1 ${x2.toFixed(2)},${y2.toFixed(2)} L${ix2.toFixed(2)},${iy2.toFixed(2)} A${ir},${ir} 0 ${large},0 ${ix1.toFixed(2)},${iy1.toFixed(2)} Z`;
    start += angle;
    return { ...d, path };
  });
  return `<div class="donut-wrap">
    <svg width="160" height="160" viewBox="0 0 160 160">
      ${slices.map(s => `<path d="${s.path}" fill="${s.color}" opacity=".9"/>`).join('')}
      <text x="${cx}" y="${cy-4}" text-anchor="middle" font-size="18" font-weight="700" fill="#303133">${total}</text>
      <text x="${cx}" y="${cy+14}" text-anchor="middle" font-size="11" fill="#909399">总案例数</text>
    </svg>
    <div class="donut-legend">
      ${data.map(d => `
        <div class="legend-item">
          <span class="legend-dot" style="background:${d.color}"></span>
          <span>${d.label}</span>
          <strong>${d.value}%</strong>
        </div>`).join('')}
    </div>
  </div>`;
}
