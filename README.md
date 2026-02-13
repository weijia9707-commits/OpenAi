
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
