# AGENTS.md

本文件为所有 AI Agent 提供统一协作规范（包括但不限于 Claude Code、Codex、Gemini CLI、Cursor、Copilot、Cline 等）。

## 项目概述

Web Toolbox 是一套纯前端在线工具集，包含 28+ 个独立的 HTML 工具页面。所有工具完全运行在浏览器端，无需后端服务。

- **线上地址**: https://www.heyuan110.com/web-toolbox/
- **技术栈**: 纯 HTML + CSS + JavaScript（简单工具内联单文件，复杂工具拆分多文件放子目录）
- **第三方库**: HLS.js (M3U8播放)、sql.js (SQLite)、OpenCC (简繁转换)、jsPDF、JSZip 等

## 项目结构

```
web-toolbox/
├── index.html              # 工具导航首页（包含所有工具卡片）
├── *.html                  # 简单工具页面（单文件，CSS/JS 内联）
├── xxx/                    # 复杂工具目录（多文件拆分）
│   ├── index.html          #   入口页面
│   ├── style.css           #   独立样式
│   └── app.js              #   独立脚本
├── docs/                   # 项目文档（ROADMAP、开发模板等）
├── sitemap.xml             # SEO站点地图
├── screenshots/            # 工具截图（用于首页展示）
├── ws-server.js            # WebSocket 测试服务器 (Node.js)
├── claude-history-server.py # Claude 历史记录本地服务器 (Python)
└── .playwright-mcp/        # Playwright 截图临时目录
```

## 开发规范

### 工具页面结构

工具支持两种文件组织方式：

**单文件模式**（简单工具）：一个独立 HTML 文件，CSS/JS 内联
- 文件：`xxx.html`
- URL：`https://www.heyuan110.com/web-toolbox/xxx.html`

**多文件模式**（复杂工具）：独立子目录，HTML/CSS/JS 分离
- 目录：`xxx/index.html` + `style.css` + `app.js`
- URL：`https://www.heyuan110.com/web-toolbox/xxx/`

所有工具页面都必须包含：
- `<head>` 包含 SEO Meta 标签、Open Graph、JSON-LD 结构化数据
- 深色主题，响应式设计
- JavaScript 使用 IIFE 模式避免全局污染
- **多语言支持**（强制要求）

### 多语言规范

每个工具必须支持 4 种语言：English (en)、中文 (zh-CN)、Français (fr)、Español (es)

实现方式：
1. HTML 元素使用 `data-i18n="key"` 属性标记需要翻译的文本
2. 输入框 placeholder 使用 `data-i18n-placeholder="key"` 属性
3. JS 中定义 `i18n` 对象包含所有翻译
4. 页面右上角放置语言切换器（下拉菜单）
5. 语言偏好存入 `localStorage`，key 格式为 `{tool}_lang`
6. 默认语言为 English

```javascript
// 语言切换器标准实现
const langNames = { en: "🇺🇸 English", "zh-CN": "🇨🇳 中文", fr: "🇫🇷 Français", es: "🇪🇸 Español" };
const i18n = { en: { /* ... */ }, "zh-CN": { /* ... */ }, fr: { /* ... */ }, es: { /* ... */ } };

function applyLanguage(lang) {
    localStorage.setItem("{tool}_lang", lang);
    document.getElementById("langCurrent").textContent = langNames[lang];
    document.querySelectorAll("[data-i18n]").forEach(el => {
        const key = el.getAttribute("data-i18n");
        if (i18n[lang] && i18n[lang][key]) el.textContent = i18n[lang][key];
    });
    document.querySelectorAll("[data-i18n-placeholder]").forEach(el => {
        const key = el.getAttribute("data-i18n-placeholder");
        if (i18n[lang] && i18n[lang][key]) el.placeholder = i18n[lang][key];
    });
}
```

### SEO 配置（强制要求）

每个工具页面**必须**包含以下全部 SEO 元素，缺一不可：

#### A. Head Meta 标签

```html
<!-- 基础 SEO -->
<title>{工具英文名} - Free Online {类型} | {中文名} | Web Toolbox</title>
<meta name="description" content="{英文描述 150-160字符}">
<meta name="keywords" content="{英文关键词},{中文关键词},{长尾词}">
<meta name="author" content="heyuan110">
<meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1">
<meta name="googlebot" content="index, follow">
<meta name="bingbot" content="index, follow">
<meta name="revisit-after" content="7 days">
<meta name="rating" content="general">
<meta name="distribution" content="global">
<meta name="language" content="en">
<link rel="canonical" href="https://www.heyuan110.com/web-toolbox/{文件名}.html">
<link rel="alternate" hreflang="en" href="https://www.heyuan110.com/web-toolbox/{文件名}.html">
<link rel="alternate" hreflang="zh-CN" href="https://www.heyuan110.com/web-toolbox/{文件名}.html">

<!-- Open Graph -->
<meta property="og:type" content="website">
<meta property="og:url" content="...">
<meta property="og:title" content="...">
<meta property="og:description" content="...">
<meta property="og:image" content="https://www.heyuan110.com/web-toolbox/screenshots/{文件名}.webp">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:locale" content="en_US">
<meta property="og:locale:alternate" content="zh_CN">
<meta property="og:site_name" content="Web Toolbox">

<!-- Twitter Card -->
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:site" content="@heyuan110">
<meta name="twitter:creator" content="@heyuan110">
<meta name="twitter:title" content="...">
<meta name="twitter:description" content="...">
<meta name="twitter:image" content="...">
```

#### B. JSON-LD 结构化数据（必须包含全部 4 种）

**1) WebApplication**（增强版，必须包含 alternateName、publisher、featureList、screenshot）：
```json
{
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "{工具英文名}",
    "alternateName": ["{中文名}", "{同义英文名1}", "{同义英文名2}"],
    "url": "...",
    "description": "...",
    "inLanguage": ["en", "zh-CN", "fr", "es"],
    "applicationCategory": "UtilitiesApplication",
    "operatingSystem": "Web Browser",
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
    "author": { "@type": "Person", "name": "heyuan110" },
    "publisher": { "@type": "Organization", "name": "Web Toolbox", "url": "https://www.heyuan110.com/web-toolbox/" },
    "featureList": ["feature1", "feature2", "feature3", "feature4"],
    "screenshot": "https://www.heyuan110.com/web-toolbox/screenshots/{文件名}.webp"
}
```

**2) BreadcrumbList**（3 级面包屑）：
```json
{
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.heyuan110.com/" },
        { "@type": "ListItem", "position": 2, "name": "Web Toolbox", "item": "https://www.heyuan110.com/web-toolbox/" },
        { "@type": "ListItem", "position": 3, "name": "{工具名}", "item": "{工具URL}" }
    ]
}
```

**3) HowTo**（使用步骤，3 步）：
```json
{
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": "How to Use {工具名}",
    "totalTime": "PT1M",
    "step": [
        { "@type": "HowToStep", "position": 1, "name": "Step 1", "text": "..." },
        { "@type": "HowToStep", "position": 2, "name": "Step 2", "text": "..." },
        { "@type": "HowToStep", "position": 3, "name": "Step 3", "text": "..." }
    ]
}
```

**4) FAQPage**（至少 5 个常见问题）：
```json
{
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
        { "@type": "Question", "name": "...", "acceptedAnswer": { "@type": "Answer", "text": "..." } }
    ]
}
```

#### C. 页面可见 SEO 内容（强制要求）

每个工具页面在主体功能区域之后、`</body>` 之前，**必须**包含以下 3 个可见区域：

**1) 功能特点区域**（`<section class="features-section">`）
- 4 个 feature 卡片，每个包含 emoji 图标 + 标题 + 描述
- 突出工具核心卖点，内容要埋入 Google 搜索热词
- CSS 用 grid 布局（PC 4 列 / 平板 2 列 / 手机 1 列）
- 所有文本用 `data-i18n` 标记

**2) FAQ 常见问题区域**（`<section class="faq-section">`）
- 至少 5 个问答，手风琴交互（点击展开/收起）
- 问答内容要覆盖用户常搜的关键词
- 需要 JS 交互逻辑（点击切换 active 状态）
- 所有文本用 `data-i18n` 标记，4 语言翻译

**3) 相关工具推荐区域**（`<section class="related-tools">`）
- 推荐 3-5 个相关工具的链接卡片
- 每个卡片包含 emoji + 工具名 + 简短描述
- 选择同类别或互补功能的工具
- 使用 grid 布局，卡片式内链
- 所有文本用 `data-i18n` 标记

#### D. 关键词策略

- title 中同时包含英文关键词和中文关键词
- description 优先英文，自然嵌入高搜索量词汇
- keywords 包含英文长尾词、中文关键词
- 功能特点区域和 FAQ 区域的文本要自然埋入 Google 热搜词
- alternateName 覆盖工具的多种叫法（中英文、同义词）

#### E. 痛点关键词埋词（强制要求）

> 核心原则：用户的痛点就是搜索词。竞品的缺陷就是我们的卖点。

用户搜索免费工具时，高频附加的修饰词反映了他们对现有工具的不满。**每个工具必须在以下位置埋入痛点关键词**：

**痛点关键词清单**（根据工具类型选择适用的）：

| 痛点 | 必埋关键词 | 适用场景 |
|------|-----------|---------|
| 广告泛滥 | `No Ads`, `ad-free` | 所有工具 |
| 强制注册 | `No Signup`, `No Login`, `No Registration` | 所有工具 |
| 水印 | `No Watermark` | 图片/视频/PDF 类工具 |
| 要安装 | `No Install`, `browser-based`, `online` | 所有工具 |
| 功能限制 | `No Limit`, `unlimited`, `free unlimited` | 所有工具 |
| 隐私顾虑 | `No Upload`, `local processing`, `privacy-first` | 文件处理类（PDF/图片/音视频） |

**埋词位置（6 层，缺一不可）：**

**1) `<title>` 标签（权重最高）**
```html
<title>{工具英文名} - Free Online {类型} | No Ads, No Signup | {中文名} | Web Toolbox</title>
```
- 必须包含 `No Ads` + 一个最强卖点（`No Signup` / `No Upload` / `No Watermark`）
- PDF/图片/音视频工具优先用 `No Upload`
- 图片编辑/视频类优先用 `No Watermark`

**2) `<meta name="description">` 末尾**
```html
<meta name="description" content="{原有描述}. ✅ No ads ✅ No signup ✅ No limits. Runs entirely in your browser.">
```

**3) `<meta name="keywords">` 末尾追加**
```
no ads, no signup, no login, no watermark, free unlimited, browser-based, no installation, local processing
```

**4) JSON-LD WebApplication featureList 追加**
```json
"featureList": ["...(原有功能)...", "No ads", "No signup required", "No watermark", "100% browser-based", "Unlimited usage"]
```

**5) og:title 和 twitter:title**
与 `<title>` 保持一致（可去掉末尾 `| Web Toolbox`）

**6) 页面可见内容**
- **功能特点区域第 1 张卡片**必须是隐私安全卖点：
  ```
  🔒 100% Free & Private
  No ads, no signup, no watermark. Everything runs locally in your browser. Your data never leaves your device.
  ```
  4 语言翻译：
  - zh-CN: "100% 免费且安全" / "无广告、无需注册、无水印。所有处理都在浏览器本地完成，数据不会上传到任何服务器。"
  - fr: "100% Gratuit et Privé" / "Sans publicité, sans inscription, sans filigrane. Tout est traité localement dans votre navigateur."
  - es: "100% Gratis y Privado" / "Sin anuncios, sin registro, sin marca de agua. Todo se procesa localmente en tu navegador."

- **FAQ 最后一条**必须是免费安全问答：
  ```
  Q: Is this tool really free with no ads?
  A: Yes, 100% free with no ads, no registration, no watermark, and no usage limits. All processing happens locally in your browser — your data is never uploaded to any server.
  ```
  i18n key: `faq_free_q` / `faq_free_a`，4 语言翻译完整
  同时追加到 JSON-LD FAQPage

#### F. 信任状 Trust Bar（强制要求）

> 核心原则：视觉信任感降低用户跳出率。仅做页面展示，不在 JSON-LD 中伪造评分。

每个工具页面在主体功能区域（工具操作区）与功能特点区域（features-section）之间，**必须**放置一个信任状栏：

**HTML 结构：**
```html
<div class="trust-bar">
    <span class="trust-item" data-i18n="trust_users">🌍 Used by 50,000+ users</span>
    <span class="trust-item" data-i18n="trust_rating">⭐ 4.9/5 rating</span>
    <span class="trust-item" data-i18n="trust_privacy">🔒 100% Private</span>
    <span class="trust-item" data-i18n="trust_free">🚫 No Ads, No Signup</span>
</div>
```

**CSS 样式：**
```css
.trust-bar {
    display: flex;
    justify-content: center;
    gap: 24px;
    flex-wrap: wrap;
    margin: 12px 0 24px;
    padding: 12px 20px;
    background: rgba(124, 58, 237, 0.1);
    border: 1px solid rgba(124, 58, 237, 0.2);
    border-radius: 12px;
}
.trust-item {
    font-size: 13px;
    color: #a78bfa;
    white-space: nowrap;
}
```

**i18n 翻译（4 语言）：**
```javascript
// en
trust_users: "🌍 Used by 50,000+ users",
trust_rating: "⭐ 4.9/5 rating",
trust_privacy: "🔒 100% Private",
trust_free: "🚫 No Ads, No Signup",

// zh-CN
trust_users: "🌍 超过 50,000 用户使用",
trust_rating: "⭐ 4.9/5 好评",
trust_privacy: "🔒 100% 隐私安全",
trust_free: "🚫 无广告、无需注册",

// fr
trust_users: "🌍 Utilisé par 50 000+ utilisateurs",
trust_rating: "⭐ Note 4.9/5",
trust_privacy: "🔒 100% Privé",
trust_free: "🚫 Sans pub, sans inscription",

// es
trust_users: "🌍 Usado por más de 50,000 usuarios",
trust_rating: "⭐ Calificación 4.9/5",
trust_privacy: "🔒 100% Privado",
trust_free: "🚫 Sin anuncios, sin registro",
```

**⚠️ 禁止事项：**
- **不得**在 JSON-LD 中添加 `aggregateRating`（Google 要求评分基于真实用户数据，伪造会触发手动惩罚）
- Trust Bar 仅作为页面视觉元素，不写入结构化数据
- `offers.price: "0"` 已在 WebApplication schema 中标注免费，这是安全合规的

### 添加新工具

1. 创建工具文件（单文件 `xxx.html` 或多文件目录 `xxx/index.html`）
2. 在 `index.html` 的 `tools-grid` 中添加工具卡片
3. 在 `index.html` 的 JSON-LD `hasPart` 数组中添加条目
4. 在 `sitemap.xml` 中添加 URL 条目
5. 添加工具截图到 `screenshots/` 目录（必须为 webp 格式）
6. 更新 `docs/ROADMAP.md` 标记完成状态

### 截图规范

- **格式要求**: 所有截图必须使用 webp 格式，以优化加载速度
- **压缩转换**: 使用 cwebp 命令将 png/jpg 转换为 webp
  ```bash
  # 单个文件转换（质量 80）
  cwebp -q 80 screenshot.png -o screenshot.webp

  # 批量转换 screenshots 目录下所有图片
  cd screenshots && for file in *.jpg *.png; do [ -f "$file" ] && cwebp -q 80 "$file" -o "${file%.*}.webp"; done
  ```
- **命名规范**: 截图文件名与工具 HTML 文件名保持一致，如 `json-viewer.webp`

## 常用命令

```bash
# 本地预览（直接用浏览器打开）
open index.html

# 启动 WebSocket 测试服务器
node ws-server.js

# 启动 Claude 历史记录服务器
python3 claude-history-server.py
```

## 设计规范

- **配色**: 深色主题，主色 `#7c3aed` (紫色)，背景渐变 `#1a1a2e` → `#0f3460`
- **布局**: CSS Grid 响应式网格，卡片圆角 16px
- **交互**: hover 上浮效果，渐变按钮，平滑过渡动画
- **UI 皮肤（强制）**: 新增或重构工具页面默认采用 **shadcn/ui 视觉语言**（卡片、按钮、输入框、边框、层次与间距风格保持一致），在不引入 React 的前提下用原生 HTML/CSS/JS 复刻其设计语义


<claude-mem-context>
# Recent Activity

<!-- This section is auto-generated by claude-mem. Edit content outside the tags. -->

### Feb 13, 2026

| ID | Time | T | Title | Read |
|----|------|---|-------|------|
| #1296 | 10:51 AM | 🔵 | Web-toolbox project inventory reveals 29 existing tools across utility, media, and developer categories | ~668 |
| #1295 | " | 🔵 | Web Toolbox index page with comprehensive SEO optimization and structured data | ~485 |
</claude-mem-context>
