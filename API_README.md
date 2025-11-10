# API 基础设施搭建完成 ✅

恭喜！你的 Next.js 16 项目已经配置好完整的 API 调用基础设施，可以开箱即用。

## 📦 已安装的依赖

- `axios`: HTTP 客户端
- `@tanstack/react-query`: 数据获取和缓存管理
- `@tanstack/react-query-devtools`: React Query 开发工具
- `zod`: 类型校验和定义

## 📁 创建的文件结构

```
cdcat-site/
├── .env.local                          # 环境变量配置（已忽略）
├── .env.example                        # 环境变量示例（可提交）
├── API_USAGE.md                        # 详细使用文档
│
├── types/
│   ├── api.ts                          # API 基础类型定义
│   └── models.ts                       # 数据模型类型（User, Artist, Album等）
│
├── lib/api/
│   ├── client.ts                       # API 客户端封装
│   ├── error-handler.ts                # 错误处理工具
│   ├── query-client.ts                 # React Query 配置和 QueryKeys
│   └── services/
│       ├── auth.service.ts             # 认证服务
│       ├── music.service.ts            # 音乐服务
│       └── index.ts                    # 统一导出
│
├── hooks/api/
│   ├── use-auth.ts                     # 认证相关 hooks
│   ├── use-artists.ts                  # 艺术家相关 hooks
│   └── index.ts                        # 统一导出
│
├── components/providers/
│   └── query-provider.tsx              # React Query Provider
│
├── app/
│   ├── layout.tsx                      # 已集成 QueryProvider
│   └── api-example/
│       └── page.tsx                    # API 使用示例页面
```

## 🚀 快速开始

### 1. 查看示例页面

启动开发服务器后，访问：

```
http://localhost:3000/api-example
```

这个页面展示了：
- 如何获取列表数据（分页）
- 如何创建数据
- 如何处理加载状态
- 如何处理错误
- 如何使用 React Query 缓存

### 2. 在你的组件中使用

```tsx
'use client';

import { useArtists, useCreateArtist } from '@/hooks/api';

export default function MyComponent() {
  const { data, isLoading } = useArtists({ page: 1, pageSize: 10 });
  const createArtist = useCreateArtist();

  return (
    <div>
      {data?.items.map(artist => (
        <div key={artist.id}>{artist.name}</div>
      ))}
    </div>
  );
}
```

### 3. 配置后端 API 地址

编辑 [.env.local](.env.local)：

```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:3000/api
# 或者指向你的后端服务器
# NEXT_PUBLIC_API_BASE_URL=https://api.example.com
```

## 📖 核心功能

### ✅ API 客户端封装

- 基于 Axios
- 自动添加认证 token
- 请求/响应拦截器
- 统一错误处理
- 支持文件上传/下载

### ✅ React Query 集成

- 自动缓存管理
- 加载状态处理
- 错误处理
- 自动重试
- 乐观更新
- DevTools 支持

### ✅ 类型安全

- TypeScript 全覆盖
- Zod schema 校验
- 自动类型推导

### ✅ 认证流程

- 登录/注册
- Token 管理
- 自动刷新
- 权限控制

### ✅ 完整的服务示例

已实现的 API 服务：
- 认证服务（登录、注册、用户信息等）
- 音乐服务（艺术家、专辑、曲目、播放列表等）

## 🎯 下一步

1. **阅读详细文档**：查看 [API_USAGE.md](API_USAGE.md)
2. **配置后端 API**：根据实际后端 API 修改 `.env.local`
3. **调整数据模型**：根据后端接口修改 [types/models.ts](types/models.ts)
4. **添加更多服务**：参考 `lib/api/services/` 中的示例
5. **创建对应 hooks**：参考 `hooks/api/` 中的示例
6. **运行开发服务器**：`pnpm dev` 查看示例页面

## 🛠️ 开发工具

在开发环境中，React Query DevTools 会自动显示在页面右下角，可以：
- 查看所有查询状态
- 检查缓存数据
- 手动触发重新获取
- 查看查询历史

## 💡 核心优势

1. **开箱即用**：无需额外配置，直接使用
2. **类型安全**：完整的 TypeScript 支持
3. **自动缓存**：React Query 智能缓存管理
4. **错误处理**：统一的错误处理机制
5. **易于扩展**：模块化设计，便于添加新功能
6. **最佳实践**：遵循 React Query 和 Next.js 最佳实践

## 📚 相关文档

- [API 详细使用文档](API_USAGE.md)
- [React Query 文档](https://tanstack.com/query/latest)
- [Axios 文档](https://axios-http.com/)
- [Zod 文档](https://zod.dev/)

## 🎉 总结

你现在拥有一套完整的、生产级的 API 调用基础设施：

- ✅ HTTP 客户端封装
- ✅ 认证和授权
- ✅ 错误处理
- ✅ 缓存管理
- ✅ 类型安全
- ✅ 示例代码
- ✅ 完整文档

开始构建你的应用吧！🚀
