# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

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


<claude-mem-context>
# Recent Activity

<!-- This section is auto-generated by claude-mem. Edit content outside the tags. -->

### Feb 13, 2026

| ID | Time | T | Title | Read |
|----|------|---|-------|------|
| #1296 | 10:51 AM | 🔵 | Web-toolbox project inventory reveals 29 existing tools across utility, media, and developer categories | ~668 |
| #1295 | " | 🔵 | Web Toolbox index page with comprehensive SEO optimization and structured data | ~485 |
</claude-mem-context>