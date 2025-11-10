import { apiClient } from '@/lib/api/client';
import {
  Album,
  AlbumSchema,
  Artist,
  ArtistSchema,
  Track,
  TrackSchema,
  Playlist,
  PlaylistSchema,
} from '@/types/models';
import { PaginatedData, PaginationParams } from '@/types/api';

/**
 * 音乐服务 API
 */
export class MusicService {
  // ========== Artists API ==========

  /**
   * 获取艺术家列表
   */
  static async getArtists(
    params?: Partial<PaginationParams>
  ): Promise<PaginatedData<Artist>> {
    return apiClient.get<PaginatedData<Artist>>('/artists', params);
  }

  /**
   * 获取艺术家详情
   */
  static async getArtist(id: string): Promise<Artist> {
    return apiClient.get<Artist>(`/artists/${id}`);
  }

  /**
   * 创建艺术家
   */
  static async createArtist(data: Partial<Artist>): Promise<Artist> {
    return apiClient.post<Artist>('/artists', data);
  }

  /**
   * 更新艺术家
   */
  static async updateArtist(id: string, data: Partial<Artist>): Promise<Artist> {
    return apiClient.put<Artist>(`/artists/${id}`, data);
  }

  /**
   * 删除艺术家
   */
  static async deleteArtist(id: string): Promise<void> {
    return apiClient.delete<void>(`/artists/${id}`);
  }

  // ========== Albums API ==========

  /**
   * 获取专辑列表
   */
  static async getAlbums(
    params?: Partial<PaginationParams>
  ): Promise<PaginatedData<Album>> {
    return apiClient.get<PaginatedData<Album>>('/albums', params);
  }

  /**
   * 获取专辑详情
   */
  static async getAlbum(id: string): Promise<Album> {
    return apiClient.get<Album>(`/albums/${id}`);
  }

  /**
   * 创建专辑
   */
  static async createAlbum(data: Partial<Album>): Promise<Album> {
    return apiClient.post<Album>('/albums', data);
  }

  /**
   * 更新专辑
   */
  static async updateAlbum(id: string, data: Partial<Album>): Promise<Album> {
    return apiClient.put<Album>(`/albums/${id}`, data);
  }

  /**
   * 删除专辑
   */
  static async deleteAlbum(id: string): Promise<void> {
    return apiClient.delete<void>(`/albums/${id}`);
  }

  /**
   * 获取艺术家的专辑列表
   */
  static async getArtistAlbums(artistId: string): Promise<Album[]> {
    return apiClient.get<Album[]>(`/artists/${artistId}/albums`);
  }

  // ========== Tracks API ==========

  /**
   * 获取曲目列表
   */
  static async getTracks(
    params?: Partial<PaginationParams>
  ): Promise<PaginatedData<Track>> {
    return apiClient.get<PaginatedData<Track>>('/tracks', params);
  }

  /**
   * 获取曲目详情
   */
  static async getTrack(id: string): Promise<Track> {
    return apiClient.get<Track>(`/tracks/${id}`);
  }

  /**
   * 创建曲目
   */
  static async createTrack(data: Partial<Track>): Promise<Track> {
    return apiClient.post<Track>('/tracks', data);
  }

  /**
   * 更新曲目
   */
  static async updateTrack(id: string, data: Partial<Track>): Promise<Track> {
    return apiClient.put<Track>(`/tracks/${id}`, data);
  }

  /**
   * 删除曲目
   */
  static async deleteTrack(id: string): Promise<void> {
    return apiClient.delete<void>(`/tracks/${id}`);
  }

  /**
   * 获取专辑的曲目列表
   */
  static async getAlbumTracks(albumId: string): Promise<Track[]> {
    return apiClient.get<Track[]>(`/albums/${albumId}/tracks`);
  }

  // ========== Playlists API ==========

  /**
   * 获取播放列表
   */
  static async getPlaylists(
    params?: Partial<PaginationParams>
  ): Promise<PaginatedData<Playlist>> {
    return apiClient.get<PaginatedData<Playlist>>('/playlists', params);
  }

  /**
   * 获取播放列表详情
   */
  static async getPlaylist(id: string): Promise<Playlist> {
    return apiClient.get<Playlist>(`/playlists/${id}`);
  }

  /**
   * 创建播放列表
   */
  static async createPlaylist(data: Partial<Playlist>): Promise<Playlist> {
    return apiClient.post<Playlist>('/playlists', data);
  }

  /**
   * 更新播放列表
   */
  static async updatePlaylist(
    id: string,
    data: Partial<Playlist>
  ): Promise<Playlist> {
    return apiClient.put<Playlist>(`/playlists/${id}`, data);
  }

  /**
   * 删除播放列表
   */
  static async deletePlaylist(id: string): Promise<void> {
    return apiClient.delete<void>(`/playlists/${id}`);
  }

  /**
   * 添加曲目到播放列表
   */
  static async addTrackToPlaylist(
    playlistId: string,
    trackId: string
  ): Promise<void> {
    return apiClient.post<void>(`/playlists/${playlistId}/tracks`, { trackId });
  }

  /**
   * 从播放列表移除曲目
   */
  static async removeTrackFromPlaylist(
    playlistId: string,
    trackId: string
  ): Promise<void> {
    return apiClient.delete<void>(`/playlists/${playlistId}/tracks/${trackId}`);
  }

  /**
   * 获取播放列表的曲目
   */
  static async getPlaylistTracks(playlistId: string): Promise<Track[]> {
    return apiClient.get<Track[]>(`/playlists/${playlistId}/tracks`);
  }

  // ========== Search API ==========

  /**
   * 搜索音乐
   */
  static async search(query: string, type?: 'artist' | 'album' | 'track') {
    return apiClient.get<{
      artists: Artist[];
      albums: Album[];
      tracks: Track[];
    }>('/search', { query, type });
  }
}

export default MusicService;
