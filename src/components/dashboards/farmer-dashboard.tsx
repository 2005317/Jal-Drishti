'use client';
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from "@/components/ui/card";
import { useApp } from '@/contexts/app-provider';
import { Droplets, Sun, Cloud, ArrowUpRight, TrendingUp, TrendingDown, Info, Calendar } from 'lucide-react';
import Link from 'next/link';
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts";
import { Button } from "../ui/button";

const soilMoistureData = [
  { day: 'Mon', moisture: 35 }, { day: 'Tue', moisture: 38 },
  { day: 'Wed', moisture: 32 }, { day: 'Thu', moisture: 45 },
  { day: 'Fri', moisture: 42 }, { day: 'Sat', moisture: 50 },
  { day: 'Sun', moisture: 48 },
];

export default function FarmerDashboard() {
  const { t } = useApp();
  
  const weather = {
    temp: '32°C',
    condition: 'Sunny',
    icon: <Sun className="size-10 text-yellow-400" />,
  };

  const waterLevel = {
    current: 78,
    change: 2,
    isIncreasing: true,
  };

  const quickActions = [
    { title: t('irrigationRecs'), href: '/conservation-tips', icon: <Droplets /> },
    { title: t('groundwaterForecast'), href: '/forecast', icon: <TrendingUp /> },
  ];

  return (
    <div className="container py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-black tracking-tighter sm:text-5xl md:text-6xl bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60 dark:from-primary dark:to-white/60">
            {t('farmerDashboard')}
        </h1>
        <p className="text-muted-foreground mt-4 max-w-2xl">
          Actionable insights to help you manage water resources effectively and improve crop yield.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {/* Weather Card */}
        <Card className="glass-card">
          <CardHeader>
            <CardTitle>Today's Weather</CardTitle>
          </CardHeader>
          <CardContent className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              {weather.icon}
              <div className="text-4xl font-bold">{weather.temp}</div>
            </div>
            <div className="text-right">
              <p className="text-lg">{weather.condition}</p>
              <p className="text-sm text-muted-foreground">Nagpur, Maharashtra</p>
            </div>
          </CardContent>
        </Card>

        {/* Water Level Card */}
        <Card className="glass-card">
          <CardHeader>
            <CardTitle>Aquifer Water Level</CardTitle>
          </CardHeader>
          <CardContent className="flex items-center justify-between">
            <div className="text-4xl font-bold">{waterLevel.current}<span className="text-xl text-muted-foreground">%</span></div>
            <div className={`flex items-center gap-2 font-bold ${waterLevel.isIncreasing ? 'text-green-500' : 'text-red-500'}`}>
              {waterLevel.isIncreasing ? <TrendingUp /> : <TrendingDown />}
              <span>{waterLevel.change}%</span>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions Card */}
        <Card className="glass-card">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-2 gap-4">
            {quickActions.map(action => (
              <Link href={action.href} key={action.title}>
                <Button variant="outline" className="w-full h-20 flex-col gap-2 bg-transparent hover:bg-primary/10">
                  {action.icon}
                  <span className="text-xs text-center">{action.title}</span>
                </Button>
              </Link>
            ))}
          </CardContent>
        </Card>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2 mt-6">
        {/* Soil Moisture Chart */}
        <Card className="glass-card">
          <CardHeader>
            <CardTitle>Weekly Soil Moisture</CardTitle>
            <CardDescription>Average moisture content in your fields.</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={soilMoistureData}>
                <XAxis dataKey="day" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} unit="%" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--background) / 0.8)",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "var(--radius)",
                    backdropFilter: 'blur(10px)',
                  }}
                  cursor={{ fill: 'hsla(var(--primary), 0.1)' }}
                />
                <Bar dataKey="moisture" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Crop Water Needs */}
        <Card className="glass-card flex flex-col">
          <CardHeader>
            <CardTitle>{t('cropWaterNeeds')}</CardTitle>
            <CardDescription>Recommendations for your primary crop: Wheat</CardDescription>
          </CardHeader>
          <CardContent className="flex-grow">
            <div className="bg-primary/10 p-4 rounded-lg flex items-center gap-4">
              <Info className="text-primary size-6 flex-shrink-0" />
              <p className="text-sm text-primary-foreground/80">
                Your wheat crop is in the flowering stage. It requires <strong>~25mm of water</strong> this week. Current soil moisture is adequate, but monitor for dry spells.
              </p>
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full">
              <Calendar className="mr-2"/>
              View Detailed Schedule
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
