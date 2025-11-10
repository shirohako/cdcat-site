# API 客户端更新 - 更灵活的响应处理 ✅

## 🔧 问题

之前的 API 客户端假设所有响应都有标准的 `{ code, message, data }` 结构，但实际 API 可能返回：
1. 标准格式：`{ code: 0, message: "success", data: [...] }`
2. 直接数据：`[...]`
3. 其他格式

这导致了业务错误或数据提取失败。

## ✨ 更新内容

### 1. 更灵活的响应拦截器

**之前：**
```typescript
// 强制要求有 code/message/data 结构
const { code, message, data } = response.data;
if (code !== 0 && code !== 200) {
  // 错误处理
}
```

**现在：**
```typescript
// 先检查是否有标准结构
if (response.data && typeof response.data === 'object' && 'code' in response.data) {
  const { code, message, data } = response.data;

  // 业务错误处理 (code 不为 0 或 200 时视为错误)
  if (code !== 0 && code !== 200) {
    const error = new ApiError(code, message || '请求失败', data);
    this.handleBusinessError(error);
    return Promise.reject(error);
  }
}
// 如果没有标准结构，直接通过
```

### 2. 智能数据提取

所有 HTTP 方法（GET/POST/PUT/DELETE/PATCH）现在都支持智能数据提取：

```typescript
public async get<T>(url: string, params?, config?): Promise<T> {
  const response = await this.instance.get<ApiResponse<T>>(url, { params, ...config });

  // 如果响应有标准的 data 字段，返回 data
  if (response.data && typeof response.data === 'object' && 'data' in response.data) {
    return response.data.data;
  }

  // 否则直接返回整个响应数据
  return response.data as T;
}
```

## 📊 支持的响应格式

### 格式 1: 标准格式（推荐）

```json
{
  "code": 0,
  "message": "success",
  "data": [
    { "id": 1, "name": "Event 1" }
  ]
}
```

✅ 自动提取 `data` 字段
✅ 检查 `code` 进行错误处理

### 格式 2: 直接数据

```json
[
  { "id": 1, "name": "Event 1" }
]
```

✅ 直接返回数组
✅ 跳过错误检查（因为没有 code 字段）

### 格式 3: 简单对象

```json
{
  "id": 1,
  "name": "Event 1"
}
```

✅ 直接返回对象
✅ 跳过错误检查

## 🎯 成功码配置

当前支持的成功码：
- `code: 0` ✅
- `code: 200` ✅

如果你的 API 使用其他成功码，可以在 [lib/api/client.ts](lib/api/client.ts:71) 中修改：

```typescript
// 业务错误处理
if (code !== 0 && code !== 200 && code !== YOUR_SUCCESS_CODE) {
  // 错误处理
}
```

## 📝 使用示例

### 示例 1: 标准格式 API

```typescript
// API 返回: { code: 0, message: "success", data: [...] }
const events = await EventService.getEvents();
// events = [...] (自动提取了 data 字段)
```

### 示例 2: 直接返回数据的 API

```typescript
// API 返回: [...]
const events = await EventService.getEvents();
// events = [...] (直接使用返回值)
```

### 示例 3: 带错误码的 API

```typescript
// API 返回: { code: 400, message: "参数错误", data: null }
const events = await EventService.getEvents();
// 抛出 ApiError, code: 400, message: "参数错误"
```

## 🔍 调试建议

在开发环境中，所有 API 请求和响应都会在控制台打印：

```
[API Request] GET /v1/events { params: {...}, data: {...} }
[API Response] /v1/events { code: 0, message: "success", data: [...] }
```

这可以帮助你：
1. 检查 API 返回的实际格式
2. 确认数据是否正确提取
3. 排查错误码问题

## ⚠️ 注意事项

1. **错误码处理**：如果你的 API 成功码不是 0 或 200，需要修改 `client.ts:71` 行的判断逻辑

2. **响应格式**：推荐后端统一使用标准格式 `{ code, message, data }`，这样可以获得更好的错误处理

3. **类型安全**：确保服务层的类型定义与实际 API 返回的数据结构一致

## 📦 更新的文件

- ✅ [lib/api/client.ts](lib/api/client.ts) - 更新所有 HTTP 方法的响应处理逻辑

## 🚀 验证

✅ TypeScript 编译通过
✅ 项目构建成功
✅ 支持多种响应格式

---

现在 API 客户端更加灵活，可以处理各种响应格式了！🎉
