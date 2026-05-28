# nest-template

基于 NestJS 的后端开发基础模板，集成了常用的中间件、数据库、缓存、日志等功能，可作为项目快速启动脚手架。

## 快速开始

```bash
# 安装依赖
npm install

# 配置环境
cp .env.example .env
# 编辑 .env 和 src/assets/bootstrap.yaml 中的数据库/Redis 连接信息

# 启动开发服务
npm run start:dev

# 访问 Swagger 文档
# http://localhost:3000/swagger-ui
```

## 项目结构

```
src/
├── assets/                    # YAML 配置文件
│   ├── bootstrap.yaml         # 默认配置
│   ├── bootstrap-development.yaml  # 开发环境配置
│   └── bootstrap-production.yaml   # 生产环境配置
├── common/                    # 公共模块
│   ├── filters/               # 异常过滤器
│   │   └── http.exception.filter.ts
│   ├── interceptors/          # 拦截器
│   │   └── loging.interceptor.ts   # 请求日志拦截器
│   ├── logger/                # 日志模块
│   │   ├── logger.module.ts
│   │   ├── logger.service.ts
│   │   └── winston.logger.ts       # Winston 日志配置
│   ├── redis/                 # Redis 模块
│   │   ├── redis.module.ts
│   │   └── redis.service.ts        # Redis 服务（CRUD/发布订阅/管道）
│   └── result.ts              # 统一响应结果封装
├── config/                    # 配置定义
│   ├── logger.config.ts
│   └── redis.config.ts
├── decorators/                # 自定义装饰器
│   └── api-result.decoraator.ts    # Swagger 响应结果装饰器
├── middleware/                # 中间件
│   └── log4.middleware.ts
├── modules/                   # 业务模块
│   ├── department/            # 部门模块（示例）
│   ├── upload/                # 文件上传模块
│   └── user/                  # 用户模块
├── pipes/                     # 管道
│   └── file-size.pipe.ts      # 文件大小校验管道
├── shared/                    # 全局共享模块
│   ├── services/
│   │   └── app-config.service.ts   # 应用配置服务（TypeORM/Redis 配置）
│   └── shared.module.ts
├── app.module.ts              # 根模块
├── configuration.ts           # YAML 配置加载器
└── main.ts                    # 入口文件
```

## 核心功能

### 配置管理

- 使用 `@nestjs/config` 管理环境变量，支持 `.env` 文件
- YAML 多环境配置：根据 `NODE_ENV` 自动加载 `bootstrap-{env}.yaml` 并合并到基础配置
- 全局 `AppConfigService` 统一提供 TypeORM 和 Redis 连接配置

### 数据库 (MySQL + TypeORM)

- TypeORM 异步配置，通过 `AppConfigService` 读取连接参数
- 默认开启 `synchronize: true`（开发环境自动同步表结构）
- 实体文件按模块组织，路径：`src/modules/**/*.entity.ts`

### 缓存 (Redis)

- 基于 ioredis 封装 `RedisService`，全局可用
- 支持：`get/set/del/exists/expire`、对象存取（`getObject/setObject`）、自增自减、管道操作、发布订阅
- 连接配置通过 YAML 管理，支持密码和 key 前缀

### 日志系统 (Winston)

- 全局 `WinstonLogger` 替代 NestJS 默认日志
- 开发环境：彩色格式化输出；生产环境：JSON 格式
- 按日期轮转：普通日志保留 14 天，错误日志保留 30 天
- 未捕获异常自动记录到 `logs/exceptions.log`
- `LoggingInterceptor` 全局拦截请求/响应并记录耗时

### Swagger API 文档

- 访问地址：`http://localhost:3000/swagger-ui`

## 环境配置

### .env 文件

```
NODE_ENV=test
```

### YAML 配置项

`src/assets/bootstrap.yaml`：

```yaml
db:
  host: localhost
  port: 3306
  username: root
  password: root
  database: nest
  logging: true

redis:
  host: localhost
  port: 6379
  password: root
  db: 0
  keyPrefix: "nest:"
```

## Docker 部署

项目提供多阶段构建 Dockerfile：

- **构建阶段**：`node:18-alpine3.14`，安装依赖并编译
- **运行阶段**：`node:18-alpine3.14`，仅拷贝产物，使用 PM2 运行
- 暴露端口：`3000`
- 支持 `NODE_ENV` 构建参数

```bash
# 构建镜像
docker build --build-arg NODE_ENV=production -t project-nest01 .

# 运行容器
docker run -d -p 3000:3000 project-nest01
```

