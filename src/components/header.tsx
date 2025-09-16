'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Languages, Menu } from 'lucide-react';

import { useApp } from '@/contexts/app-provider';
import { cn } from '@/lib/utils';
import { ROLES, LANGUAGES, NAV_LINKS } from '@/lib/constants';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuLabel,
  DropdownMenuSeparator
} from '@/components/ui/dropdown-menu';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Logo } from '@/components/logo';

export function Header() {
  const { role, setRole, language, setLanguage, t } = useApp();
  const pathname = usePathname();
  const navLinks = NAV_LINKS[role];
  const currentRole = ROLES.find(r => r.value === role);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-background/30 backdrop-blur-lg">
      <div className="container flex h-16 items-center">
        <div className="mr-6 hidden md:flex">
          <Link href="/dashboard" className="flex items-center gap-2">
            <Logo />
            <span className="font-bold text-xl bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">Jal Drishti</span>
          </Link>
        </div>
        
        <div className="md:hidden">
           <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px] bg-background/80 backdrop-blur-xl border-r-white/10">
              <nav className="flex flex-col gap-4 p-4">
                <Link href="/dashboard" className="mb-4">
                  <Logo />
                </Link>
                {navLinks.map(({ href, labelKey, icon: Icon }) => (
                  <Link
                    key={href}
                    href={href}
                    className={cn(
                      "flex items-center gap-2 rounded-md px-3 py-2 text-base font-medium transition-colors",
                      pathname === href
                        ? 'bg-primary text-primary-foreground'
                        : 'text-foreground/70 hover:text-foreground hover:bg-white/5'
                    )}
                  >
                    <Icon className="h-5 w-5" />
                    {t(labelKey)}
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>

        <nav className="hidden items-center gap-6 text-sm font-medium md:flex">
          {navLinks.map(({ href, labelKey }) => (
            <Link
              key={href}
              href={href}
              className={cn(
                'transition-colors hover:text-primary',
                pathname === href ? 'text-primary font-semibold' : 'text-foreground/60'
              )}
            >
              {t(labelKey)}
            </Link>
          ))}
        </nav>
        
        <div className="flex flex-1 items-center justify-end space-x-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="w-40 justify-start bg-transparent text-foreground hover:bg-white/5 hover:text-white">
                {currentRole && <currentRole.icon className="mr-2 h-4 w-4 text-primary/80" />}
                {currentRole?.label}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-background/80 backdrop-blur-xl border-white/10 text-foreground">
              <DropdownMenuLabel>{t('selectRole')}</DropdownMenuLabel>
              <DropdownMenuSeparator className="bg-white/10" />
              <DropdownMenuRadioGroup value={role} onValueChange={(value) => setRole(value as any)}>
                {ROLES.map(({ value, label, icon: Icon }) => (
                  <DropdownMenuRadioItem key={value} value={value} className="cursor-pointer focus:bg-white/10">
                    <Icon className="mr-2 h-4 w-4 text-primary/80" />
                    {label}
                  </DropdownMenuRadioItem>
                ))}
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon" className="bg-transparent text-foreground hover:bg-white/5 hover:text-white">
                <Languages className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-background/80 backdrop-blur-xl border-white/10 text-foreground">
               <DropdownMenuRadioGroup value={language} onValueChange={(value) => setLanguage(value as any)}>
                {LANGUAGES.map(({ value, label }) => (
                  <DropdownMenuRadioItem key={value} value={value} className="cursor-pointer focus:bg-white/10">
                    {label}
                  </DropdownMenuRadioItem>
                ))}
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
