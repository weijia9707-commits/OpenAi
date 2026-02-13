# Web Toolbox Roadmap

> 最后更新：2026-02-13
> 目标：通过高搜索量的免费在线工具抢占 SEO 流量

---

## 项目状态总览

- **已上线工具**: 38 个
- **待开发工具**: 10 个
- **目标总计**: 48+ 个工具

---

## 已上线工具清单

| # | 工具名称 | 文件 | 分类 | 状态 |
|---|---------|------|------|------|
| 1 | M3U8 视频下载器 | m3u8-downloader.html | 视频 | ✅ 已上线 |
| 2 | JSON 查看器 | json-viewer.html | 开发者 | ✅ 已上线 |
| 3 | SQLite 查看器 | sqlite-viewer.html | 开发者 | ✅ 已上线 |
| 4 | 加密编码工具箱 | crypto-tools.html | 开发者 | ✅ 已上线 |
| 5 | WebSocket 测试器 | websocket-tester.html | 开发者 | ✅ 已上线 |
| 6 | 正则测试器 | regex-tester.html | 开发者 | ✅ 已上线 |
| 7 | 时间戳转换器 | timestamp-converter.html | 开发者 | ✅ 已上线 |
| 8 | IP 地理定位 | ip-lookup.html | 网络 | ✅ 已上线 |
| 9 | Whois 查询 | whois-query.html | 网络 | ✅ 已上线 |
| 10 | 图片压缩器 | image-compressor.html | 图片 | ✅ 已上线 |
| 11 | 图片格式转换 | image-converter.html | 图片 | ✅ 已上线 |
| 12 | 图片编辑器 | image-editor.html | 图片 | ✅ 已上线 |
| 13 | 图片转 PDF | image-to-pdf.html | 图片/PDF | ✅ 已上线 |
| 14 | ICO 图标制作 | ico-maker.html | 图片 | ✅ 已上线 |
| 15 | 证件照工具 | id-photo-tool.html | 图片 | ✅ 已上线 |
| 16 | 在线画板 | paint-board.html | 图片 | ✅ 已上线 |
| 17 | 调色板 | color-palette.html | 设计 | ✅ 已上线 |
| 18 | 音频剪切器 | audio-cutter.html | 音频 | ✅ 已上线 |
| 19 | 在线节拍器 | metronome.html | 音频 | ✅ 已上线 |
| 20 | 社交视频下载 | social-video-downloader.html | 视频 | ✅ 已上线 |
| 21 | 万能计算器 | calculator.html | 工具 | ✅ 已上线 |
| 22 | 亲戚称谓计算 | relative-calculator.html | 工具 | ✅ 已上线 |
| 23 | 世界时钟 | world-clock.html | 工具 | ✅ 已上线 |
| 24 | 批量文件重命名 | file-renamer.html | 文件 | ✅ 已上线 |
| 25 | 简繁转换 | chinese-converter.html | 文本 | ✅ 已上线 |
| 26 | LED 弹幕 | handheld-danmaku.html | 工具 | ✅ 已上线 |
| 27 | 页面自动刷新 | page-refresher.html | 工具 | ✅ 已上线 |
| 28 | Claude 历史查看器 | claude-history-viewer.html | 开发者 | ✅ 已上线 |
| 29 | 密码生成器 | password-generator.html | 安全 | ✅ 已上线 |
| 30 | QR 码生成器 | qr-code-generator.html | 工具 | ✅ 已上线 |
| 31 | 字数统计工具 | word-counter.html | 文本 | ✅ 已上线 |
| 32 | Base64 编解码 | base64-tool.html | 开发者 | ✅ 已上线 |
| 33 | URL 编解码 | url-encoder.html | 开发者 | ✅ 已上线 |
| 34 | Lorem Ipsum 生成器 | lorem-ipsum.html | 文本 | ✅ 已上线 |
| 35 | PDF 合并 | pdf-merge.html | PDF | ✅ 已上线 |
| 36 | PDF 拆分 | pdf-split.html | PDF | ✅ 已上线 |
| 37 | PDF 压缩 | pdf-compress.html | PDF | ✅ 已上线 |
| 38 | PDF 转图片 | pdf-to-image.html | PDF | ✅ 已上线 |

---

## 新工具开发计划

### 开发流程（每个工具）

1. 创建 HTML 文件（单文件组件模式，复杂工具建文件夹）
2. 完善 SEO（title, description, canonical, OG, Twitter Card, JSON-LD）
3. 截图 → 转 webp → 放入 screenshots/
4. 更新 index.html（工具卡片 + JSON-LD hasPart）
5. 更新 sitemap.xml

---

### Phase 1 — 流量炸弹（极低难度，极高搜索量）

> 预计每个工具 30-60 分钟，优先级最高

| # | 工具名称 | 文件名 | 月搜索量级 | 难度 | 核心技术 | SEO 关键词 |
|---|---------|--------|-----------|------|---------|-----------|
| 29 | 密码生成器 | password-generator.html | 百万级 | ⭐ | 纯 JS crypto | password generator, random password, 密码生成 |
| 30 | QR 码生成器 | qr-code-generator.html | 百万级 | ⭐ | qrcode.js | QR code generator, 二维码生成, create QR code |
| 31 | 字数统计工具 | word-counter.html | 十万级 | ⭐ | 纯 JS | word counter, character count, 字数统计 |
| 32 | Base64 编解码 | base64-tool.html | 十万级 | ⭐ | 原生 btoa/atob | Base64 encode decode, Base64 转换 |
| 33 | URL 编解码 | url-encoder.html | 十万级 | ⭐ | 原生 API | URL encode decode, URL 编码解码 |
| 34 | Lorem Ipsum 生成器 | lorem-ipsum.html | 十万级 | ⭐ | 纯 JS | lorem ipsum generator, placeholder text |

### Phase 2 — PDF 工具矩阵（最大流量赛道）

> ilovepdf.com 月访问 2.21 亿，PDF 是在线工具最大的流量池

| # | 工具名称 | 文件名 | 月搜索量级 | 难度 | 核心技术 | SEO 关键词 |
|---|---------|--------|-----------|------|---------|-----------|
| 35 | PDF 合并 | pdf-merge.html | 千万级 | ⭐⭐ | pdf-lib.js | merge PDF, combine PDF, PDF 合并 |
| 36 | PDF 拆分 | pdf-split.html | 百万级 | ⭐⭐ | pdf-lib.js | split PDF, separate PDF pages, PDF 拆分 |
| 37 | PDF 压缩 | pdf-compress.html | 百万级 | ⭐⭐ | pdf-lib.js + canvas | compress PDF, reduce PDF size, PDF 压缩 |
| 38 | PDF 转图片 | pdf-to-image.html | 百万级 | ⭐⭐ | pdf.js + canvas | PDF to JPG, PDF to PNG, PDF 转图片 |

### Phase 3 — 开发者高频工具

> 开发者社区 (Reddit r/webdev, HN) 讨论热度高，回访率高

| # | 工具名称 | 文件名 | 月搜索量级 | 难度 | 核心技术 | SEO 关键词 |
|---|---------|--------|-----------|------|---------|-----------|
| 39 | Markdown 编辑器 | markdown-editor.html | 十万级 | ⭐⭐ | marked.js + highlight.js | markdown editor online, markdown preview |
| 40 | 文本对比 (Diff) | text-diff.html | 十万级 | ⭐⭐ | diff-match-patch | text diff, compare text, 文本对比 |
| 41 | CSV ↔ JSON 转换 | csv-json.html | 十万级 | ⭐⭐ | PapaParse.js | CSV to JSON, JSON to CSV, 数据转换 |
| 42 | Cron 表达式生成器 | cron-generator.html | 万级 | ⭐⭐ | cronstrue.js | cron expression generator, cron 表达式 |

### Phase 4 — AI 时代热门工具

> 2025-2026 趋势品类，Reddit 讨论热度爆表

| # | 工具名称 | 文件名 | 月搜索量级 | 难度 | 核心技术 | SEO 关键词 |
|---|---------|--------|-----------|------|---------|-----------|
| 43 | 图片文字识别 (OCR) | ocr-tool.html | 百万级 | ⭐⭐ | Tesseract.js | image to text, OCR online, 图片转文字 |
| 44 | 图片去背景 | bg-remover.html | 十万级 | ⭐⭐⭐ | ONNX.js + U2Net | remove background, 去背景, 抠图 |
| 45 | 屏幕录制器 | screen-recorder.html | 十万级 | ⭐⭐ | MediaRecorder API | screen recorder online, 在线录屏 |

### Phase 5 — 生活/效率工具

> 搜索量稳定，用户粘性高

| # | 工具名称 | 文件名 | 月搜索量级 | 难度 | 核心技术 | SEO 关键词 |
|---|---------|--------|-----------|------|---------|-----------|
| 46 | 番茄钟 | pomodoro.html | 十万级 | ⭐ | 纯 JS + Notification API | pomodoro timer, 番茄钟, focus timer |
| 47 | 单位换算器 | unit-converter.html | 十万级 | ⭐ | 纯 JS | unit converter, 单位换算, 温度转换 |
| 48 | 发票生成器 | invoice-generator.html | 十万级 | ⭐⭐⭐ | jsPDF | invoice generator, 发票生成, free invoice |

---

## 开发优先级排序（推荐执行顺序）

```
Phase 1（6 个工具）→ Phase 2（4 个工具）→ Phase 3（4 个工具）→ Phase 4（3 个工具）→ Phase 5（3 个工具）
```

### 为什么这个顺序？

1. **Phase 1** — 难度最低，30 分钟/个，快速铺量抢占长尾关键词
2. **Phase 2** — PDF 是在线工具最大流量赛道，ROI 最高
3. **Phase 3** — 开发者工具回访率高，适合在 Reddit/HN 推广引流
4. **Phase 4** — AI 相关工具话题性强，适合社交媒体传播
5. **Phase 5** — 稳定长尾流量，补全工具矩阵

---

## SEO 推广策略

### Reddit 推广渠道

| Subreddit | 适合推广的工具 | 用户量 |
|-----------|--------------|--------|
| r/webdev | Markdown、Diff、CSV/JSON、Cron | 2M+ |
| r/SideProject | 全部新工具 | 622K |
| r/InternetIsBeautiful | 全部新工具 | 17M+ |
| r/freesoftware | PDF 工具、OCR、去背景 | 100K+ |
| r/productivity | 番茄钟、单位换算 | 1.5M+ |
| r/graphic_design | 去背景、调色板 | 800K+ |

### SEO 关键词策略

- 每个工具页面重点优化 **英文关键词**（全球搜索量大）
- 页面内容中英双语，覆盖中文搜索流量
- JSON-LD 结构化数据确保 Google Rich Snippet
- 每个工具独立 canonical URL + sitemap 条目

---

## 文件组织规则

| 场景 | 结构 | URL |
|------|------|-----|
| 简单工具（纯 HTML/CSS/JS，库走 CDN） | `xxx.html` | `/web-toolbox/xxx.html` |
| 多文件工具（独立 JS/CSS 模块、本地资源） | `xxx/index.html` | `/web-toolbox/xxx/` |

**判断标准：** 代码量大需要拆分 JS/CSS 模块、需要 Web Worker、需要本地资源文件 → 建目录；否则单文件。

```
web-toolbox/
├── password-generator.html       # 单文件工具
├── pdf-merge/                    # 多文件工具
│   ├── index.html
│   ├── style.css
│   └── app.js
├── ocr-tool/                     # 多文件工具（需要加载模型）
│   ├── index.html
│   ├── style.css
│   └── app.js
└── ...
```

---

## 进度追踪

### Phase 1 进度
- [x] 密码生成器 (password-generator.html) ✅ 2026-02-13
- [x] QR 码生成器 (qr-code-generator.html) ✅ 2026-02-13
- [x] 字数统计工具 (word-counter.html) ✅ 2026-02-13
- [x] Base64 编解码 (base64-tool.html) ✅ 2026-02-13
- [x] URL 编解码 (url-encoder.html) ✅ 2026-02-13
- [x] Lorem Ipsum 生成器 (lorem-ipsum.html) ✅ 2026-02-13

### Phase 2 进度
- [x] PDF 合并 (pdf-merge.html) ✅ 2026-02-13
- [x] PDF 拆分 (pdf-split.html) ✅ 2026-02-13
- [x] PDF 压缩 (pdf-compress.html) ✅ 2026-02-13
- [x] PDF 转图片 (pdf-to-image.html) ✅ 2026-02-13

### Phase 3 进度
- [ ] Markdown 编辑器 (markdown-editor.html)
- [ ] 文本对比 Diff (text-diff.html)
- [ ] CSV ↔ JSON 转换 (csv-json.html)
- [ ] Cron 表达式生成器 (cron-generator.html)

### Phase 4 进度
- [ ] 图片文字识别 OCR (ocr-tool.html)
- [ ] 图片去背景 (bg-remover.html)
- [ ] 屏幕录制器 (screen-recorder.html)

### Phase 5 进度
- [ ] 番茄钟 (pomodoro.html)
- [ ] 单位换算器 (unit-converter.html)
- [ ] 发票生成器 (invoice-generator.html)
