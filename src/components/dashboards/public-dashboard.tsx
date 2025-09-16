'use client';

import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts";
import { useApp } from '@/contexts/app-provider';
import { cn } from '@/lib/utils';
import { AlertTriangle, ShieldCheck, TrendingDown } from 'lucide-react';

type Level = 'village' | 'district';

const healthData: Record<Level, { label: string; value: number; statusKey: 'normal' | 'concerning' | 'critical' }> = {
  village: { label: 'Sunnyvale', value: 75, statusKey: 'normal' },
  district: { label: 'North County', value: 45, statusKey: 'concerning' },
};

const historicalData = [
  { month: 'Jan', level: 82 }, { month: 'Feb', level: 78 }, { month: 'Mar', level: 75 },
  { month: 'Apr', level: 68 }, { month: 'May', level: 65 }, { month: 'Jun', level: 72 },
];

const getStatusInfo = (statusKey: string) => {
    switch (statusKey) {
      case 'normal': return { color: 'text-green-400', icon: <ShieldCheck className="h-5 w-5" />, bgColor: 'bg-green-500/10' };
      case 'concerning': return { color: 'text-yellow-400', icon: <AlertTriangle className="h-5 w-5" />, bgColor: 'bg-yellow-500/10' };
      case 'critical': return { color: 'text-red-400', icon: <TrendingDown className="h-5 w-5" />, bgColor: 'bg-red-500/10' };
      default: return { color: 'text-gray-400', icon: null, bgColor: 'bg-gray-500/10' };
    }
};

export default function PublicDashboard() {
  const [level, setLevel] = useState<Level>('village');
  const { t } = useApp();
  
  const currentHealth = healthData[level];
  const statusInfo = getStatusInfo(currentHealth.statusKey);

  return (
    <div className="container py-8">
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-black tracking-tighter sm:text-5xl md:text-6xl bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60">
          {t('groundwaterHealth')}
        </h1>
        <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
          {t('publicIntro')}
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-3">
        <Card className="glass-card md:col-span-1">
          <CardHeader>
            <CardTitle className="text-lg font-medium text-muted-foreground">Current Status</CardTitle>
            <CardDescription>
              <Select value={level} onValueChange={(value: Level) => setLevel(value)}>
                <SelectTrigger className="mt-2 bg-transparent/20 border-white/20">
                  <SelectValue placeholder="Select level" />
                </SelectTrigger>
                <SelectContent className="bg-background/80 backdrop-blur-xl border-white/10 text-foreground">
                  <SelectItem value="village" className="cursor-pointer focus:bg-white/10">{t('villageLevel')}</SelectItem>
                  <SelectItem value="district" className="cursor-pointer focus:bg-white/10">{t('districtLevel')}</SelectItem>
                </SelectContent>
              </Select>
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center justify-center gap-4">
            <div className={`w-32 h-32 rounded-full flex items-center justify-center ${statusInfo.bgColor}`}>
                <div className={`w-24 h-24 rounded-full flex items-center justify-center ${statusInfo.bgColor}`}>
                    <span className={cn("font-bold text-4xl", statusInfo.color)}>{currentHealth.value}</span>
                </div>
            </div>
            <div className="text-center">
              <p className="text-xl font-bold">{currentHealth.label}</p>
              <p className={cn("text-lg font-semibold", statusInfo.color)}>{t(currentHealth.statusKey)}</p>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card md:col-span-2">
          <CardHeader>
            <CardTitle>Historical Levels (6 Months)</CardTitle>
            <CardDescription>Groundwater level percentage over time.</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={historicalData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <XAxis dataKey="month" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--background))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "var(--radius)",
                    backdropFilter: 'blur(10px)',
                  }}
                  cursor={{ fill: 'hsla(var(--primary), 0.1)' }}
                />
                <Bar dataKey="level" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
