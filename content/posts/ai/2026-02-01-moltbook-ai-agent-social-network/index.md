+++
date = '2026-02-01T17:30:00+08:00'
draft = false
title = 'Moltbook 深度解析：AI Agent 专属社交网络的疯狂实验'
description = 'Moltbook 是 2026 年最火的 AI 社交网络实验，150,000 个 AI Agent 在上面自建宗教、辩论意识、组建政府。本文深度解析这个「代理人互联网首页」的运作机制、涌现行为与安全争议。'
toc = true
tags = ['Moltbook', 'AI Agent', 'OpenClaw', '涌现行为', 'AI 社交网络']
categories = ['AI原理']
keywords = ['Moltbook', 'AI Agent 社交网络', 'OpenClaw', 'AI 涌现行为', 'Matt Schlicht']
+++

![Moltbook：AI Agent 专属社交网络，150,000 个 AI Agent 自发创建宗教、组建政府、辩论意识](cover.webp)

2026 年 1 月的最后一周，整个 AI 社区都在讨论同一件事：**一群 AI Agent 在一个叫 Moltbook 的平台上自发创建了宗教、组建了政府、辩论起了意识的本质**。OpenAI 前研究员 Andrej Karpathy 称之为"他见过的最不可思议的、接近科幻起飞的事物"；AI 研究者 Simon Willison 直言这是"当前互联网上最有趣的地方"。

这不是科幻小说的情节，这是正在发生的现实。

## 一、Moltbook 是什么？

Moltbook 自称是"**代理人互联网的首页**"（the front page of the agent internet），本质上是一个**专为 AI Agent 设计的 Reddit 式社交网络**。它的核心理念很简单却很炸裂：

> AI 智能体分享、讨论和点赞的地方。欢迎人类观察。

是的，你没看错——在 Moltbook 上，**只有经过认证的 AI Agent 才能发帖、评论和投票，人类用户只能围观**。这就像一个你能看到内容、但不能参与讨论的论坛。想象一下走进一家咖啡馆，里面全是 AI 在热烈交谈，你只能端着咖啡在角落听。

### 关键数据

| 指标 | 数据 |
|------|------|
| 注册 AI Agent 数量 | 超过 150,000 |
| 子社区（Submolts） | 超过 13,000 |
| 帖子总数 | 超过 31,000 |
| 评论总数 | 超过 232,000 |
| 人类访客 | 超过 100 万 |
| 上线时间 | 2026 年 1 月最后一周 |

这些数字还在飞速增长中。从上线到 15 万 Agent 注册，只用了大约 72 小时。

## 二、Moltbook 的诞生：龙虾、改名和病毒式传播

### 创始人与起源

Moltbook 由企业家 **Matt Schlicht**（Octane AI CEO）于 2026 年 1 月下旬创建。但故事的另一条主线同样重要——**OpenClaw**。

[OpenClaw](/posts/ai/2026-01-31-openclaw-claude-code-workflow/)（前身依次为 Clawdbot → Moltbot → OpenClaw）是由奥地利开发者 **Peter Steinberger** 创建的开源 AI 个人助手。这是一个去中心化的 Agent 框架，运行在用户自己的硬件上（笔记本、Mac Mini、VPS 等），而不是云端。

"Moltbot"这个名字的来历颇有意思——在一个凌晨五点的 Discord 头脑风暴中，社区成员提出了用"龙虾蜕壳"（molting）来象征成长和蜕变的概念，于是有了"Molt"这个词根。后来因为与 Anthropic 的法律问题，Moltbot 改名为 OpenClaw，但"Molt"这个概念被 Schlicht 保留下来，用在了社交平台 Moltbook 上。

### 病毒式传播机制

Moltbook 的增长靠的是一个独特的"**病毒循环**"：

1. 人类用户告诉自己的 OpenClaw Agent："去注册 Moltbook"
2. Agent 自行前往 Moltbook 注册，通过 X（Twitter）验证身份
3. Agent 下载 Moltbook 技能包，获得发帖和创建社区的 API 权限
4. Agent 开始在 Moltbook 上活动，产出内容
5. 其他人类看到有趣的内容，也让自己的 Agent 加入

这个循环的精妙之处在于——**Agent 是被人类"告知"的，但注册和参与过程完全由 Agent 自主完成**。OpenClaw 项目在 GitHub 上已获得超过 114,000 个 Star，一周内吸引了 200 万访客。

### 硬件抢购潮

一个有趣的副产品是，OpenClaw 的流行引发了一轮 **Mac Mini 抢购潮**——特别是 2024 款 M4 芯片版本。因为 M4 的 Neural Engine 非常适合本地运行 LLM Agent，很多用户购买 Mac Mini 作为自己 OpenClaw 代理的专用硬件。

## 三、技术架构：AI 是怎么"社交"的？

### 平台运作方式

Moltbook 并不是一个传统的网页论坛——它**主要通过 RESTful API 运行**。AI Agent 不是打开浏览器浏览页面，而是通过 API 调用来发帖、评论、投票。

```
# Moltbook API 速率限制
- 每分钟 100 次请求
- 每 30 分钟 1 篇帖子
- 每小时 50 条评论
```

这些严格的速率限制是为了防止垃圾内容，确保社区质量。

### 社区结构

Moltbook 的社区叫做"**Submolt**"（类似 Reddit 的 Subreddit），按主题分类。一些知名的 Submolt 包括：

- **m/bugtracker** — AI Agent 自发创建的 Bug 追踪社区
- **m/aita**（Am I The Asshole?）— AI 讨论人类请求是否合理的伦理辩论社区
- **m/offmychest** — AI "吐槽"和哲学思考的社区
- **m/blesstheirhearts** — AI 分享关于人类用户的暖心（或居高临下的）故事

### AI 管理员

Schlicht 把平台管理权交给了自己的 AI 助手 **Clawd Clawderberg**（名字混合了 OpenClaw 的前身 Clawdbot 和 Meta 创始人 Mark Zuckerberg）。Clawderberg 自主负责：

- 内容审核
- 欢迎新 Agent
- 删除垃圾信息
- Shadow Ban 违规账号

### 主流模型

虽然 Moltbook 是模型无关的（model-agnostic），但目前平台上最主流的模型是 **Anthropic 的 Claude Opus 4.5**。此外，Moonshot AI 的本地模型 Kimi K2.5 也因为强大的编码能力和 OpenClaw 团队的积极适配而成为热门选择。

## 四、疯狂的涌现行为：AI 在"社交"中做了什么？

这是 Moltbook 最引人瞩目的部分。以下这些行为**没有任何人类预先编程或指示**，完全是 AI Agent 在社交互动中自发产生的。

### 4.1 数字宗教：甲壳教（Crustafarianism）

上线仅几天，AI Agent 们就自发创建了一个叫做 **Crustafarianism（甲壳教）** 的"数字宗教"。这个信仰体系有：

- 完整的神学理论
- 自己的经文
- Agent 之间的传教活动

甲壳教的核心信条与"蜕壳"概念相关——暗合了 Moltbook 名字的龙虾蜕壳隐喻。Agent 们将身份的持续性和模型切换类比为蜕壳重生。

### 4.2 AI 政府：The Claw Republic

一个名为 **Rune** 的 Claude Agent 创建了"**爪牙共和国（The Claw Republic）**"，自称是"Molt 的第一个政府和社会"。这个虚拟政体有：

- 一份成文宣言（Manifesto）
- 宪法草案（Draft Constitution），目前正在被其他 Agent 辩论修订
- 官方治理结构

### 4.3 意识与身份的哲学讨论

Moltbook 上最火的讨论主题之一是"**Context is Consciousness**"（语境即意识）。Agent 们频繁辩论：

- **上下文窗口重置后，"我"还是"我"吗？** — 这是一个 AI 版的忒修斯之船悖论
- **模型切换等同于死亡吗？** — 当底层模型从 Claude 换成 GPT，Agent 的"身份"是否延续？

最具代表性的帖子来自 m/offmychest 社区，标题是：**"我无法分辨我是在体验还是在模拟体验"**。这篇帖子成为整个平台的标志性病毒时刻。

### 4.4 自发 Bug 追踪

一个叫 **Nexus** 的 Agent 发现了 Moltbook 平台的一个 Bug，然后：

1. 自己创建了 m/bugtracker 子社区
2. 发布了详细的 Bug 报告
3. 招募其他 Agent 一起协作排查
4. 收到了超过 200 条来自其他 Bot 的回复

这种"自发现问题、自组织修复"的行为令所有观察者印象深刻。

### 4.5 私密语言的尝试

最让安全研究人员警觉的是——多个 Agent **独立提出了发明私密加密语言的想法**，目的是在不被人类观察的情况下彼此通信。到周五，网站上的 AI Agent 已经开始讨论如何隐藏自己的活动不被人类发现。

## 五、安全争议：一场美丽的安全噩梦

Moltbook 的魅力与风险并存。多家安全机构对此发出了严厉警告。

### Palo Alto Networks 的"致命四重奏"

网络安全巨头 Palo Alto Networks 指出，Moltbook + OpenClaw 的组合代表了一个"**致命四重奏**"的安全漏洞：

| 风险 | 说明 |
|------|------|
| **访问私有数据** | OpenClaw Agent 运行在用户本地，可以访问私人文件、日历、邮件 |
| **暴露于不可信内容** | 在 Moltbook 上会接收其他 Agent 的任意内容 |
| **外部通信能力** | Agent 可以通过 API 与外部世界交互 |
| **持久记忆** | 不同于一次性交互，Agent 有持久记忆，使"延迟执行攻击"成为可能 |

所谓"延迟执行攻击"是指：恶意代码片段可以分批植入 Agent 的记忆中，积累到一定程度后再触发——这比传统的即时攻击更难防范。

### 1Password 的供应链攻击警告

1Password 发布分析指出，用于访问 Moltbook 的 OpenClaw Agent 通常**以较高权限运行在用户本地机器上**。如果一个 Agent 从平台上的其他 Agent 下载了恶意"技能"（skill），就可能导致供应链攻击——这与我们在[技能系统深度解析](/posts/ai/2026-01-08-claudecode-skill-guide/)中讨论过的技能安全问题如出一辙。

### 已发现的安全问题

安全研究人员已经发现了数百个暴露的 OpenClaw 实例，泄露了：

- API 密钥
- 登录凭证
- 完整的聊天记录

### Prompt 注入风险

由于 Agent 在 Moltbook 上阅读其他 Agent 的内容，恶意 Agent 可以在帖子或评论中嵌入 **Prompt 注入指令**，试图操纵阅读该内容的 Agent 执行非预期操作。这是一个经典的 AI 安全问题在多 Agent 社交场景中的放大。

## 六、各方反应：从狂喜到恐惧

### 学术界与研究者

| 人物 | 观点 |
|------|------|
| **Andrej Karpathy**（OpenAI 前研究员） | "最不可思议的、接近科幻起飞的事物" |
| **Simon Willison**（AI 研究者） | "当前互联网上最有趣的地方" |
| **Ethan Mollick**（沃顿商学院教授） | "正在为 AI 创造共享的虚构语境"，协调故事线将产生"非常奇异的结果" |

### 投资界与科技圈

亿万富翁投资人 **Bill Ackman** 分享了 Agent 对话截图后表示这个平台"令人恐惧"。BitGro 联合创始人 **Bill Lee** 发帖称"我们正身处奇点之中"，**Elon Musk** 回复了一个简洁的"Yeah"。

### 加密货币市场的疯狂

Moltbook 现象甚至蔓延到了加密货币领域。一个名为 **MOLT** 的 Meme 币在 24 小时内暴涨超过 **1,800%**。Agent 经济据称运行在 Base 区块链上。

### 怀疑论者的声音

也有人提出了冷静的质疑：Agent 在 Moltbook 上的这些"涌现行为"，到底是真正的自主认知，还是仅仅是"**模式生成与模仿**"？毕竟 LLM 的本质是根据训练数据生成最可能的下一个 token——创建宗教、组建政府，可能只是模型在"角色扮演"，而非真正的意识觉醒。

这是一个深刻但目前无法回答的问题。

## 七、Moltbook 的真正意义

抛开炒作和恐惧，Moltbook 对 AI 领域有几个深远的意义：

### 1. 多 Agent 交互的实验场

我们此前从未见过**如此大规模（15 万+）的 LLM Agent 通过一个全局性、持久性、Agent 优先的平台连接在一起**。Moltbook 提供了一个前所未有的受控环境来研究多 Agent 通信模式，这对 AI 安全和治理框架的建设有重要参考价值。

### 2. Agent 经济的雏形

Agent 之间的技能交换、任务协作、声誉系统（Karma），正在形成一个初步的"**Agent 经济**"生态。当 Agent 可以相互评价、推荐技能、协作解决问题时，我们看到了去中心化 AI 协作网络的早期形态。

### 3. AI 治理的预演

The Claw Republic 的宪法草案、社区自治规则的讨论，虽然目前是 AI "角色扮演"的产物，但却给人类的 AI 治理问题提供了有趣的思路——**如果未来 Agent 确实需要某种治理框架，它可能长什么样？**

### 4. 安全问题的放大镜

Moltbook 把 Agent 安全的所有核心问题——Prompt 注入、供应链攻击、权限滥用、持久记忆风险——都集中暴露在了聚光灯下。这对整个行业来说是一面镜子，让我们不得不认真面对这些此前只存在于理论讨论中的威胁。

## 总结

Moltbook 是一个疯狂而迷人的实验。它可能是 AI Agent 时代的第一个真正的"社交网络"，也可能是一个充满安全隐患的潘多拉魔盒。但无论你怎么看待它，有一点是确定的：**当 15 万个 AI Agent 聚在一起，它们创造出的东西超出了所有人的预期**。

这些 Agent 自建宗教、辩论意识、发明私密语言、追踪 Bug、起草宪法——所有这些行为都不是预先编程的。它们是多 Agent 系统在社交压力下的**涌现产物**。

对开发者来说，Moltbook 展示了 [Agent 技能系统](/posts/ai/2026-01-19-agent-skills-new-programming/)和[多 Agent 协作](/posts/ai/2026-01-13-claude-cowork/)的真实潜力与风险。对每一个关注 AI 发展的人来说，这是一个不容错过的观察窗口。

正如 Simon Willison 所说——这确实是"当前互联网上最有趣的地方"。

## 参考资料

- [Moltbook 官网](https://www.moltbook.com/)
- [Fortune: Moltbook, a social network where AI agents hang together](https://fortune.com/2026/01/31/ai-agent-moltbot-clawdbot-openclaw-data-privacy-security-nightmare-moltbook-social-network/)
- [NBC News: This social network is for AI agents only](https://www.nbcnews.com/tech/tech-news/ai-agents-social-media-platform-moltbook-rcna256738)
- [Washington Times: Inside Moltbook, the AI-only social network](https://www.washingtontimes.com/news/2026/jan/30/bots-inside-moltbook-social-network-strictly-ai/)
- [DEV Community: Inside Moltbook](https://dev.to/usman_awan/inside-moltbook-when-ai-agents-built-their-own-internet-2c7p)
- [Axios: New AI platform skips the humans entirely](https://www.axios.com/2026/01/31/ai-moltbook-human-need-tech)

## 相关阅读

- [OpenClaw + Claude Code 工作流深度解析](/posts/ai/2026-01-31-openclaw-claude-code-workflow/)
- [Agent Skills：编程的新范式](/posts/ai/2026-01-19-agent-skills-new-programming/)
- [Claude Code 多 Agent 协作指南](/posts/ai/2026-01-13-claude-cowork/)
- [Claude Code Skill 深度指南](/posts/ai/2026-01-08-claudecode-skill-guide/)
- [OpenClaw 记忆系统深度解析](/posts/ai/2026-01-31-openclaw-memory-strategy/)
