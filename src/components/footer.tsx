'use client';
import { useApp } from '@/contexts/app-provider';

export function Footer() {
  const { t } = useApp();
  return (
    <footer className="border-t">
      <div className="container flex h-14 items-center justify-center">
        <p className="text-sm text-muted-foreground">
          {t('footerText')}
        </p>
      </div>
    </footer>
  );
}
