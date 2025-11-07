import { ModeToggle } from "@/components/mode-toggle";
import { LanguageToggle } from "@/components/language-toggle";
import { UserNav } from "@/components/admin-panel/user-nav";
import { SheetMenu } from "@/components/admin-panel/sheet-menu";

interface NavbarProps {
  title: string;
}

export function Navbar({ title }: NavbarProps) {
  return (
    <header className="sticky top-0 z-30 w-full bg-background/95 shadow backdrop-blur supports-backdrop-filter:bg-background/60 dark:shadow-secondary">
      <div className="px-3 sm:px-8 flex h-14 items-center gap-2">
        <div className="flex items-center gap-2 lg:gap-0 min-w-0">
          <SheetMenu />
          <h1 className="font-bold text-sm sm:text-base truncate">{title}</h1>
        </div>
        <div className="flex flex-1 items-center justify-end gap-1 sm:gap-2">
          <LanguageToggle />
          <ModeToggle />
          <UserNav />
        </div>
      </div>
    </header>
  );
}
