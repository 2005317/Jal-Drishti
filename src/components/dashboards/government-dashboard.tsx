'use client';
import { Landmark, AreaChart, PieChart, Users, FileText, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { useApp } from '@/contexts/app-provider';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { ResponsiveContainer, AreaChart as RechartsAreaChart, XAxis, YAxis, Tooltip, Area, PieChart as RechartsPieChart, Pie, Cell, Legend } from 'recharts';

const waterUsageData = [
  { name: 'Jan', usage: 4000 },
  { name: 'Feb', usage: 3000 },
  { name: 'Mar', usage: 5000 },
  { name: 'Apr', usage: 4500 },
  { name: 'May', usage: 6000 },
  { name: 'Jun', usage: 5500 },
];

const policyComplianceData = [
  { name: 'Compliant', value: 75, color: 'hsl(var(--chart-2))' },
  { name: 'Non-compliant', value: 25, color: 'hsl(var(--chart-5))' },
];

export default function GovernmentDashboard() {
  const { t } = useApp();
  
  const kpiCards = [
      { title: "Total Monitored Regions", value: "1,254", change: "+12 since last month", icon: Landmark },
      { title: "Active Alerts", value: "83", change: "Critical levels in 15 regions", icon: AlertTriangle, color: "text-yellow-400" },
      { title: "Farmers Enrolled", value: "28,493", change: "+2,104 this quarter", icon: Users },
      { title: "Policy Initiatives", value: "12 Active", change: "2 new policies launched", icon: FileText },
  ]

  return (
    <div className="container py-8">
       <div className="mb-8">
        <h1 className="text-4xl font-black tracking-tighter sm:text-5xl md:text-6xl bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60">
          {t('governmentDashboard')}
        </h1>
        <p className="text-muted-foreground mt-4 max-w-2xl">{t('govIntro')}</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {kpiCards.map((card, index) => (
            <Card key={index} className="glass-card">
                <CardHeader className="flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium">{card.title}</CardTitle>
                    <card.icon className="w-4 h-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className={`text-2xl font-bold ${card.color || ''}`}>{card.value}</div>
                    <p className="text-xs text-muted-foreground">{card.change}</p>
                </CardContent>
            </Card>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-5 mt-6">
        <Card className="glass-card md:col-span-3">
            <CardHeader>
                <CardTitle>Regional Water Usage Trend</CardTitle>
                <CardDescription>Monthly water consumption (in million cubic meters).</CardDescription>
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
                                backgroundColor: "hsl(var(--background) / 0.8)",
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
                            const radius = innerRadius + (outerRadius - innerRadius) * 1.3;
                            const x = cx + radius * Math.cos(-midAngle * (Math.PI / 180));
                            const y = cy + radius * Math.sin(-midAngle * (Math.PI / 180));
                            return (<text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central" className="text-sm font-bold">
                                {`${(percent * 100).toFixed(0)}%`}
                            </text>);
                        }}>
                        {policyComplianceData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} className="transition-all duration-300 hover:opacity-80" stroke="hsl(var(--background))" strokeWidth={2}/>
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
