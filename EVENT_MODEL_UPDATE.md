# Event 模型更新完成 ✅

## 📝 更新内容

根据实际 API 返回的数据结构，更新了 Event 模型定义和页面逻辑。

## 🔄 实际 API 数据结构

```json
{
  "id": 90,
  "name": "M3-2025 Autumn",
  "slug": "M3-56",
  "main_visual_url": null,
  "type": "M3",
  "start_date": "2025-10-26T00:00:00.000000Z",
  "end_date": null,
  "venue": "Tokyo Ryutsu Center (TRC)",
  "location": "Tokyo, Japan",
  "website": "https://www.m3net.jp/",
  "translations": {
    "ja": {
      "name": "M3-2025 秋"
    }
  },
  "key_visuals": null,
  "total_works": 0,
  "total_participants": 0,
  "meta": null,
  "created_at": "2025-11-10T15:44:51.000000Z",
  "updated_at": "2025-11-10T15:44:51.000000Z"
}
```

## ✨ 更新的字段映射

| 旧字段 | 新字段 | 说明 |
|--------|--------|------|
| `code` | `slug` | 活动代码 (如 "M3-56") |
| `series` | `type` | 活动类型 (如 "M3", "Comiket") |
| `date` | `start_date` | 开始日期 |
| `endDate` | `end_date` | 结束日期 |
| `nameJa` | `translations.ja.name` | 日文名称 |
| `albumCount` | `total_works` | 作品数量 |
| - | `venue` | 场馆名称 |
| - | `website` | 官网链接 |
| - | `total_participants` | 参与者数量 |

## 🔧 更新的功能

### 1. Event 类型定义 ([types/models.ts](types/models.ts))

```typescript
export const EventSchema = z.object({
  id: z.number(),
  name: z.string(),
  slug: z.string(),
  main_visual_url: z.string().nullable(),
  type: z.string(),
  start_date: z.string(),
  end_date: z.string().nullable(),
  venue: z.string().nullable(),
  location: z.string().nullable(),
  website: z.string().nullable(),
  translations: z.object({
    ja: z.object({
      name: z.string(),
    }).optional(),
  }).optional(),
  key_visuals: z.unknown().nullable(),
  total_works: z.number(),
  total_participants: z.number(),
  meta: z.unknown().nullable(),
  created_at: z.string(),
  updated_at: z.string(),
});
```

### 2. 重写分组函数

**旧函数**：`groupEventsBySeries()` - 按 `series` 字段分组

**新函数**：`groupEventsByType()` - 按 `type` 字段分组

```typescript
// Group events by type (e.g., M3, Comiket, Reitaisai)
function groupEventsByType(events: Event[]) {
  const grouped: { [key: string]: Event[] } = {};
  events.forEach(event => {
    if (!grouped[event.type]) {
      grouped[event.type] = [];
    }
    grouped[event.type].push(event);
  });

  // Sort events within each type by date descending
  Object.keys(grouped).forEach(type => {
    grouped[type].sort((a, b) =>
      new Date(b.start_date).getTime() - new Date(a.start_date).getTime()
    );
  });

  return grouped;
}
```

### 3. 更新页面渲染逻辑 ([app/events/page.tsx](app/events/page.tsx))

#### 时间顺序视图
- 使用 `start_date` 而非 `date`
- 显示 `slug` 而非 `code`
- 使用 `translations.ja.name` 而非 `nameJa`
- 显示 `total_works` 而非 `albumCount`

#### 类型分组视图
- 按 `type` 分组而非 `series`
- 每个分组显示对应类型的所有活动

## 📊 支持的多语言

```typescript
// 中文环境下显示日文名称，否则显示英文名称
{i18n.language === 'zh-CN' && event.translations?.ja?.name
  ? event.translations.ja.name
  : event.name}
```

## 🎨 UI 改进

### 时间顺序视图（Chronological）
- 按年份分组
- 显示完整的活动信息（名称、slug、日期、地点、作品数）
- 大卡片布局，适合浏览详细信息

### 类型分组视图（Grouped by Type）
- 按活动类型分组（M3, Comiket 等）
- 网格布局（响应式：手机 1 列，平板 2 列，桌面 3 列）
- 紧凑卡片，适合快速浏览

## 🔍 数据显示

1. **活动代码**：`event.slug` (如 "M3-56")
2. **活动名称**：支持中文显示日文名 `translations.ja.name`
3. **日期范围**：`start_date` 和 `end_date`（如果有）
4. **地点**：`location`
5. **作品数**：`total_works`（仅当 > 0 时显示）

## ✅ 验证

- ✅ TypeScript 类型检查通过
- ✅ 项目构建成功
- ✅ 所有字段映射正确
- ✅ 分组逻辑正确（按 type）
- ✅ 多语言支持正常

## 📦 更新的文件

1. [types/models.ts](types/models.ts) - Event 类型定义
2. [app/events/page.tsx](app/events/page.tsx) - 页面逻辑和渲染

---

现在 Events 页面完全匹配实际 API 数据结构！🎉
