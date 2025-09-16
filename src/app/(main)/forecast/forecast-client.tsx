'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { BrainCircuit, Loader2, BarChart, FileText, Sparkles, Wand2 } from 'lucide-react';

import { useApp } from '@/contexts/app-provider';
import type { ForecastGroundwaterAvailabilityInput, ForecastGroundwaterAvailabilityOutput } from '@/ai/flows/forecast-groundwater-availability';
import type { ExplainGroundwaterForecastInput, ExplainGroundwaterForecastOutput } from '@/ai/flows/explain-groundwater-forecast';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

interface ForecastClientProps {
  forecastAction: (input: ForecastGroundwaterAvailabilityInput) => Promise<ForecastGroundwaterAvailabilityOutput>;
  explainAction: (input: ExplainGroundwaterForecastInput) => Promise<ExplainGroundwaterForecastOutput>;
}

const formSchema = z.object({
  location: z.string().min(1, 'Location is required'),
  timeHorizon: z.string().min(1, 'Time horizon is required'),
  weatherPatterns: z.string().min(1, 'Weather patterns are required'),
  usageData: z.string().min(1, 'Usage data is required'),
  dwlrData: z.string().min(1, 'DWLR data is required'),
});

export default function ForecastClient({ forecastAction, explainAction }: ForecastClientProps) {
  const { t } = useApp();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [isExplainLoading, setIsExplainLoading] = useState(false);
  const [forecastResult, setForecastResult] = useState<ForecastGroundwaterAvailabilityOutput | null>(null);
  const [explanation, setExplanation] = useState<string | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { location: '', timeHorizon: '', weatherPatterns: '', usageData: '', dwlrData: '' },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setForecastResult(null);
    setExplanation(null);
    try {
      const result = await forecastAction(values);
      setForecastResult(result);
    } catch (error) {
      console.error('Forecast error:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to generate forecast. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  }

  async function handleGetExplanation() {
    if (!forecastResult || !form.getValues()) return;

    setIsExplainLoading(true);
    setExplanation(null);
    try {
        const input: ExplainGroundwaterForecastInput = form.getValues();
        const result = await explainAction(input);
        setExplanation(result.explanation);
    } catch (error) {
        console.error('Explanation error:', error);
        toast({
            variant: "destructive",
            title: "Error",
            description: "Failed to get detailed explanation.",
        });
    } finally {
        setIsExplainLoading(false);
    }
  }

  const getConfidenceColor = (level: string) => {
    if (!level) return 'text-gray-400';
    const lowerLevel = level.toLowerCase();
    if (lowerLevel === 'high') return 'text-green-400';
    if (lowerLevel === 'medium') return 'text-yellow-400';
    if (lowerLevel === 'low') return 'text-red-400';
    return 'text-gray-400';
  };

  return (
    <div className="container py-8 animate-fade-in-up">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-black tracking-tighter sm:text-5xl md:text-6xl bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60">{t('aiForecast')}</h1>
          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto text-sm sm:text-base">{t('forecastDescription')}</p>
        </div>

        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
                <Wand2 />
                Input Data for AI Model
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <FormField control={form.control} name="location" render={({ field }) => (
                    <FormItem><FormLabel>{t('location')}</FormLabel><FormControl><Input placeholder={t('locationPlaceholder')} {...field} className="bg-transparent/20" /></FormControl><FormMessage /></FormItem>
                  )} />
                  <FormField control={form.control} name="timeHorizon" render={({ field }) => (
                    <FormItem><FormLabel>{t('timeHorizon')}</FormLabel><FormControl><Input placeholder={t('timeHorizonPlaceholder')} {...field} className="bg-transparent/20" /></FormControl><FormMessage /></FormItem>
                  )} />
                </div>
                <FormField control={form.control} name="weatherPatterns" render={({ field }) => (
                  <FormItem><FormLabel>{t('weatherPatterns')}</FormLabel><FormControl><Textarea placeholder={t('weatherPlaceholder')} {...field} className="bg-transparent/20" /></FormControl><FormMessage /></FormItem>
                )} />
                <FormField control={form.control} name="usageData" render={({ field }) => (
                  <FormItem><FormLabel>{t('usageData')}</FormLabel><FormControl><Textarea placeholder={t('usagePlaceholder')} {...field} className="bg-transparent/20" /></FormControl><FormMessage /></FormItem>
                )} />
                <FormField control={form.control} name="dwlrData" render={({ field }) => (
                  <FormItem><FormLabel>{t('dwlrData')}</FormLabel><FormControl><Textarea placeholder={t('dwlrPlaceholder')} {...field} className="bg-transparent/20" /></FormControl><FormMessage /></FormItem>
                )} />
                <Button type="submit" disabled={isLoading} size="lg" className="bg-primary/90 hover:bg-primary text-primary-foreground font-bold w-full sm:w-auto">
                  {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <BrainCircuit className="mr-2 h-4 w-4" />}
                  {t('getForecast')}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>

        {isLoading && (
          <div className="mt-8 flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-white/10 p-12 text-center glass-card">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <p className="ml-4 text-muted-foreground mt-4">Generating forecast... The model is analyzing complex data.</p>
          </div>
        )}

        {forecastResult && (
          <Card className="mt-8 glass-card animate-fade-in">
            <CardHeader>
              <CardTitle>{t('forecastResult')}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <h3 className="font-semibold flex items-center gap-2 text-lg"><BarChart className="h-5 w-5 text-primary" /> Forecast</h3>
                <p className="text-muted-foreground bg-black/20 p-4 rounded-md text-sm sm:text-base">{forecastResult.forecast}</p>
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold flex items-center gap-2 text-lg"><FileText className="h-5 w-5 text-primary" /> Summary</h3>
                <p className="text-muted-foreground text-sm sm:text-base">{forecastResult.explanation}</p>
              </div>
              <div>
                <h3 className="font-semibold mb-2 text-lg">{t('confidence')}</h3>
                <p className={cn("text-2xl font-bold", getConfidenceColor(forecastResult.confidenceLevel))}>{forecastResult.confidenceLevel}</p>
              </div>
              
              {!explanation && (
                <Button variant="secondary" onClick={handleGetExplanation} disabled={isExplainLoading} className="bg-white/10 hover:bg-white/20 text-foreground w-full sm:w-auto">
                  {isExplainLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Sparkles className="mr-2 h-4 w-4" />}
                  {t('getExplanation')}
                </Button>
              )}

            </CardContent>
            {explanation && (
                <CardFooter className="animate-fade-in">
                    <div className="w-full space-y-2">
                        <h3 className="font-semibold flex items-center gap-2 text-lg"><Sparkles className="h-5 w-5 text-accent" /> {t('aiExplanation')}</h3>
                        <p className="text-muted-foreground bg-black/20 p-4 rounded-md text-sm sm:text-base">{explanation}</p>
                    </div>
                </CardFooter>
            )}
          </Card>
        )}
      </div>
    </div>
  );
}
