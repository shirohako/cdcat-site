import { ApiError } from '@/types/api';

/**
 * 错误处理器
 */
export class ErrorHandler {
  /**
   * 显示错误消息
   */
  static showError(message: string) {
    // 这里可以集成 toast 组件
    if (typeof window !== 'undefined') {
      // 临时使用 alert，可以替换为 toast 组件
      console.error('API Error:', message);
      // 示例: toast.error(message);
    }
  }

  /**
   * 处理 API 错误
   */
  static handle(error: unknown): ApiError {
    if (error instanceof ApiError) {
      this.showError(error.message);
      return error;
    }

    if (error instanceof Error) {
      const apiError = new ApiError(0, error.message);
      this.showError(apiError.message);
      return apiError;
    }

    const unknownError = new ApiError(0, '未知错误');
    this.showError(unknownError.message);
    return unknownError;
  }

  /**
   * 处理验证错误
   */
  static handleValidationError(errors: Record<string, string[]>): void {
    const messages = Object.entries(errors)
      .map(([field, messages]) => `${field}: ${messages.join(', ')}`)
      .join('\n');
    this.showError(messages);
  }

  /**
   * 是否为网络错误
   */
  static isNetworkError(error: ApiError): boolean {
    return error.code === 0;
  }

  /**
   * 是否为认证错误
   */
  static isAuthError(error: ApiError): boolean {
    return error.code === 401;
  }

  /**
   * 是否为权限错误
   */
  static isPermissionError(error: ApiError): boolean {
    return error.code === 403;
  }

  /**
   * 是否为未找到错误
   */
  static isNotFoundError(error: ApiError): boolean {
    return error.code === 404;
  }

  /**
   * 是否为服务器错误
   */
  static isServerError(error: ApiError): boolean {
    return error.code >= 500;
  }
}

/**
 * 创建错误处理 hook
 */
export function useErrorHandler() {
  const handleError = (error: unknown) => {
    return ErrorHandler.handle(error);
  };

  return { handleError };
}

export default ErrorHandler;
