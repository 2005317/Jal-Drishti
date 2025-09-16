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
        // Render a skeleton or null if no role is matched, even after mounting
        return null;
    }
  };
  
  // Prevents hydration mismatch by ensuring the component is mounted on the client
  // before rendering role-specific UI.
  if (!mounted) {
    return (
      <div className="container py-8 animate-fade-in-up">
        <div className="space-y-8">
            <div className="mb-8">
                <Skeleton className="h-12 w-1/2 mb-4" />
                <Skeleton className="h-6 w-3/4" />
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                <Skeleton className="h-48 rounded-xl" />
                <Skeleton className="h-48 rounded-xl" />
                <Skeleton className="h-48 rounded-xl lg:col-span-2" />
            </div>
             <div className="grid gap-6 md:grid-cols-5">
                <Skeleton className="h-72 rounded-xl md:col-span-3" />
                <Skeleton className="h-72 rounded-xl md:col-span-2" />
            </div>
        </div>
      </div>
    )
  }

  return (
    <div className="transition-all duration-300 animate-fade-in-up">
      {renderDashboard()}
    </div>
  );
}
