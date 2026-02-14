
## 技术栈

- **静态网站生成器**: Hugo v0.153.2+
- **主题**: [hermit-V2](https://github.com/1bl4z3r/hermit-V2)
- **部署**: GitHub Pages + GitHub Actions

## 内容分类

- AI 系列
- Java 系列
- Go 系列
- Docker 系列
- Linux 系列

## 本地开发

### 前置要求

- [Hugo Extended](https://gohugo.io/installation/) v0.153.2 或更高版本
- Git

### 克隆项目

```bash
git clone --recursive https://github.com/weijia9707-commits/*****.github.io.git
cd OpenAi
```

### 本地预览

```bash
hugo server -D
```

访问 http://localhost:1313 预览博客。

### 创建新文章

```bash
hugo new posts/my-new-post.md
```

## 部署

推送到 `main` 分支后，GitHub Actions 会自动构建并部署到 GitHub Pages。

### 发布后自动验收

新增脚本：`scripts/post-deploy-verify.sh`

示例：

```bash
bash scripts/post-deploy-verify.sh \
  --path /posts/ai/2026-02-14-free-fs-enterprise-file-system/ \
  --title "AI使用：开源企业文件管理 Free-FS 快速评估与落地建议"
```

脚本会自动重试并校验：
- 首页是否出现文章链接
- 文章页是否 200 且标题匹配
- `sitemap.xml` 是否收录文章链接

## 目录结构

```
.
├── archetypes/    # 文章模板
├── content/       # 博客内容
├── static/        # 静态资源
├── themes/        # Hugo 主题
├── hugo.toml      # Hugo 配置
└── .github/       # GitHub Actions 配置
```
