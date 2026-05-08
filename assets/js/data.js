/* ─── 数据模型 ─── */
const DATA = {
  hospitals: ['第一人民医院', '中心医院', '中医院', '妇幼保健院'],
  users: [
    { id:'A1001', name:'张敏',   hospital:'第一人民医院', dept:'影像科',   title:'主任医师',   role:'讲师',     status:'启用', faceOk:true  },
    { id:'A1002', name:'李晨',   hospital:'第一人民医院', dept:'急诊科',   title:'住院医师',   role:'医护人员', status:'启用', faceOk:true  },
    { id:'A1003', name:'王宁',   hospital:'中心医院',     dept:'心内科',   title:'护士长',     role:'医护人员', status:'启用', faceOk:false },
    { id:'A1004', name:'陈璐',   hospital:'中医院',       dept:'外科',     title:'副主任医师', role:'讲师',     status:'停用', faceOk:true  },
    { id:'A1005', name:'赵峰',   hospital:'妇幼保健院',   dept:'妇产科',   title:'主治医师',   role:'医护人员', status:'启用', faceOk:true  },
    { id:'A1006', name:'刘洋',   hospital:'第一人民医院', dept:'神经内科', title:'主治医师',   role:'医护人员', status:'启用', faceOk:true  },
    { id:'A1007', name:'陈静',   hospital:'中心医院',     dept:'急诊科',   title:'护士',       role:'医护人员', status:'启用', faceOk:false },
    { id:'A1008', name:'孙浩',   hospital:'中医院',       dept:'骨科',     title:'副主任医师', role:'讲师',     status:'启用', faceOk:true  },
  ],
  cases: [
    { id:'C-2026-001', name:'急性脑卒中影像判读',    dept:'影像科',   disease:'脑卒中',   creator:'张敏', hospital:'第一人民医院', date:'2026-05-03', count:148, source:'PACS自动', status:'在库',
      patient:'张*', idCard:'110101****1234', phone:'138****0068', addr:'北京市朝阳区****' },
    { id:'C-2026-002', name:'心梗急救协同示教',      dept:'心内科',   disease:'心肌梗死', creator:'陈璐', hospital:'中心医院',     date:'2026-05-02', count:126, source:'PACS自动', status:'在库',
      patient:'李*', idCard:'320311****5521', phone:'139****2290', addr:'南京市鼓楼区****' },
    { id:'C-2026-003', name:'创伤CT联合判读',        dept:'急诊科',   disease:'多发创伤', creator:'张敏', hospital:'第一人民医院', date:'2026-04-28', count:93,  source:'手工录入', status:'归档',
      patient:'王*', idCard:'440101****8882', phone:'137****6120', addr:'广州市天河区****' },
    { id:'C-2026-004', name:'肺部CT结节筛查规范',    dept:'影像科',   disease:'肺结节',   creator:'孙浩', hospital:'中医院',       date:'2026-04-20', count:78,  source:'PACS自动', status:'在库',
      patient:'赵*', idCard:'310101****3344', phone:'136****7720', addr:'上海市浦东区****' },
    { id:'C-2026-005', name:'急性阑尾炎术前评估',    dept:'外科',     disease:'急腹症',   creator:'陈璐', hospital:'中医院',       date:'2026-04-15', count:55,  source:'手工录入', status:'在库',
      patient:'孙*', idCard:'610101****9988', phone:'135****4410', addr:'西安市雁塔区****' },
  ],
  plans: [
    /* ── 张敏的计划 (讲师视图可见) ── */
    { id:'P-001', title:'医联体急诊影像标准化培训',      date:'2026-05-12 14:00', dur:'120分钟', lecturer:'张志国', scope:'医联体',       cases:2, audit:'待审核', publish:'未发布', status:'未开始' },
    { id:'P-003', title:'心梢急救病例联合教学',               date:'2026-05-19 19:00', dur:'60分钟',  lecturer:'张志国', scope:'急诊科',       cases:1, audit:'已退回', publish:'未发布', status:'需修改' },
    { id:'P-005', title:'多发创伤联合救治流程培训',   date:'2026-05-26 16:00', dur:'120分钟', lecturer:'张志国', scope:'医联体',       cases:2, audit:'待审核', publish:'未发布', status:'未开始' },
    { id:'P-008', title:'胸部CT鉴别诊断实践培训',             date:'2026-05-08 14:00', dur:'90分钟',  lecturer:'张志国', scope:'影像科',       cases:1, audit:'已通过', publish:'已发布', status:'进行中' },
    { id:'P-009', title:'腔部急症影像综合判读',               date:'2026-05-20 09:00', dur:'90分钟',  lecturer:'张志国', scope:'第一人民医院', cases:2, audit:'已通过', publish:'已发布', status:'未开始' },
    { id:'P-010', title:'儿科影像专题培训',                          date:'2026-05-28 14:00', dur:'60分钟',  lecturer:'张志国', scope:'影像科',       cases:1, audit:'待审核', publish:'未发布', status:'未开始' },
    { id:'P-011', title:'脑部MRI阅片规范与判读培训',      date:'2026-06-05 14:00', dur:'90分钟',  lecturer:'张志国', scope:'医联体',       cases:1, audit:'已退回', publish:'未发布', status:'已取消' },
    /* ── 张志国已完成的历史计划 ── */
    { id:'P-101', title:'影像科新进人员入职影像规范培训',  date:'2026-04-22 09:00', dur:'120分钟', lecturer:'张志国', scope:'影像科',       cases:1, audit:'已通过', publish:'已发布', status:'已完成' },
    { id:'P-102', title:'卷托中心绿色通道影像流程复盘',        date:'2026-04-15 14:00', dur:'90分钟',  lecturer:'张志国', scope:'第一人民医院', cases:1, audit:'已通过', publish:'已发布', status:'已完成' },
    { id:'P-103', title:'CT阅片技能强化实战培训',             date:'2026-04-08 14:00', dur:'60分钟',  lecturer:'张志国', scope:'影像科',       cases:2, audit:'已通过', publish:'已发布', status:'已完成' },
    { id:'P-104', title:'放射诊断质控标准培训（双季度）',  date:'2026-03-25 09:30', dur:'120分钟', lecturer:'张志国', scope:'医联体',       cases:3, audit:'已通过', publish:'已发布', status:'已完成' },
    { id:'P-105', title:'骨瞪X线影像判读进阶培训',        date:'2026-03-12 14:00', dur:'90分钟',  lecturer:'张志国', scope:'外科',             cases:1, audit:'已通过', publish:'已发布', status:'已完成' },
    /* ── 其他讲师的计划（管理员视图可见） ── */
    { id:'P-002', title:'卷托绿色通道案例复盘',               date:'2026-05-15 09:30', dur:'90分钟',  lecturer:'陈璧', scope:'第一人民医院', cases:1, audit:'已通过', publish:'已发布', status:'未开始' },
    { id:'P-004', title:'肺结节CT规范化阅片',                        date:'2026-05-22 14:00', dur:'90分钟',  lecturer:'孙浩', scope:'中医院',       cases:1, audit:'已通过', publish:'未发布', status:'未开始' },
  ],
  evaluations: [
    { id:'E-001', plan:'卒中绿色通道案例复盘',       score:4.8, count:46, comment:'案例贴近临床，影像标注清晰，期待更多急诊影像专项内容。' },
    { id:'E-002', plan:'心梗急救病例联合教学',       score:4.5, count:32, comment:'节奏合理，建议增加签到提醒与课后问答环节。' },
    { id:'E-003', plan:'肺结节CT规范化阅片',         score:4.6, count:28, comment:'讲师专业性强，案例典型性好。' },
  ],
  archives: [
    { id:'AR-001', title:'卒中绿色通道案例复盘',     date:'2026-04-21 14:00', count:48, signRate:'96%', video:'已留存', caseRef:'急性脑卒中影像判读', retention:'15年', score:4.8 },
    { id:'AR-002', title:'创伤CT联合判读教学',       date:'2026-04-10 09:00', count:35, signRate:'91%', video:'已留存', caseRef:'创伤CT联合判读',      retention:'15年', score:4.6 },
    { id:'AR-003', title:'心梗急救病例教学',         date:'2026-04-02 19:00', count:30, signRate:'88%', video:'已留存', caseRef:'心梗急救协同示教',    retention:'15年', score:4.5 },
  ],
  attendance: [
    { name:'李晨', hospital:'第一人民医院', dept:'急诊科', time:'13:58', status:'正常', method:'人脸识别' },
    { name:'王宁', hospital:'中心医院',     dept:'心内科', time:'14:07', status:'迟到', method:'工号验证' },
    { name:'陈静', hospital:'中心医院',     dept:'急诊科', time:'14:12', status:'迟到', method:'工号验证' },
    { name:'赵峰', hospital:'妇幼保健院',   dept:'妇产科', time:'--',    status:'缺席', method:'--'       },
    { name:'刘洋', hospital:'第一人民医院', dept:'神经内科',time:'13:55', status:'正常', method:'人脸识别' },
  ],
  interfaces: [
    { name:'医联体主系统同步接口', url:'https://ehr-gateway.med-union.cn/sync', status:'正常', desc:'用户主数据、组织架构、工号信息同步', lastCheck:'2026-05-08 09:01' },
    { name:'第三方视频会议接口',   url:'https://meeting-api.med-union.cn/room', status:'异常', desc:'培训会议室创建、录像回调、参会名单同步', lastCheck:'2026-05-08 08:52' },
    { name:'PACS/云影像接口',      url:'https://pacs-api.med-union.cn/desense', status:'正常', desc:'病例影像抓取、自动脱敏处理、重点影像调阅', lastCheck:'2026-05-08 09:15' },
  ],
  logs: [
    { type:'系统操作', actor:'超级管理员', target:'角色权限变更',           time:'2026-05-08 08:45:12', status:'成功', ip:'192.168.1.10' },
    { type:'接口调用', actor:'PACS同步服务', target:'C-2026-001自动脱敏入库',time:'2026-05-08 09:01:33', status:'成功', ip:'10.0.1.5'    },
    { type:'数据访问', actor:'李晨',         target:'查看案例C-2026-001',    time:'2026-05-08 09:15:08', status:'成功', ip:'192.168.1.22' },
    { type:'接口调用', actor:'视频会议接口',  target:'录像回调签名校验',      time:'2026-05-08 09:21:46', status:'异常', ip:'10.0.2.8'    },
    { type:'数据访问', actor:'张敏',         target:'下载案例C-2026-003',    time:'2026-05-08 09:36:14', status:'成功', ip:'192.168.1.18' },
    { type:'系统操作', actor:'超级管理员',   target:'脱敏规则配置保存',      time:'2026-05-08 10:02:30', status:'成功', ip:'192.168.1.10' },
  ],
  /* chart data */
  chartBar: { labels:['第一人民医院','中心医院','中医院','妇幼保健院','医联体合计'], values:[94,88,83,91,92] },
  chartLine: { labels:['1周','2周','3周','4周','5周','6周'], values:[72,79,76,85,88,91] },
  chartDonut: [
    { label:'影像教学', value:56, color:'#409eff' },
    { label:'病例复盘', value:25, color:'#67c23a' },
    { label:'规范培训', value:12, color:'#e6a23c' },
    { label:'其他',     value:7,  color:'#c0c4cc'  },
  ],
};

/* ─── 角色定义 ─── */
const ROLES = {
  admin: {
    label:'医联体超级管理员', short:'超级管理员', icon:'👑',
    name:'超级管理员', id:'SYS-001', title:'系统管理员',
    hospital:'医联体总部', dept:'运营管理中心',
    dashboard:'dash-admin',
    perms: new Set(['*']),
    menu: [
      { section:'总览',     items:[{ key:'dash-admin',       icon:'📊', label:'首页看板'  }] },
      { section:'组织权限', items:[{ key:'user-list',        icon:'👥', label:'用户管理'  },
                                   { key:'role-perms',       icon:'🔑', label:'角色权限'  }] },
      { section:'培训核心', items:[{ key:'case-list',        icon:'📁', label:'案例库管理'},
                                   { key:'plan-list',        icon:'📋', label:'培训计划'  },
                                   { key:'meeting-room',     icon:'🎥', label:'培训实施'  },
                                   { key:'eval-list',        icon:'⭐', label:'评价与归档'}] },
      { section:'统计分析', items:[{ key:'stats-board',      icon:'📈', label:'综合统计'  },
                                   { key:'report-export',    icon:'📤', label:'报表导出'  }] },
      { section:'系统设置', items:[{ key:'integrations',     icon:'🔌', label:'接口管理'  },
                                   { key:'desense-rules',    icon:'🛡', label:'脱敏规则'  },
                                   { key:'sys-params',       icon:'⚙️', label:'系统参数'  },
                                   { key:'logs',             icon:'📜', label:'日志管理'  }] },
    ]
  },
  lecturer: {
    label:'医院/科室讲师', short:'讲师', icon:'🎓',
    name:'张志国', id:'A1001', title:'主任医师',
    hospital:'第一人民医院', dept:'影像科',
    dashboard:'dash-lecturer',
    perms: new Set(['case.view','case.create','case.edit','case.archive','plan.view','plan.create','plan.edit','plan.publish','meeting.view','meeting.manage','attend.view','attend.remind','eval.view','archive.view','stats.view']),
    menu: [
      { section:'工作台',   items:[{ key:'dash-lecturer',    icon:'🏥', label:'讲师首页'  }] },
      { section:'培训管理', items:[{ key:'case-list',        icon:'📁', label:'案例库管理'},
                                   { key:'plan-list',        icon:'📋', label:'培训计划'  },
                                   { key:'meeting-room',     icon:'🎥', label:'培训实施'  },
                                   { key:'eval-list',        icon:'⭐', label:'评价归档'  }] },
      { section:'统计分析', items:[{ key:'stats-board',      icon:'📈', label:'数据统计'  }] },
    ]
  },
  staff: {
    label:'普通医护人员', short:'医护人员', icon:'👨‍⚕️',
    name:'李晨', id:'A1002', title:'住院医师',
    hospital:'第一人民医院', dept:'急诊科',
    dashboard:'dash-staff',
    perms: new Set(['training.join','case.view','eval.submit','archive.self','attend.self']),
    menu: [
      { section:'个人中心', items:[{ key:'dash-staff',       icon:'🏠', label:'我的首页'  }] },
      { section:'学习任务', items:[{ key:'case-detail',      icon:'📁', label:'案例查看'  },
                                   { key:'eval-form',        icon:'✏️', label:'培训评价'  },
                                   { key:'archive-list',     icon:'📂', label:'个人档案'  }] },
    ]
  }
};

/* ─── 应用状态 ─── */
const S = {
  role: 'admin',      // 当前角色（登录后）
  loginRole: 'admin', // 登录页选中角色
  view: 'login',
  lastView: null,
  collapsed: false,
  mobile: false,
  mobileView: 'mob-home',
  modal: null,
  toasts: [],
  advanced: {},
  caseMode: 'auto',
  roleTab: 'default',
  selCase: 'C-2026-001',
  selPlan: 'P-001',
};
