'use client';

import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useApp } from '@/contexts/app-provider';
import { cn } from '@/lib/utils';

type Level = 'village' | 'district';

const healthData: Record<Level, { value: number; statusKey: 'normal' | 'concerning' | 'critical' }> = {
  village: { value: 75, statusKey: 'normal' },
  district: { value: 45, statusKey: 'concerning' },
};

export default function PublicDashboard() {
  const [level, setLevel] = useState<Level>('village');
  const { t } = useApp();
  
  const currentHealth = healthData[level];

  const getStatusColor = (statusKey: string) => {
    switch (statusKey) {
      case 'normal': return 'text-green-600';
      case 'concerning': return 'text-yellow-600';
      case 'critical': return 'text-red-600';
      default: return 'text-muted-foreground';
    }
  };

  return (
    <div className="container py-8">
      <div className="grid place-items-center">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>{t('groundwaterHealth')}</CardTitle>
            <CardDescription>
              <Select value={level} onValueChange={(value: Level) => setLevel(value)}>
                <SelectTrigger className="mt-2">
                  <SelectValue placeholder="Select level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="village">{t('villageLevel')}</SelectItem>
                  <SelectItem value="district">{t('districtLevel')}</SelectItem>
                </SelectContent>
              </Select>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Progress value={currentHealth.value} className="h-4" />
          </CardContent>
          <CardFooter>
            <div className="flex items-center gap-2 text-sm">
                <span className="text-muted-foreground">{t('status')}:</span>
                <span className={cn("font-semibold", getStatusColor(currentHealth.statusKey))}>
                    {t(currentHealth.statusKey)}
                </span>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
