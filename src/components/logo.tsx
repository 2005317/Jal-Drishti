import { Droplets } from 'lucide-react';
import { cn } from '@/lib/utils';

export function Logo({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-cyan-400 h-8 w-8", className)}>
      <Droplets className="h-5 w-5 text-white" />
    </div>
  );
}
