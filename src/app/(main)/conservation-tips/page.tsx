'use client'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Droplets, Sprout, CloudRain, Wheat, ArrowRight } from "lucide-react";
import { useApp } from "@/contexts/app-provider";

export default function ConservationTipsPage() {
    const { t } = useApp();
    const tips = [
        {
          icon: <Droplets className="h-8 w-8 text-blue-400" />,
          title: t('dripIrrigation'),
          description: t('dripIrrigationDesc'),
        },
        {
          icon: <Sprout className="h-8 w-8 text-green-400" />,
          title: t('mulching'),
          description: t('mulchingDesc'),
        },
        {
          icon: <CloudRain className="h-8 w-8 text-cyan-400" />,
          title: t('rainwaterHarvesting'),
          description: t('rainwaterHarvestingDesc'),
        },
        {
          icon: <Wheat className="h-8 w-8 text-yellow-500" />,
          title: t('cropSelection'),
          description: t('cropSelectionDesc'),
        },
    ];
  return (
    <div className="container py-8 animate-fade-in-up">
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-black tracking-tighter sm:text-5xl md:text-6xl bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60">{t('tipsTitle')}</h1>
        <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
            Actionable advice, optimized for your geographic region, to help you conserve water and improve sustainability.
        </p>
      </div>
      <div className="grid gap-6 md:grid-cols-2 max-w-4xl mx-auto">
        {tips.map((tip, index) => (
          <Card key={index} className="glass-card group hover:border-primary/50 transition-all duration-300 hover:scale-105">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-lg bg-secondary">
                    {tip.icon}
                  </div>
                  <CardTitle className="text-lg font-bold">{tip.title}</CardTitle>
                </div>
                <ArrowRight className="text-muted-foreground group-hover:text-primary transition-transform group-hover:translate-x-1" />
              </div>
            </CardHeader>
            <CardContent>
              <CardDescription>{tip.description}</CardDescription>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
