import type { LucideIcon } from 'lucide-react';
import { LayoutDashboard, Map, BrainCircuit, Leaf, User, Users, FlaskConical, Landmark } from 'lucide-react';

export type Role = 'farmer' | 'public' | 'researcher' | 'government';
export type Language = 'en' | 'hi';

export const ROLES: { value: Role; label: string, icon: LucideIcon }[] = [
  { value: 'farmer', label: 'Farmer', icon: User },
  { value: 'public', label: 'Public', icon: Users },
  { value: 'researcher', label: 'Researcher', icon: FlaskConical },
  { value: 'government', label: 'Government', icon: Landmark },
];

export const LANGUAGES: { value: Language; label: string }[] = [
  { value: 'en', label: 'English' },
  { value: 'hi', label: 'हिंदी' },
];

export const NAV_LINKS: Record<Role, { href: string; labelKey: string; icon: LucideIcon }[]> = {
  farmer: [
    { href: '/dashboard', labelKey: 'dashboard', icon: LayoutDashboard },
    { href: '/map', labelKey: 'map', icon: Map },
    { href: '/forecast', labelKey: 'forecast', icon: BrainCircuit },
    { href: '/conservation-tips', labelKey: 'conservationTips', icon: Leaf },
  ],
  public: [
    { href: '/dashboard', labelKey: 'dashboard', icon: LayoutDashboard },
    { href: '/map', labelKey: 'map', icon: Map },
    { href: '/conservation-tips', labelKey: 'conservationTips', icon: Leaf },
  ],
  researcher: [
    { href: '/dashboard', labelKey: 'dashboard', icon: LayoutDashboard },
    { href: '/map', labelKey: 'map', icon: Map },
    { href: '/forecast', labelKey: 'forecast', icon: BrainCircuit },
  ],
  government: [
    { href: '/dashboard', labelKey: 'dashboard', icon: LayoutDashboard },
    { href: '/map', labelKey: 'map', icon: Map },
    { href: '/forecast', labelKey: 'forecast', icon: BrainCircuit },
  ],
};
