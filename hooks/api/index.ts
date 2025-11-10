/**
 * 统一导出所有 API hooks
 */

// 认证相关
export {
  useCurrentUser,
  useLogin,
  useRegister,
  useLogout,
  useUpdateProfile,
  useChangePassword,
  useForgotPassword,
  useResetPassword,
} from './use-auth';

// 艺术家相关
export {
  useArtists,
  useArtist,
  useArtistAlbums,
  useCreateArtist,
  useUpdateArtist,
  useDeleteArtist,
} from './use-artists';

// 活动相关
export {
  useEvents,
  useEvent,
  useCreateEvent,
  useUpdateEvent,
  useDeleteEvent,
} from './use-events';
