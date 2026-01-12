# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 项目概述

这是一个基于 Hugo 的个人技术博客，使用 hermit-V2 主题，部署在 GitHub Pages。

- **网站地址**: https://www.heyuan110.com/
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

## 目录结构

```
content/
├── posts/           # 博客文章目录
│   ├── ai/          # AI 系列
│   ├── java/        # Java 系列
│   ├── go/          # Go 系列
│   ├── docker/      # Docker 系列
│   ├── linux/       # Linux 系列
│   └── ...          # 其他分类
├── about.md         # 关于页面
└── *-categories.md  # 各系列的分类页面
static/              # 静态资源（图片、favicon 等）
themes/hermit-V2/    # 主题（作为 git submodule）
hugo.toml            # Hugo 主配置文件
```

## 文章格式

文章使用 Markdown 格式，Front Matter 使用 TOML 格式（`+++`）：

```markdown
+++
date = '2024-01-01'
draft = false
title = '文章标题'
tags = ['tag1', 'tag2']
+++

文章内容...
```

带图片的文章应使用 Page Bundle 结构：
```
content/posts/<分类>/<日期>-<文章名>/
├── index.md
└── image.png
```

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
- 在 CLAUDE.md 或 README 中展示代码规范
- 创建包含代码示例的教程文章

## 部署流程

- 推送到 `code` 分支会自动触发 GitHub Actions
- 自动构建并部署到 GitHub Pages
- 配置文件：`.github/workflows/hugo.yml`

## 主题定制

- 主配置：`hugo.toml`
- 自定义样式：在 `assets/scss/` 目录创建对应的 scss 文件覆盖主题样式
- 自定义布局：在 `layouts/` 目录创建对应文件覆盖主题模板
