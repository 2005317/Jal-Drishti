'use client';
import { FlaskConical } from 'lucide-react';
import { useApp } from '@/contexts/app-provider';

export default function ResearcherDashboard() {
  const { t } = useApp();

  return (
    <div className="container py-8">
      <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed bg-muted/50 p-12 text-center h-[60vh]">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 mb-4">
          <FlaskConical className="h-8 w-8 text-primary" />
        </div>
        <h2 className="text-2xl font-bold tracking-tight">{t('researcherDashboard')}</h2>
        <p className="text-muted-foreground mt-2">{t('researcherIntro')}</p>
      </div>
    </div>
  );
}
