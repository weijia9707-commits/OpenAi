# 发布约定（避免“文章已加但前台看不到”）

1. **只改 `openai_repo`**（Hugo 源码仓库）
2. 新文章放在：`content/posts/...`
3. 提交并推送到 `main` 分支（GitHub Pages 自动部署）
4. 不再手工维护 `../site` 作为线上来源（它仅用于本地临时静态文件）

## 快速自检

- 文章 front matter: `draft = false`
- 日期正确（时区 +08:00）
- 分类与栏目一致（当前 AI使用 对应 `AI实战` 分类页）
- 推送后检查 GitHub Actions 的 `Deploy Hugo site to Pages` 是否成功
