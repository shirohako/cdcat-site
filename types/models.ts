import { z } from 'zod';

/**
 * 音乐模型类型定义
 */

// ========== User (用户) ==========
export const UserSchema = z.object({
  id: z.string(),
  username: z.string(),
  email: z.string().email(),
  avatar: z.string().optional(),
  role: z.enum(['admin', 'user', 'guest']),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export type User = z.infer<typeof UserSchema>;

// ========== Artist (艺术家) ==========
export const ArtistSchema = z.object({
  id: z.string(),
  name: z.string(),
  avatar: z.string().optional(),
  bio: z.string().optional(),
  country: z.string().optional(),
  genres: z.array(z.string()).optional(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export type Artist = z.infer<typeof ArtistSchema>;

// ========== Album (专辑) ==========
export const AlbumSchema = z.object({
  id: z.string(),
  title: z.string(),
  cover: z.string().optional(),
  releaseDate: z.string(),
  artistId: z.string(),
  artist: ArtistSchema.optional(),
  genres: z.array(z.string()).optional(),
  trackCount: z.number(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export type Album = z.infer<typeof AlbumSchema>;

// ========== Track (曲目) ==========
export const TrackSchema = z.object({
  id: z.string(),
  title: z.string(),
  duration: z.number(), // 秒
  trackNumber: z.number(),
  albumId: z.string(),
  album: AlbumSchema.optional(),
  artistId: z.string(),
  artist: ArtistSchema.optional(),
  genres: z.array(z.string()).optional(),
  audioUrl: z.string().optional(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export type Track = z.infer<typeof TrackSchema>;

// ========== Playlist (播放列表) ==========
export const PlaylistSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string().optional(),
  cover: z.string().optional(),
  userId: z.string(),
  user: UserSchema.optional(),
  trackCount: z.number(),
  isPublic: z.boolean(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export type Playlist = z.infer<typeof PlaylistSchema>;

// ========== Genre (流派) ==========
export const GenreSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string().optional(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export type Genre = z.infer<typeof GenreSchema>;

// ========== Event (活动) ==========
export const EventSchema = z.object({
  id: z.number(),
  name: z.string(),
  slug: z.string(),
  main_visual_url: z.string().nullable(),
  type: z.string(),
  start_date: z.string(),
  end_date: z.string().nullable(),
  venue: z.string().nullable(),
  location: z.string().nullable(),
  website: z.string().nullable(),
  translations: z.object({
    ja: z.object({
      name: z.string(),
    }).optional(),
  }).optional(),
  key_visuals: z.unknown().nullable(),
  total_works: z.number(),
  total_participants: z.number(),
  meta: z.unknown().nullable(),
  created_at: z.string(),
  updated_at: z.string(),
});

export type Event = z.infer<typeof EventSchema>;
