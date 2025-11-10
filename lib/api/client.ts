import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios';
import { ApiError, ApiResponse, RequestConfig } from '@/types/api';

/**
 * API 客户端类
 */
class ApiClient {
  private instance: AxiosInstance;
  private baseURL: string;

  constructor() {
    this.baseURL = process.env.NEXT_PUBLIC_API_BASE_URL || '/api';

    this.instance = axios.create({
      baseURL: this.baseURL,
      timeout: Number(process.env.NEXT_PUBLIC_API_TIMEOUT) || 30000,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    this.setupInterceptors();
  }

  /**
   * 设置拦截器
   */
  private setupInterceptors() {
    // 请求拦截器
    this.instance.interceptors.request.use(
      (config: InternalAxiosRequestConfig) => {
        // 添加认证 token
        const token = this.getToken();
        if (token && config.headers) {
          config.headers.Authorization = `Bearer ${token}`;
        }

        // 添加请求时间戳
        if (config.params) {
          config.params._t = Date.now();
        }

        console.log(`[API Request] ${config.method?.toUpperCase()} ${config.url}`, {
          params: config.params,
          data: config.data,
        });

        return config;
      },
      (error) => {
        console.error('[API Request Error]', error);
        return Promise.reject(error);
      }
    );

    // 响应拦截器
    this.instance.interceptors.response.use(
      (response: AxiosResponse<ApiResponse>) => {
        console.log(`[API Response] ${response.config.url}`, response.data);

        // 如果响应数据有标准的 code/message/data 结构
        if (response.data && typeof response.data === 'object' && 'code' in response.data) {
          const { code, message, data } = response.data;

          // 业务错误处理 (code 不为 0 或 200 时视为错误)
          if (code !== 0 && code !== 200) {
            const error = new ApiError(code, message || '请求失败', data);
            this.handleBusinessError(error);
            return Promise.reject(error);
          }
        }

        return response;
      },
      (error) => {
        console.error('[API Response Error]', error);
        return this.handleError(error);
      }
    );
  }

  /**
   * 获取认证 Token
   */
  private getToken(): string | null {
    // 从 localStorage 或 cookie 获取 token
    if (typeof window !== 'undefined') {
      return localStorage.getItem('auth_token');
    }
    return null;
  }

  /**
   * 设置认证 Token
   */
  public setToken(token: string) {
    if (typeof window !== 'undefined') {
      localStorage.setItem('auth_token', token);
    }
  }

  /**
   * 清除认证 Token
   */
  public clearToken() {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('auth_token');
    }
  }

  /**
   * 处理业务错误
   */
  private handleBusinessError(error: ApiError) {
    switch (error.code) {
      case 401:
        // 未授权，清除 token 并跳转登录
        this.clearToken();
        if (typeof window !== 'undefined') {
          window.location.href = '/login';
        }
        break;
      case 403:
        // 无权限
        console.error('无权限访问');
        break;
      case 404:
        // 资源不存在
        console.error('资源不存在');
        break;
      case 500:
        // 服务器错误
        console.error('服务器错误');
        break;
      default:
        console.error(`业务错误: ${error.message}`);
    }
  }

  /**
   * 处理网络错误
   */
  private handleError(error: any): Promise<never> {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        // 服务器返回错误状态码
        const { status, statusText, data } = error.response;
        const apiError = new ApiError(
          status,
          data?.message || statusText || '请求失败',
          data
        );
        return Promise.reject(apiError);
      } else if (error.request) {
        // 请求已发出但没有收到响应
        const apiError = new ApiError(0, '网络连接失败，请检查您的网络', null);
        return Promise.reject(apiError);
      }
    }

    // 其他错误
    const apiError = new ApiError(0, error.message || '未知错误', null);
    return Promise.reject(apiError);
  }

  /**
   * GET 请求
   */
  public async get<T>(
    url: string,
    params?: Record<string, unknown>,
    config?: RequestConfig
  ): Promise<T> {
    const response = await this.instance.get<ApiResponse<T>>(url, {
      params,
      ...config,
    });

    // 如果响应有标准的 data 字段，返回 data
    // 否则直接返回整个响应数据
    if (response.data && typeof response.data === 'object' && 'data' in response.data) {
      return response.data.data;
    }
    return response.data as T;
  }

  /**
   * POST 请求
   */
  public async post<T>(
    url: string,
    data?: unknown,
    config?: RequestConfig
  ): Promise<T> {
    const response = await this.instance.post<ApiResponse<T>>(url, data, config);

    // 如果响应有标准的 data 字段，返回 data
    // 否则直接返回整个响应数据
    if (response.data && typeof response.data === 'object' && 'data' in response.data) {
      return response.data.data;
    }
    return response.data as T;
  }

  /**
   * PUT 请求
   */
  public async put<T>(
    url: string,
    data?: unknown,
    config?: RequestConfig
  ): Promise<T> {
    const response = await this.instance.put<ApiResponse<T>>(url, data, config);

    if (response.data && typeof response.data === 'object' && 'data' in response.data) {
      return response.data.data;
    }
    return response.data as T;
  }

  /**
   * DELETE 请求
   */
  public async delete<T>(
    url: string,
    config?: RequestConfig
  ): Promise<T> {
    const response = await this.instance.delete<ApiResponse<T>>(url, config);

    if (response.data && typeof response.data === 'object' && 'data' in response.data) {
      return response.data.data;
    }
    return response.data as T;
  }

  /**
   * PATCH 请求
   */
  public async patch<T>(
    url: string,
    data?: unknown,
    config?: RequestConfig
  ): Promise<T> {
    const response = await this.instance.patch<ApiResponse<T>>(url, data, config);

    if (response.data && typeof response.data === 'object' && 'data' in response.data) {
      return response.data.data;
    }
    return response.data as T;
  }

  /**
   * 上传文件
   */
  public async upload<T>(
    url: string,
    file: File | Blob,
    fieldName: string = 'file',
    config?: RequestConfig
  ): Promise<T> {
    const formData = new FormData();
    formData.append(fieldName, file);

    const response = await this.instance.post<ApiResponse<T>>(url, formData, {
      ...config,
      headers: {
        'Content-Type': 'multipart/form-data',
        ...config?.headers,
      },
    });

    return response.data.data;
  }

  /**
   * 下载文件
   */
  public async download(
    url: string,
    filename: string,
    config?: RequestConfig
  ): Promise<void> {
    const response = await this.instance.get(url, {
      ...config,
      responseType: 'blob',
    });

    // 创建下载链接
    const blob = new Blob([response.data]);
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.download = filename;
    link.click();
    window.URL.revokeObjectURL(link.href);
  }
}

// 导出单例实例
export const apiClient = new ApiClient();

// 导出默认实例
export default apiClient;
