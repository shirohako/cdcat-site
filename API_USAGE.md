# API 使用文档

这个项目已经配置好了完整的 API 调用基础设施，可以直接使用。

## 📁 项目结构

```
├── lib/api/
│   ├── client.ts              # API 客户端封装 (axios)
│   ├── error-handler.ts       # 错误处理工具
│   ├── query-client.ts        # React Query 配置
│   └── services/              # API 服务层
│       ├── auth.service.ts    # 认证服务
│       ├── music.service.ts   # 音乐服务
│       └── index.ts           # 统一导出
├── hooks/api/                 # React Query hooks
│   ├── use-auth.ts            # 认证相关 hooks
│   ├── use-artists.ts         # 艺术家相关 hooks
│   └── index.ts               # 统一导出
├── types/
│   ├── api.ts                 # API 类型定义
│   └── models.ts              # 数据模型类型
└── components/providers/
    └── query-provider.tsx     # Query Provider 组件
```

## 🚀 快速开始

### 1. 配置环境变量

在 `.env.local` 文件中配置 API 基础地址：

```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:3000/api
NEXT_PUBLIC_API_TIMEOUT=30000
```

### 2. 在应用中集成 QueryProvider

在 [app/layout.tsx](app/layout.tsx) 中添加 `QueryProvider`：

```tsx
import { QueryProvider } from '@/components/providers/query-provider';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <QueryProvider>
          {children}
        </QueryProvider>
      </body>
    </html>
  );
}
```

### 3. 在组件中使用 API hooks

```tsx
'use client';

import { useArtists, useCreateArtist } from '@/hooks/api';

export default function ArtistsPage() {
  // 获取艺术家列表
  const { data, isLoading, error } = useArtists({
    page: 1,
    pageSize: 10,
  });

  // 创建艺术家
  const createArtist = useCreateArtist({
    onSuccess: () => {
      console.log('创建成功！');
    },
  });

  if (isLoading) return <div>加载中...</div>;
  if (error) return <div>错误: {error.message}</div>;

  return (
    <div>
      <button
        onClick={() =>
          createArtist.mutate({
            name: '新艺术家',
            bio: '简介...',
          })
        }
      >
        创建艺术家
      </button>

      {data?.items.map((artist) => (
        <div key={artist.id}>{artist.name}</div>
      ))}
    </div>
  );
}
```

## 📚 API 服务使用

### 直接调用服务（不使用 React Query）

```tsx
import { MusicService, AuthService } from '@/lib/api/services';

// 获取艺术家列表
const artists = await MusicService.getArtists({ page: 1, pageSize: 10 });

// 获取艺术家详情
const artist = await MusicService.getArtist('artist-id');

// 创建艺术家
const newArtist = await MusicService.createArtist({
  name: '新艺术家',
  bio: '简介...',
});

// 登录
const { user, token } = await AuthService.login({
  email: 'user@example.com',
  password: 'password',
});
```

### 使用 React Query hooks（推荐）

```tsx
import { useArtists, useArtist, useCreateArtist } from '@/hooks/api';

function ArtistsComponent() {
  // 获取列表
  const { data: artists } = useArtists({ page: 1, pageSize: 10 });

  // 获取详情
  const { data: artist } = useArtist('artist-id');

  // 创建
  const createArtist = useCreateArtist({
    onSuccess: () => alert('创建成功'),
  });

  return (
    <button onClick={() => createArtist.mutate({ name: '新艺术家' })}>
      创建
    </button>
  );
}
```

## 🔐 认证流程

### 登录

```tsx
import { useLogin } from '@/hooks/api';

function LoginForm() {
  const login = useLogin({
    onSuccess: (data) => {
      console.log('登录成功', data.user);
      // Token 已自动保存
    },
    onError: (error) => {
      console.error('登录失败', error.message);
    },
  });

  const handleLogin = () => {
    login.mutate({
      email: 'user@example.com',
      password: 'password',
    });
  };

  return <button onClick={handleLogin}>登录</button>;
}
```

### 获取当前用户

```tsx
import { useCurrentUser } from '@/hooks/api';

function UserProfile() {
  const { data: user, isLoading } = useCurrentUser();

  if (isLoading) return <div>加载中...</div>;
  if (!user) return <div>未登录</div>;

  return <div>欢迎, {user.username}</div>;
}
```

### 登出

```tsx
import { useLogout } from '@/hooks/api';

function LogoutButton() {
  const logout = useLogout({
    onSuccess: () => {
      console.log('登出成功');
      // 缓存已自动清除
    },
  });

  return <button onClick={() => logout.mutate()}>登出</button>;
}
```

## 🎵 音乐数据操作示例

### 艺术家管理

```tsx
import {
  useArtists,
  useArtist,
  useCreateArtist,
  useUpdateArtist,
  useDeleteArtist,
} from '@/hooks/api';

function ArtistManagement() {
  // 列表查询
  const { data: artists } = useArtists({ page: 1, pageSize: 10 });

  // 详情查询
  const { data: artist } = useArtist('artist-id');

  // 创建
  const createArtist = useCreateArtist();

  // 更新
  const updateArtist = useUpdateArtist();

  // 删除
  const deleteArtist = useDeleteArtist();

  return (
    <div>
      <button
        onClick={() =>
          createArtist.mutate({
            name: '新艺术家',
            bio: '简介',
          })
        }
      >
        创建
      </button>

      <button
        onClick={() =>
          updateArtist.mutate({
            id: 'artist-id',
            data: { name: '更新后的名称' },
          })
        }
      >
        更新
      </button>

      <button onClick={() => deleteArtist.mutate('artist-id')}>删除</button>
    </div>
  );
}
```

### 专辑和曲目

参考 [lib/api/services/music.service.ts](lib/api/services/music.service.ts) 中的完整 API。

## 🛠️ 高级功能

### 文件上传

```tsx
import { apiClient } from '@/lib/api/client';

async function uploadFile(file: File) {
  const result = await apiClient.upload('/upload', file, 'file');
  console.log('上传成功', result);
}
```

### 文件下载

```tsx
import { apiClient } from '@/lib/api/client';

async function downloadFile() {
  await apiClient.download('/files/report.pdf', 'report.pdf');
}
```

### 自定义请求配置

```tsx
import { apiClient } from '@/lib/api/client';

// 带自定义 headers
const data = await apiClient.get('/api/data', null, {
  headers: {
    'X-Custom-Header': 'value',
  },
});

// 设置超时
const data2 = await apiClient.post('/api/data', { foo: 'bar' }, {
  timeout: 5000,
});
```

### 错误处理

```tsx
import { useArtists } from '@/hooks/api';
import { ErrorHandler } from '@/lib/api/error-handler';

function MyComponent() {
  const { data, error } = useArtists();

  if (error) {
    // 判断错误类型
    if (ErrorHandler.isAuthError(error)) {
      // 处理认证错误
    } else if (ErrorHandler.isNetworkError(error)) {
      // 处理网络错误
    } else {
      // 处理其他错误
    }
  }

  return <div>...</div>;
}
```

## 📝 创建新的 API 服务

### 1. 定义数据模型

在 [types/models.ts](types/models.ts) 中添加：

```tsx
import { z } from 'zod';

export const CommentSchema = z.object({
  id: z.string(),
  content: z.string(),
  userId: z.string(),
  createdAt: z.string(),
});

export type Comment = z.infer<typeof CommentSchema>;
```

### 2. 创建服务类

在 `lib/api/services/comment.service.ts` 中：

```tsx
import { apiClient } from '@/lib/api/client';
import { Comment } from '@/types/models';

export class CommentService {
  static async getComments(): Promise<Comment[]> {
    return apiClient.get<Comment[]>('/comments');
  }

  static async createComment(data: Partial<Comment>): Promise<Comment> {
    return apiClient.post<Comment>('/comments', data);
  }
}
```

### 3. 创建 React Query hooks

在 `hooks/api/use-comments.ts` 中：

```tsx
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { CommentService } from '@/lib/api/services/comment.service';

export function useComments() {
  return useQuery({
    queryKey: ['comments'],
    queryFn: () => CommentService.getComments(),
  });
}

export function useCreateComment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: CommentService.createComment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['comments'] });
    },
  });
}
```

## 🔧 配置说明

### React Query 配置

在 [lib/api/query-client.ts](lib/api/query-client.ts) 中可以修改：

- `retry`: 重试次数
- `staleTime`: 数据过期时间
- `gcTime`: 缓存时间
- `refetchOnWindowFocus`: 窗口聚焦时是否重新获取

### API 客户端配置

在 [lib/api/client.ts](lib/api/client.ts) 中可以修改：

- 请求拦截器（添加 token、日志等）
- 响应拦截器（错误处理等）
- 超时时间
- 基础 URL

## 💡 最佳实践

1. **使用 React Query hooks**：推荐使用封装好的 hooks，而不是直接调用服务
2. **错误处理**：在组件中处理错误，提供友好的用户提示
3. **加载状态**：使用 `isLoading` 显示加载指示器
4. **类型安全**：充分利用 TypeScript 和 Zod 的类型检查
5. **缓存管理**：合理使用 `invalidateQueries` 更新缓存

## 🐛 调试

在开发环境中，React Query DevTools 会自动显示，可以查看：

- 所有查询的状态
- 缓存数据
- 查询键
- 重新获取历史

## 📦 依赖包

- `axios`: HTTP 客户端
- `@tanstack/react-query`: 数据获取和缓存
- `zod`: 类型校验和定义

## 🎯 下一步

1. 根据后端 API 文档，修改 [types/models.ts](types/models.ts) 中的数据模型
2. 在 `lib/api/services/` 中添加更多服务
3. 创建对应的 React Query hooks
4. 集成 Toast 组件到错误处理中
5. 根据需要调整 API 响应格式

---

现在你可以开始使用这套 API 基础设施了！🎉
