# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 项目概述

Web Toolbox 是一套纯前端在线工具集，包含 28+ 个独立的 HTML 工具页面。所有工具完全运行在浏览器端，无需后端服务。

- **线上地址**: https://www.heyuan110.com/web-toolbox/
- **技术栈**: 纯 HTML + CSS + JavaScript（内联在单个 HTML 文件中）
- **第三方库**: HLS.js (M3U8播放)、sql.js (SQLite)、OpenCC (简繁转换)、jsPDF、JSZip 等

## 项目结构

```
web-toolbox/
├── index.html              # 工具导航首页（包含所有工具卡片）
├── *.html                  # 各独立工具页面（每个工具一个文件）
├── sitemap.xml             # SEO站点地图
├── screenshots/            # 工具截图（用于首页展示）
├── ws-server.js            # WebSocket 测试服务器 (Node.js)
├── claude-history-server.py # Claude 历史记录本地服务器 (Python)
└── .playwright-mcp/        # Playwright 截图临时目录
```

## 开发规范

### 工具页面结构

每个工具是一个独立的 HTML 文件，采用 **Single File Component** 模式：
- `<head>` 包含 SEO Meta 标签、Open Graph、JSON-LD 结构化数据
- `<style>` 内联所有 CSS（深色主题，响应式设计）
- `<script>` 内联所有 JavaScript（IIFE 模式避免全局污染）

### SEO 配置

每个工具页面必须包含：
- `<title>` 和 `<meta name="description">`
- `<link rel="canonical">` 指向规范 URL
- Open Graph 标签 (`og:title`, `og:description`, `og:image`)
- Twitter Card 标签
- JSON-LD 结构化数据 (`@type: WebApplication`)

### 添加新工具

1. 创建新的 `xxx-tool.html` 文件
2. 在 `index.html` 的 `tools-grid` 中添加工具卡片
3. 在 `index.html` 的 JSON-LD `hasPart` 数组中添加条目
4. 在 `sitemap.xml` 中添加 URL 条目
5. 添加工具截图到 `screenshots/` 目录（必须为 webp 格式）

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
