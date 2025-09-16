'use client'
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Droplets, Sprout, CloudRain, Wheat } from "lucide-react";
import { useApp } from "@/contexts/app-provider";

export default function ConservationTipsPage() {
    const { t } = useApp();
    const tips = [
        {
          icon: <Droplets className="h-6 w-6 text-primary" />,
          title: t('dripIrrigation'),
          description: t('dripIrrigationDesc'),
        },
        {
          icon: <Sprout className="h-6 w-6 text-accent" />,
          title: t('mulching'),
          description: t('mulchingDesc'),
        },
        {
          icon: <CloudRain className="h-6 w-6 text-primary" />,
          title: t('rainwaterHarvesting'),
          description: t('rainwaterHarvestingDesc'),
        },
        {
          icon: <Wheat className="h-6 w-6 text-accent" />,
          title: t('cropSelection'),
          description: t('cropSelectionDesc'),
        },
    ];
  return (
    <div className="container py-8">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold tracking-tight">{t('tipsTitle')}</h1>
        <p className="text-muted-foreground mt-2">
            Optimized for your geographic region.
        </p>
      </div>
      <div className="grid gap-6 md:grid-cols-2 max-w-4xl mx-auto">
        {tips.map((tip, index) => (
          <Card key={index} className="hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-start gap-4">
              <div className="flex-shrink-0">{tip.icon}</div>
              <div className="flex-grow">
                <CardTitle>{tip.title}</CardTitle>
                <CardDescription className="mt-2">{tip.description}</CardDescription>
              </div>
            </CardHeader>
          </Card>
        ))}
      </div>
    </div>
  );
}
