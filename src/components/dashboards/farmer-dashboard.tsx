'use client';
import Image from 'next/image';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { useApp } from '@/contexts/app-provider';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Droplets, BarChart, Sun } from 'lucide-react';

const icons = [
  <Sun key="1" className="size-8 text-primary" />,
  <Droplets key="2" className="size-8 text-primary" />,
  <BarChart key="3" className="size-8 text-primary" />,
];

export default function FarmerDashboard() {
  const { t } = useApp();
  
  const cardData = [
    {
      title: t('cropWaterNeeds'),
      icon: icons[0],
      imgId: 'crop-water-needs'
    },
    {
      title: t('irrigationRecs'),
      icon: icons[1],
      imgId: 'irrigation-recommendations'
    },
    {
      title: t('groundwaterForecast'),
      icon: icons[2],
      imgId: 'groundwater-forecast'
    }
  ];

  return (
    <div className="container py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">{t('farmerDashboard')}</h1>
      </div>
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {cardData.map((item, index) => {
          const placeholder = PlaceHolderImages.find(p => p.id === item.imgId);
          return (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center gap-4">
                  {item.icon}
                  <CardTitle>{item.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                {placeholder && (
                   <div className="aspect-video relative">
                     <Image 
                       src={placeholder.imageUrl}
                       alt={placeholder.description}
                       data-ai-hint={placeholder.imageHint}
                       fill
                       className="rounded-md object-cover"
                     />
                   </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
