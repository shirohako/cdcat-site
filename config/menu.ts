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
  labelKey: string;
  active?: boolean;
};

type Menu = {
  href: string;
  labelKey: string;
  active?: boolean;
  icon: LucideIcon;
  submenus?: Submenu[];
};

type Group = {
  groupLabelKey: string;
  menus: Menu[];
};

export function getMenuList(pathname: string): Group[] {
  return [
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
          href: "/events",
          labelKey: "menu.events",
          icon: Music,
          submenus: []
        },
      ]
    },
  ];
}
