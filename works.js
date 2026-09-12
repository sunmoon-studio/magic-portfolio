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
    "tagline": "把想法，做成能用的作品。",
    "hero": {
      "eyebrow": "Magic · 作品集"
    },
    "about": "互联网、制造业，再到外贸——几个行业走下来，让我越来越笃定：经验可以迁移。真正驱动我一路跨界的，是好奇心，是终身学习。我信王阳明那句\"人须在事上磨，方立得住\"——判断力、审美、真实经验的厚度，都是这样磨出来的。AI 时代最稀缺的，正是这样的人；若还能用 AI 杠杆把这些放大，与志同道合的人一起做有意义的事、拿到大结果，便是我眼里的人生一大幸事。",
    "accentDefault": "celadon",
    "resume": true,
    "contact": {
      "showQR": true,
      "wechatQr": "media/qr-wechat.png",
      "wechatId": "magic10d1"
    }
  }
};

const WORKS = [
  {
    "id": "cat-archive",
    "title": "流浪猫猫档案馆",
    "theme": "万物有灵",
    "sites": [
      "real",
      "muchen"
    ],
    "year": "2026",
    "role": "为一位长期救助流浪猫的朋友量身定制",
    "tagline": "每一只被看见的猫猫，都值得拥有自己的档案。",
    "story": "朋友一直在救助、投喂、安置流浪猫。但猫的照片散在相册，驱虫疫苗在备忘录，领养信息在聊天记录，捐款支出又记在表格里。时间一久，就变成灵魂三问：\"这只绝育了吗？\"\"上次驱虫是什么时候？\"\"那笔猫粮是谁捐的来着？\" 所以，我给她做了这个工具——不是冷冰冰的管理系统，更像是给每只猫建了一张\"小身份证\"。每一只被记住的猫，都值得被好好对待。万物有灵，愿每一个小生命都能被温柔以待。",
    "cover": "🐱",
    "needsConsent": true,
    "media": {
      "type": "iframe",
      "src": "demo/cat-archive/index.html",
      "h": 620
    },
    "preview": ""
  },
  {
    "id": "baobao-adventure",
    "title": "豆宝大冒险",
    "theme": "游戏",
    "sites": [
      "real",
      "muchen"
    ],
    "year": "2026",
    "role": "为一位特别的朋友亲手打造",
    "tagline": "别人的游戏靠下载，我们的冒险是专属限定。",
    "story": "不送成品，只造回忆。用代码搭建起只有我们懂的默契，这趟冒险的每一步，都是我们友情的见证。",
    "cover": "🎮",
    "preview": "",
    "media": {
      "type": "iframe",
      "src": "demo/game-baobao-real.html",
      "h": 620
    }
  },
  {
    "id": "song-xiangyang",
    "title": "《写给Magic的歌》",
    "theme": "视听盛宴",
    "sub": "音乐",
    "sites": [
      "real",
      "muchen"
    ],
    "year": "2026",
    "role": "创作 / 作词",
    "tagline": "这是专属于我的BGM",
    "story": "当你活成一束光照耀他人，走着走着就会发现，你曾照亮的人，都成了簇拥你的星光。暖意汇聚，向阳而生。",
    "cover": "🎶",
    "media": {
      "type": "video",
      "src": "media/song-xiangyang.mp4"
    },
    "preview": ""
  },
  {
    "id": "song-grow-together-mom",
    "title": "《一起长大》",
    "theme": "视听盛宴",
    "sub": "音乐",
    "sites": [
      "real",
      "muchen"
    ],
    "year": "2026",
    "role": "创作 / 作词",
    "tagline": "母亲节为妈妈写的歌",
    "story": "我经常感恩地想：我一定是上辈子积了很多德，这辈子才能做您的女儿。祝愿妈妈身体一直健健康康，每天都过得舒心快乐。",
    "cover": "🌱",
    "media": {
      "type": "video",
      "src": "media/song-grow-together-mom.mp4"
    },
    "preview": ""
  },
  {
    "id": "song-one-year",
    "title": "《认识你一年了》",
    "theme": "视听盛宴",
    "sub": "音乐",
    "sites": [
      "real"
    ],
    "year": "2026",
    "role": "创作 / 作词",
    "tagline": "一年不长，但够记住一个人。",
    "story": "认识你的第一年，解锁了好多属于这份友谊的第一次。本以为熟悉的圈子之外，很难再有新的共鸣，却意外收获许多新感受、新视角。这首歌，记下这场意料之外的相遇与收获。",
    "cover": "💿",
    "media": {
      "type": "video",
      "src": "media/song-yinian-video.mp4"
    },
    "preview": ""
  },
  {
    "id": "ai-anime-xingchen",
    "title": "《星辰信号》",
    "theme": "视听盛宴",
    "sub": "AI 漫剧",
    "sites": [
      "real",
      "muchen"
    ],
    "year": "2026",
    "role": "编剧 / 分镜 / AI 生成 / 剪辑",
    "tagline": "信号已经发出，冒险才刚刚开始。",
    "story": "这是我尝试的第一部 AI 动漫短片，也是第一次完整走完「写故事 → 设计角色 → 生成画面 → 剪成片」整条创作链路。\n故事不长：末世之后，一个叫露娜的女孩在废墟深处找到一颗发光的水晶，伸手碰了一下，一幅巨大的全息星图升上天空，照亮了整座死寂的城市。\n坦白说成片尚有不足，这只是一次新手尝试。做完才明白，AI 很容易产出好看的画面，但大量细节仍需打磨。技术会越来越容易，故事不会。",
    "cover": "🌌",
    "media": {
      "type": "video",
      "src": "media/ai-anime-xingchen.mp4"
    },
    "preview": ""
  },
  {
    "id": "ai-anime-lastbite",
    "title": "《谁动了我的蛋糕》",
    "theme": "视听盛宴",
    "sub": "AI 漫剧",
    "sites": [
      "real",
      "muchen"
    ],
    "year": "2026",
    "role": "创意 / AI 生成",
    "tagline": "一眼识破，小打小闹的浪漫。",
    "story": "情侣最浪漫的日常，是烟火里的小打小闹，是一方小心思被另一方一眼看穿，带着嗔怪又纵容的默契。",
    "cover": "🍰",
    "media": {
      "type": "video",
      "src": "media/ai-anime-couple.mp4"
    },
    "preview": ""
  },
  {
    "id": "color-test",
    "title": "性格色彩测试",
    "theme": "心理与认知",
    "sites": [
      "real",
      "muchen"
    ],
    "year": "2025",
    "role": "设计 / 开发",
    "tagline": "测出你的性格底色，找到你最顺的活法。",
    "story": "性格色彩这东西，很多人听过但没真懂——红蓝黄绿到底意味着什么？不是给你贴标签，是让你照镜子。做这个工具的初衷很简单：帮人看见自己，然后原谅自己。\n测试只是入口，真正的分量在后面那份深度报告：同一件事，不同颜色的人读到的答案完全不一样。下面放了四色的样章，每色前 6 页——可以看看属于你的那一份长什么样。",
    "cover": "🎨",
    "report": {
      "type": "pages",
      "dir": "media/pages/color-real",
      "count": 24,
      "visiblePages": 6,
      "label": "四色深度报告 · 样章（黄/红/绿/蓝，每色前 6 页）"
    },
    "preview": "",
    "media": {
      "type": "iframe",
      "src": "demo/color-test-real.html",
      "h": 640
    }
  },
  {
    "id": "career-compass",
    "title": "职业定位罗盘",
    "theme": "心理与认知",
    "sites": [
      "real",
      "muchen"
    ],
    "year": "2025",
    "role": "设计 / 开发",
    "tagline": "迷路的时候，需要的不是地图，是罗盘。",
    "story": "在职业岔路口纠结留走、转岗还是深耕时，人最痛的从来不是没选项，是你盯着外界的噪音，把「我想要什么」和「我能做什么」拆成了两半，越想越乱。\n这个工具不会替你拍板选哪条路，它只做一件事：把你藏在脑子里搅成一团的欲望、底气、隐形优势，清清楚楚摊在同一张桌面上，让你不用内耗猜自己，明明白白做选择。",
    "cover": "🧭",
    "preview": "",
    "media": {
      "type": "iframe",
      "src": "demo/career-compass-real.html",
      "h": 640
    }
  },
  {
    "id": "yidao",
    "title": "易道 · AI 修炼",
    "theme": "心理与认知",
    "sites": [
      "real",
      "muchen"
    ],
    "year": "2026",
    "role": "产品设计 / 开发",
    "tagline": "古老的智慧，需要一个现代的入口。",
    "story": "《易经》蕴含古老智慧，但学习门槛较高。于是我设想，把内容拆成「每天一卦、看一张图、答一道题」，降低入门门槛。\nApp 将六十四卦做成轻量化学习：每日一卦配白话解读与生活启示，支持铜钱起卦，还会依据遗忘曲线安排复习，慢慢积累进度。\n不求人人成为易学大师，只为给古老智慧，搭建一个现代的入口。",
    "cover": "☯",
    "media": {
      "type": "iframe",
      "src": "demo/yidao/index.html",
      "h": 800
    },
    "preview": ""
  },
  {
    "id": "love-translator",
    "title": "爱情翻译器",
    "theme": "情感与生活",
    "sub": "与人",
    "sites": [
      "real",
      "muchen"
    ],
    "year": "2025",
    "role": "设计 / 开发",
    "tagline": "翻译情绪，读懂需求",
    "story": "韩剧里有句台词：这世上有多少人，就有多少种语言。\n亲密关系里最大的遗憾，从来不是无话可说，而是说着同一种语言，却读不懂彼此的真心。很多矛盾的根源，都是情绪被误解、心意被隐藏、真实的需求无人知晓。\n为此，我打造了「爱情翻译器」。\n它不翻译字面文字，只翻译隐秘情绪与未说出口的爱意，帮我们穿透表层对话，读懂彼此的真实诉求。\n让爱意不再靠猜测，让相处少一点隔阂，多一份双向的理解与温柔。",
    "cover": "💞",
    "media": {
      "type": "iframe",
      "src": "demo/love-translator/index.html",
      "h": 660
    },
    "preview": ""
  },
  {
    "id": "bigfive",
    "title": "大五人格系列科普",
    "theme": "心理与认知",
    "sites": [
      "real",
      "muchen"
    ],
    "year": "2025",
    "role": "内容 / 设计",
    "tagline": "心理学不是用来分析别人的，是来认识自己的。",
    "story": "大五人格是心理学里最靠谱的人格模型，但专业术语太劝退了。我想把它变成\"看完就能用\"的东西——不是让你去给别人贴标签，是让你理解：原来我这样，是有原因的。",
    "cover": "📊",
    "media": {
      "type": "iframe",
      "src": "demo/bigfive/index.html",
      "h": 700
    },
    "preview": ""
  },
  {
    "id": "loveanddeepspace",
    "title": "恋与深空 · 情绪翻译官",
    "theme": "情感与生活",
    "sub": "与人",
    "sites": [
      "real",
      "muchen"
    ],
    "year": "2026",
    "role": "策划 / 设计",
    "tagline": "游戏里的感动，值得被认真说出来。",
    "story": "玩恋与深空的人都知道，那些剧情戳中的瞬间——你想发点什么，但又不知道怎么写。这个\"翻译官\"就是帮同好们把\"我哭了\"变成一篇有温度的分享。",
    "cover": "🌌",
    "media": {
      "type": "iframe",
      "src": "demo/love-emoji/index.html",
      "h": 660
    },
    "preview": ""
  },
  {
    "id": "moyu",
    "title": "摸鱼神器",
    "theme": "情感与生活",
    "sub": "与己",
    "sites": [
      "real",
      "muchen"
    ],
    "year": "2025",
    "role": "开发",
    "tagline": "老板/同事路过，一键切回工作不社死，歇得坦荡效率稳",
    "story": "打工人都懂：没人能8小时连轴转。脑子卡壳时想刷两条资讯、发两句私消息、放空30秒缓口气，硬熬着反而越熬越慢。\n我们没做什么“偷懒作弊工具”，只是把工位上人人都有的“怕被抓的休息时刻”做得体面点：\n一键从私人浏览状态无缝切回预设工作界面；\n不用慌着关窗口，不用提心吊胆听脚步声，歇的几分钟完全没负罪感；\n缓完神直接回状态，不被突发打扰打断节奏，把工作和休息的边界拉成舒服的平衡。\n它不是教你混工时，是让你不用偷偷摸摸喘口气，用零内耗的短休息，换更稳的工作状态。",
    "cover": "🐟",
    "media": {
      "type": "iframe",
      "src": "demo/moyu/index.html",
      "h": 640
    },
    "preview": ""
  },
  {
    "id": "rest-timer",
    "title": "静刻 · 工作休息提醒器",
    "theme": "情感与生活",
    "sub": "与己",
    "sites": [
      "real",
      "muchen"
    ],
    "year": "2025",
    "role": "开发",
    "tagline": "停下来，不是偷懒，是充电。",
    "story": "我自己就是那种一忙起来就忘了时间的人。做这个提醒器，其实是给自己的一份温柔——它不会催你，只是轻轻说一声：该喝水了。",
    "cover": "⏳",
    "media": {
      "type": "iframe",
      "src": "demo/rest-timer/index.html",
      "h": 600
    },
    "preview": ""
  },
  {
    "id": "make-peace",
    "title": "哄人神器",
    "theme": "情感与生活",
    "sub": "与人",
    "sites": [
      "real",
      "muchen"
    ],
    "year": "2026",
    "role": "设计 / 开发",
    "tagline": "不好说出口的歉意，就在游戏里慢慢讲。",
    "story": "一百句对不起，都轻飘飘。\n那就把道歉做成游戏。有些话不好直说，那就边玩边表达。\n主动不是认输，是把心意，做成对方拒绝不了的样子。",
    "cover": "🕊️",
    "media": {
      "type": "iframe",
      "src": "demo/make-peace/index.html",
      "h": 720
    },
    "preview": ""
  },
  {
    "id": "procurement-system",
    "title": "采购选品系统",
    "theme": "商业",
    "sub": "企业项目",
    "sites": [
      "real",
      "muchen"
    ],
    "year": "2026",
    "role": "从想法到上线的全栈自研",
    "tagline": "从“凭感觉选品”到“用数据决策”，我搭建的不只是系统，更是沉淀资产、赋能业务的中台。",
    "story": "外贸采购常常陷入这样的困境：海量产品信息分散各处，多家供应商报价杂乱，选品依赖个人经验，业务拓客还要反复制作销售资料。\n我设计这套系统的初心就是想打通采购与业务两端。\n在采购端：统一沉淀产品数据，搭建可检索产品池，提升采购团队效率，把零散的信息转化为公司可长期复用的资产；\n在业务端：支持一键导出 PDF 销售物料，让业务团队拥有随时可用的拓客弹药。\n从构思落地到团队真正上手使用，我深刻体会：最好的系统，不只是自动化流程，而是让沉淀下来的数据，真正驱动采购决策，持续为业务增长赋能。",
    "cover": "📦",
    "note": "公开展示用脱敏假数据演示版，不暴露公司内网与真实成本。",
    "gallery": [
      {
        "src": "demo/procurement/shots/shot-1-console.jpg",
        "caption": "管理端全景"
      },
      {
        "src": "demo/procurement/shots/shot-2-grid.jpg",
        "caption": "产品录入选品"
      },
      {
        "src": "demo/procurement/shots/shot-3-cover.jpg",
        "caption": "一键生成 PDF"
      },
      {
        "src": "demo/procurement/shots/shot-4-product.jpg",
        "caption": "单品完整档案"
      },
      {
        "src": "demo/procurement/shots/shot-5-compare.jpg",
        "caption": "多品对比决策"
      },
      {
        "src": "demo/procurement/shots/shot-6-next.jpg",
        "caption": "给客户的收尾页"
      }
    ],
    "media": {
      "type": "iframe",
      "src": "demo/procurement/index.html",
      "h": 860
    },
    "preview": ""
  },
  {
    "id": "agent-factory-finder",
    "title": "AI 搜厂智能体",
    "theme": "商业",
    "sub": "企业项目",
    "sites": [
      "real",
      "muchen"
    ],
    "year": "2026",
    "role": "智能体设计 / 需求翻译 / 全流程搭建",
    "tagline": "拆解模糊需求，精准锁定优质工厂",
    "story": "外贸场景中，很多海外客户只提供一张产品图片或者初步想法，并无明确的量化参数。模糊的需求，一直是精准搜寻供应商的核心痛点。\n基于这一行业痛点，我打造了 AI 搜厂智能体。它能够智能拆解客户的模糊需求，将抽象想法转化为清晰、可落地的筛选标准——无需客户细化各项细节，即可高效精准匹配优质靠谱工厂，为外贸合作赋能增值。",
    "cover": "🧭",
    "note": "公开展示用脱敏演示版，不出现真实客户与厂商名称。",
    "media": {
      "type": "iframe",
      "src": "demo/ai-factory-finder/index.html",
      "h": 900
    },
    "preview": ""
  },
  {
    "id": "eu-regulation",
    "title": "欧盟新规解读 PPT",
    "theme": "商业",
    "sub": "企业项目",
    "sites": [
      "real",
      "muchen"
    ],
    "year": "2026",
    "role": "研究 / 制作",
    "tagline": "法规不是条文堆砌，读懂底层逻辑，才是落地的关键。",
    "story": "欧盟新规发布，业务团队常卡在密密麻麻的外文条款里，只知其文，不知其意。\n我的工作，不只是翻译几十页法规原文，而是深挖规则背后的设计逻辑，把晦涩的条文，转化成贴合我们业务场景、可落地的解读。\n好的合规解读，不是原文搬运。它帮团队穿透文字表象，理解法规为什么这么制定；既夯实采购团队的专业能力，又提升整体战斗力，也让日常合规决策更高效。",
    "cover": "🇪🇺",
    "media": {
      "type": "pages",
      "dir": "media/pages/eu-training",
      "count": 45,
      "visiblePages": 10
    },
    "preview": ""
  },
  {
    "id": "supplier-manual",
    "title": "供应商实战判断手册",
    "theme": "商业",
    "sub": "企业项目",
    "sites": [
      "real",
      "muchen"
    ],
    "year": "2026",
    "role": "整理 / 制作",
    "tagline": "好供应商不是找出来的，是用合规框架筛出来的。",
    "story": "在欧盟新规培训之后，这本《供应商实战手册》应运而生，成为采购团队的实战工具。\n我把在外贸选供应商中容易踩坑的经验，拆解成 15 套可复用的供应商判断框架，覆盖电池、包装、认证、溯源等所有高频场景。\n每套框架自带话术、判断标准、核验问题与风险预警。遇到供应商对接直接对照使用，不必死记法规条文。\n经验只有沉淀成工具，才能在团队内传承，帮我们从源头筛选合规供应商，规避海外合规风险。",
    "cover": "📘",
    "media": {
      "type": "pages",
      "dir": "media/pages/supplier-manual",
      "count": 13,
      "visiblePages": 10
    },
    "preview": ""
  },
  {
    "id": "foreign-trade-flow",
    "title": "外贸客户 CRM",
    "theme": "商业",
    "sub": "企业项目",
    "sites": [
      "real"
    ],
    "year": "2025",
    "role": "设计 / 开发",
    "tagline": "告别人脑记忆，客户信息沉淀在系统；自动替换发件人名，快速生成邮件；业务跟进标准化，加快外贸跟单转化。",
    "story": "外贸业务最大的损耗，从来不是缺少客户，而是信息散落在脑海、聊天记录和邮件里。\n客户跟进阶段混乱、查找资料耗时、反复改写邮件，大量时间消耗在记忆和重复工作上，错失商机。\n这套外贸 CRM，把零散客户信息沉淀成可复用资产：多维度场景分类，快速定位客户；一键检索，输入名字即可调取信息，邮件自动替换发件人名称。把跟进从\"靠人脑回忆\"变成标准化流程，减少重复劳动，让业务跟单全面提速。",
    "cover": "🌐",
    "note": "演示数据均为虚构，不含任何真实客户信息。",
    "media": {
      "type": "iframe",
      "src": "demo/crm/index.html",
      "h": 720
    },
    "preview": ""
  },
  {
    "id": "trade-templates",
    "title": "外贸模板文件",
    "theme": "商业",
    "sub": "企业项目",
    "sites": [
      "real"
    ],
    "year": "2025",
    "role": "设计",
    "tagline": "单证模板标准化，对外表达更专业。",
    "story": "解决团队单证版式杂乱、信息缺漏问题。内置公司统一格式，预设完整单证字段，快速生成 PI、发票、装箱单，保持对外单据专业一致。",
    "cover": "📑",
    "media": {
      "type": "iframe",
      "src": "demo/trade-templates/index.html",
      "h": 720
    },
    "preview": ""
  },
  {
    "id": "bread-bro-hair",
    "title": "张先森 · 私人发型工作室",
    "theme": "商业",
    "sub": "私人定制",
    "sites": [
      "real",
      "muchen"
    ],
    "year": "2026",
    "role": "为朋友定制",
    "tagline": "先试型，再定型，你专属的私人发型工作室。",
    "story": "解决选发型、选发色的纠结难题，上传照片即可一键试换多款发型与发色，支持效果对比。提前预览、规避翻车，人人都能拥有专属私人发型工作室，轻松解锁适配自己的完美造型。",
    "cover": "✂️",
    "needsConsent": true,
    "preview": "",
    "media": {
      "type": "iframe",
      "src": "demo/zhang-hair/index-real.html",
      "h": 760
    }
  },
  {
    "id": "chaozhao-app",
    "title": "朝食记 App",
    "theme": "商业",
    "sub": "私人定制",
    "sites": [
      "real",
      "muchen"
    ],
    "year": "2026",
    "role": "为朋友定制",
    "tagline": "留住家的味道，一餐烟火，两个人携手料理。",
    "story": "朝朝家有一件充满烟火感的小事：夫妻俩喜欢研究、记录各式菜谱。\n这款 App，用来留存他们的菜谱创意。无论是代代相传的老味道，还是临时想尝试的新菜，勾选想吃的菜品，AI 便能快速拆解食材，合并生成清晰的采购清单。买什么、买多少一目了然，还可直接跳转第三方平台一键下单买菜。\n产品最初的设计初心，不只是收纳私房菜谱，更是为了增进伴侣间的互动与参与感。两人可以随时查看当晚菜单，一同规划一餐饭。让做饭，成为两个人共同经营的浪漫小事，也让 AI 真正落地在柴米油盐的日常里。",
    "cover": "🥣",
    "needsConsent": true,
    "media": {
      "type": "iframe",
      "src": "demo/chaozhao/index.html",
      "h": 700
    },
    "preview": ""
  },
  {
    "id": "noodle-pos",
    "title": "面馆 POS 系统",
    "theme": "商业",
    "sub": "私人定制",
    "sites": [
      "real",
      "muchen"
    ],
    "year": "2026",
    "role": "为朋友定制",
    "tagline": "小生意也值得拥有好工具。",
    "story": "朋友在国外开了一个面馆，之前点单全靠脑子记——忙起来难免漏单。\n这个 POS 不复杂，但能解决他最痛的问题：谁点了什么、收了多少钱、今天卖了多少碗。小工具，大解放。",
    "cover": "🍜",
    "needsConsent": true,
    "media": {
      "type": "iframe",
      "src": "demo/pos/index.html",
      "h": 680
    },
    "preview": ""
  }
];

/* 两级分类体系：一级 theme 决定分类栏顺序，二级 sub 决定「细分」行。 */
const TAXONOMY = [
  {
    "theme": "商业",
    "subs": [
      "企业项目",
      "私人定制"
    ]
  },
  {
    "theme": "视听盛宴",
    "subs": [
      "音乐",
      "AI 漫剧"
    ]
  },
  {
    "theme": "心理与认知",
    "subs": []
  },
  {
    "theme": "情感与生活",
    "subs": [
      "与人",
      "与己"
    ]
  },
  {
    "theme": "游戏",
    "subs": []
  },
  {
    "theme": "万物有灵",
    "subs": []
  }
];

/* 分类图标：内联单色线性 SVG（24×24 画布），颜色走 currentColor 跟随主题色。 */
const CAT_ICONS = {
  "商业": "<rect x=\"3\" y=\"7.6\" width=\"18\" height=\"12.4\" rx=\"2.6\"/><path d=\"M8.6 7.6V6.2a2 2 0 0 1 2-2h2.8a2 2 0 0 1 2 2v1.4\"/><path d=\"M3 12.6h18\"/>",
  "视听盛宴": "<circle cx=\"12\" cy=\"12\" r=\"8.6\"/><path class=\"f\" d=\"M10.3 8.5l5.2 3.5-5.2 3.5z\"/>",
  "心理与认知": "<path d=\"M12 12 C 10.6 7.6, 4.6 7.6, 4.6 12 C 4.6 16.4, 10.6 16.4, 12 12 C 13.4 7.6, 19.4 7.6, 19.4 12 C 19.4 16.4, 13.4 16.4, 12 12\"/>",
  "情感与生活": "<path d=\"M12 20.3l-1.2-1.1C6.2 15 3 12.1 3 8.6 3 5.9 5.1 3.8 7.8 3.8c1.5 0 3 .7 4.2 2.1 1.2-1.4 2.7-2.1 4.2-2.1 2.7 0 4.8 2.1 4.8 4.8 0 3.5-3.2 6.4-7.8 10.6L12 20.3z\"/>",
  "游戏": "<path d=\"M9 9h6a4.8 4.8 0 0 1 4.7 5.7l-.5 2.2a1.9 1.9 0 0 1-3.4.7L14 15.4h-4l-1.8 2.2a1.9 1.9 0 0 1-3.4-.7l-.5-2.2A4.8 4.8 0 0 1 9 9z\"/><path d=\"M7.6 11.6v2.1M6.55 12.65h2.1\"/><circle class=\"f\" cx=\"15.8\" cy=\"11.9\" r=\"1.05\"/><circle class=\"f\" cx=\"17.6\" cy=\"13.5\" r=\"1.05\"/>",
  "万物有灵": "<path d=\"M20.2 3.8c0 9.2-5.5 14.4-12.2 14.4a8 8 0 0 1-1.9-.2C6.6 10.6 12.2 5.4 20.2 3.8z\"/><path d=\"M6.2 20.2c1.1-5.7 4.5-9.6 9.6-11.7\"/>"
};

window.SITES = SITES;
window.WORKS = WORKS;
window.TAXONOMY = TAXONOMY;
window.CAT_ICONS = CAT_ICONS;
