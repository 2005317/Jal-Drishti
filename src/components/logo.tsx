import { Droplets } from 'lucide-react';
import { cn } from '@/lib/utils';

export function Logo({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center gap-2 text-primary", className)}>
      <Droplets className="h-6 w-6" />
      <span className="font-bold text-xl text-foreground">Jal Drishti</span>
    </div>
  );
}
