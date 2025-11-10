import {
  useQuery,
  useMutation,
  useQueryClient,
  UseQueryOptions,
  UseMutationOptions,
} from '@tanstack/react-query';
import { AuthService, LoginRequest, RegisterRequest, AuthResponse } from '@/lib/api/services';
import { queryKeys } from '@/lib/api/query-client';
import { User } from '@/types/models';
import { ApiError } from '@/types/api';

/**
 * 获取当前用户信息
 */
export function useCurrentUser(
  options?: Omit<UseQueryOptions<User, ApiError>, 'queryKey' | 'queryFn'>
) {
  return useQuery({
    queryKey: queryKeys.auth.me(),
    queryFn: () => AuthService.getCurrentUser(),
    ...options,
  });
}

/**
 * 登录
 */
export function useLogin(
  options?: UseMutationOptions<AuthResponse, ApiError, LoginRequest>
) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: LoginRequest) => AuthService.login(data),
    onSuccess: (data) => {
      // 登录成功后，设置用户信息到缓存
      queryClient.setQueryData(queryKeys.auth.me(), data.user);
    },
    ...options,
  });
}

/**
 * 注册
 */
export function useRegister(
  options?: UseMutationOptions<AuthResponse, ApiError, RegisterRequest>
) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: RegisterRequest) => AuthService.register(data),
    onSuccess: (data) => {
      // 注册成功后，设置用户信息到缓存
      queryClient.setQueryData(queryKeys.auth.me(), data.user);
    },
    ...options,
  });
}

/**
 * 登出
 */
export function useLogout(
  options?: UseMutationOptions<void, ApiError, void>
) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => AuthService.logout(),
    onSuccess: () => {
      // 登出成功后，清除所有缓存
      queryClient.clear();
    },
    ...options,
  });
}

/**
 * 更新用户信息
 */
export function useUpdateProfile(
  options?: UseMutationOptions<User, ApiError, Partial<User>>
) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: Partial<User>) => AuthService.updateProfile(data),
    onSuccess: (data) => {
      // 更新成功后，更新用户信息缓存
      queryClient.setQueryData(queryKeys.auth.me(), data);
    },
    ...options,
  });
}

/**
 * 修改密码
 */
export function useChangePassword(
  options?: UseMutationOptions<
    void,
    ApiError,
    { oldPassword: string; newPassword: string }
  >
) {
  return useMutation({
    mutationFn: ({ oldPassword, newPassword }) =>
      AuthService.changePassword(oldPassword, newPassword),
    ...options,
  });
}

/**
 * 忘记密码
 */
export function useForgotPassword(
  options?: UseMutationOptions<void, ApiError, string>
) {
  return useMutation({
    mutationFn: (email: string) => AuthService.forgotPassword(email),
    ...options,
  });
}

/**
 * 重置密码
 */
export function useResetPassword(
  options?: UseMutationOptions<
    void,
    ApiError,
    { token: string; newPassword: string }
  >
) {
  return useMutation({
    mutationFn: ({ token, newPassword }) =>
      AuthService.resetPassword(token, newPassword),
    ...options,
  });
}
