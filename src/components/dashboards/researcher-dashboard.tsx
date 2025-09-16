'use client';
import { FlaskConical, Database, FileText, BrainCircuit, ArrowRight } from 'lucide-react';
import { useApp } from '@/contexts/app-provider';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '../ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import Link from 'next/link';

const sampleData = [
  { name: 'Region A', 'Aquifer Level': 4000, 'Rainfall (mm)': 2400 },
  { name: 'Region B', 'Aquifer Level': 3000, 'Rainfall (mm)': 1398 },
  { name: 'Region C', 'Aquifer Level': 2000, 'Rainfall (mm)': 9800 },
  { name: 'Region D', 'Aquifer Level': 2780, 'Rainfall (mm)': 3908 },
  { name: 'Region E', 'Aquifer Level': 1890, 'Rainfall (mm)': 4800 },
  { name: 'Region F', 'Aquifer Level': 2390, 'Rainfall (mm)': 3800 },
  { name: 'Region G', 'Aquifer Level': 3490, 'Rainfall (mm)': 4300 },
];

export default function ResearcherDashboard() {
  const { t } = useApp();

  const toolCards = [
    { href: "/forecast", icon: BrainCircuit, title: "AI Forecasting Model", description: "Predict future water availability." },
    { href: "#", icon: Database, title: "Download Raw Data", description: "Access comprehensive datasets." },
    { href: "#", icon: FileText, title: "Published Papers", description: "Browse relevant research papers." },
  ];

  return (
    <div className="container py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-black tracking-tighter sm:text-5xl md:text-6xl bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60">
          {t('researcherDashboard')}
        </h1>
        <p className="text-muted-foreground mt-4 max-w-2xl">{t('researcherIntro')}</p>
      </div>

      <div className="grid gap-6">
        <Card className="glass-card">
          <CardHeader>
            <CardTitle>Comparative Regional Analysis</CardTitle>
            <CardDescription>Comparing aquifer levels and rainfall across different regions.</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={350}>
              <BarChart data={sampleData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsla(var(--border), 0.5)" />
                <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" />
                <YAxis yAxisId="left" orientation="left" stroke="hsl(var(--chart-1))" />
                <YAxis yAxisId="right" orientation="right" stroke="hsl(var(--chart-2))" />
                <Tooltip
                    contentStyle={{
                        backgroundColor: "hsl(var(--background) / 0.8)",
                        border: "1px solid hsl(var(--border))",
                        borderRadius: "var(--radius)",
                        backdropFilter: 'blur(10px)',
                    }}
                    cursor={{ fill: 'hsla(var(--primary), 0.1)' }}
                />
                <Legend wrapperStyle={{ color: "hsl(var(--foreground))", paddingTop: '20px' }}/>
                <Bar yAxisId="left" dataKey="Aquifer Level" fill="hsl(var(--chart-1))" radius={[4, 4, 0, 0]} />
                <Bar yAxisId="right" dataKey="Rainfall (mm)" fill="hsl(var(--chart-2))" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <div className="grid gap-6 md:grid-cols-3">
          {toolCards.map((tool, index) => (
            <Link href={tool.href} key={index}>
              <Card className="glass-card h-full group hover:border-primary/50 transition-all duration-300 hover:scale-105 flex flex-col">
                  <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="p-3 rounded-lg bg-secondary">
                          <tool.icon className="w-8 h-8 text-primary" />
                        </div>
                        <ArrowRight className="text-muted-foreground group-hover:text-primary transition-transform group-hover:translate-x-1" />
                      </div>
                  </CardHeader>
                  <CardContent>
                    <CardTitle>{tool.title}</CardTitle>
                    <CardDescription className="mt-2">{tool.description}</CardDescription>
                  </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
