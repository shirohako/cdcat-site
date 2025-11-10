/**
 * 统一导出所有 API 服务
 */

export { MusicService } from './music.service';
export { AuthService } from './auth.service';
export { EventService } from './event.service';

// 也可以重新导出类型
export type {
  LoginRequest,
  RegisterRequest,
  AuthResponse,
} from './auth.service';
