/* ============================================================
 * 作品集网站 · 唯一数据源（由本地 works.js 拆分生成，请勿手改此文件）
 * - 想加作品：改本地 35-作品集双站/works.js，重新生成并部署即可。
 * - summary = 一句话事实简介；tagline/story = 温情文案（占位【待填充·温情文案】）
 * - sites / needsConsent / needsReview / private 见本地源文件注释。
 * ============================================================ */
const SITES = {
  "real": {
    "key": "real",
    "name": "Magic",
    "tagline": "把想法，做成能用的作品",
    "about": "【待填充·温情文案】这里写一段关于\"我为什么做这些事\"的话：一个在外贸一线十几年、习惯用趁手工具把模糊念头落地的人。",
    "accentDefault": "celadon",
    "resume": true,
    "contact": {
      "showQR": false,
      "email": "magic@example.com",
      "note": "合作与机会，欢迎来信。"
    },
    "aiNote": "从想法到成品，过程里会用各种趁手工具，但决定质量的，始终是判断与审美。"
  }
};

const WORKS = [
  {
    "id": "cat-archive",
    "title": "流浪猫猫档案馆",
    "theme": "万物有灵",
    "tags": [
      "朋友"
    ],
    "sites": [
      "real",
      "muchen"
    ],
    "year": "2026",
    "role": "为一位长期救助流浪猫的朋友量身定制",
    "summary": "给每只猫猫建一个\"小身份证\"，把散落在相册、备忘录、聊天记录、表格里的救助信息，收拢到一处。",
    "tagline": "【待填充·温情文案】",
    "story": "【待填充·温情文案】",
    "cover": "🐱",
    "needsConsent": true,
    "preview": ""
  },
  {
    "id": "baobao-adventure",
    "title": "豆宝大冒险",
    "theme": "游戏",
    "tags": [
      "个人"
    ],
    "sites": [
      "real",
      "muchen"
    ],
    "year": "2026",
    "role": "为一位特别的朋友亲手打造",
    "summary": "一款 HTML5 单文件横版闯关游戏，集成 BGM、浮动文字与手感打磨，是一个人为另一个人花时间做的礼物。",
    "tagline": "【待填充·温情文案】",
    "story": "【待填充·温情文案】",
    "cover": "🎮",
    "note": "源文件在私人文件夹，公开展示前需剥离上下文、单独导出。",
    "preview": ""
  },
  {
    "id": "song-magic",
    "title": "《Magic》",
    "theme": "音乐",
    "tags": [
      "个人"
    ],
    "sites": [
      "real",
      "muchen"
    ],
    "year": "2026",
    "role": "创作 / 作词",
    "summary": "一首写给特定人的歌，用旋律把说不清的心意唱出来。",
    "tagline": "【待填充·温情文案】",
    "story": "【待填充·温情文案】",
    "cover": "🎵",
    "preview": ""
  },
  {
    "id": "song-xiangyang",
    "title": "《向阳一起长大》",
    "theme": "音乐",
    "tags": [
      "个人"
    ],
    "sites": [
      "real",
      "muchen"
    ],
    "year": "2026",
    "role": "创作 / 作词",
    "summary": "一首关于陪伴与成长的歌，像给某个人的一封有声信。",
    "tagline": "【待填充·温情文案】",
    "story": "【待填充·温情文案】",
    "cover": "🎶",
    "preview": ""
  },
  {
    "id": "song-one-year",
    "title": "《认识你一年了》",
    "theme": "音乐",
    "tags": [
      "个人"
    ],
    "sites": [
      "real",
      "muchen"
    ],
    "year": "2026",
    "role": "创作 / 作词",
    "summary": "一周年纪念歌曲，把一整年的相处写成旋律。",
    "tagline": "【待填充·温情文案】",
    "story": "【待填充·温情文案】",
    "cover": "💿",
    "preview": ""
  },
  {
    "id": "color-test",
    "title": "性格色彩测试",
    "theme": "工具",
    "tags": [
      "个人"
    ],
    "sites": [
      "real",
      "muchen"
    ],
    "year": "2025",
    "role": "设计 / 开发",
    "summary": "一套把性格色彩讲清楚的小工具，让人快速看见自己的特质。",
    "tagline": "【待填充·温情文案】",
    "story": "【待填充·温情文案】",
    "cover": "🎨",
    "preview": ""
  },
  {
    "id": "career-compass",
    "title": "职业定位罗盘",
    "theme": "工具",
    "tags": [
      "个人"
    ],
    "sites": [
      "real",
      "muchen"
    ],
    "year": "2025",
    "role": "设计 / 开发",
    "summary": "帮人在职业十字路口理清方向的小工具。",
    "tagline": "【待填充·温情文案】",
    "story": "【待填充·温情文案】",
    "cover": "🧭",
    "preview": ""
  },
  {
    "id": "love-translator",
    "title": "爱情翻译器",
    "theme": "工具",
    "tags": [
      "个人"
    ],
    "sites": [
      "real",
      "muchen"
    ],
    "year": "2025",
    "role": "设计 / 开发",
    "summary": "把情侣间那些\"他到底什么意思\"翻译成能接住的话。",
    "tagline": "【待填充·温情文案】",
    "story": "【待填充·温情文案】",
    "cover": "💞",
    "preview": ""
  },
  {
    "id": "bigfive",
    "title": "大五人格系列科普",
    "theme": "工具",
    "tags": [
      "个人"
    ],
    "sites": [
      "real",
      "muchen"
    ],
    "year": "2025",
    "role": "内容 / 设计",
    "summary": "把专业的大五人格模型，做成普通人也能看懂的科普。",
    "tagline": "【待填充·温情文案】",
    "story": "【待填充·温情文案】",
    "cover": "📊",
    "preview": ""
  },
  {
    "id": "loveanddeepspace",
    "title": "恋与深空 · 情绪翻译官",
    "theme": "工具",
    "tags": [
      "个人"
    ],
    "sites": [
      "real",
      "muchen"
    ],
    "year": "2026",
    "role": "策划 / 设计",
    "summary": "一份面向同好社群的小红书启动包，把游戏情绪变成可分享的内容。",
    "tagline": "【待填充·温情文案】",
    "story": "【待填充·温情文案】",
    "cover": "🌌",
    "preview": ""
  },
  {
    "id": "moyu",
    "title": "摸鱼神器",
    "theme": "工具",
    "tags": [
      "个人"
    ],
    "sites": [
      "real",
      "muchen"
    ],
    "year": "2025",
    "role": "开发",
    "summary": "一个让日常琐事轻松一点的小工具。",
    "tagline": "【待填充·温情文案】",
    "story": "【待填充·温情文案】",
    "cover": "🐟",
    "preview": ""
  },
  {
    "id": "rest-timer",
    "title": "静刻 · 工作休息提醒器",
    "theme": "工具",
    "tags": [
      "个人"
    ],
    "sites": [
      "real",
      "muchen"
    ],
    "year": "2025",
    "role": "开发",
    "summary": "温柔提醒你该停下来喘口气的休息神器。",
    "tagline": "【待填充·温情文案】",
    "story": "【待填充·温情文案】",
    "cover": "⏳",
    "preview": ""
  },
  {
    "id": "procurement-system",
    "title": "采购选品系统",
    "theme": "商业",
    "tags": [
      "企业"
    ],
    "sites": [
      "real",
      "muchen"
    ],
    "year": "2026",
    "role": "从想法到上线的全栈自研",
    "summary": "一套面向外贸公司的采购选品系统：录入端 + 管理端 + 内网后端 + 选品 SOP + AI 新品推荐，已真实上线、多人使用。",
    "tagline": "【待填充·温情文案】",
    "story": "【待填充·温情文案】",
    "cover": "📦",
    "note": "公开展示用脱敏假数据演示版，不暴露公司内网与真实成本。",
    "preview": ""
  },
  {
    "id": "eu-regulation",
    "title": "欧盟新规解读 PPT",
    "theme": "商业",
    "tags": [
      "企业"
    ],
    "sites": [
      "real",
      "muchen"
    ],
    "year": "2026",
    "role": "研究 / 制作",
    "summary": "把复杂的欧盟（电池/产品）新规，翻译成业务能用的解读。",
    "tagline": "【待填充·温情文案】",
    "story": "【待填充·温情文案】",
    "cover": "🇪🇺",
    "needsReview": true,
    "preview": ""
  },
  {
    "id": "foreign-trade-flow",
    "title": "外贸工作流工具集",
    "theme": "商业",
    "tags": [
      "企业"
    ],
    "sites": [
      "real"
    ],
    "year": "2025",
    "role": "设计 / 开发",
    "summary": "涵盖客户管理、邮件模板、产品目录、市场简报的一套外贸工作流。",
    "tagline": "【待填充·温情文案】",
    "story": "【待填充·温情文案】",
    "cover": "🌐",
    "note": "含客户名等需脱敏内容，展示前处理。",
    "preview": ""
  },
  {
    "id": "trade-strategy",
    "title": "2026 外贸转型策略",
    "theme": "商业",
    "tags": [
      "企业"
    ],
    "sites": [
      "real"
    ],
    "year": "2026",
    "role": "策略 / 研究",
    "summary": "面向外贸公司转型与选品方向的策略梳理。",
    "tagline": "【待填充·温情文案】",
    "story": "【待填充·温情文案】",
    "cover": "📈",
    "needsReview": true,
    "preview": ""
  },
  {
    "id": "trade-templates",
    "title": "外贸模板文件",
    "theme": "商业",
    "tags": [
      "企业"
    ],
    "sites": [
      "real"
    ],
    "year": "2025",
    "role": "设计",
    "summary": "报价单、PI、订单跟踪等可直接复用的外贸模板。",
    "tagline": "【待填充·温情文案】",
    "story": "【待填充·温情文案】",
    "cover": "📑",
    "preview": ""
  },
  {
    "id": "bielei-hair",
    "title": "毕雷 · 私人发型工作室",
    "theme": "商业",
    "tags": [
      "朋友"
    ],
    "sites": [
      "real",
      "muchen"
    ],
    "year": "2026",
    "role": "为朋友定制",
    "summary": "帮朋友把发型工作室做成有调性的小官网。",
    "tagline": "【待填充·温情文案】",
    "story": "【待填充·温情文案】",
    "cover": "💇",
    "needsConsent": true,
    "preview": ""
  },
  {
    "id": "bread-bro-hair",
    "title": "张先森 · 私人发型工作室",
    "theme": "商业",
    "tags": [
      "朋友"
    ],
    "sites": [
      "real",
      "muchen"
    ],
    "year": "2026",
    "role": "为朋友定制",
    "summary": "帮朋友打造的私人发型工作室展示页。",
    "tagline": "【待填充·温情文案】",
    "story": "【待填充·温情文案】",
    "cover": "✂️",
    "needsConsent": true,
    "preview": ""
  },
  {
    "id": "chaozhao-app",
    "title": "朝食记 App",
    "theme": "商业",
    "tags": [
      "朋友"
    ],
    "sites": [
      "real",
      "muchen"
    ],
    "year": "2026",
    "role": "为朋友定制",
    "summary": "帮朋友做的早餐/生活记录类小应用。",
    "tagline": "【待填充·温情文案】",
    "story": "【待填充·温情文案】",
    "cover": "🥣",
    "needsConsent": true,
    "preview": ""
  },
  {
    "id": "dailinlin-pos",
    "title": "面馆 POS 系统",
    "theme": "商业",
    "tags": [
      "朋友"
    ],
    "sites": [
      "real",
      "muchen"
    ],
    "year": "2026",
    "role": "为朋友定制",
    "summary": "帮朋友的面馆做的点单收银小系统。",
    "tagline": "【待填充·温情文案】",
    "story": "【待填充·温情文案】",
    "cover": "🍜",
    "needsConsent": true,
    "preview": ""
  }
];

window.SITES = SITES;
window.WORKS = WORKS;
