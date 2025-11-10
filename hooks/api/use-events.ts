import {
  useQuery,
  useMutation,
  useQueryClient,
  UseQueryOptions,
  UseMutationOptions,
} from '@tanstack/react-query';
import { EventService } from '@/lib/api/services';
import { queryKeys } from '@/lib/api/query-client';
import { Event } from '@/types/models';
import { PaginationParams, ApiError } from '@/types/api';

/**
 * 获取活动列表
 */
export function useEvents(
  params?: Partial<PaginationParams>,
  options?: Omit<UseQueryOptions<Event[], ApiError>, 'queryKey' | 'queryFn'>
) {
  return useQuery({
    queryKey: queryKeys.events.list(params),
    queryFn: () => EventService.getEvents(params),
    ...options,
  });
}

/**
 * 获取活动详情
 */
export function useEvent(
  id: string | number,
  options?: Omit<UseQueryOptions<Event, ApiError>, 'queryKey' | 'queryFn'>
) {
  return useQuery({
    queryKey: queryKeys.events.detail(id),
    queryFn: () => EventService.getEvent(id),
    enabled: !!id,
    ...options,
  });
}

/**
 * 创建活动
 */
export function useCreateEvent(
  options?: UseMutationOptions<Event, ApiError, Partial<Event>>
) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: Partial<Event>) => EventService.createEvent(data),
    onSuccess: () => {
      // 创建成功后，使列表缓存失效
      queryClient.invalidateQueries({ queryKey: queryKeys.events.lists() });
    },
    ...options,
  });
}

/**
 * 更新活动
 */
export function useUpdateEvent(
  options?: UseMutationOptions<
    Event,
    ApiError,
    { id: string | number; data: Partial<Event> }
  >
) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }) => EventService.updateEvent(id, data),
    onSuccess: (_, variables) => {
      // 更新成功后，使相关缓存失效
      queryClient.invalidateQueries({
        queryKey: queryKeys.events.detail(variables.id),
      });
      queryClient.invalidateQueries({ queryKey: queryKeys.events.lists() });
    },
    ...options,
  });
}

/**
 * 删除活动
 */
export function useDeleteEvent(
  options?: UseMutationOptions<void, ApiError, string | number>
) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string | number) => EventService.deleteEvent(id),
    onSuccess: (_, id) => {
      // 删除成功后，使相关缓存失效
      queryClient.invalidateQueries({
        queryKey: queryKeys.events.detail(id),
      });
      queryClient.invalidateQueries({ queryKey: queryKeys.events.lists() });
    },
    ...options,
  });
}
