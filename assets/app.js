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

  /* ---------- 完整履历（密码锁定区，仅真实站） ---------- */
  function resumeSectionHtml() {
    return '<section id="resume" class="reveal resume-section">' +
      '<div class="section-title">完整履历</div>' +
      '<p class="resume-lead">公开页面只展示能力；这里收着我的完整职业经历、外部学习记录，以及部分不公开的作品。把它当简历投给公司时，把密码一并交给对方即可。</p>' +
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
  var tagsAll = [];
  allWorks.forEach(function (w) {
    if (themes.indexOf(w.theme) === -1) themes.push(w.theme);
    (w.tags || []).forEach(function (t) { if (tagsAll.indexOf(t) === -1) tagsAll.push(t); });
  });

  /* ---------- 构建骨架 ---------- */
  var root = document.createElement('div');
  root.innerHTML =
    '<nav class="nav">' +
      '<span class="brand">' + esc(cfg.name) + '</span>' +
      '<div class="links">' +
        '<a href="#about">关于</a>' +
        (cfg.resume ? '<a href="#resume">履历</a>' : '') +
        '<a href="#works">作品</a>' +
        '<a href="#contact">联系</a>' +
        '<button class="accent-btn" id="accentBtn">换一种气质</button>' +
      '</div>' +
    '</nav>' +
    '<header class="hero reveal">' +
      '<h1>' + esc(cfg.name) + '</h1>' +
      '<div class="rule"></div>' +
      '<p class="tagline">' + esc(cfg.tagline) + '</p>' +
    '</header>' +
    '<section id="about" class="reveal">' +
      '<div class="section-title">关于</div>' +
      '<p>' + esc(cfg.about) + '</p>' +
      (cfg.aiNote ? '<p class="ai-note">' + esc(cfg.aiNote) + '</p>' : '') +
    '</section>' +
    '<section id="works" class="reveal">' +
      '<div class="section-title">作品</div>' +
      '<div class="filters" id="filters"></div>' +
      '<div class="grid" id="grid"></div>' +
    '</section>' +
    '<section id="contact" class="reveal">' +
      '<div class="section-title">联系</div>' +
      '<div class="ways" id="ways"></div>' +
      (cfg.contact && cfg.contact.note ? '<div class="qr-note">' + esc(cfg.contact.note) + '</div>' : '') +
    '</section>' +
    (cfg.resume ? resumeSectionHtml() : '') +
    '<div class="footer">© ' + esc(cfg.name) + ' · 用作品说话</div>' +
    '<div class="modal-mask" id="mask"><div class="modal" id="modal"></div></div>';

  document.body.appendChild(root);

  /* ---------- 联系区 ---------- */
  var ways = document.getElementById('ways');
  var c = cfg.contact || {};
  var wayHtml = '';
  if (c.email) wayHtml += '<div class="way"><div class="k">Email</div><div class="v">' + esc(c.email) + '</div></div>';
  if (c.wechat) wayHtml += '<div class="way"><div class="k">微信</div><div class="v">' + esc(c.wechat) + '</div></div>';
  if (c.xianyu) wayHtml += '<div class="way"><div class="k">闲鱼</div><div class="v">' + esc(c.xianyu) + '</div></div>';
  if (c.xhs) wayHtml += '<div class="way"><div class="k">小红书</div><div class="v">' + esc(c.xhs) + '</div></div>';
  if (c.showQR) wayHtml += '<div class="way"><div class="k">二维码</div><div class="v">（待放入微信二维码图片）</div></div>';
  ways.innerHTML = wayHtml;

  /* ---------- 筛选栏 ---------- */
  var filtersEl = document.getElementById('filters');
  var activeTheme = '全部';
  var activeTag = '全部';

  function renderFilters() {
    var html = '';
    var themeOpts = ['全部'].concat(themes);
    themeOpts.forEach(function (t) {
      html += '<button class="chip' + (t === activeTheme ? ' active' : '') + '" data-type="theme" data-v="' + esc(t) + '">' + esc(t) + '</button>';
    });
    var tagOpts = ['全部'].concat(tagsAll);
    tagOpts.forEach(function (t) {
      html += '<button class="chip' + (t === activeTag ? ' active' : '') + '" data-type="tag" data-v="' + esc(t) + '">' + esc(t) + '</button>';
    });
    filtersEl.innerHTML = html;
  }
  renderFilters();

  filtersEl.addEventListener('click', function (e) {
    var btn = e.target.closest('.chip');
    if (!btn) return;
    if (btn.dataset.type === 'theme') activeTheme = btn.dataset.v;
    else activeTag = btn.dataset.v;
    renderFilters();
    renderGrid();
  });

  /* ---------- 作品网格 ---------- */
  var grid = document.getElementById('grid');

  function renderGrid() {
    var list = allWorks.filter(function (w) {
      var okT = activeTheme === '全部' || w.theme === activeTheme;
      var okTag = activeTag === '全部' || (w.tags || []).indexOf(activeTag) !== -1;
      return okT && okTag;
    });
    if (!list.length) { grid.innerHTML = '<p style="color:var(--muted)">这个分类下还没有作品。</p>'; return; }
    grid.innerHTML = list.map(function (w) {
      var tlTodo = isTodo(w.tagline);
      var tags = (w.tags || []).map(function (t) { return '<span class="tag">' + esc(t) + '</span>'; }).join('');
      return '<article class="card reveal" data-id="' + esc(w.id) + '">' +
        '<div class="cover">' + esc(w.cover || '✦') + '</div>' +
        '<div class="title">' + esc(w.title) + '</div>' +
        '<div class="tagline' + (tlTodo ? ' todo' : '') + '">' + (tlTodo ? '温情文案待补充' : esc(w.tagline)) + '</div>' +
        '<div class="meta"><span class="tag theme">' + esc(w.theme) + '</span>' + tags + '</div>' +
      '</article>';
    }).join('');
    observeReveals();
  }
  renderGrid();

  grid.addEventListener('click', function (e) {
    var card = e.target.closest('.card');
    if (!card) return;
    openModal(card.dataset.id);
  });

  /* ---------- 详情弹层 ---------- */
  var mask = document.getElementById('mask');
  var modal = document.getElementById('modal');

  function openModal(id) {
    var w = allWorks.filter(function (x) { return x.id === id; })[0];
    if (!w) return;
    var tlTodo = isTodo(w.tagline);
    var stTodo = isTodo(w.story);
    var tags = (w.tags || []).map(function (t) { return '<span class="tag">' + esc(t) + '</span>'; }).join('');
    var warn = '';
    if (w.needsConsent) warn += '<div class="warn">朋友项目 · 公开展示前需征得本人同意</div>';
    if (w.needsReview) warn += '<div class="warn">涉及公司内容 · 上线前需核对脱敏</div>';
    if (w.note) warn += '<div class="warn">' + esc(w.note) + '</div>';
    var preview = w.preview ? '<a class="preview-link" href="' + esc(w.preview) + '" target="_blank" rel="noopener">查看预览 →</a>' : '';

    modal.innerHTML =
      '<button class="close" id="closeBtn">&times;</button>' +
      '<div class="cover">' + esc(w.cover || '✦') + '</div>' +
      '<h2>' + esc(w.title) + '</h2>' +
      '<div class="meta"><span class="tag theme">' + esc(w.theme) + '</span>' + tags +
        (w.year ? '<span class="tag">' + esc(w.year) + '</span>' : '') + '</div>' +
      '<div class="tagline' + (tlTodo ? ' todo' : '') + '">' + (tlTodo ? '（温情文案待补充 · 这里将放作品的一句话灵魂）' : esc(w.tagline)) + '</div>' +
      '<div class="story' + (stTodo ? ' todo' : '') + '">' + (stTodo ? '（缘起故事待补充 · 这里将放"为谁、为什么做"的温暖文字）' : esc(w.story)) + '</div>' +
      (w.summary ? '<div class="row"><div class="k">关于这件作品</div><div class="v">' + esc(w.summary) + '</div></div>' : '') +
      (w.role ? '<div class="row"><div class="k">我的角色</div><div class="v">' + esc(w.role) + '</div></div>' : '') +
      (w.tools && w.tools.length ? '<div class="row"><div class="k">用到的方法</div><div class="v">' + esc(w.tools.join('、')) + '</div></div>' : '') +
      (w.results ? '<div class="row"><div class="k">成果</div><div class="v">' + esc(w.results) + '</div></div>' : '') +
      (preview || warn ? '<div class="row">' + preview + warn + '</div>' : '');
    mask.classList.add('open');
    document.body.style.overflow = 'hidden';
    document.getElementById('closeBtn').onclick = closeModal;
  }
  function closeModal() {
    mask.classList.remove('open');
    document.body.style.overflow = '';
  }
  mask.addEventListener('click', function (e) { if (e.target === mask) closeModal(); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeModal(); });

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

    if (data.career && data.career.length) {
      html += '<h3 class="resume-h3">职业经历</h3><div class="timeline">';
      data.career.forEach(function (j) {
        html += '<div class="tl-item"><div class="tl-period">' + esc(j.period) + '</div>' +
          '<div class="tl-body"><div class="tl-role">' + esc(j.role) + '</div>' +
          '<div class="tl-company">' + esc(j.company) + '</div>' +
          (j.points && j.points.length ? '<ul class="tl-points">' + j.points.map(function (p) { return '<li>' + esc(p) + '</li>'; }).join('') + '</ul>' : '') +
          '</div></div>';
      });
      html += '</div>';
    }

    if (data.courses && data.courses.length) {
      html += '<h3 class="resume-h3">外部学习记录</h3><div class="courses">';
      data.courses.forEach(function (c) {
        html += '<div class="course"><span class="course-year">' + esc(c.year) + '</span>' +
          '<span class="course-name">' + esc(c.name) + '</span>' +
          (c.note ? '<span class="course-note">' + esc(c.note) + '</span>' : '') + '</div>';
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

    var priv = allWorks.filter(function (w) { return w.private === true; });
    if (priv.length) {
      html += '<h3 class="resume-h3">不公开作品</h3><div class="priv-works">';
      priv.forEach(function (w) {
        html += '<div class="priv-item"><span class="priv-title">' + esc(w.title) + '</span>' +
          (w.summary ? '<span class="priv-sum">' + esc(w.summary) + '</span>' : '') + '</div>';
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
