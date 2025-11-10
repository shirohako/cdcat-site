import {
  useQuery,
  useMutation,
  useQueryClient,
  UseQueryOptions,
  UseMutationOptions,
} from '@tanstack/react-query';
import { MusicService } from '@/lib/api/services';
import { queryKeys } from '@/lib/api/query-client';
import { Artist, Album } from '@/types/models';
import { PaginatedData, PaginationParams, ApiError } from '@/types/api';

/**
 * 获取艺术家列表
 */
export function useArtists(
  params?: Partial<PaginationParams>,
  options?: Omit<
    UseQueryOptions<PaginatedData<Artist>, ApiError>,
    'queryKey' | 'queryFn'
  >
) {
  return useQuery({
    queryKey: queryKeys.artists.list(params),
    queryFn: () => MusicService.getArtists(params),
    ...options,
  });
}

/**
 * 获取艺术家详情
 */
export function useArtist(
  id: string,
  options?: Omit<UseQueryOptions<Artist, ApiError>, 'queryKey' | 'queryFn'>
) {
  return useQuery({
    queryKey: queryKeys.artists.detail(id),
    queryFn: () => MusicService.getArtist(id),
    enabled: !!id,
    ...options,
  });
}

/**
 * 获取艺术家的专辑列表
 */
export function useArtistAlbums(
  artistId: string,
  options?: Omit<
    UseQueryOptions<Album[], ApiError>,
    'queryKey' | 'queryFn'
  >
) {
  return useQuery({
    queryKey: queryKeys.artists.albums(artistId),
    queryFn: () => MusicService.getArtistAlbums(artistId),
    enabled: !!artistId,
    ...options,
  });
}

/**
 * 创建艺术家
 */
export function useCreateArtist(
  options?: UseMutationOptions<Artist, ApiError, Partial<Artist>>
) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: Partial<Artist>) => MusicService.createArtist(data),
    onSuccess: () => {
      // 创建成功后，使列表缓存失效
      queryClient.invalidateQueries({ queryKey: queryKeys.artists.lists() });
    },
    ...options,
  });
}

/**
 * 更新艺术家
 */
export function useUpdateArtist(
  options?: UseMutationOptions<
    Artist,
    ApiError,
    { id: string; data: Partial<Artist> }
  >
) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }) => MusicService.updateArtist(id, data),
    onSuccess: (_, variables) => {
      // 更新成功后，使相关缓存失效
      queryClient.invalidateQueries({
        queryKey: queryKeys.artists.detail(variables.id),
      });
      queryClient.invalidateQueries({ queryKey: queryKeys.artists.lists() });
    },
    ...options,
  });
}

/**
 * 删除艺术家
 */
export function useDeleteArtist(
  options?: UseMutationOptions<void, ApiError, string>
) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => MusicService.deleteArtist(id),
    onSuccess: (_, id) => {
      // 删除成功后，使相关缓存失效
      queryClient.invalidateQueries({
        queryKey: queryKeys.artists.detail(id),
      });
      queryClient.invalidateQueries({ queryKey: queryKeys.artists.lists() });
    },
    ...options,
  });
}
