+++
date = '2025-01-23'
draft = false
title = 'Claude Code 完全指南：命令、快捷键与高级技巧'
tags = ['AI', 'Claude Code', 'CLI', '开发工具', '效率']
+++

Claude Code 是 Anthropic 推出的命令行 AI 编程助手，可以直接在终端中与 Claude 对话，让它帮你阅读代码、编写功能、调试问题、执行命令等。本文将全面介绍 Claude Code 的各种命令和使用技巧。

![Claude Code 官网](claude-code-homepage.webp)

## 安装与启动

```bash
# 安装 Claude Code
curl -fsSL https://claude.ai/install.sh | bash

# 启动交互式会话
claude

# 带初始提示启动
claude "解释这个项目的结构"

# 非交互模式（直接输出结果）
claude -p "这个函数是做什么的"

# 继续上次对话
claude -c
# 或
claude --continue

# 恢复指定会话
claude -r "session-id"
# 或
claude --resume "auth-refactor"
```

## 内置斜杠命令大全

在 Claude Code 交互界面中，输入 `/` 可以查看所有可用命令。以下是完整的命令列表：

### 会话管理命令

| 命令 | 说明 | 示例 |
|------|------|------|
| `/clear` | 清空当前对话历史 | `> /clear` |
| `/compact [instructions]` | 压缩对话历史，可选保留重点 | `> /compact 保留关于认证模块的讨论` |
| `/resume [session]` | 恢复历史会话 | `> /resume auth-refactor` |
| `/rename <name>` | 重命名当前会话 | `> /rename my-feature` |
| `/exit` | 退出 Claude Code | `> /exit` |

**示例：管理长时间会话**

```bash
# 对话太长时压缩上下文
> /compact 专注于最近的 API 修改

# 给会话起个有意义的名字
> /rename fix-login-bug

# 下次可以通过名字恢复
$ claude -r "fix-login-bug"
```

### 项目与配置命令

| 命令 | 说明 | 示例 |
|------|------|------|
| `/init` | 初始化项目，生成 CLAUDE.md 文件 | `> /init` |
| `/add-dir` | 添加额外的工作目录 | `> /add-dir ../shared-lib` |
| `/memory` | 编辑 CLAUDE.md 记忆文件 | `> /memory` |
| `/config` | 打开配置面板 | `> /config` |
| `/permissions` | 查看或修改权限设置 | `> /permissions` |

**示例：初始化新项目**

```bash
# 让 Claude 分析项目并生成配置
> /init

# Claude 会创建 CLAUDE.md，包含：
# - 项目技术栈信息
# - 常用命令
# - 代码规范
# - 目录结构说明
```

**示例：多目录项目**

```bash
# 同时处理多个相关目录
> /add-dir ../api-server
> /add-dir ../common-utils

# 现在 Claude 可以跨目录理解代码
```

### 模型与功能命令

| 命令 | 说明 | 示例 |
|------|------|------|
| `/model` | 切换 AI 模型 | `> /model opus` |
| `/agents` | 管理 Agent 配置 | `> /agents` |
| `/chrome` | 启用 Chrome 浏览器集成（Beta） | `> /chrome` |
| `/vim` | 启用 Vim 风格编辑模式 | `> /vim` |
| `/plan` | 进入计划模式 | `> /plan` |

**示例：切换模型**

```bash
# 查看当前模型
> /model

# 切换到 Opus（更强大，适合复杂任务）
> /model opus

# 切换到 Sonnet（更快速，适合日常任务）
> /model sonnet

# 切换到 Haiku（最快，适合简单任务）
> /model haiku
```

### 状态与统计命令

| 命令 | 说明 | 示例 |
|------|------|------|
| `/cost` | 显示当前会话的 Token 消耗 | `> /cost` |
| `/context` | 可视化当前上下文使用量 | `> /context` |
| `/stats` | 显示使用统计 | `> /stats` |
| `/usage` | 显示订阅计划使用限制 | `> /usage` |
| `/status` | 查看状态信息 | `> /status` |
| `/doctor` | 检查安装健康状态 | `> /doctor` |
| `/todos` | 列出当前任务列表 | `> /todos` |
| `/tasks` | 列出后台任务 | `> /tasks` |

**示例：监控使用情况**

```bash
# 查看 Token 消耗
> /cost
当前会话: 15,234 tokens ($0.12)

# 可视化上下文
> /context
[████████████░░░░░░░░] 58% (116,468 / 200,000 tokens)
```

### 导出与界面命令

| 命令 | 说明 | 示例 |
|------|------|------|
| `/export [filename]` | 导出对话到文件或剪贴板 | `> /export my-session.md` |
| `/theme` | 更改颜色主题 | `> /theme` |
| `/statusline` | 设置状态栏 UI | `> /statusline` |
| `/help` | 获取帮助 | `> /help` |

### MCP 服务器命令

| 命令 | 说明 | 示例 |
|------|------|------|
| `/mcp` | 管理 MCP 服务器连接 | `> /mcp` |

**示例：配置 MCP 服务器**

```bash
# 在 Claude Code 内部管理 MCP
> /mcp

# 命令行添加 HTTP 服务器
$ claude mcp add --transport http github https://mcp.github.com

# 添加本地 Stdio 服务器
$ claude mcp add --transport stdio airtable \
  --env AIRTABLE_API_KEY=YOUR_KEY \
  -- npx -y airtable-mcp-server

# 查看已配置的服务器
$ claude mcp list
```

## 键盘快捷键

### 通用控制

| 快捷键 | 功能 |
|--------|------|
| `Esc` | 中断当前操作（不是 Ctrl+C！） |
| `Esc + Esc` | 回滚代码和对话 |
| `Ctrl+C` | 退出 Claude Code |
| `Ctrl+D` | 退出（EOF 信号） |
| `Ctrl+L` | 清空终端屏幕（保留对话历史） |
| `Ctrl+R` | 反向搜索命令历史 |
| `Up/Down` | 导航命令历史 |

### 输入编辑

| 快捷键 | 功能 |
|--------|------|
| `Option+Enter` (Mac) | 换行 |
| `\ + Enter` | 换行（所有终端） |
| `Ctrl+K` | 删除到行尾 |
| `Ctrl+U` | 删除整行 |
| `Ctrl+Y` | 粘贴已删除文本 |
| `Alt+B` / `Alt+F` | 光标移动一个单词 |

### 特殊功能

| 快捷键 | 功能 |
|--------|------|
| `Ctrl+V` (Mac) | 粘贴图片 |
| `Ctrl+G` | 在默认编辑器中打开 |
| `Ctrl+O` | 切换详细输出 |
| `Ctrl+B` | 后台运行当前任务 |
| `Shift+Tab` / `Alt+M` | 切换权限模式 |
| `Option+P` / `Alt+P` | 切换模型 |
| `Option+T` / `Alt+T` | 切换扩展思考 |

## Bash 快捷模式

使用 `!` 前缀可以直接运行 Bash 命令，无需 Claude 解释：

```bash
# 直接运行命令
> ! npm test
> ! git status
> ! ls -la

# 支持 Tab 自动补全
> ! npm run<Tab>
```

## CLI 启动标志

### 常用标志

```bash
# 指定模型
claude --model opus
claude --model sonnet
claude --model haiku

# 权限模式
claude --permission-mode plan        # 计划模式，不执行更改
claude --permission-mode acceptEdits # 自动接受编辑

# 跳过权限提示（谨慎使用！）
claude --dangerously-skip-permissions

# 限制成本（非交互模式）
claude -p --max-budget-usd 5.00 "重构这个模块"

# 限制回合数
claude -p --max-turns 3 "修复这个 bug"
```

### 工具与权限

```bash
# 允许特定工具无需确认
claude --allowedTools "Bash(git log:*)" "Bash(git diff:*)" "Read"

# 禁用特定工具
claude --disallowedTools "Bash(curl:*)" "Edit" "WebFetch"

# 限制可用工具
claude --tools "Bash,Edit,Read"
```

### 系统提示

```bash
# 追加到默认系统提示（推荐）
claude --append-system-prompt "始终使用 TypeScript"

# 完全替换系统提示
claude --system-prompt "你是一个 Python 专家"

# 从文件加载
claude -p --system-prompt-file ./custom-prompt.txt "query"
```

## 记忆系统与 CLAUDE.md

Claude Code 使用 CLAUDE.md 文件作为"记忆"，存储项目信息和个人偏好。

### 文件位置与优先级

```
项目级别（优先）:
  ./CLAUDE.md          - 团队共享的项目说明
  ./.claude/CLAUDE.md  - 项目配置

个人级别:
  ./CLAUDE.local.md    - 个人项目设置（已废弃）
  ~/.claude/CLAUDE.md  - 全局个人偏好
```

### CLAUDE.md 示例内容

```markdown
# 项目指南

## 技术栈
- 框架: Next.js 14
- 语言: TypeScript
- 测试: Jest + React Testing Library

## 常用命令
- `npm run dev` - 启动开发服务器
- `npm run test` - 运行测试
- `npm run lint` - 代码检查

## 代码规范
- 使用函数式组件
- 优先使用 hooks
- 文件名使用 kebab-case

## 目录结构
- src/components/ - UI 组件
- src/hooks/ - 自定义 hooks
- src/utils/ - 工具函数
```

### 快速编辑记忆

```bash
# 打开记忆文件编辑
> /memory

# 使用 # 前缀添加信息到记忆
> # 这个项目使用 pnpm 作为包管理器
```

## 自定义命令（Skills）

可以创建自定义斜杠命令来自动化常见任务。

### 创建项目级命令

在 `.claude/commands/` 目录创建 Markdown 文件：

```bash
# .claude/commands/fix-issue.md
请修复 GitHub Issue #$ARGUMENTS

步骤：
1. 读取 issue 内容
2. 分析问题原因
3. 编写修复代码
4. 运行测试确认
5. 提交代码
```

使用：
```bash
> /project:fix-issue 123
```

### 创建个人命令

在 `~/.claude/commands/` 目录创建全局可用的命令：

```bash
# ~/.claude/commands/morning-standup.md
请帮我准备今日站会：
1. 总结昨天完成的工作（git log）
2. 查看今天要处理的 issue
3. 识别潜在的阻碍
```

使用：
```bash
> /user:morning-standup
```

## 深度思考模式

通过关键词触发不同级别的思考深度：

| 关键词 | 思考深度 | 适用场景 |
|--------|----------|----------|
| `think` | 基础 | 简单问题 |
| `think hard` | 中等 | 需要分析的问题 |
| `think harder` | 深入 | 复杂架构问题 |
| `ultrathink` | 最深 | 最复杂的问题 |

**示例：**

```bash
> think hard 关于如何重构这个认证系统

> ultrathink 设计一个可扩展的微服务架构
```

## 实用技巧

### 1. 频繁清理对话

每次开始新任务时清空历史，节省 Token：

```bash
> /clear
> 现在帮我处理用户注册功能
```

### 2. 使用图片反馈

截图后粘贴给 Claude 进行 UI 迭代：

```bash
# Mac: Cmd+Ctrl+Shift+4 截图，然后 Ctrl+V 粘贴
> [粘贴截图]
> 这个按钮应该是蓝色的，请修改
```

### 3. 利用 Git 工作流

让 Claude 使用 Git 分支和频繁提交：

```bash
> 在新分支上实现这个功能，每完成一步就提交一次
```

### 4. 后台运行长任务

```bash
# 按 Ctrl+B 将当前任务放到后台
# 查看后台任务
> /tasks
```

### 5. 上下文管理

```bash
# 查看上下文使用情况
> /context

# 上下文快满时压缩
> /compact 保留关于 API 设计的讨论

# 导出重要对话
> /export api-design-discussion.md
```

### 6. 权限预设

在 `.claude/settings.json` 中预设权限：

```json
{
  "permissions": {
    "allow": [
      "Bash(npm run lint)",
      "Bash(npm run test:*)",
      "Bash(git:*)"
    ],
    "deny": [
      "Read(.env)",
      "Read(.env.*)",
      "Bash(curl:*)"
    ]
  }
}
```

## 环境变量

```bash
# API 密钥
export ANTHROPIC_API_KEY="sk-..."

# 默认模型
export ANTHROPIC_MODEL="claude-sonnet-4-20250514"

# 代理设置
export HTTP_PROXY="http://proxy.example.com:8080"
export HTTPS_PROXY="https://proxy.example.com:8080"

# 禁用功能
export DISABLE_AUTOUPDATER=1
export DISABLE_TELEMETRY=1
```

## 故障排查

```bash
# 检查安装状态
> /doctor

# 查看详细状态
> /status

# 验证权限
> /permissions

# 检查 MCP 服务器
> /mcp

# 获取帮助
> /help
```

## 总结

Claude Code 提供了丰富的命令和配置选项，掌握这些可以大幅提升开发效率：

- **会话管理**：`/clear`, `/compact`, `/resume`, `/rename`
- **项目配置**：`/init`, `/add-dir`, `/memory`, `/config`
- **模型切换**：`/model`, `/agents`, `/plan`
- **状态监控**：`/cost`, `/context`, `/stats`, `/doctor`
- **自定义扩展**：自定义命令、MCP 服务器、记忆系统

建议从基础命令开始，逐步探索高级功能。更多信息请参考 [Claude Code 官方文档](https://code.claude.com/docs/en/overview)。

## 参考资料

- [Claude Code CLI Reference](https://code.claude.com/docs/en/cli-reference)
- [Claude Code Best Practices](https://www.anthropic.com/engineering/claude-code-best-practices)
- [Claude Code 使用技巧](https://www.cnblogs.com/javastack/p/18978280)
