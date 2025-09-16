'use client';
import { Landmark, AreaChart, PieChart, Users, FileText } from 'lucide-react';
import { useApp } from '@/contexts/app-provider';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { ResponsiveContainer, AreaChart as RechartsAreaChart, XAxis, YAxis, Tooltip, Area, PieChart as RechartsPieChart, Pie, Cell, Legend } from 'recharts';

const waterUsageData = [
  { name: 'Jan', usage: 400 },
  { name: 'Feb', usage: 300 },
  { name: 'Mar', usage: 500 },
  { name: 'Apr', usage: 450 },
  { name: 'May', usage: 600 },
  { name: 'Jun', usage: 550 },
];

const policyComplianceData = [
  { name: 'Compliant', value: 75, color: 'hsl(var(--chart-2))' },
  { name: 'Non-compliant', value: 25, color: 'hsl(var(--chart-5))' },
];

export default function GovernmentDashboard() {
  const { t } = useApp();

  return (
    <div className="container py-8">
       <div className="mb-8">
        <h1 className="text-4xl font-black tracking-tighter sm:text-5xl md:text-6xl bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60">
          {t('governmentDashboard')}
        </h1>
        <p className="text-muted-foreground mt-4 max-w-2xl">{t('govIntro')}</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="glass-card">
            <CardHeader className="flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Total Monitored Regions</CardTitle>
                <Landmark className="w-4 h-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">1,254</div>
                <p className="text-xs text-muted-foreground">+12 since last month</p>
            </CardContent>
        </Card>
        <Card className="glass-card">
            <CardHeader className="flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Active Alerts</CardTitle>
                <AreaChart className="w-4 h-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold text-yellow-400">83</div>
                <p className="text-xs text-muted-foreground">Critical levels in 15 regions</p>
            </CardContent>
        </Card>
        <Card className="glass-card">
            <CardHeader className="flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Farmers Enrolled</CardTitle>
                <Users className="w-4 h-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">28,493</div>
                <p className="text-xs text-muted-foreground">+2,104 this quarter</p>
            </CardContent>
        </Card>
        <Card className="glass-card">
            <CardHeader className="flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Reports Generated</CardTitle>
                <FileText className="w-4 h-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">431</div>
                <p className="text-xs text-muted-foreground">View and download reports</p>
            </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-5 mt-6">
        <Card className="glass-card md:col-span-3">
            <CardHeader>
                <CardTitle>Regional Water Usage Trend</CardTitle>
                <CardDescription>Monthly water consumption across all regions.</CardDescription>
            </CardHeader>
            <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                    <RechartsAreaChart data={waterUsageData}>
                        <defs>
                            <linearGradient id="colorUsage" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.8}/>
                                <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                            </linearGradient>
                        </defs>
                        <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                        <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12}/>
                        <Tooltip
                            contentStyle={{
                                backgroundColor: "hsl(var(--background))",
                                border: "1px solid hsl(var(--border))",
                                backdropFilter: 'blur(10px)',
                            }}
                        />
                        <Area type="monotone" dataKey="usage" stroke="hsl(var(--primary))" fillOpacity={1} fill="url(#colorUsage)" />
                    </RechartsAreaChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
        <Card className="glass-card md:col-span-2">
            <CardHeader>
                <CardTitle>Policy Compliance Rate</CardTitle>
                <CardDescription>Adherence to water conservation policies.</CardDescription>
            </CardHeader>
            <CardContent>
                 <ResponsiveContainer width="100%" height={300}>
                    <RechartsPieChart>
                        <Pie data={policyComplianceData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} labelLine={false} label={({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
                            const radius = innerRadius + (outerRadius - innerRadius) * 1.2;
                            const x = cx + radius * Math.cos(-midAngle * (Math.PI / 180));
                            const y = cy + radius * Math.sin(-midAngle * (Math.PI / 180));
                            return (<text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central" >
                                {`${(percent * 100).toFixed(0)}%`}
                            </text>);
                        }}>
                        {policyComplianceData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                        </Pie>
                        <Legend iconType="circle" />
                    </RechartsPieChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
      </div>
    </div>
  );
}
