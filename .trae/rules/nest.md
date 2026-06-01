# NestJS 项目开发规则

## 项目概述
- 项目名称：`project-nest01`，一个 NestJS 通用开发模板
- 运行时：Node.js，TypeScript（target ES2021，CommonJS 模块）
- 包管理器：pnpm（存在 `pnpm-lock.yaml`）

## 技术栈

| 分类 | 技术 | 说明 |
|------|------|------|
| 框架 | NestJS v10 | `@nestjs/core` `@nestjs/common` |
| 数据库 ORM | TypeORM v0.3.20 + MySQL (mysql2) | 使用 `@nestjs/typeorm` |
| 缓存 | Redis (ioredis) | 提供 RedisService 封装 |
| 日志 | Winston + winston-daily-rotate-file | 自定义 WinstonLogger |
| 校验 | class-validator | 配合 class-transformer 使用 |
| API 文档 | Swagger (`@nestjs/swagger`) | 挂载于 `/swagger-ui` |
| 认证 | JWT (`@nestjs/jwt`) | 在 SharedModule 中全局注册 |
| 配置 | YAML (`js-yaml`) + `@nestjs/config` | 支持多环境配置合并 |
| 日期 | dayjs | 替代 moment.js |

## 项目目录结构

```
src/
├── assets/                  # YAML 配置文件（bootstrap.yaml 等）
├── common/                  # 全局通用模块
│   ├── filters/             # 异常过滤器
│   ├── interceptors/        # 拦截器
│   ├── logger/              # Winston 日志模块（@Global）
│   ├── redis/               # Redis 模块（@Global）
│   └── result.ts            # 统一响应类 ResultData
├── config/                  # 配置类
├── decorators/              # 自定义装饰器
├── middleware/              # 中间件
├── modules/                 # 业务模块（按功能划分）
│   ├── auto/                # 认证模块（登录/注册）
│   │   └── dto/             # 请求 DTO
│   ├── department/          # 部门 CRUD 模块
│   │   ├── dto/             # 请求 DTO
│   │   └── entities/        # 实体类
│   ├── upload/              # 文件上传模块
│   ├── user/                # 用户模块
│   │   └── repository/      # 自定义 Repository
├── pipes/                   # 自定义管道
├── shared/                  # 全局共享模块（@Global）
│   └── services/            # AppConfigService 等服务
├── app.module.ts            # 根模块
├── configuration.ts         # YAML 配置加载器
└── main.ts                  # 应用入口
```

## 代码规范

### 1. 模块组织规则

- **每个业务模块**放在 `src/modules/<模块名>/` 下，包含：
  - `<name>.module.ts` - 模块定义
  - `<name>.controller.ts` - 控制器
  - `<name>.service.ts` - 服务层
  - `<name>.entity.ts` 或 `entities/` 目录 - TypeORM 实体
  - `dto/` 目录 - 请求/响应 DTO
  - `repository/` 目录（可选）- 自定义 Repository
  - `*.spec.ts` - 单元测试文件
- **全局模块**（Logger、Redis）放在 `src/common/` 下，使用 `@Global()` 装饰器
- **共享模块** `SharedModule` 放在 `src/shared/`，标记 `@Global()`，用于注册全局服务

### 2. 模块定义规范

```typescript
@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  controllers: [UserController],
  providers: [UserService, UserRepository],
  exports: [UserService, UserRepository]
})
export class UserModule {}
```

- 使用 `TypeOrmModule.forFeature([...])` 导入实体
- 自定义 Repository 和 Service 都需要在 `providers` 中注册
- 需要被其他模块使用的服务必须在 `exports` 中导出

### 3. DTO 校验规范

所有 DTO 必须使用 `class-validator` 和 `@nestjs/swagger` 装饰器：

```typescript
import { IsNotEmpty, IsString, IsEmail, MinLength } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class RegisterDto {
  @ApiProperty({ description: "用户名" })
  @IsNotEmpty()
  @IsString()
  username: string;

  @ApiProperty({ description: "邮箱" })
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;

  @ApiProperty({ description: "密码" })
  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  password: string;
}
```

- 使用 `@ApiProperty` 提供 Swagger 文档说明
- 使用 `@IsNotEmpty`、`@IsString`、`@IsEmail`、`@MinLength`、`@MaxLength`、`@Matches`、`@IsNumber`、`@Min`、`@Max` 等校验

### 4. TypeORM 实体规范

```typescript
import { BaseEntity, Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

@Entity("user")
export class UserEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  @ApiProperty({ description: "id", type: String })
  userid: string;

  @Column({ type: "varchar" })
  @ApiProperty({ description: "名称", type: String })
  username: string;

  @Column({ type: "varchar" })
  @ApiPropertyOptional({ description: "邮箱", type: String })
  email?: string;
}
```

- 实体继承 `BaseEntity`
- 使用 `@Entity("表名")` 指定表名
- 同时使用 `@ApiProperty` / `@ApiPropertyOptional` 为 Swagger 提供文档
- 主键用 `@PrimaryGeneratedColumn()`

### 5. 自定义 Repository 规范

```typescript
import { DataSource, Repository } from "typeorm";
import { Injectable } from "@nestjs/common";

@Injectable()
export class UserRepository extends Repository<UserEntity> {
  constructor(private dataSource: DataSource) {
    super(UserEntity, dataSource.createEntityManager());
  }

  async findByEmail(email: string) {
    return this.dataSource.manager.findOne(UserEntity, { where: { email } });
  }
}
```

- 继承 `Repository<Entity>`
- 通过构造函数注入 `DataSource`，调用 `super(Entity, dataSource.createEntityManager())`

### 6. 控制器规范

```typescript
import { Body, Controller, Post, Get, Req } from "@nestjs/common";
import { ApiTags, ApiOperation, ApiBody } from "@nestjs/swagger";
import { ApiResult } from "../../decorators/api-result.decoraator";

@ApiTags("用户管理")
@Controller("user")
export class UserController {
  constructor(private userService: UserService) {}

  @Post("create")
  @ApiOperation({ summary: "创建用户" })
  @ApiBody({ type: UserEntity })
  async createUser(@Body() user: UserEntity) {
    return this.userService.createUser(user);
  }

  @Get("findAll")
  @ApiOperation({ summary: "查询用户" })
  @ApiResult(UserEntity, true, true)
  async findAll() {
    return this.userService.findAll();
  }
}
```

- 使用 `@ApiTags` 对控制器分组
- 每个端点使用 `@ApiOperation({ summary })` 描述
- 使用自定义 `@ApiResult` 装饰器生成统一的 Swagger 响应文档
- 路由命名使用小驼峰或 kebab-case

### 7. 统一响应格式

项目使用 `ResultData` 类作为统一响应格式，所有接口返回结构为：

```typescript
{
  code: 200,        // 状态码
  data: T | null,   // 数据：对象、数组或 null
  message: "成功",  // 提示信息
  total: 0          // 总数（分页时使用，默认 0）
}
```

**静态方法：**

```typescript
import { ResultData } from "../common/result";

// 成功响应（对象/列表）
ResultData.ok(data, "操作成功");
// => { code: 200, data, message: "操作成功", total: 0 }

// 分页响应
ResultData.paginated(list, 100, "查询成功");
// => { code: 200, data: [...], message: "查询成功", total: 100 }

// 失败响应
ResultData.fail("参数错误", 400);
// => { code: 400, data: null, message: "参数错误", total: 0 }
```

**控制器中使用 `@ApiResult` 装饰器声明 Swagger 响应文档：**

```typescript
// 单个对象响应  →  data: UserEntity
@ApiResult(UserEntity)

// 数组响应      →  data: UserEntity[]
@ApiResult(UserEntity, true)

// 分页响应      →  data: UserEntity[], total: number
@ApiResult(UserEntity, true, true)

// 无 data 响应  →  data: null
@ApiResult()
```

### 8. 配置管理规范

- **配置源**：YAML 文件位于 `src/assets/`
  - `bootstrap.yaml` - 默认配置
  - `bootstrap-development.yaml` - 开发环境配置
  - `bootstrap-production.yaml` - 生产环境配置
- **加载机制**：`configuration.ts` 通过 `js-yaml` 读取 YAML，根据 `NODE_ENV` 合并环境特定配置
- **环境变量**：通过 `.env` 文件管理（如 `NODE_ENV=test`）
- **访问配置**：通过 `AppConfigService` 或 `ConfigService` 获取配置值
- **资产复制**：`nest-cli.json` 中配置了将 `bootstrap.yaml` 和 `bootstrap-development.yaml` 复制到 `dist` 目录

### 9. 日志规范

- 使用自定义 WinstonLogger（实现 `LoggerService`），支持：
  - 彩色控制台输出（开发环境）
  - JSON 格式输出（生产环境）
  - 按日滚动日志文件（`logs/` 目录）
  - 异常单独记录
- 在 `main.ts` 中全局替换 NestJS 默认 Logger
- 使用 `LoggingInterceptor` 自动记录请求/响应日志
- 日志方法：`this.logger.log()`, `this.logger.error()`, `this.logger.warn()`
- 支持 context 参数，格式 `this.logger.log(message, "ContextName")`

### 10. Redis 规范

RedisService 通过注入令牌 `"REDIS_CLIENT"` 依赖 ioredis `Redis` 实例：

```typescript
// 设置缓存（带 TTL）
await this.redisService.set(key, value, ttl);

// 获取缓存
await this.redisService.get(key);

// 存储/获取对象
await this.redisService.setObject<T>(key, obj, ttl);
const obj = await this.redisService.getObject<T>(key);

// 其他操作
await this.redisService.del(key);
await this.redisService.exists(key);
await this.redisService.increment(key);
await this.redisService.pipeline(ops);
await this.redisService.publish(channel, msg);
```

### 11. JWT 认证规范

- JWT 在 `SharedModule` 中全局注册，使用 `secret: "guang"`，过期时间 `"1d"`
- 在控制器中注入 `JwtService` 使用：
  - `jwtService.signAsync(payload)` - 签发 token
  - `jwtService.verify(token)` - 验证 token
- 从请求头获取 token：`req.headers["authorization"]`

### 12. TypeScript 配置

- `tsconfig.json` 中配置了路径别名 `@/*` → `src/*`
- 启用了 `experimentalDecorators` 和 `emitDecoratorMetadata`
- `strictNullChecks: false`（非严格空检查模式）
- `tsconfig.build.json` 继承 `tsconfig.json`，排除 `node_modules`、`test`、`dist`、`**/*spec.ts`

### 13. 代码格式化

使用 Prettier，配置如下：
- 单引号（`singleQuote: true`）
- 分号（`semi: true`）
- 无尾逗号（`trailingComma: "none"`）
- 打印宽度 100（`printWidth: 100`）
- 箭头函数始终加括号（`arrowParens: "always"`）

### 14. 测试规范

- 使用 Jest 作为测试框架
- 单元测试文件命名：`*.spec.ts`
- E2E 测试配置文件：`test/jest-e2e.json`
- 测试目录：`test/`（E2E）、各模块目录下（单元测试）

### 15. 文件上传规范

- 单文件：`@UseInterceptors(FileInterceptor("file"))` + `@UploadedFile()`
- 多文件：`@UseInterceptors(FilesInterceptor("files"))` + `@UploadedFiles()`
- 文件大小校验：使用 `@UsePipes(new FileSizeValidationPipe(字节数))`
- 使用 `@ApiConsumes("multipart/form-data")` 声明 Swagger 文档

### 16. 依赖注入规范

- 始终使用 `constructor` 注入依赖，使用 `private readonly` 修饰符
- 全局服务（`WinstonLogger`、`RedisService`）可直接注入，无需导入对应模块（因为已标记 `@Global()`）
- 自定义 Provider 使用工厂函数时，通过 `inject` 声明依赖

## 命名约定

| 类型 | 命名规范 | 示例 |
|------|----------|------|
| 模块文件 | `*.module.ts` | `user.module.ts` |
| 控制器文件 | `*.controller.ts` | `user.controller.ts` |
| 服务文件 | `*.service.ts` | `user.service.ts` |
| 实体文件 | `*.entity.ts` | `user.entity.ts` |
| DTO 文件 | `*.dto.ts` | `login.dto.ts` |
| Repository 文件 | `*.repository.ts` | `user.repository.ts` |
| 测试文件 | `*.spec.ts` | `user.service.spec.ts` |
| 类名 | PascalCase | `UserController`, `LoginDto` |
| 方法名 | camelCase | `findAll`, `createUser` |
| 路由路径 | camelCase/kebab-case | `findAll`, `single-upload` |
| 数据库表名 | 小写下划线 | `user`, `department` |

## 常用命令

| 命令 | 说明 |
|------|------|
| `pnpm start:dev` | 开发模式启动（watch） |
| `pnpm start:hmr` | HMR 模式启动 |
| `pnpm build` | 构建项目 |
| `pnpm lint` | ESLint 检查并自动修复 |
| `pnpm format` | Prettier 格式化 |
| `pnpm test` | 运行单元测试 |
| `pnpm test:cov` | 运行测试覆盖率 |
| `pnpm test:e2e` | 运行 E2E 测试 |
