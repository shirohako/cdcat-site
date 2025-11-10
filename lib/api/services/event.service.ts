import { apiClient } from '@/lib/api/client';
import { Event } from '@/types/models';
import { PaginatedData, PaginationParams } from '@/types/api';

/**
 * 活动服务 API
 */
export class EventService {
  /**
   * 获取活动列表
   */
  static async getEvents(
    params?: Partial<PaginationParams>
  ): Promise<Event[]> {
    return apiClient.get<Event[]>('/v1/events', params);
  }

  /**
   * 获取活动详情
   */
  static async getEvent(id: string | number): Promise<Event> {
    return apiClient.get<Event>(`/v1/events/${id}`);
  }

  /**
   * 创建活动
   */
  static async createEvent(data: Partial<Event>): Promise<Event> {
    return apiClient.post<Event>('/v1/events', data);
  }

  /**
   * 更新活动
   */
  static async updateEvent(
    id: string | number,
    data: Partial<Event>
  ): Promise<Event> {
    return apiClient.put<Event>(`/v1/events/${id}`, data);
  }

  /**
   * 删除活动
   */
  static async deleteEvent(id: string | number): Promise<void> {
    return apiClient.delete<void>(`/v1/events/${id}`);
  }
}

export default EventService;
