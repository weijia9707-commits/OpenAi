+++
date = '2026-01-24'
draft = false
title = '看完就会写：docker-compose.yml 入门教程'
tags = ['Docker', 'Docker Compose', '容器化', '入门教程']
+++

很多人一看到 docker-compose.yml 就头大，一堆冒号、缩进，不知道从何下手。其实它没那么复杂，今天我用最通俗的方式，带你彻底搞懂这个文件。

---

## 一、docker-compose.yml 是什么？

### 用盖房子来理解

想象你要盖一栋房子：

- **Docker 镜像** = 建材（砖头、水泥、钢筋）
- **Docker 容器** = 盖好的房间
- **docker-compose.yml** = **设计图纸**

设计图纸上写着：
- 要盖几个房间
- 每个房间多大
- 房间之间怎么连通
- 水电怎么接

docker-compose.yml 就是告诉 Docker：
- 要启动几个容器
- 每个容器用什么镜像
- 容器之间怎么通信
- 端口和数据怎么映射

### 没有它会怎样？

没有 docker-compose.yml，你要一个个手动启动容器：

```bash
# 先启动数据库
docker run -d --name mysql -e MYSQL_ROOT_PASSWORD=123456 -v mysql_data:/var/lib/mysql mysql:8.0

# 再启动 Redis
docker run -d --name redis redis:7

# 最后启动应用，还要连接上面两个
docker run -d --name app --link mysql --link redis -p 8080:8080 my-app
```

三个容器就要敲三行命令，参数一堆。有了 docker-compose.yml，一个命令搞定：

```bash
docker-compose up -d
```

---

## 二、文件长什么样？

先看一个最简单的例子：

```yaml
version: '3.8'

services:
  web:
    image: nginx
    ports:
      - "80:80"
```

就这么几行，就能启动一个 Nginx 服务器。

再看一个稍微复杂点的：

```yaml
version: '3.8'

services:
  web:
    image: nginx
    ports:
      - "80:80"
    volumes:
      - ./html:/usr/share/nginx/html
    depends_on:
      - api

  api:
    build: ./api
    ports:
      - "3000:3000"
    environment:
      - DB_HOST=db
    depends_on:
      - db

  db:
    image: mysql:8.0
    environment:
      - MYSQL_ROOT_PASSWORD=123456
    volumes:
      - db_data:/var/lib/mysql

volumes:
  db_data:
```

别被吓到，我们一块块拆解。

---

## 三、逐行讲解每个配置

### 1. version（版本号）

```yaml
version: '3.8'
```

**是什么**：告诉 Docker Compose 用哪个版本的语法。

**怎么选**：
- 新项目直接用 `3.8` 或 `3.9`
- 其实新版 Docker Compose 已经可以不写这行了

**类比**：就像 Word 文档有 .doc 和 .docx 格式，version 告诉 Docker 用哪种格式解析。

---

### 2. services（服务列表）

```yaml
services:
  web:
    # web 服务的配置
  api:
    # api 服务的配置
  db:
    # 数据库服务的配置
```

**是什么**：你要运行的所有容器，每个服务就是一个容器。

**类比**：就像一个公司的部门列表——前端组、后端组、数据组，每个组各司其职。

**命名规则**：
- 用小写字母
- 可以用下划线或短横线
- 取个有意义的名字

---

### 3. image（使用的镜像）

```yaml
services:
  web:
    image: nginx:latest
```

**是什么**：这个容器基于什么镜像来创建。

**格式**：`镜像名:标签`
- `nginx` → 使用最新版 nginx
- `nginx:latest` → 同上，明确指定最新版
- `nginx:1.24` → 使用 1.24 版本
- `mysql:8.0` → 使用 MySQL 8.0

**类比**：就像说"我要一台 iPhone 15"还是"iPhone 15 Pro Max"。

**去哪找镜像**：[Docker Hub](https://hub.docker.com/) 上搜索。

---

### 4. build（自己构建镜像）

```yaml
services:
  api:
    build: ./api
```

或者更详细的写法：

```yaml
services:
  api:
    build:
      context: ./api
      dockerfile: Dockerfile.dev
```

**是什么**：不用现成镜像，用你自己的代码构建。

**什么时候用**：
- `image`：用别人做好的镜像（nginx、mysql、redis）
- `build`：用自己写的代码构建镜像

**类比**：
- `image` = 买现成的蛋糕
- `build` = 自己按配方烤蛋糕

---

### 5. ports（端口映射）

```yaml
services:
  web:
    ports:
      - "8080:80"
```

**是什么**：把容器内部的端口"暴露"到你的电脑上。

**格式**：`"宿主机端口:容器端口"`

**举例**：
- `"8080:80"` → 访问你电脑的 8080 端口，实际访问的是容器的 80 端口
- `"3306:3306"` → MySQL 默认端口，内外一致

**类比**：容器是个封闭的房间，ports 就是开的窗户。`8080:80` 意思是"从外面敲 8080 号窗户，里面 80 号窗户会应答"。

**常见写法**：

```yaml
ports:
  - "80:80"          # 最常用
  - "8080:80"        # 外部用 8080 访问
  - "127.0.0.1:3306:3306"  # 只允许本机访问
```

---

### 6. volumes（数据卷/目录挂载）

```yaml
services:
  db:
    volumes:
      - db_data:/var/lib/mysql
      - ./config:/etc/mysql/conf.d

volumes:
  db_data:
```

**是什么**：让容器能读写你电脑上的文件，或者持久化保存数据。

**为什么需要**：容器删了，里面的数据就没了。volumes 让数据保存在容器外面。

**两种写法**：

```yaml
volumes:
  # 方式一：命名卷（Docker 自己管理存储位置）
  - db_data:/var/lib/mysql

  # 方式二：绑定挂载（指定你电脑上的目录）
  - ./html:/usr/share/nginx/html
  - /home/user/config:/app/config
```

**类比**：
- 命名卷 = 把文件存在保险箱，Docker 帮你管
- 绑定挂载 = 把文件放桌上，你自己管

**注意**：用了绑定挂载，你在电脑上改文件，容器里立刻生效（很适合开发）。

---

### 7. environment（环境变量）

```yaml
services:
  db:
    environment:
      - MYSQL_ROOT_PASSWORD=123456
      - MYSQL_DATABASE=myapp
```

或者用键值对格式：

```yaml
services:
  db:
    environment:
      MYSQL_ROOT_PASSWORD: 123456
      MYSQL_DATABASE: myapp
```

**是什么**：传给容器的配置参数。

**类比**：就像告诉新员工"WiFi 密码是 xxx，厕所在三楼"。

**常见用途**：
- 数据库密码
- API 密钥
- 运行模式（开发/生产）

**更安全的做法**：用 `.env` 文件

```yaml
# docker-compose.yml
services:
  db:
    environment:
      - MYSQL_ROOT_PASSWORD=${DB_PASSWORD}
```

```bash
# .env 文件（不要提交到 Git！）
DB_PASSWORD=super_secret_password
```

---

### 8. depends_on（启动顺序）

```yaml
services:
  web:
    depends_on:
      - api
      - db

  api:
    depends_on:
      - db

  db:
    image: mysql:8.0
```

**是什么**：规定容器的启动顺序。

**上面的例子**：
1. 先启动 db
2. 再启动 api
3. 最后启动 web

**注意**：depends_on 只保证启动顺序，不保证服务"准备好了"。比如 MySQL 容器启动了，但数据库可能还没初始化完。

**更严格的写法**（Compose v2.1+）：

```yaml
services:
  api:
    depends_on:
      db:
        condition: service_healthy

  db:
    healthcheck:
      test: ["CMD", "mysqladmin", "ping", "-h", "localhost"]
      interval: 5s
      timeout: 3s
      retries: 10
```

---

### 9. networks（网络）

```yaml
services:
  web:
    networks:
      - frontend

  api:
    networks:
      - frontend
      - backend

  db:
    networks:
      - backend

networks:
  frontend:
  backend:
```

**是什么**：把容器分到不同的"局域网"。

**为什么要分**：
- 安全隔离：web 不能直接访问 db
- 清晰架构：前端、后端、数据库各一个网络

**类比**：公司里，财务部和技术部在不同楼层，想交流要通过特定的人（api）。

**默认情况**：不写 networks，所有服务在同一个网络，可以互相访问。

---

### 10. restart（重启策略）

```yaml
services:
  web:
    restart: always
```

**可选值**：
- `no`：不自动重启（默认）
- `always`：总是重启（除非手动停止）
- `on-failure`：只有出错才重启
- `unless-stopped`：除非手动停止，否则一直重启

**什么时候用 always**：生产环境的关键服务，比如 Web 服务器、数据库。

---

### 11. command（覆盖启动命令）

```yaml
services:
  api:
    image: node:18
    command: npm run dev
```

**是什么**：覆盖镜像默认的启动命令。

**什么时候用**：
- 开发时用 `npm run dev`
- 生产时用 `npm start`

---

### 12. container_name（指定容器名）

```yaml
services:
  db:
    container_name: my_mysql
```

**是什么**：给容器取一个固定的名字。

**不指定会怎样**：Docker 会自动生成，类似 `项目名_db_1`。

**什么时候用**：需要用固定名字访问容器时。

---

## 四、完整实战案例

### 案例：搭建一个博客系统

需求：WordPress + MySQL + phpMyAdmin（数据库管理工具）

```yaml
version: '3.8'

services:
  # WordPress 主程序
  wordpress:
    image: wordpress:latest
    ports:
      - "8080:80"
    environment:
      WORDPRESS_DB_HOST: db
      WORDPRESS_DB_USER: wordpress
      WORDPRESS_DB_PASSWORD: wordpress_password
      WORDPRESS_DB_NAME: wordpress
    volumes:
      - wordpress_data:/var/www/html
    depends_on:
      - db
    restart: always

  # MySQL 数据库
  db:
    image: mysql:8.0
    environment:
      MYSQL_DATABASE: wordpress
      MYSQL_USER: wordpress
      MYSQL_PASSWORD: wordpress_password
      MYSQL_ROOT_PASSWORD: root_password
    volumes:
      - db_data:/var/lib/mysql
    restart: always

  # phpMyAdmin 数据库管理
  phpmyadmin:
    image: phpmyadmin:latest
    ports:
      - "8081:80"
    environment:
      PMA_HOST: db
      PMA_USER: root
      PMA_PASSWORD: root_password
    depends_on:
      - db

# 声明命名卷
volumes:
  wordpress_data:
  db_data:
```

**使用方法**：

```bash
# 启动所有服务
docker-compose up -d

# 访问
# WordPress: http://localhost:8080
# phpMyAdmin: http://localhost:8081

# 查看运行状态
docker-compose ps

# 查看日志
docker-compose logs -f

# 停止所有服务
docker-compose down

# 停止并删除数据
docker-compose down -v
```

---

## 五、常见问题

### Q1：缩进出错怎么办？

YAML 对缩进很敏感，必须用空格，不能用 Tab。

```yaml
# ✅ 正确：2 个空格缩进
services:
  web:
    image: nginx

# ❌ 错误：缩进不一致
services:
  web:
   image: nginx
```

**建议**：用 VS Code，装 YAML 插件，自动检查格式。

### Q2：容器之间怎么互相访问？

直接用服务名作为主机名：

```yaml
services:
  api:
    environment:
      - DB_HOST=db    # 直接用服务名 "db"

  db:
    image: mysql:8.0
```

在 api 容器里，`ping db` 就能通。

### Q3：怎么查看容器日志？

```bash
# 查看所有服务的日志
docker-compose logs

# 实时查看
docker-compose logs -f

# 只看某个服务
docker-compose logs -f web
```

### Q4：修改了配置怎么生效？

```bash
# 重新创建容器
docker-compose up -d

# 只重建某个服务
docker-compose up -d --build api
```

### Q5：文件名必须是 docker-compose.yml 吗？

不是，但这是默认名。用其他名字要指定：

```bash
docker-compose -f my-config.yml up -d
```

---

## 六、常用命令速查表

| 命令 | 作用 |
|------|------|
| `docker-compose up -d` | 后台启动所有服务 |
| `docker-compose down` | 停止并删除容器 |
| `docker-compose down -v` | 停止并删除容器和数据卷 |
| `docker-compose ps` | 查看运行状态 |
| `docker-compose logs -f` | 实时查看日志 |
| `docker-compose restart` | 重启所有服务 |
| `docker-compose exec web bash` | 进入 web 容器 |
| `docker-compose pull` | 拉取最新镜像 |
| `docker-compose build` | 重新构建镜像 |

---

## 七、总结

docker-compose.yml 的核心就这几个：

1. **services** - 定义要跑哪些容器
2. **image/build** - 用现成镜像还是自己构建
3. **ports** - 端口映射，让外部能访问
4. **volumes** - 数据持久化，别让数据丢了
5. **environment** - 传配置参数
6. **depends_on** - 控制启动顺序

记住这个公式：

```
docker-compose.yml = 服务列表 + 每个服务的配置
```

现在打开你的项目，试着写一个 docker-compose.yml 吧！从最简单的 nginx 开始，慢慢加功能，很快就能熟练掌握。
