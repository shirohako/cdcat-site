import {
  LayoutGrid,
  Music,
  Album,
  Mic2,
  ListMusic,
  Users,
  Radio,
  Disc3,
  TrendingUp,
  Settings,
  LucideIcon
} from "lucide-react";

type Submenu = {
  href: string;
  labelKey: string; // 改为翻译键
  active?: boolean;
};

type Menu = {
  href: string;
  labelKey: string; // 改为翻译键
  active?: boolean;
  icon: LucideIcon;
  submenus?: Submenu[];
};

type Group = {
  groupLabelKey: string; // 改为翻译键
  menus: Menu[];
};

export function getMenuList(pathname: string): Group[] {
  return [
    {
      groupLabelKey: "",
      menus: [
        {
          href: "/dashboard",
          labelKey: "menu.dashboard",
          icon: LayoutGrid,
          submenus: []
        }
      ]
    },
    {
      groupLabelKey: "menu.musicLibrary",
      menus: [
        {
          href: "/albums",
          labelKey: "menu.albums",
          icon: Album,
          submenus: []
        },
        {
          href: "/artists",
          labelKey: "menu.artists",
          icon: Mic2,
          submenus: []
        },
        {
          href: "/tracks",
          labelKey: "menu.tracks",
          icon: Music,
          submenus: []
        },
        {
          href: "",
          labelKey: "menu.playlists",
          icon: ListMusic,
          submenus: [
            {
              href: "/playlists",
              labelKey: "menu.allPlaylists"
            },
            {
              href: "/playlists/new",
              labelKey: "menu.newPlaylist"
            }
          ]
        },
        {
          href: "/genres",
          labelKey: "menu.genres",
          icon: Radio,
          submenus: []
        }
      ]
    },
    {
      groupLabelKey: "menu.discover",
      menus: [
        {
          href: "/discover",
          labelKey: "menu.discoverMusic",
          icon: Disc3,
          submenus: []
        },
        {
          href: "/trending",
          labelKey: "menu.trending",
          icon: TrendingUp,
          submenus: []
        }
      ]
    },
    {
      groupLabelKey: "menu.management",
      menus: [
        {
          href: "/users",
          labelKey: "menu.users",
          icon: Users,
          submenus: []
        },
        {
          href: "/settings",
          labelKey: "menu.settings",
          icon: Settings,
          submenus: []
        }
      ]
    }
  ];
}
