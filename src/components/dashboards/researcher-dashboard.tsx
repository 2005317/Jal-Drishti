'use client';
import { FlaskConical, Database, FileText, BrainCircuit } from 'lucide-react';
import { useApp } from '@/contexts/app-provider';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import Link from 'next/link';

const sampleData = [
  { name: 'Region A', uv: 4000, pv: 2400, amt: 2400 },
  { name: 'Region B', uv: 3000, pv: 1398, amt: 2210 },
  { name: 'Region C', uv: 2000, pv: 9800, amt: 2290 },
  { name: 'Region D', uv: 2780, pv: 3908, amt: 2000 },
  { name: 'Region E', uv: 1890, pv: 4800, amt: 2181 },
];

export default function ResearcherDashboard() {
  const { t } = useApp();

  return (
    <div className="container py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-black tracking-tighter sm:text-5xl md:text-6xl bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60">
          {t('researcherDashboard')}
        </h1>
        <p className="text-muted-foreground mt-4 max-w-2xl">{t('researcherIntro')}</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
            <Card className="glass-card">
              <CardHeader>
                <CardTitle>Comparative Regional Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={sampleData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsla(var(--border), 0.5)" />
                    <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" />
                    <YAxis stroke="hsl(var(--muted-foreground))" />
                    <Tooltip
                        contentStyle={{
                            backgroundColor: "hsl(var(--background))",
                            border: "1px solid hsl(var(--border))",
                            borderRadius: "var(--radius)",
                            backdropFilter: 'blur(10px)',
                        }}
                        cursor={{ fill: 'hsla(var(--primary), 0.1)' }}
                    />
                    <Legend wrapperStyle={{ color: "hsl(var(--foreground))" }}/>
                    <Bar dataKey="pv" fill="hsl(var(--chart-1))" name="Aquifer Level" />
                    <Bar dataKey="uv" fill="hsl(var(--chart-2))" name="Rainfall (mm)" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
        </div>

        <div className="space-y-6">
            <Link href="/forecast">
                <Card className="glass-card hover:border-primary/50 transition-all">
                    <CardHeader className="flex-row items-center gap-4 space-y-0">
                        <BrainCircuit className="w-8 h-8 text-primary" />
                        <CardTitle>AI Forecasting Model</CardTitle>
                    </CardHeader>
                </Card>
            </Link>
             <Card className="glass-card">
                <CardHeader className="flex-row items-center gap-4 space-y-0">
                    <Database className="w-8 h-8 text-accent" />
                    <CardTitle>Download Raw Data</CardTitle>
                </CardHeader>
            </Card>
             <Card className="glass-card">
                <CardHeader className="flex-row items-center gap-4 space-y-0">
                    <FileText className="w-8 h-8 text-secondary-foreground" />
                    <CardTitle>Published Papers</CardTitle>
                </CardHeader>
            </Card>
        </div>
      </div>
    </div>
  );
}
