+++
title = 'curl 命令完全指南：HTTP 请求与 API 调试必备工具'
date = '2020-06-29'
draft = false
description = 'curl 命令完整使用教程，涵盖 GET/POST/PUT/DELETE 请求、JSON 数据发送、文件上传下载、认证鉴权、代理设置、HTTPS 证书处理等实战技巧。运维开发调试 API 必备工具，附常用命令速查表。'
tags = ['curl', 'linux', 'HTTP', 'API', '运维', '命令行']
categories = ['Linux']
keywords = ['curl 命令', 'curl 教程', 'HTTP 请求', 'API 调试', 'REST API 测试']
+++

**curl** 是 Linux/macOS 下最强大的[命令行](/posts/linux/2020-03-19-linux-mac-commands/)数据传输工具，支持 HTTP、HTTPS、FTP 等 20+ 种协议。无论是调试 API、下载文件还是测试网络连接，curl 都是运维开发的必备神器。本文将系统介绍 curl 的常用技巧，帮你快速掌握这个强大的工具。

<!--more-->

## 为什么要学 curl？

| 场景 | curl 的优势 |
|------|-------------|
| API 调试 | 快速发送各种 HTTP 请求，无需安装额外工具 |
| 自动化脚本 | 轻松集成到 Shell 脚本中 |
| 网络诊断 | 查看详细的请求/响应信息 |
| 文件传输 | 支持断点续传、限速下载 |
| 跨平台 | Linux、macOS、Windows 通用 |

> 掌握 curl，你就掌握了一个万能的网络瑞士军刀。

## 一、基础用法

### 1. 发送 GET 请求

最简单的用法，直接跟 URL：

```bash
# 获取网页内容
curl https://httpbin.org/get

# 将响应保存到文件
curl -o response.json https://httpbin.org/get

# 使用远程文件名保存
curl -O https://example.com/file.zip
```

### 2. 显示详细信息

调试时最有用的选项：

```bash
# -v 显示详细的请求/响应过程
curl -v https://httpbin.org/get

# -i 显示响应头
curl -i https://httpbin.org/get

# -I 只获取响应头（HEAD 请求）
curl -I https://httpbin.org/get

# 静默模式，只显示结果
curl -s https://httpbin.org/get
```

**-v 输出解读**：
- `>` 开头：发送的请求
- `<` 开头：收到的响应
- `*` 开头：curl 的处理信息

### 3. 跟随重定向

很多 URL 会返回 301/302 重定向，使用 `-L` 自动跟随：

```bash
# 自动跟随重定向
curl -L https://github.com

# 限制最大重定向次数
curl -L --max-redirs 5 https://example.com
```

## 二、HTTP 请求方法

### 1. POST 请求

```bash
# 发送表单数据（application/x-www-form-urlencoded）
curl -X POST -d "name=john&email=john@example.com" https://httpbin.org/post

# 发送 JSON 数据
curl -X POST \
  -H "Content-Type: application/json" \
  -d '{"name":"john","email":"john@example.com"}' \
  https://httpbin.org/post

# 从文件读取 JSON 数据
curl -X POST \
  -H "Content-Type: application/json" \
  -d @data.json \
  https://httpbin.org/post
```

### 2. PUT 请求

```bash
# 更新资源
curl -X PUT \
  -H "Content-Type: application/json" \
  -d '{"id":1,"name":"john","status":"active"}' \
  https://httpbin.org/put
```

### 3. DELETE 请求

```bash
# 删除资源
curl -X DELETE https://httpbin.org/delete

# 带认证的删除
curl -X DELETE \
  -H "Authorization: Bearer your_token" \
  https://api.example.com/users/123
```

### 4. PATCH 请求

```bash
# 部分更新
curl -X PATCH \
  -H "Content-Type: application/json" \
  -d '{"status":"inactive"}' \
  https://httpbin.org/patch
```

## 三、请求头与认证

### 1. 自定义请求头

```bash
# 添加单个请求头
curl -H "Authorization: Bearer token123" https://api.example.com

# 添加多个请求头
curl -H "Content-Type: application/json" \
     -H "Accept: application/json" \
     -H "X-Custom-Header: value" \
     https://api.example.com

# 设置 User-Agent
curl -A "Mozilla/5.0 (Macintosh)" https://example.com

# 设置 Referer
curl -e "https://google.com" https://example.com
```

### 2. 基本认证

```bash
# 用户名密码认证
curl -u username:password https://api.example.com

# 交互式输入密码（更安全）
curl -u username https://api.example.com
```

### 3. Bearer Token 认证

```bash
curl -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." \
  https://api.example.com/users
```

### 4. Cookie 处理

```bash
# 发送 Cookie
curl -b "session_id=abc123" https://example.com

# 从文件读取 Cookie
curl -b cookies.txt https://example.com

# 保存响应的 Cookie
curl -c cookies.txt https://example.com

# 读取并保存 Cookie（模拟浏览器会话）
curl -b cookies.txt -c cookies.txt https://example.com
```

## 四、文件上传与下载

### 1. 文件下载

```bash
# 下载文件并重命名
curl -o myfile.zip https://example.com/file.zip

# 使用远程文件名
curl -O https://example.com/file.zip

# 断点续传
curl -C - -O https://example.com/largefile.zip

# 限速下载（100KB/s）
curl --limit-rate 100k -O https://example.com/file.zip

# 显示下载进度条
curl -# -O https://example.com/file.zip
```

### 2. 文件上传

```bash
# 上传单个文件（multipart/form-data）
curl -F "file=@/path/to/file.jpg" https://httpbin.org/post

# 上传多个文件
curl -F "file1=@file1.jpg" -F "file2=@file2.jpg" https://httpbin.org/post

# 上传文件并指定 MIME 类型
curl -F "file=@photo.jpg;type=image/jpeg" https://httpbin.org/post

# 上传文件同时带其他表单字段
curl -F "file=@document.pdf" -F "description=My Document" https://httpbin.org/post
```

## 五、HTTPS 与证书

### 1. 忽略证书验证

```bash
# 跳过 SSL 证书验证（测试环境使用）
curl -k https://self-signed.example.com

# 等同于
curl --insecure https://self-signed.example.com
```

### 2. 指定证书

```bash
# 指定 CA 证书
curl --cacert /path/to/ca.crt https://example.com

# 使用客户端证书
curl --cert /path/to/client.crt --key /path/to/client.key https://example.com
```

### 3. 指定 TLS 版本

```bash
# 强制使用 TLS 1.2
curl --tlsv1.2 https://example.com

# 强制使用 TLS 1.3
curl --tlsv1.3 https://example.com
```

## 六、代理设置

### 1. HTTP 代理

```bash
# 使用 HTTP 代理
curl -x http://proxy.example.com:8080 https://target.com

# 带认证的代理
curl -x http://user:pass@proxy.example.com:8080 https://target.com

# 通过环境变量设置（永久生效）
export http_proxy=http://proxy.example.com:8080
export https_proxy=http://proxy.example.com:8080
curl https://target.com
```

### 2. SOCKS 代理

```bash
# SOCKS5 代理
curl --socks5 127.0.0.1:1080 https://example.com

# SOCKS5 代理（DNS 也通过代理解析）
curl --socks5-hostname 127.0.0.1:1080 https://example.com
```

## 七、超时与重试

```bash
# 连接超时（秒）
curl --connect-timeout 10 https://example.com

# 总超时时间（秒）
curl -m 30 https://example.com
curl --max-time 30 https://example.com

# 自动重试
curl --retry 3 https://example.com

# 重试间隔
curl --retry 3 --retry-delay 5 https://example.com
```

## 八、指定 IP 访问

调试 CDN 或负载均衡时非常有用：

```bash
# HTTP：通过代理方式指定 IP
curl -x 192.168.1.100:80 "http://example.com/api"

# HTTPS：通过 Host 头指定域名
curl -H "Host: example.com" "https://192.168.1.100/api" -k

# 使用 --resolve 解析域名到指定 IP（推荐）
curl --resolve example.com:443:192.168.1.100 https://example.com/api

# 将输出丢弃，只看请求过程
curl -vo /dev/null --resolve example.com:443:192.168.1.100 https://example.com
```

## 九、实用技巧

### 1. 格式化 JSON 输出

```bash
# 配合 jq 格式化
curl -s https://httpbin.org/get | jq .

# 只提取特定字段
curl -s https://httpbin.org/get | jq '.headers'
```

### 2. 测量请求时间

```bash
# 显示各阶段耗时
curl -w "\n--- 耗时统计 ---\n\
DNS解析: %{time_namelookup}s\n\
TCP连接: %{time_connect}s\n\
SSL握手: %{time_appconnect}s\n\
首字节: %{time_starttransfer}s\n\
总耗时: %{time_total}s\n" \
  -o /dev/null -s https://example.com
```

### 3. 模拟浏览器请求

```bash
curl -A "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36" \
     -H "Accept: text/html,application/xhtml+xml" \
     -H "Accept-Language: zh-CN,zh;q=0.9,en;q=0.8" \
     -e "https://google.com" \
     https://example.com
```

### 4. 发送压缩请求

```bash
# 请求压缩响应
curl --compressed https://example.com
```

## 十、常用选项速查表

| 选项 | 说明 | 示例 |
|------|------|------|
| `-X` | 指定请求方法 | `-X POST` |
| `-d` | 发送 POST 数据 | `-d '{"key":"value"}'` |
| `-H` | 添加请求头 | `-H "Content-Type: application/json"` |
| `-o` | 输出到文件 | `-o file.txt` |
| `-O` | 使用远程文件名保存 | `-O` |
| `-L` | 跟随重定向 | `-L` |
| `-v` | 显示详细信息 | `-v` |
| `-s` | 静默模式 | `-s` |
| `-i` | 显示响应头 | `-i` |
| `-I` | 只获取响应头 | `-I` |
| `-k` | 忽略 SSL 证书 | `-k` |
| `-u` | 基本认证 | `-u user:pass` |
| `-b` | 发送 Cookie | `-b "name=value"` |
| `-c` | 保存 Cookie | `-c cookies.txt` |
| `-F` | 上传文件 | `-F "file=@path"` |
| `-x` | 使用代理 | `-x proxy:port` |
| `-m` | 超时时间 | `-m 30` |
| `-A` | User-Agent | `-A "Mozilla/5.0"` |
| `-e` | Referer | `-e "https://ref.com"` |

## 总结

curl 是一个功能强大的命令行工具，掌握它能大幅提升你的工作效率。本文介绍了最常用的场景：

1. **基础请求**：GET/POST/PUT/DELETE
2. **认证方式**：Basic、Bearer Token、Cookie
3. **文件传输**：上传、下载、断点续传
4. **HTTPS 处理**：证书验证、TLS 版本
5. **调试技巧**：指定 IP、测量耗时、格式化输出

建议把常用命令保存为 Shell 函数或别名，更多 curl 高级用法可参考[官方文档](https://curl.se/docs/)。

## 相关阅读

- [Linux/macOS 常用命令速查手册](/posts/linux/2020-03-19-linux-mac-commands/) - 更多实用命令
- [Traceroute 网络诊断命令详解](/posts/linux/2020-06-28-traceroute/) - 网络故障排查
- [Oh My Zsh 安装配置指南](/posts/linux/2015-06-17-shell-zsh/) - 打造高效终端环境

## 参考资源

- [curl 官方文档](https://curl.se/docs/)
- [curl Man Page](https://curl.se/docs/manpage.html)
- [Test a REST API with curl - Baeldung](https://www.baeldung.com/curl-rest)
- [httpbin.org](https://httpbin.org/) - HTTP 请求测试服务
