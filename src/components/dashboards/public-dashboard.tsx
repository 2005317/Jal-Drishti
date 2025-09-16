'use client';

import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, AreaChart, Area } from "recharts";
import { useApp } from '@/contexts/app-provider';
import { cn } from '@/lib/utils';
import { AlertTriangle, ShieldCheck, TrendingDown, MapPin } from 'lucide-react';

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
      case 'normal': return { text: 'Normal', color: 'text-green-400', icon: <ShieldCheck className="h-5 w-5" />, bgColor: 'bg-green-500/10' };
      case 'concerning': return { text: 'Concerning', color: 'text-yellow-400', icon: <AlertTriangle className="h-5 w-5" />, bgColor: 'bg-yellow-500/10' };
      case 'critical': return { text: 'Critical', color: 'text-red-400', icon: <TrendingDown className="h-5 w-5" />, bgColor: 'bg-red-500/10' };
      default: return { text: 'Unknown', color: 'text-gray-400', icon: null, bgColor: 'bg-gray-500/10' };
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
          </CardHeader>
          <CardContent className="flex flex-col items-center justify-center text-center gap-4">
            <Select value={level} onValueChange={(value: Level) => setLevel(value)}>
              <SelectTrigger className="w-full bg-transparent/20 border-white/20">
                <SelectValue placeholder="Select level" />
              </SelectTrigger>
              <SelectContent className="bg-background/80 backdrop-blur-xl border-white/10 text-foreground">
                <SelectItem value="village" className="cursor-pointer focus:bg-white/10">{t('villageLevel')}</SelectItem>
                <SelectItem value="district" className="cursor-pointer focus:bg-white/10">{t('districtLevel')}</SelectItem>
              </SelectContent>
            </Select>

            <div className="relative w-40 h-40">
                <div className={`w-40 h-40 rounded-full flex items-center justify-center ${statusInfo.bgColor} animate-pulse-slow`}>
                    <div className={`w-32 h-32 rounded-full flex items-center justify-center ${statusInfo.bgColor}`}>
                        <span className={cn("font-bold text-5xl", statusInfo.color)}>{currentHealth.value}</span>
                    </div>
                </div>
            </div>
            
            <div>
              <p className="text-xl font-bold flex items-center justify-center gap-2"><MapPin className="text-primary size-5"/> {currentHealth.label}</p>
              <div className={cn("text-lg font-semibold flex items-center justify-center gap-2 mt-1", statusInfo.color)}>
                {statusInfo.icon} {statusInfo.text}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card md:col-span-2">
          <CardHeader>
            <CardTitle>Historical Levels (Last 6 Months)</CardTitle>
            <CardDescription>Groundwater availability percentage over time for {currentHealth.label}.</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={historicalData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                 <defs>
                    <linearGradient id="colorLevel" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                    </linearGradient>
                </defs>
                <XAxis dataKey="month" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} unit="%"/>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--background) / 0.8)",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "var(--radius)",
                    backdropFilter: 'blur(10px)',
                  }}
                  cursor={{ fill: 'hsla(var(--primary), 0.1)' }}
                />
                <Area type="monotone" dataKey="level" stroke="hsl(var(--primary))" fill="url(#colorLevel)" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
