'use client';
import Image from 'next/image';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { useApp } from '@/contexts/app-provider';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Droplets, BarChart, Sun, ArrowUpRight } from 'lucide-react';
import Link from 'next/link';

const icons = [
  <Sun key="1" className="size-8 text-yellow-400" />,
  <Droplets key="2" className="size-8 text-blue-400" />,
  <BarChart key="3" className="size-8 text-green-400" />,
];

export default function FarmerDashboard() {
  const { t } = useApp();
  
  const cardData = [
    {
      title: t('cropWaterNeeds'),
      description: 'Analyze moisture levels and get specific recommendations for your crops.',
      icon: icons[0],
      imgId: 'crop-water-needs',
      href: '/forecast'
    },
    {
      title: t('irrigationRecs'),
      description: 'Optimize your irrigation schedule based on weather forecasts and soil data.',
      icon: icons[1],
      imgId: 'irrigation-recommendations',
      href: '/conservation-tips'
    },
    {
      title: t('groundwaterForecast'),
      description: 'View long-term groundwater availability predictions for your region.',
      icon: icons[2],
      imgId: 'groundwater-forecast',
      href: '/forecast'
    }
  ];

  return (
    <div className="container py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-black tracking-tighter sm:text-5xl md:text-6xl bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60">
            {t('farmerDashboard')}
        </h1>
        <p className="text-muted-foreground mt-4 max-w-2xl">
          Actionable insights to help you manage water resources effectively and improve crop yield.
        </p>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {cardData.map((item, index) => {
          const placeholder = PlaceHolderImages.find(p => p.id === item.imgId);
          return (
            <Link href={item.href} key={index}>
              <Card className="glass-card h-full flex flex-col group hover:border-primary/50 transition-all">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-4">
                      <div className="p-3 rounded-lg bg-secondary">
                        {item.icon}
                      </div>
                      <div>
                        <CardTitle className="text-lg font-bold">{item.title}</CardTitle>
                      </div>
                    </div>
                    <ArrowUpRight className="text-muted-foreground group-hover:text-primary transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                  </div>
                </CardHeader>
                <CardContent className="flex-grow">
                  <p className="text-muted-foreground">{item.description}</p>
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
