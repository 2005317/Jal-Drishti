'use client'

import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { useApp } from '@/contexts/app-provider';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Layers, Droplets, Thermometer, Wind, ZoomIn, ZoomOut, Maximize } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Skeleton } from '@/components/ui/skeleton';

const layers = [
  { id: 'groundwater', name: 'Groundwater', icon: <Droplets /> },
  { id: 'rainfall', name: 'Rainfall', icon: <Layers /> },
  { id: 'temperature', name: 'Temperature', icon: <Thermometer /> },
  { id: 'soil', name: 'Soil Moisture', icon: <Wind /> },
];

export default function MapPage() {
  const mapImage = PlaceHolderImages.find(p => p.id === 'map-dashboard');
  const { t } = useApp();
  const [activeLayer, setActiveLayer] = useState('groundwater');
  const [timeframe, setTimeframe] = useState('realtime');
  const [zoom, setZoom] = useState(1);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="container py-8 animate-fade-in-up">
        <div className="mb-8 text-center">
          <Skeleton className="h-12 w-3/4 mx-auto mb-4" />
          <Skeleton className="h-6 w-1/2 mx-auto" />
        </div>
        <Card className="glass-card overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-4">
            <div className="lg:col-span-3 p-2">
              <Skeleton className="w-full h-[400px] md:h-[600px] rounded-md" />
            </div>
            <div className="lg:col-span-1 p-6 bg-black/10">
              <Skeleton className="h-8 w-32 mb-6" />
              <div className="space-y-6">
                <Skeleton className="h-24 w-full" />
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-full" />
              </div>
            </div>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="container py-8 animate-fade-in-up">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-black tracking-tighter sm:text-5xl md:text-6xl bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60">
            {t('mapDashboard')}
        </h1>
        <p className="text-muted-foreground mt-4 max-w-3xl mx-auto text-sm sm:text-base">{t('mapDescription')}</p>
      </div>
      <Card className="glass-card overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-4">
          <div className="lg:col-span-3 p-2 relative">
              {mapImage && (
                <div className="relative w-full h-[400px] md:h-[600px] overflow-hidden rounded-md">
                   <Image
                    src={mapImage.imageUrl}
                    alt={mapImage.description}
                    data-ai-hint={mapImage.imageHint}
                    fill
                    className="object-cover transition-transform duration-300 ease-in-out"
                    style={{ transform: `scale(${zoom})` }}
                  />
                  <div className="absolute top-4 right-4 glass-card p-2 rounded-lg text-xs w-[120px]">
                    <p className="font-bold">Rainfall</p>
                    <div className="w-full h-2 mt-1 rounded-full bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-500"></div>
                     <div className="flex justify-between text-xs mt-1">
                        <span>Light</span>
                        <span>Heavy</span>
                    </div>
                  </div>
                  <div className="absolute bottom-4 right-4 flex flex-col gap-2">
                    <Button size="icon" className="glass-card h-8 w-8" onClick={() => setZoom(z => Math.min(z + 0.2, 3))}><ZoomIn className="h-4 w-4" /></Button>
                    <Button size="icon" className="glass-card h-8 w-8" onClick={() => setZoom(z => Math.max(z - 0.2, 1))}><ZoomOut className="h-4 w-4" /></Button>
                     <Button size="icon" className="glass-card h-8 w-8" onClick={() => setZoom(1)}><Maximize className="h-4 w-4" /></Button>
                  </div>
                </div>
              )}
          </div>
          <div className="lg:col-span-1 p-6 bg-black/10">
            <h3 className="font-bold text-lg mb-4">Map Controls</h3>
            <div className="space-y-6">
                <div>
                    <label className="text-sm font-medium text-muted-foreground">Data Layer</label>
                    <div className="grid grid-cols-2 gap-2 mt-2">
                        {layers.map(layer => (
                            <Button
                                key={layer.id}
                                variant="outline"
                                size="sm"
                                onClick={() => setActiveLayer(layer.id)}
                                className={cn(
                                    "flex flex-col h-20 justify-center items-center gap-1 transition-all duration-200 text-xs sm:text-sm",
                                    activeLayer === layer.id ? 'bg-primary text-primary-foreground scale-105 shadow-lg' : 'bg-transparent text-muted-foreground hover:bg-white/5 hover:text-white'
                                )}
                            >
                                {layer.icon}
                                <span className="text-xs text-center">{layer.name}</span>
                            </Button>
                        ))}
                    </div>
                </div>
                <div>
                    <label htmlFor="timeframe" className="text-sm font-medium text-muted-foreground">Timeframe</label>
                     <Select value={timeframe} onValueChange={setTimeframe}>
                        <SelectTrigger id="timeframe" className="mt-2 bg-transparent/20 border-white/20">
                            <SelectValue placeholder="Select timeframe" />
                        </SelectTrigger>
                        <SelectContent className="bg-background/80 backdrop-blur-xl border-white/10 text-foreground">
                            <SelectItem value="realtime" className="cursor-pointer focus:bg-white/10">Real-time</SelectItem>
                            <SelectItem value="24h" className="cursor-pointer focus:bg-white/10">Last 24 Hours</SelectItem>
                            <SelectItem value="7d" className="cursor-pointer focus:bg-white/10">Last 7 Days</SelectItem>
                            <SelectItem value="30d" className="cursor-pointer focus:bg-white/10">Last 30 Days</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                 <div>
                    <label htmlFor="opacity" className="text-sm font-medium text-muted-foreground">Layer Opacity</label>
                    <Slider defaultValue={[100]} max={100} step={1} className="mt-3" />
                </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
