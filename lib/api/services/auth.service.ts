import { apiClient } from '@/lib/api/client';
import { User, UserSchema } from '@/types/models';

/**
 * 登录请求参数
 */
export interface LoginRequest {
  email: string;
  password: string;
}

/**
 * 注册请求参数
 */
export interface RegisterRequest {
  username: string;
  email: string;
  password: string;
}

/**
 * 登录响应
 */
export interface AuthResponse {
  user: User;
  token: string;
  refreshToken?: string;
}

/**
 * 认证服务 API
 */
export class AuthService {
  /**
   * 登录
   */
  static async login(data: LoginRequest): Promise<AuthResponse> {
    const response = await apiClient.post<AuthResponse>('/auth/login', data);

    // 保存 token
    if (response.token) {
      apiClient.setToken(response.token);
    }

    return response;
  }

  /**
   * 注册
   */
  static async register(data: RegisterRequest): Promise<AuthResponse> {
    const response = await apiClient.post<AuthResponse>('/auth/register', data);

    // 保存 token
    if (response.token) {
      apiClient.setToken(response.token);
    }

    return response;
  }

  /**
   * 登出
   */
  static async logout(): Promise<void> {
    await apiClient.post<void>('/auth/logout');
    apiClient.clearToken();
  }

  /**
   * 获取当前用户信息
   */
  static async getCurrentUser(): Promise<User> {
    return apiClient.get<User>('/auth/me');
  }

  /**
   * 刷新 token
   */
  static async refreshToken(refreshToken: string): Promise<AuthResponse> {
    const response = await apiClient.post<AuthResponse>('/auth/refresh', {
      refreshToken,
    });

    // 保存新 token
    if (response.token) {
      apiClient.setToken(response.token);
    }

    return response;
  }

  /**
   * 更新用户信息
   */
  static async updateProfile(data: Partial<User>): Promise<User> {
    return apiClient.put<User>('/auth/profile', data);
  }

  /**
   * 修改密码
   */
  static async changePassword(
    oldPassword: string,
    newPassword: string
  ): Promise<void> {
    return apiClient.post<void>('/auth/change-password', {
      oldPassword,
      newPassword,
    });
  }

  /**
   * 忘记密码 - 发送重置邮件
   */
  static async forgotPassword(email: string): Promise<void> {
    return apiClient.post<void>('/auth/forgot-password', { email });
  }

  /**
   * 重置密码
   */
  static async resetPassword(token: string, newPassword: string): Promise<void> {
    return apiClient.post<void>('/auth/reset-password', {
      token,
      newPassword,
    });
  }
}

export default AuthService;
