'use client'

import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { useApp } from '@/contexts/app-provider';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Layers, Droplets, Thermometer, Wind } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const layers = [
  { id: 'groundwater', name: 'Groundwater Depth', icon: <Droplets /> },
  { id: 'rainfall', name: 'Rainfall', icon: <Layers /> },
  { id: 'temperature', name: 'Temperature', icon: <Thermometer /> },
  { id: 'soil', name: 'Soil Moisture', icon: <Wind /> },
];

export default function MapPage() {
  const mapImage = PlaceHolderImages.find(p => p.id === 'map-dashboard');
  const { t } = useApp();
  const [activeLayer, setActiveLayer] = useState('groundwater');
  const [timeframe, setTimeframe] = useState('realtime');

  return (
    <div className="container py-8">
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-black tracking-tighter sm:text-5xl md:text-6xl bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60">
            {t('mapDashboard')}
        </h1>
        <p className="text-muted-foreground mt-4 max-w-3xl mx-auto">{t('mapDescription')}</p>
      </div>
      <Card className="glass-card overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-4">
          <div className="md:col-span-3">
             <CardContent className="p-2 h-full">
              {mapImage && (
                <div className="relative aspect-[16/9] w-full h-full">
                   <Image
                    src={mapImage.imageUrl}
                    alt={mapImage.description}
                    data-ai-hint={mapImage.imageHint}
                    fill
                    className="rounded-md object-cover"
                  />
                  <div className="absolute top-4 right-4 glass-card p-2 rounded-lg">
                    <p className="text-xs text-muted-foreground">Legend</p>
                    <div className="w-full h-2 mt-1 rounded-full bg-gradient-to-r from-green-500 via-yellow-500 to-red-500"></div>
                     <div className="flex justify-between text-xs mt-1">
                        <span>Low</span>
                        <span>High</span>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </div>
          <div className="md:col-span-1 p-6 bg-black/10">
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
                                    "flex flex-col h-20 justify-center items-center gap-1 transition-all",
                                    activeLayer === layer.id ? 'bg-primary text-primary-foreground hover:bg-primary/90' : 'bg-transparent text-muted-foreground hover:bg-white/5 hover:text-white'
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
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
