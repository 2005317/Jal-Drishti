'use client'

import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { useApp } from '@/contexts/app-provider';

export default function MapPage() {
  const mapImage = PlaceHolderImages.find(p => p.id === 'map-dashboard');
  const { t } = useApp();

  return (
    <div className="container py-8">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold tracking-tight">{t('mapDashboard')}</h1>
        <p className="text-muted-foreground mt-2">{t('mapDescription')}</p>
      </div>
      <Card>
        <CardContent className="p-2">
          {mapImage && (
            <div className="relative aspect-[3/2] w-full">
               <Image
                src={mapImage.imageUrl}
                alt={mapImage.description}
                data-ai-hint={mapImage.imageHint}
                fill
                className="rounded-md object-cover"
              />
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
