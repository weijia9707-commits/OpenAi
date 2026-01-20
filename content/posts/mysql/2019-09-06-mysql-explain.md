---
title: "MySQL EXPLAIN 执行计划详解：SQL 性能分析与优化指南"
date: 2019-09-06 20:10:21
author: "bruce"
description: "MySQL EXPLAIN 命令完整详解，分析 SQL 执行计划，深入理解 id、select_type、type、key、rows、Extra 等关键字段含义，掌握慢查询优化方法"
toc: true
tags:
    - MySQL
    - SQL优化
    - EXPLAIN
    - 性能调优
    - 数据库
categories:
    - MySQL
---

如何分析一条SQL执行过程?如果评价SQL执行性能好坏？EXPLAIN就是一个很好的工具，它的使用法也很简单，再SQL语句前加上`EXPLAIN`关键字就可以。

我用的是Mac系统IDE工具Sequel Pro。

来看第一个例子
```
EXPLAIN 
SELECT o.id,c.`customers_firstname`,c.`customers_lastname`
FROM oms_orders o 
LEFT JOIN sys_customers c on c.id = o.user_id 
WHERE o.created_at > '2019-09-05'
```

执行结果：
![](https://raw.githubusercontent.com/heyuan110/static-source/master/media/mysql/15677558489127.jpg)

EXPLAIN列的解释：

- id：SELECT 标识符，下面具体分析
- select_type: SELECT 类型，下面会具体分析
- table: 查询所使用的表
- type: JOIN 的类型，下面会具体分析
- possible_keys: 可能使用的索引，但不一定会真正使用
- key: 真正使用的索引
- key_len: 所使用的索引长度
- ref: 与索引比较的列
- rows: 预估需要扫描的行数
- Extra: 额外信息



