import { QueryClient, DefaultOptions } from '@tanstack/react-query';

/**
 * React Query 默认配置
 */
const defaultOptions: DefaultOptions = {
  queries: {
    // 重试次数
    retry: 3,
    // 重试延迟
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
    // 数据过期时间 (5分钟)
    staleTime: 5 * 60 * 1000,
    // 缓存时间 (10分钟)
    gcTime: 10 * 60 * 1000,
    // 窗口聚焦时重新获取
    refetchOnWindowFocus: false,
    // 网络重连时重新获取
    refetchOnReconnect: true,
    // 挂载时重新获取
    refetchOnMount: true,
  },
  mutations: {
    // 重试次数
    retry: 1,
  },
};

/**
 * 创建 Query Client 实例
 */
export const queryClient = new QueryClient({
  defaultOptions,
});

/**
 * Query Keys 工厂函数
 */
export const queryKeys = {
  // 认证相关
  auth: {
    all: ['auth'] as const,
    me: () => [...queryKeys.auth.all, 'me'] as const,
  },

  // 艺术家相关
  artists: {
    all: ['artists'] as const,
    lists: () => [...queryKeys.artists.all, 'list'] as const,
    list: (params?: Record<string, unknown>) =>
      [...queryKeys.artists.lists(), params] as const,
    details: () => [...queryKeys.artists.all, 'detail'] as const,
    detail: (id: string) => [...queryKeys.artists.details(), id] as const,
    albums: (id: string) => [...queryKeys.artists.detail(id), 'albums'] as const,
  },

  // 专辑相关
  albums: {
    all: ['albums'] as const,
    lists: () => [...queryKeys.albums.all, 'list'] as const,
    list: (params?: Record<string, unknown>) =>
      [...queryKeys.albums.lists(), params] as const,
    details: () => [...queryKeys.albums.all, 'detail'] as const,
    detail: (id: string) => [...queryKeys.albums.details(), id] as const,
    tracks: (id: string) => [...queryKeys.albums.detail(id), 'tracks'] as const,
  },

  // 曲目相关
  tracks: {
    all: ['tracks'] as const,
    lists: () => [...queryKeys.tracks.all, 'list'] as const,
    list: (params?: Record<string, unknown>) =>
      [...queryKeys.tracks.lists(), params] as const,
    details: () => [...queryKeys.tracks.all, 'detail'] as const,
    detail: (id: string) => [...queryKeys.tracks.details(), id] as const,
  },

  // 播放列表相关
  playlists: {
    all: ['playlists'] as const,
    lists: () => [...queryKeys.playlists.all, 'list'] as const,
    list: (params?: Record<string, unknown>) =>
      [...queryKeys.playlists.lists(), params] as const,
    details: () => [...queryKeys.playlists.all, 'detail'] as const,
    detail: (id: string) => [...queryKeys.playlists.details(), id] as const,
    tracks: (id: string) =>
      [...queryKeys.playlists.detail(id), 'tracks'] as const,
  },

  // 搜索相关
  search: {
    all: ['search'] as const,
    query: (query: string, type?: string) =>
      [...queryKeys.search.all, query, type] as const,
  },

  // 活动相关
  events: {
    all: ['events'] as const,
    lists: () => [...queryKeys.events.all, 'list'] as const,
    list: (params?: Record<string, unknown>) =>
      [...queryKeys.events.lists(), params] as const,
    details: () => [...queryKeys.events.all, 'detail'] as const,
    detail: (id: string | number) => [...queryKeys.events.details(), id] as const,
  },
} as const;

export default queryClient;
