'use client';

import { useApp } from '@/contexts/app-provider';
import FarmerDashboard from '@/components/dashboards/farmer-dashboard';
import PublicDashboard from '@/components/dashboards/public-dashboard';
import ResearcherDashboard from '@/components/dashboards/researcher-dashboard';
import GovernmentDashboard from '@/components/dashboards/government-dashboard';
import { Skeleton } from '@/components/ui/skeleton';
import { useEffect, useState } from 'react';

export default function DashboardPage() {
  const { role } = useApp();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const renderDashboard = () => {
    switch (role) {
      case 'farmer':
        return <FarmerDashboard />;
      case 'public':
        return <PublicDashboard />;
      case 'researcher':
        return <ResearcherDashboard />;
      case 'government':
        return <GovernmentDashboard />;
      default:
        return null;
    }
  };
  
  // Prevents hydration mismatch by ensuring the component is mounted on the client
  // before rendering role-specific UI.
  if (!mounted) {
    return (
      <div className="container py-8">
        <div className="space-y-4">
            <Skeleton className="h-12 w-1/4" />
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                <Skeleton className="h-48" />
                <Skeleton className="h-48" />
                <Skeleton className="h-48" />
            </div>
        </div>
      </div>
    )
  }

  return (
    <div className="transition-all duration-300">
      {renderDashboard()}
    </div>
  );
}
