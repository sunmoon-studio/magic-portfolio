/* ============================================================
 * 作品集双站 · 渲染逻辑
 * 读取 index.html 里设置的 window.SITE → 套用对应站点配置 → 渲染
 * 共享 works.js / SITES，一份数据两套模板
 * ============================================================ */
(function () {
  'use strict';

  var SITE = window.SITE || 'real';
  var cfg = (window.SITES && window.SITES[SITE]) || {};
  var allWorks = (window.WORKS || []).filter(function (w) { return w.sites && w.sites.indexOf(SITE) !== -1; });

  /* 按站字段运行时解析（与构建脚本 genWorks 同逻辑）：
     mediaBySite / reportBySite / titleBySite 在构建产物里已被替换成普通字段，
     但直接看源码树（本地 localhost 或双击打开）时这些字段还在——
     这里就地解析一次，保证源码树与部署产物表现完全一致。 */
  (function resolvePerSite() {
    var MAPS = [['mediaBySite', 'media'], ['reportBySite', 'report'], ['titleBySite', 'title']];
    allWorks.forEach(function (w) {
      MAPS.forEach(function (pair) {
        var m = w[pair[0]];
        if (m && typeof m === 'object') {
          var picked = m[SITE];
          if (picked == null) {
            // 该站没有专属变体时，退回唯一存在的那个变体，避免整块内容消失
            var keys = Object.keys(m);
            picked = keys.length === 1 ? m[keys[0]] : null;
          }
          if (picked != null) w[pair[1]] = picked;
          delete w[pair[0]];
        }
      });
    });
  })();

  /* ---------- 两级分类（一级 theme / 二级 sub） ----------
     TAXONOMY 同时决定分类栏的显示顺序；某一类没有二级时，第二行整行不出现。 */
  var TAX = window.TAXONOMY || [];
  function taxRank(theme) {
    for (var i = 0; i < TAX.length; i++) if (TAX[i].theme === theme) return i;
    return 999;
  }
  function subList(theme) {
    for (var i = 0; i < TAX.length; i++) if (TAX[i].theme === theme) return TAX[i].subs || [];
    return [];
  }
  function subRank(theme, sub) {
    var s = subList(theme).indexOf(sub || '');
    return s < 0 ? 999 : s;   // 该分类没有二级时，同类作品并列
  }

  /* ---------- 分类图标（内联单色线性 SVG，跟随主题色） ---------- */
  var ICONS = window.CAT_ICONS || {};
  function iconHtml(theme) {
    var d = ICONS[theme];
    return d ? '<svg viewBox="0 0 24 24" aria-hidden="true">' + d + '</svg>' : '';
  }

  var PALETTES = ['terracotta', 'celadon', 'graphite'];
  var saved = null;
  try { saved = localStorage.getItem('accent_' + SITE); } catch (e) {}
  var accent = saved || cfg.accentDefault || 'celadon';
  document.body.setAttribute('data-accent', accent);

  var TODO = '【待填充'; // 占位标记前缀

  function esc(s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }
  function isTodo(s) { return typeof s === 'string' && s.indexOf(TODO) === 0; }

  /* 所有作品资源都以 app.js 所在站点根目录为基准。
     这样既兼容本地 real/muchen 子目录入口，也兼容 GitHub Pages 根目录入口。 */
  var appScript = document.currentScript;
  var siteRoot = appScript && appScript.src ? new URL('../', appScript.src) : new URL('./', location.href);
  /* demo/ 在源码与构建产物里都是拍平的同一套扁平路径（demo/xxx），
     站点专属变体用 -real/-mc 文件名后缀区分、由 works.js 的 mediaBySite 指定。
     这里只做「相对站点根目录」的解析，
     不要按站/来源加任何前缀——那会让本地以子目录访问时全部 404。 */
  function assetUrl(src) {
    if (!src || /^(?:[a-z]+:|\/\/|#)/i.test(src)) return src || '';
    var clean = src.replace(/^\.\//, '');
    return new URL(clean, siteRoot).href;
  }

  /* ---------- 完整履历（密码锁定区，仅真实站） ---------- */
  function resumeSectionHtml() {
    return '<section id="resume" class="reveal resume-section">' +
      '<div class="section-title">完整履历</div>' +
      '<div class="resume-lock" id="resumeLock">' +
        '<div class="lock-closed" id="lockClosed">' +
          '<div class="lock-badge" aria-hidden="true"><svg viewBox="0 0 24 24" width="26" height="26"><rect x="5" y="11" width="14" height="9" rx="2" fill="none" stroke="currentColor" stroke-width="1.6"/><path d="M8 11V8a4 4 0 0 1 8 0v3" fill="none" stroke="currentColor" stroke-width="1.6"/><circle cx="12" cy="15.5" r="1.4" fill="currentColor"/></svg></div>' +
          '<p class="lock-title">查看完整履历</p>' +
          '<p class="lock-sub">需密码 · 内容已加密，明文不落源码</p>' +
          '<p class="lock-hint" id="lockHint"></p>' +
          '<form class="lock-form" id="lockForm">' +
            '<input class="lock-input" id="resumePass" type="password" placeholder="输入密码" autocomplete="off" />' +
            '<button class="lock-btn" type="submit">解锁</button>' +
          '</form>' +
          '<p class="lock-error" id="lockError"></p>' +
        '</div>' +
        '<div class="resume-content" id="resumeContent" hidden></div>' +
      '</div>' +
    '</section>';
  }

  /* ---------- 站点文案 ---------- */
  document.title = (cfg.name || '作品集') + ' · 作品集';

  var themes = [];
  allWorks.forEach(function (w) {
    if (themes.indexOf(w.theme) === -1) themes.push(w.theme);
  });
  themes.sort(function (a, b) { return taxRank(a) - taxRank(b); });   // 分类栏按 TAXONOMY 顺序

  /* ---------- 构建骨架 ---------- */
  var root = document.createElement('div');
  root.innerHTML =
    '<nav class="nav">' +
      '<span class="brand">' + esc(cfg.name) + '</span>' +
      '<div class="links">' +
        '<a href="#about">关于我</a>' +
        '<a href="#works">作品集</a>' +
        (cfg.resume ? '<a href="#resume">履历</a>' : '') +
        '<a href="#contact">联系</a>' +
        '<button class="accent-btn" id="accentBtn"><span class="lbl-full">换一种气质</span><span class="lbl-short">换气质</span></button>' +
      '</div>' +
    '</nav>' +
    '<header class="hero reveal">' +
      (cfg.hero && cfg.hero.eyebrow ? '<div class="eyebrow">' + esc(cfg.hero.eyebrow) + '</div>' : '') +
      '<h1>' + esc(cfg.hero ? cfg.tagline : cfg.name) + '</h1>' +
      '<div class="rule"></div>' +
      (cfg.hero ? '' : '<p class="tagline">' + esc(cfg.tagline) + '</p>') +
    '</header>' +
    '<section id="about" class="reveal">' +
      '<div class="section-title">关于我</div>' +
      '<p>' + esc(cfg.about) + '</p>' +
      (cfg.aiNote ? '<p class="ai-note">' + esc(cfg.aiNote) + '</p>' : '') +
    '</section>' +
    '<section id="works" class="reveal">' +
      '<div class="section-title">作品集</div>' +
      '<div class="filters" id="filters"></div>' +
      '<div class="grid" id="grid"></div>' +
    '</section>' +
    '<section id="contact" class="reveal">' +
      '<div class="section-title">联系</div>' +
      '<div class="ways" id="ways"></div>' +
      (cfg.contact && cfg.contact.note ? '<div class="qr-note">' + esc(cfg.contact.note) + '</div>' : '') +
    '</section>' +
    (cfg.resume ? resumeSectionHtml() : '') +
    '<div class="footer">© ' + esc(cfg.name) + ' · 我就是我的作品</div>' +
    '<div class="modal-mask" id="mask"><div class="modal" id="modal"></div></div>';

  /* 门厅的「跑道」：一个纯占位 div，凭空撑出一屏可推的距离。
   * 门是 fixed 覆盖层、不占文档流——若没有这截跑道，内容会从门底下
   * 直接窜上来，门还没散尽标题已被推走半屏（"回弹"问题的根源，2026-09-11）。
   * 必须放在 root 之前：内容顶边 = 跑道底边。 */
  var gateRun = document.createElement('div');
  gateRun.className = 'gate-run';
  gateRun.setAttribute('aria-hidden', 'true');

  document.body.appendChild(gateRun);

  document.body.appendChild(root);

  /* ---------- 联系区 ---------- */
  var ways = document.getElementById('ways');
  var c = cfg.contact || {};
  var wayHtml = '';
  if (c.wechatQr && c.wechatId) {
    // 微信二维码展示（图文）
    wayHtml += '<div class="way way-qr">' +
      (c.wechat ? '<div class="k">微信</div>' : '') +
      '<img class="qr-img" src="' + esc(assetUrl(c.wechatQr)) + '" alt="微信二维码" loading="lazy" />' +
      '<div class="v">V信号：' + esc(c.wechatId) + '</div>' +
      '</div>';
  } else {
    if (c.email) wayHtml += '<div class="way"><div class="k">Email</div><div class="v">' + esc(c.email) + '</div></div>';
    if (c.wechat) wayHtml += '<div class="way"><div class="k">微信</div><div class="v">' + esc(c.wechat) + '</div></div>';
    if (c.xianyu) wayHtml += '<div class="way"><div class="k">闲鱼</div><div class="v">' + esc(c.xianyu) + '</div></div>';
    if (c.xhs) wayHtml += '<div class="way"><div class="k">小红书</div><div class="v">' + esc(c.xhs) + '</div></div>';
  }
  ways.innerHTML = wayHtml;

  /* ---------- 筛选栏 ---------- */
  var filtersEl = document.getElementById('filters');
  var activeTheme = '全部';
  var activeSub = '全部';

  /* 一级分类 chip 带上它自己的符号 —— 让「一分类一符号」在筛选栏和卡片上是同一个记忆点。
     二级 chip 不带：细分项本来就多，再挂图标就乱了。 */
  function chipHtml(type, val, on, isSub) {
    var ic = (!isSub && val !== '全部') ? iconHtml(val) : '';
    return '<button class="chip' + (isSub ? ' chip-sub' : '') + (on ? ' active' : '') +
      '" data-type="' + type + '" data-v="' + esc(val) + '">' + ic + '<span>' + esc(val) + '</span></button>';
  }

  function renderFilters() {
    var html = '';
    /* 一级：先认大方向 */
    html += '<div class="filter-row"><span class="filter-label">分类</span>';
    ['全部'].concat(themes).forEach(function (t) {
      html += chipHtml('theme', t, t === activeTheme, false);
    });
    html += '</div>';
    /* 二级：只有当这一类确实需要细分时才出现 */
    var subs = activeTheme === '全部' ? [] : subList(activeTheme);
    if (subs.length) {
      html += '<div class="filter-row filter-row-sub"><span class="filter-label">细分</span>';
      ['全部'].concat(subs).forEach(function (s) {
        html += chipHtml('sub', s, s === activeSub, true);
      });
      html += '</div>';
    }
    filtersEl.innerHTML = html;
  }
  renderFilters();

  filtersEl.addEventListener('click', function (e) {
    var btn = e.target.closest('.chip');
    if (!btn) return;
    if (btn.dataset.type === 'theme') {
      activeTheme = btn.dataset.v;
      activeSub = '全部';                 // 换大类时自动收回细分
    } else {
      activeSub = btn.dataset.v;
    }
    renderFilters();
    renderGrid();
  });

  /* ---------- 作品网格 ---------- */
  var grid = document.getElementById('grid');

  /* 卡片轮播：有 gallery 的作品，卡片顶部变成可自动播放的截图轮播。
     数据形如 gallery: [{src, caption}, ...]（也兼容纯字符串数组）。 */
  function galleryHtml(w) {
    var g = w.gallery;
    if (!g || !g.length) return '';
    var shots = '', caps = '', dots = '';
    g.forEach(function (it, i) {
      var src = typeof it === 'string' ? it : (it.src || '');
      var cap = typeof it === 'string' ? '' : (it.caption || '');
      if (!src) return;
      var on = i === 0 ? ' on' : '';
      shots += '<img class="shot' + on + '" src="' + esc(assetUrl(src)) + '" alt="' + esc(cap || (w.title + ' 界面预览')) + '" loading="lazy" draggable="false">';
      caps += '<span class="cap' + on + '">' + esc(cap) + '</span>';
      dots += '<button class="dot' + on + '" type="button" data-i="' + i + '" aria-label="第 ' + (i + 1) + ' 张"></button>';
    });
    if (!shots) return '';
    return '<div class="card-gal" data-n="' + g.length + '">' +
        '<div class="gal-shots">' + shots + '</div>' +
        '<div class="gal-caps">' + caps + '</div>' +
        '<div class="gal-dots">' + dots + '</div>' +
        '<span class="gal-badge">全屏体验</span>' +
      '</div>';
  }

  function initGalleries() {
    Array.prototype.forEach.call(document.querySelectorAll('.card-gal'), function (g) {
      if (g.dataset.ready) return;
      g.dataset.ready = '1';
      var shots = g.querySelectorAll('.gal-shots .shot');
      var caps = g.querySelectorAll('.gal-caps .cap');
      var dots = g.querySelectorAll('.gal-dots .dot');
      var n = shots.length;
      if (n < 2) return;
      var cur = 0, timer = null;
      function setOn(el, on) { if (el) { if (on) el.classList.add('on'); else el.classList.remove('on'); } }
      function show(i) {
        i = ((i % n) + n) % n;
        if (i === cur) return;
        setOn(shots[cur], false); setOn(caps[cur], false); setOn(dots[cur], false);
        cur = i;
        setOn(shots[cur], true); setOn(caps[cur], true); setOn(dots[cur], true);
      }
      function stop() { if (timer) { clearInterval(timer); timer = null; } }
      function play() { stop(); timer = setInterval(function () { show(cur + 1); }, 3600); }
      g.addEventListener('mouseenter', stop);
      g.addEventListener('mouseleave', play);
      g.addEventListener('click', function (e) {
        var d = e.target && e.target.closest ? e.target.closest('.dot') : null;
        if (!d) return;
        e.stopPropagation();          // 点圆点只换图，不开弹层
        show(parseInt(d.dataset.i, 10));
        play();
      });
      if ('IntersectionObserver' in window) {
        var vis = new IntersectionObserver(function (es) {
          es.forEach(function (en) { if (en.isIntersecting) play(); else stop(); });
        }, { threshold: 0.2 });
        vis.observe(g);
      } else { play(); }
    });
  }

  /* 卡片/弹层上的分类标签：一级 + 二级 */
  /* 说明（2026-09-11）：作品上的独立 tags 已全部清空 —— 「企业 / 私人定制」这两个值
     和「商业」下的二级分类完全重复，且对"自己做的通用工具"（性格色彩、大五人格等）
     来说"私人定制"本身也不准确。这里保留渲染能力，将来有正交的新标签可直接用。 */
  function catTagsHtml(w) {
    var h = '<span class="tag theme">' + esc(w.theme) + '</span>';
    if (w.sub) h += '<span class="tag sub">' + esc(w.sub) + '</span>';
    return h;
  }
  function plainTagsHtml(w) {
    return (w.tags || []).filter(function (t) {
      return t !== w.sub && t !== w.theme;
    }).map(function (t) { return '<span class="tag">' + esc(t) + '</span>'; }).join('');
  }

  function renderGrid() {
    var list = allWorks.filter(function (w) {
      if (activeTheme !== '全部' && w.theme !== activeTheme) return false;
      if (activeTheme !== '全部' && activeSub !== '全部' && w.sub !== activeSub) return false;
      return true;
    });
    /* 按分类体系排列：同类相邻、二级相邻，组内保持 works.js 的原顺序 */
    list = list.map(function (w, i) { return { w: w, i: i }; }).sort(function (a, b) {
      var d = taxRank(a.w.theme) - taxRank(b.w.theme);
      if (d) return d;
      d = subRank(a.w.theme, a.w.sub) - subRank(b.w.theme, b.w.sub);
      if (d) return d;
      return a.i - b.i;
    }).map(function (x) { return x.w; });

    if (!list.length) { grid.innerHTML = '<p style="color:var(--muted)">这个分类下还没有作品。</p>'; return; }
    grid.innerHTML = list.map(function (w) {
      var tlTodo = isTodo(w.tagline);
      var gal = galleryHtml(w);
      var ic = iconHtml(w.theme);
      return '<article class="card reveal' + (gal ? ' has-gal' : '') + '" data-id="' + esc(w.id) + '">' +
        gal +
        (gal ? '' : '<div class="cover">' + (ic || esc(w.cover || '✦')) + '</div>') +
        '<div class="title">' + esc(w.title) + '</div>' +
        '<div class="tagline' + (tlTodo ? ' todo' : '') + '">' + (tlTodo ? '温情文案待补充' : esc(w.tagline)) + '</div>' +
        '<div class="meta">' + catTagsHtml(w) + plainTagsHtml(w) + '</div>' +
      '</article>';
    }).join('');
    observeReveals();
    initGalleries();
  }
  renderGrid();

  grid.addEventListener('click', function (e) {
    var card = e.target.closest('.card');
    if (!card) return;
    openModal(card.dataset.id);
  });

  /* ---------- 作品媒体渲染 ---------- */
  function mediaHtml(w) {
    return mainMediaHtml(w) + reportMediaHtml(w);
  }

  /* 把 { dir, count } 展开成页面图片路径数组（01.jpg ~ NN.jpg） */
  function pageItems(m) {
    if (m.items && m.items.length) return m.items;
    var arr = [];
    for (var i = 1; i <= (m.count || 0); i++) arr.push((m.dir || '') + '/' + (i < 10 ? '0' : '') + i + '.jpg');
    return arr;
  }

  /* 页面图集：文档页由构建期预渲染成图片，前 N 页清晰、其余模糊打码。
     用图片而不是 pdf.js 的原因——浏览器禁止 file:// 下读取本地 PDF，双击 HTML 打开时
     会直接报「加载失败」；图片在任何环境（本地双击 / 本地服务器 / GitHub Pages）都能显示。 */
  function pagesHtml(containerId, m) {
    var visible = m.visiblePages || 10;
    var inner = pageItems(m).map(function (src, i) {
      var no = i + 1;
      var blur = no > visible;
      return '<div class="pdf-page' + (blur ? ' blurred' : '') + '">' +
        '<img src="' + esc(assetUrl(src)) + '" alt="第 ' + no + ' 页" loading="lazy" draggable="false">' +
        (blur ? '<div class="pdf-cover">已脱敏</div>' : '') +
        '</div>';
    }).join('');
    return '<div class="pdf-pages" id="' + esc(containerId) + '">' + inner + '</div>';
  }

  /* 附加的深度报告样章（如性格色彩四色报告）：与主媒体并存，前 N 页清晰、其余模糊 */
  function reportMediaHtml(w) {
    var m = w.report;
    if (!m || m.type !== 'pages') return '';
    return '<div class="media media-pdf media-report">' +
      '<div class="media-note">' + esc(m.label || '深度报告样章') + '</div>' +
      pagesHtml('pdf2-' + w.id, m) +
      '</div>';
  }

  function mainMediaHtml(w) {
    var m = w.media;
    if (!m) return '';
    if (m.type === 'video') {
      return '<div class="media media-video"><video controls preload="metadata" playsinline src="' + esc(assetUrl(m.src)) + '"></video></div>';
    }
    if (m.type === 'audio') {
      return '<div class="media media-audio"><audio controls preload="metadata" src="' + esc(assetUrl(m.src)) + '"></audio></div>';
    }
    if (m.type === 'images') {
      var imgs = (m.items || []).map(function (s) {
        return '<img class="shot" src="' + esc(assetUrl(s)) + '" alt="' + esc(w.title) + '">';
      }).join('');
      return '<div class="media media-images">' + imgs + '</div>';
    }
    if (m.type === 'iframe') {
      var ih = (m.h || 560) + 'px';
      var wrapId = 'ifr-' + w.id;
      return '<div class="media media-iframe" id="' + esc(wrapId) + '">' +
        '<div class="media-note"><span>👇 下面这个可以直接上手体验</span>' +
          '<button class="fs-btn" type="button" data-wrap="' + esc(wrapId) + '">⤢ 全屏体验</button></div>' +
        '<iframe src="' + esc(assetUrl(m.src)) + (m.src.indexOf('?') === -1 ? '?v=20260910-demo' : '&v=20260910-demo') + '" style="height:' + ih + ';width:100%;border:1px solid var(--line,#e8e0d2);border-radius:12px;background:#fff" allow="autoplay; fullscreen" allowfullscreen></iframe>' +
        '</div>';
    }
    if (m.type === 'placeholder') {
      return '<div class="media media-ph"><div class="ph-title">演示版制作中</div><div class="ph-note">' + esc(m.note || '') + '</div></div>';
    }
    if (m.type === 'pdf' || m.type === 'pages') {
      return '<div class="media media-pdf">' + pagesHtml('pdf-' + w.id, m) + '</div>';
    }
    return '';
  }

  /* 文档页图集（见 pagesHtml）。此前用 pdf.js 实时渲染，但浏览器禁止 file:// 下读取本地
     PDF，双击 HTML 打开必然报「PDF 加载失败」，故改为构建期预渲染图片，彻底去掉这个依赖。 */

  /* ---------- 详情弹层 ---------- */
  var mask = document.getElementById('mask');
  var modal = document.getElementById('modal');

  function openModal(id) {
    var w = allWorks.filter(function (x) { return x.id === id; })[0];
    if (!w) return;
    var isIframe = !!(w.media && w.media.type === 'iframe');
    // 可交互演示类作品用宽版弹层：管理端/工具类按 1180px 设计，窄容器里会显得局促
    modal.className = 'modal' + (isIframe ? ' wide' : '');
    var tlTodo = isTodo(w.tagline);
    var stTodo = isTodo(w.story);
    var warn = '';
    // sub 已经是「私人定制」标签，这里不再重复写一遍，改成一句有信息量的说明
    if (w.needsConsent) warn += '<div class="warn">经本人同意后展示</div>';
    if (w.needsReview) warn += '<div class="warn">涉及公司内容 · 上线前需核对脱敏</div>';
    if (w.note) warn += '<div class="warn">' + esc(w.note) + '</div>';
    var preview = w.preview ? '<a class="preview-link" href="' + esc(assetUrl(w.preview)) + '" target="_blank" rel="noopener">查看预览 →</a>' : '';

    modal.innerHTML =
      '<button class="close" id="closeBtn">&times;</button>' +
      '<div class="cover">' + (iconHtml(w.theme) || esc(w.cover || '✦')) + '</div>' +
      '<h2>' + esc(w.title) + '</h2>' +
      '<div class="meta">' + catTagsHtml(w) + plainTagsHtml(w) + '</div>' +
      '<div class="tagline' + (tlTodo ? ' todo' : '') + '">' + (tlTodo ? '（温情文案待补充 · 这里将放作品的一句话灵魂）' : esc(w.tagline)) + '</div>' +
      '<div class="story' + (stTodo ? ' todo' : '') + '">' + (stTodo ? '（缘起故事待补充 · 这里将放"为谁、为什么做"的温暖文字）' : esc(w.story)) + '</div>' +
      mediaHtml(w) +
      (preview || warn ? '<div class="foot">' + preview + warn + '</div>' : '');
    mask.classList.add('open');
    document.body.style.overflow = 'hidden';
    document.getElementById('closeBtn').onclick = closeModal;
    var fsBtn = modal.querySelector('.fs-btn');
    if (fsBtn) fsBtn.onclick = function () { toggleFullscreen(fsBtn.dataset.wrap, fsBtn); };
  }

  /* 全屏体验：把弹层里的 iframe 撑满视口，ESC / 再点按钮退出 */
  var FS_TEXT = '⤢ 全屏体验', FS_TEXT_OFF = '✕ 退出全屏';
  function toggleFullscreen(wrapId, btn) {
    var wrap = document.getElementById(wrapId);
    if (!wrap) return;
    var on = wrap.classList.toggle('fullscreen');
    var b = btn || wrap.querySelector('.fs-btn');
    if (b) b.textContent = on ? FS_TEXT_OFF : FS_TEXT;
  }
  function exitFullscreen() {
    var fs = document.querySelector('.media-iframe.fullscreen');
    if (!fs) return false;
    var b = fs.querySelector('.fs-btn');
    toggleFullscreen(fs.id, b);
    return true;
  }
  function closeModal() {
    exitFullscreen();
    mask.classList.remove('open');
    document.body.style.overflow = '';
  }
  mask.addEventListener('click', function (e) { if (e.target === mask) closeModal(); });
  document.addEventListener('keydown', function (e) {
    if (e.key !== 'Escape') return;
    if (!exitFullscreen()) closeModal();   // 全屏中先退出全屏，再按一次才关弹层
  });

  /* ---------- 换色按钮 ---------- */
  document.getElementById('accentBtn').addEventListener('click', function () {
    var i = PALETTES.indexOf(accent);
    accent = PALETTES[(i + 1) % PALETTES.length];
    document.body.setAttribute('data-accent', accent);
    try { localStorage.setItem('accent_' + SITE, accent); } catch (e) {}
  });

  /* ---------- 完整履历：解密渲染 ---------- */
  function renderResume(data) {
    var html = '';
    if (data.intro) html += '<p class="resume-intro">' + esc(data.intro) + '</p>';

    if (data.profile && data.profile.length) {
      html += '<h3 class="resume-h3">自我评价</h3><ul class="resume-profile">' +
        data.profile.map(function (p) { return '<li>' + esc(p) + '</li>'; }).join('') +
        '</ul>';
    }

    if (data.career && data.career.length) {
      /* careerSummary：职业经历的开场总述（如"21 年三段路"），可选字段 */
      html += '<h3 class="resume-h3">职业经历</h3>' +
        (data.careerSummary ? '<p class="resume-intro">' + esc(data.careerSummary) + '</p>' : '') +
        '<div class="timeline">';
      data.career.forEach(function (j) {
        html += '<div class="tl-item"><div class="tl-period">' + esc(j.period) + '</div>' +
          '<div class="tl-body"><div class="tl-role">' + esc(j.role) + '</div>' +
          '<div class="tl-company">' + esc(j.company) + '</div>' +
          (j.points && j.points.length ? '<ul class="tl-points">' + j.points.map(function (p) { return '<li>' + esc(p) + '</li>'; }).join('') + '</ul>' : '') +
          '</div></div>';
      });
      html += '</div>';
    }

    if (data.projects && data.projects.length) {
      html += '<h3 class="resume-h3">项目经验</h3><div class="project-list">';
      data.projects.forEach(function (p) {
        html += '<div class="project-item"><div class="project-head">' +
          '<span class="project-period">' + esc(p.period) + '</span>' +
          '<span class="project-name">' + esc(p.name) + '</span>' +
          (p.company ? '<span class="project-company">' + esc(p.company) + '</span>' : '') +
          (p.role ? '<span class="project-role">' + esc(p.role) + '</span>' : '') +
          '</div>' + (p.desc ? '<p class="project-desc">' + esc(p.desc) + '</p>' : '') + '</div>';
      });
      html += '</div>';
    }

    if (data.education && data.education.length) {
      html += '<h3 class="resume-h3">教育背景</h3><div class="edu">';
      data.education.forEach(function (e) {
        html += '<div class="edu-item"><span class="edu-school">' + esc(e.school) + '</span>' +
          '<span class="edu-major">' + esc(e.major) + '</span></div>';
      });
      html += '</div>';
    }

    if (data.skills && data.skills.length) {
      html += '<h3 class="resume-h3">技能特长</h3><div class="skill-tags">' +
        data.skills.map(function (s) { return '<span class="skill-tag">' + esc(s) + '</span>'; }).join('') +
        '</div>';
    }

    if (data.certs && data.certs.length) {
      html += '<h3 class="resume-h3">证书</h3><div class="courses">';
      data.certs.forEach(function (c) {
        html += '<div class="course"><span class="course-year">' + esc(c.year) + '</span>' +
          '<span class="course-name">' + esc(c.name) + '</span>' +
          (c.org ? '<span class="course-note">' + esc(c.org) + '</span>' : '') + '</div>';
      });
      html += '</div>';
    }

    if (data.courses && data.courses.length) {
      html += '<h3 class="resume-h3">外部学习记录（部分）</h3><div class="courses">';
      data.courses.forEach(function (c) {
        html += '<div class="course"><span class="course-year">' + esc(c.year) + '</span>' +
          '<span class="course-name">' + esc(c.name) + '</span>' +
          (c.note ? '<span class="course-note">' + esc(c.note) + '</span>' : '') + '</div>';
      });
      html += '</div>';
    }

    /* 不公开作品清单：只列标题。
     * （2026-09-11 起删除了 summary 字段 —— 它只在「私密作品」清单里渲染，
     *   而当前没有任何 private 作品，等于一个"存在却永不显示"的睡眠字段，
     *   最容易在改文案时被误认为"页面上的简介"，已整体移除。想要简介时，
     *   用 tagline 或 story，那是真正会被人看到的两处。） */
    var priv = allWorks.filter(function (w) { return w.private === true; });
    if (priv.length) {
      html += '<h3 class="resume-h3">不公开作品</h3><div class="priv-works">';
      priv.forEach(function (w) {
        html += '<div class="priv-item"><span class="priv-title">' + esc(w.title) + '</span></div>';
      });
      html += '</div>';
    }
    return html;
  }

  if (cfg.resume) {
    var lockForm = document.getElementById('lockForm');
    if (lockForm) {
      var passInput = document.getElementById('resumePass');
      var errEl = document.getElementById('lockError');
      var hintEl = document.getElementById('lockHint');
      var closedEl = document.getElementById('lockClosed');
      var contentEl = document.getElementById('resumeContent');
      if (hintEl && window.ResumeCrypto && !ResumeCrypto.hasSubtle()) {
        hintEl.textContent = '提示：双击打开本页时浏览器会禁用加密，无法解锁。请用本地服务器或 https 地址打开（详见「联系」）。';
      }
      lockForm.addEventListener('submit', function (e) {
        e.preventDefault();
        errEl.textContent = '';
        var pass = passInput.value;
        if (!pass) { errEl.textContent = '请输入密码'; return; }
        if (!window.ResumeCrypto || !ResumeCrypto.hasSubtle()) {
          errEl.textContent = '请通过本地服务器或 https 地址打开（浏览器在 file:// 下禁用加密）';
          return;
        }
        if (!window.RESUME_ENC) { errEl.textContent = '简历密文未加载'; return; }
        ResumeCrypto.decryptText(window.RESUME_ENC, pass).then(function (json) {
          var data = JSON.parse(json);
          contentEl.innerHTML = renderResume(data);
          contentEl.hidden = false;
          closedEl.style.display = 'none';
          observeReveals();
        }).catch(function () {
          errEl.textContent = '密码错误，或内容已损坏';
        });
      });
    }
  }

  /* ---------- 滚动淡入 ---------- */
  var io = null;
  if ('IntersectionObserver' in window) {
    io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); } });
    }, { threshold: 0.12 });
  }
  function observeReveals() {
    var els = document.querySelectorAll('.reveal:not(.in)');
    if (!io) { els.forEach(function (el) { el.classList.add('in'); }); return; }
    els.forEach(function (el) { io.observe(el); });
  }
  observeReveals();
})();

/* ============================================================
 * 门厅：一枚「水母光晕」+ 推门（独立 IIFE，与作品渲染互不干扰）
 * ------------------------------------------------------------
 * - 入场：信条各行依次上浮醒来（CSS gate-rise 动画，见 style.css，
 *   参考 antigravity.google 的生命感，2026-09-11 用户点名）
 * - 鼠标/手指划过 → 一枚大光晕（60px）慵懒跟随，像水母漂浮；
 *   停下来光晕不散尽，保持可见、轻轻呼吸（2026-09-12 v4）
 * - 往下滚 → 信条先退、白雾随后散；门散尽那一刻，内容顶边正好贴到视口顶边
 *   （靠 .gate-run 跑道实现，见 style.css）；滚回顶部 → 门厅完整复位
 *   （刻意的可逆：门是封面不是路障，访客随时能回头再看一眼信条）
 * - 门厅是 fixed 覆盖层，不占文档流 → 穿门全程没有空白帧
 * - 不 lock-scroll、不劫持滚动条 —— 原生行为，任何设备都能用
 * - 门厅隐藏期间既不渲染也不收集，避免白烧 CPU
 * ⚠️ 阈值一律按跑道的实测高度算，不用固定像素 —— 手机上 60px 太浅，一滑门就没了。
 * ============================================================ */
(function gateInit() {
  var gate = document.getElementById('gate');
  if (!gate) return;
  var canvas = document.getElementById('gateCanvas');
  if (!canvas || !canvas.getContext) return;
  var ctx = canvas.getContext('2d');
  if (!ctx) return;

  var dpr = Math.min(window.devicePixelRatio || 1, 2);
  var W = 0, H = 0;
  var IDLE_MS = 1600;     // 鼠标静止多久 → 光团收拢、变淡
  var lastMoveAt = 0;
  var hidden = false;     // 门厅当前是否已淡出
  var hasMoved = false;   // 鼠标还没进过门厅时什么都不画（免得左上角先冒出一团）

  // 门的四层：白雾（底）/ canvas 光团 / 信条 / 滚动提示。
  var veil = gate.querySelector('.gate-veil');
  var motto = gate.querySelector('.gate-motto');
  var hint = gate.querySelector('.gate-hint');

  // 跑道与内容顶边：只在 init / resize 时量一次，逐帧只做算术。
  // （逐帧读 getBoundingClientRect 会强制同步重排，滚动时掉帧。）
  var run = document.querySelector('.gate-run');
  var span = 0, contentTop = 0, soft = 200;

  function resize() {
    W = window.innerWidth;
    H = window.innerHeight;
    canvas.width  = Math.round(W * dpr);
    canvas.height = Math.round(H * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  function measure() {
    span = (run && run.offsetHeight) || window.innerHeight;
    contentTop = run ? (run.offsetTop + run.offsetHeight) : span;
    soft = Math.round(Math.max(110, Math.min(window.innerHeight * 0.22, 260)));
  }

  function accentColor() {
    return getComputedStyle(document.body).getPropertyValue('--accent').trim() || '#9C6B43';
  }

  /* ---------- 鼠标：「松散粒子云」（迷你宇宙） ----------
   * 迭代史（2026-09-11/12）：轨迹点连线 → 24节弹簧链 → 回声光斑 → 单一大光晕 → 
   * 局部水母团 → **松散粒子云**（v7，2026-09-12 最终版）。
   * 设计立意："我们是原子"—— 生命由原子组成，粒子云作为"微观宇宙"隐喻。
   * 核心特征：
   *  ① 松散、朦胧、不规则 —— 不是实心球、不是原子轨道模型，中心密、边缘稀疏
   *  ② 整体呼吸动画 —— 持续缓慢脉动（约5%幅度），所有粒子同步舒张/收缩
   *  ③ 云整体跟随鼠标 —— lerp慵懒跟随（k=0.04），有滞后感
   *  ④ 鼠标云内涟漪 —— 局部果冻形变（最大约6px），弹簧+阻尼，禁止排斥/推开
   *  ⑤ 色彩：低饱和雾感浅青蓝基底，涟漪区域泛淡紫微光
   *  ⑥ 边缘淡出 —— 距云中心越远透明度越低，无硬轮廓
   * 参考：antigravity.google 的流体粒子感，但改为局部云团而非全屏。 */

  // 粒子云中心（整体跟随鼠标）
  var cloudCenter = { x: 0, y: 0, targetX: 0, targetY: 0 };
  var cloudRadiusBase = 180;  // 云团基准半径
  var mouse = { x: -1000, y: -1000 };  // 鼠标位置
  var breathTime = 0;         // 呼吸动画时间
  var breathSpeed = 0.0004;   // 呼吸速度
  var particles = [];         // 粒子数组

  // 粒子类：记录相对云中心的初始位置，叠加呼吸和涟漪偏移
  function Particle(offsetX, offsetY) {
    this.homeX = offsetX;  // 相对云中心的初始 X
    this.homeY = offsetY;  // 相对云中心的初始 Y
    this.distanceFromCenter = Math.sqrt(offsetX * offsetX + offsetY * offsetY);
    
    // 涟漪形变偏移（弹簧物理）
    this.rippleOffsetX = 0;
    this.rippleOffsetY = 0;
    this.rippleVx = 0;
    this.rippleVy = 0;
    
    // 呼吸动画随机相位偏移
    this.breathPhaseOffset = Math.random() * 0.4;
    
    // 粒子基础大小和透明度（边缘淡出）
    this.baseSize = 1.4 + Math.random() * 1.8;
    var distanceRatio = this.distanceFromCenter / cloudRadiusBase;
    var densityFalloff = Math.pow(1 - Math.min(1, distanceRatio), 1.5);
    this.baseAlpha = (0.25 + Math.random() * 0.3) * densityFalloff;
  }

  // 初始化粒子云（高斯分布，中心密、边缘稀疏）
  function initParticles() {
    particles = [];
    var particleCount = 320;
    
    for (var i = 0; i < particleCount; i++) {
      // Box-Muller 变换生成高斯分布
      var u1 = Math.random();
      var u2 = Math.random();
      var gaussian = Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2);
      
      var distance = Math.abs(gaussian) * cloudRadiusBase * 0.4;
      distance = Math.min(distance, cloudRadiusBase * 1.2);
      distance += (Math.random() - 0.5) * 30;  // 打破规整
      
      var angle = Math.random() * 2 * Math.PI;
      var offsetX = Math.cos(angle) * distance;
      var offsetY = Math.sin(angle) * distance;
      
      particles.push(new Particle(offsetX, offsetY));
    }
  }

  // 绘制粒子云
  function drawParticleCloud(now) {
    ctx.clearRect(0, 0, W, H);
    if (!hasMoved) return;
    
    // 更新呼吸时间
    breathTime += breathSpeed * 16;  // 假设约60fps
    
    // 更新云中心位置（慵懒跟随）
    cloudCenter.x += (cloudCenter.targetX - cloudCenter.x) * 0.04;
    cloudCenter.y += (cloudCenter.targetY - cloudCenter.y) * 0.04;
    
    // 色彩定义
    var baseColor = { r: 88, g: 125, b: 165 };    // 雾感浅青蓝
    var rippleColor = { r: 165, g: 145, b: 195 }; // 涟漪淡紫
    
    // 绘制每个粒子
    for (var i = 0; i < particles.length; i++) {
      var p = particles[i];
      
      // 呼吸动画：整体同步缩放（约5%幅度）
      var breathWave = Math.sin(breathTime + p.breathPhaseOffset);
      var breathScale = 1 + breathWave * 0.05;
      
      // 计算粒子世界坐标（云中心 + 初始偏移 × 呼吸 + 涟漪偏移）
      var worldX = cloudCenter.x + p.homeX * breathScale + p.rippleOffsetX;
      var worldY = cloudCenter.y + p.homeY * breathScale + p.rippleOffsetY;
      
      // 涟漪形变：鼠标在云内时产生局部偏移
      var dx = mouse.x - cloudCenter.x;
      var dy = mouse.y - cloudCenter.y;
      var distToCloudCenter = Math.sqrt(dx * dx + dy * dy);
      
      var rippleStrength = 0;
      if (distToCloudCenter < cloudRadiusBase * 1.2) {
        var pdx = mouse.x - worldX;
        var pdy = mouse.y - worldY;
        var distToMouse = Math.sqrt(pdx * pdx + pdy * pdy);
        var rippleRadius = 120;
        
        if (distToMouse < rippleRadius) {
          var falloff = 1 - (distToMouse / rippleRadius);
          falloff = falloff * falloff;
          rippleStrength = falloff;
          
          // 弹簧追赶目标偏移（最大约6px）
          var maxOffset = 6;
          var targetOffsetX = (pdx / (distToMouse + 1)) * falloff * maxOffset;
          var targetOffsetY = (pdy / (distToMouse + 1)) * falloff * maxOffset;
          
          p.rippleVx += (targetOffsetX - p.rippleOffsetX) * 0.018;
          p.rippleVy += (targetOffsetY - p.rippleOffsetY) * 0.018;
        }
      }
      
      // 阻尼回归
      p.rippleVx *= 0.88;
      p.rippleVy *= 0.88;
      p.rippleOffsetX += p.rippleVx;
      p.rippleOffsetY += p.rippleVy;
      
      // 粒子大小和透明度（呼吸同步）
      var size = p.baseSize * (1 + breathWave * 0.12);
      var alpha = p.baseAlpha * (1 + breathWave * 0.15);
      
      // 涟漪区域色彩混合
      var finalColor = baseColor;
      if (rippleStrength > 0.01) {
        var mix = rippleStrength * 0.6;
        finalColor = {
          r: baseColor.r * (1 - mix) + rippleColor.r * mix,
          g: baseColor.g * (1 - mix) + rippleColor.g * mix,
          b: baseColor.b * (1 - mix) + rippleColor.b * mix
        };
        alpha *= (1 + rippleStrength * 0.4);
      }
      
      // 绘制粒子（径向渐变，柔和外发光）
      var gradient = ctx.createRadialGradient(worldX, worldY, 0, worldX, worldY, size * 2.2);
      gradient.addColorStop(0, 'rgba(' + Math.round(finalColor.r) + ',' + Math.round(finalColor.g) + ',' + Math.round(finalColor.b) + ',' + alpha + ')');
      gradient.addColorStop(0.4, 'rgba(' + Math.round(finalColor.r) + ',' + Math.round(finalColor.g) + ',' + Math.round(finalColor.b) + ',' + (alpha * 0.5) + ')');
      gradient.addColorStop(1, 'rgba(' + Math.round(finalColor.r) + ',' + Math.round(finalColor.g) + ',' + Math.round(finalColor.b) + ',0)');
      
      ctx.fillStyle = gradient;
      ctx.fillRect(worldX - size * 2.2, worldY - size * 2.2, size * 4.4, size * 4.4);
    }
  }

  function tick(now) {
    requestAnimationFrame(tick);
    if (hidden) return;
    drawParticleCloud(now);
  }

  function onMove(e) {
    if (hidden) return;
    var p = (e.touches && e.touches[0]) ? e.touches[0] : e;
    if (!p) return;
    var x = p.clientX, y = p.clientY;
    if (x < 0 || y < 0 || x > W || y > H) return;
    
    if (!hasMoved) {
      cloudCenter.x = x;
      cloudCenter.y = y;
      cloudCenter.targetX = x;
      cloudCenter.targetY = y;
      hasMoved = true;
    }
    
    cloudCenter.targetX = x;
    cloudCenter.targetY = y;
    mouse.x = x;
    mouse.y = y;
    lastMoveAt = performance.now();
  }

  /* 穿门：三条线各跑各的，互不抢戏。
   *  ① 信条 / 提示 / 光团：在跑道前 45% 内退干净 —— 先退，绝不给正文添乱。
   *  ② 白雾：跟着「内容顶边」走的一道雾，只落在本来就空白的跑道区域，
   *     所以正文从雾下面升上来时始终清晰（旧写法把整块门降 opacity，
   *     正文长时间泡在雾里被洗白——2026-09-11 用户反馈的"白雾"）。
   *     另外雾本身在跑道后 25% 之前就整体淡掉了，收尾干干净净。
   *  ③ 跑道：门散尽那一刻，内容顶边正好贴到视口顶边 —— 标题完整落在眼前，
   *     不会再有"门开完了标题却被推走、得往回滚一下"（反馈的"回弹"）。 */
  function applyFade() {
    var p = span > 0 ? Math.max(0, Math.min(1, window.scrollY / span)) : 1;

    var c = Math.min(1, p / 0.45);
    var contentA = 1 - c * c * (3 - 2 * c);          // smoothstep：起步慢、收尾干脆

    if (motto) {
      motto.style.opacity = contentA.toFixed(3);
      motto.style.transform = 'translateY(' + (-18 * p).toFixed(1) + 'px)';
    }
    if (hint) hint.style.opacity = (contentA * 0.62).toFixed(3);   // 提示常态就是 .62
    canvas.style.opacity = contentA.toFixed(3);

    if (veil) {
      veil.style.setProperty('--veil-cut', Math.max(0, contentTop - window.scrollY).toFixed(1) + 'px');
      veil.style.setProperty('--veil-soft', soft + 'px');
      veil.style.opacity = Math.min(1, (1 - p) * 4).toFixed(3);
    }

    var nowHidden = p >= 1;   // 门散尽 → 停止渲染/收集,别白烧 CPU
    if (nowHidden !== hidden) {
      hidden = nowHidden;
      gate.style.pointerEvents = nowHidden ? 'none' : '';
      if (nowHidden) { 
        // 门厅离开视口:清空状态,停止渲染
        hasMoved = false; 
        ctx.clearRect(0, 0, W, H);
        particles = [];
        cloudCenter = { x: 0, y: 0, targetX: 0, targetY: 0 };
        mouse = { x: -1000, y: -1000 };
      } else {
        // 门厅重新回到视口:重新初始化粒子云,等待鼠标触发
        initParticles();
      }
    }
  }

  var queued = false;
  function onScroll() {
    if (queued) return;
    queued = true;
    requestAnimationFrame(function () { queued = false; applyFade(); });
  }

  window.addEventListener('resize', function () { resize(); measure(); applyFade(); }, { passive: true });
  window.addEventListener('mousemove', onMove, { passive: true });
  window.addEventListener('touchmove', onMove, { passive: true });
  window.addEventListener('scroll', onScroll, { passive: true });

  resize();
  measure();
  initParticles();  // 初始化粒子云
  applyFade();      // 若刷新时已在页面中部（如从锚点进入），门厅直接呈"已穿门"态
  requestAnimationFrame(tick);
})();
