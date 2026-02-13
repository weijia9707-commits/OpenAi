# AGENTS.md

本文件为所有 AI Agent（Claude Code、Cursor、Windsurf、Copilot、Cline 等）提供项目上下文和协作规范。

## 交互规范

- **语言**：默认使用中文进行所有交互
- **Git 分支**：工作分支为 `code`，推送到 `code` 分支会自动触发部署
- **提交规范**：commit message 使用中文，简洁描述变更内容

## 项目概述

这是一个基于 Hugo 的个人技术博客，使用 hermit-V2 主题，部署在 GitHub Pages。

- **网站地址**: https://www.*****.com/
- **Hugo 版本**: v0.153.2+ (需要 Extended 版本)
- **主题**: hermit-V2

## 常用命令

```bash
# 本地预览（包含草稿）
hugo server -D

# 本地预览（不含草稿）
hugo server

# 创建新文章
hugo new posts/<分类>/<文章名>.md

# 构建生产版本
hugo --minify

# 更新主题子模块
git submodule update --remote
```

## 博客分类规范

根据 `hugo.toml` 菜单配置，博客文章分类如下：

### AI 文章分类（主要）

| 分类 | URL | 说明 | 示例 |
|------|-----|------|------|
| **AI原理** | `categories/ai原理/` | 概念、理论、访谈、思考、趋势分析 | Anthropic CEO 访谈、Agent Skills 原理、AI 时代的 Taste |
| **AI实战** | `categories/ai实战/` | 教程、指南、工具使用、最佳实践、产品评测 | Claude Code 指南、Cursor 最佳实践、Skills 排行榜 |

### 写文章时的分类设置

```toml
# AI 教程/指南/工具类 → AI实战
categories = ['AI实战']

# AI 原理/思考/访谈类 → AI原理
categories = ['AI原理']
```

### 旧内容分类（归档）

| 分类 | 目录 |
|------|------|
| Java | `posts/java/` |
| Go | `posts/go/` |
| Docker | `posts/docker/` |
| Linux | `posts/linux/` |
| macOS | `posts/macos/` |

## 目录结构

```
content/
├── posts/           # 博客文章目录
│   ├── ai/          # AI 系列（主要更新）
│   ├── java/        # Java 系列（归档）
│   ├── go/          # Go 系列（归档）
│   ├── docker/      # Docker 系列（归档）
│   ├── linux/       # Linux 系列（归档）
│   └── macos/       # macOS 系列（归档）
├── about.md         # 关于页面
└── *-categories.md  # 各系列的分类页面
static/              # 静态资源（图片、favicon 等）
themes/hermit-V2/    # 主题（作为 git submodule）
hugo.toml            # Hugo 主配置文件
```

## 文章格式

### Front Matter 完整模板

文章使用 Markdown 格式，Front Matter 使用 TOML 格式（`+++`）：

```toml
+++
date = '2026-01-26T10:00:00+08:00'
draft = false
title = '文章标题（50-60字符，核心关键词靠前）'
description = '文章描述，用于 SEO 和社交分享（120-160字符）'
toc = true
tags = ['Claude Code', 'AI 编程', '具体技术标签']
categories = ['AI实战']
keywords = ['搜索关键词1', '搜索关键词2']
+++
```

| 字段 | 必填 | 说明 |
|------|------|------|
| `date` | ✓ | ISO 8601 格式，含时区 |
| `title` | ✓ | 50-60 字符，关键词前置 |
| `description` | ✓ | 120-160 字符，包含核心关键词 |
| `categories` | ✓ | `AI实战` 或 `AI原理` |
| `tags` | ✓ | 3-5 个标签 |
| `toc` | 推荐 | 长文设为 `true` |
| `keywords` | 可选 | SEO 补充关键词 |
| `draft` | 可选 | 默认 `false` |

### 文章目录结构

带图片的文章使用 Page Bundle 结构：

```
content/posts/ai/2026-01-26-article-name/
├── index.md      # 文章内容
├── cover.webp    # 封面图（必须叫 cover.webp）
└── other.webp    # 其他配图
```

**命名规范**：`<日期>-<英文短标题>/`，如 `2026-01-26-claude-code-guide/`

### 图片处理规范

| 项目 | 规范 |
|------|------|
| **格式** | 优先使用 `.webp`（体积小、质量好） |
| **封面图** | 必须命名为 `cover.webp` |
| **尺寸** | 封面图建议 1200×630px（社交分享最佳） |
| **引用方式** | `![描述](cover.webp)` 或 `![描述](filename.webp)` |
| **ALT 文本** | 必须填写，描述图片内容 |

### 嵌套代码块处理规范

当需要在 Markdown 代码块中展示包含代码块的内容时（如展示 Markdown 示例），**必须使用不同数量的反引号来避免渲染冲突**：

**正确做法**：
- 外层使用 4 个反引号 (`````)
- 内层使用 3 个反引号 (```)
- 或者外层使用 3 个反引号 + 内层使用缩进代码块

**示例**：
`````markdown
# 这是外层代码块示例
```python
# 这是内层代码块，不会打断外层
print("Hello World")
```
`````

**错误做法**：
- 内外层使用相同数量的反引号（会导致代码块提前结束）
- 不处理嵌套问题（会破坏文档结构）

**应用场景**：
- 编写技术文档时展示 Markdown 语法示例
- 在 AGENTS.md 或 README 中展示代码规范
- 创建包含代码示例的教程文章

## 部署流程

- 推送到 `code` 分支会自动触发 GitHub Actions
- 自动构建并部署到 GitHub Pages
- 配置文件：`.github/workflows/hugo.yml`

## 主题定制

- 主配置：`hugo.toml`
- 自定义样式：在 `assets/scss/` 目录创建对应的 scss 文件覆盖主题样式
- 自定义布局：在 `layouts/` 目录创建对应文件覆盖主题模板
