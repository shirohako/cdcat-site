# Events 页面 API 集成完成 ✅

## 📝 更新内容

### 1. 添加了 Event 数据模型

在 [types/models.ts](types/models.ts) 中添加了 `Event` 类型定义：

```typescript
export const EventSchema = z.object({
  id: z.union([z.string(), z.number()]),
  name: z.string(),
  nameJa: z.string().optional(),
  code: z.string(),
  series: z.string(),
  date: z.string(),
  endDate: z.string().nullable().optional(),
  location: z.string().optional(),
  albumCount: z.number().optional(),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
});
```

### 2. 创建了 Event 服务

新增文件 [lib/api/services/event.service.ts](lib/api/services/event.service.ts)：

- `getEvents()` - 获取活动列表
- `getEvent(id)` - 获取活动详情
- `createEvent(data)` - 创建活动
- `updateEvent(id, data)` - 更新活动
- `deleteEvent(id)` - 删除活动

### 3. 创建了 React Query Hooks

新增文件 [hooks/api/use-events.ts](hooks/api/use-events.ts)：

- `useEvents()` - 获取活动列表（支持自动缓存和加载状态）
- `useEvent(id)` - 获取活动详情
- `useCreateEvent()` - 创建活动 mutation
- `useUpdateEvent()` - 更新活动 mutation
- `useDeleteEvent()` - 删除活动 mutation

### 4. 更新了 Events 页面

修改了 [app/events/page.tsx](app/events/page.tsx)：

**之前**：使用 mock 数据 `mockEvents`

**现在**：使用 `useEvents()` hook 从 API 获取真实数据

主要改动：
```typescript
// 之前
const mockEvents = [...];

// 现在
const { data: events = [], isLoading, error } = useEvents();
```

### 5. 添加了加载和错误状态

页面现在包含：
- ✅ 加载状态显示
- ✅ 错误处理和提示
- ✅ 空数据状态
- ✅ 数据缓存（React Query 自动管理）

## 🔌 API 接口

### 获取活动列表

```
GET /v1/events
```

**响应格式**：

```json
{
  "code": 0,
  "message": "success",
  "data": [
    {
      "id": 1,
      "name": "Comic Market 107",
      "nameJa": "コミックマーケット107",
      "code": "C107",
      "series": "Comic Market",
      "date": "2025-12-30",
      "endDate": "2025-12-31",
      "location": "Tokyo Big Sight",
      "albumCount": 1234
    }
  ]
}
```

## 🚀 使用方式

### 在其他页面使用

```tsx
'use client';

import { useEvents, useEvent } from '@/hooks/api';

export default function MyPage() {
  // 获取列表
  const { data: events, isLoading } = useEvents();

  // 获取详情
  const { data: event } = useEvent(eventId);

  return <div>...</div>;
}
```

### 配置后端地址

确保在 [.env.local](.env.local) 中配置了正确的 API 地址：

```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:3000/api
# 或者你的后端服务器地址
```

## ✨ 特性

- ✅ 自动数据缓存
- ✅ 自动重试机制
- ✅ 加载状态管理
- ✅ 错误处理
- ✅ TypeScript 类型安全
- ✅ 支持分页（如需要）
- ✅ 乐观更新

## 📦 文件清单

新增/修改的文件：
- ✅ [types/models.ts](types/models.ts) - 添加 Event 类型
- ✅ [lib/api/services/event.service.ts](lib/api/services/event.service.ts) - Event 服务
- ✅ [lib/api/services/index.ts](lib/api/services/index.ts) - 导出 EventService
- ✅ [lib/api/query-client.ts](lib/api/query-client.ts) - 添加 events query keys
- ✅ [hooks/api/use-events.ts](hooks/api/use-events.ts) - Event hooks
- ✅ [hooks/api/index.ts](hooks/api/index.ts) - 导出 event hooks
- ✅ [app/events/page.tsx](app/events/page.tsx) - 使用 API 获取数据
- ✅ [app/events/page.tsx.bak](app/events/page.tsx.bak) - 原文件备份

## 🎯 验证

✅ TypeScript 编译通过
✅ 项目构建成功
✅ 所有 API 功能可用

---

现在 Events 页面已经完全集成 API，可以从后端获取真实数据了！🎉
