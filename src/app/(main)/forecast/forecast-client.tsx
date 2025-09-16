'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { BrainCircuit, Loader2, BarChart, FileText } from 'lucide-react';

import { useApp } from '@/contexts/app-provider';
import type { ForecastGroundwaterAvailabilityInput, ForecastGroundwaterAvailabilityOutput } from '@/ai/flows/forecast-groundwater-availability';
import type { ExplainGroundwaterForecastInput, ExplainGroundwaterForecastOutput } from '@/ai/flows/explain-groundwater-forecast';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

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

  return (
    <div className="container py-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold tracking-tight">{t('aiForecast')}</h1>
          <p className="text-muted-foreground mt-2">{t('forecastDescription')}</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Input Data</CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <FormField control={form.control} name="location" render={({ field }) => (
                    <FormItem><FormLabel>{t('location')}</FormLabel><FormControl><Input placeholder={t('locationPlaceholder')} {...field} /></FormControl><FormMessage /></FormItem>
                  )} />
                  <FormField control={form.control} name="timeHorizon" render={({ field }) => (
                    <FormItem><FormLabel>{t('timeHorizon')}</FormLabel><FormControl><Input placeholder={t('timeHorizonPlaceholder')} {...field} /></FormControl><FormMessage /></FormItem>
                  )} />
                </div>
                <FormField control={form.control} name="weatherPatterns" render={({ field }) => (
                  <FormItem><FormLabel>{t('weatherPatterns')}</FormLabel><FormControl><Textarea placeholder={t('weatherPlaceholder')} {...field} /></FormControl><FormMessage /></FormItem>
                )} />
                <FormField control={form.control} name="usageData" render={({ field }) => (
                  <FormItem><FormLabel>{t('usageData')}</FormLabel><FormControl><Textarea placeholder={t('usagePlaceholder')} {...field} /></FormControl><FormMessage /></FormItem>
                )} />
                <FormField control={form.control} name="dwlrData" render={({ field }) => (
                  <FormItem><FormLabel>{t('dwlrData')}</FormLabel><FormControl><Textarea placeholder={t('dwlrPlaceholder')} {...field} /></FormControl><FormMessage /></FormItem>
                )} />
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <BrainCircuit className="mr-2 h-4 w-4" />}
                  {t('getForecast')}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>

        {isLoading && (
          <div className="mt-8 flex items-center justify-center rounded-lg border-2 border-dashed p-12 text-center">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <p className="ml-4 text-muted-foreground">Generating forecast...</p>
          </div>
        )}

        {forecastResult && (
          <Card className="mt-8">
            <CardHeader>
              <CardTitle>{t('forecastResult')}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <h3 className="font-semibold flex items-center gap-2"><BarChart className="h-5 w-5 text-primary" /> Forecast</h3>
                <p className="text-muted-foreground bg-muted p-4 rounded-md">{forecastResult.forecast}</p>
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold flex items-center gap-2"><FileText className="h-5 w-5 text-primary" /> Explanation</h3>
                <p className="text-muted-foreground">{forecastResult.explanation}</p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">{t('confidence')}</h3>
                <p className="text-lg font-bold text-primary">{forecastResult.confidenceLevel}</p>
              </div>
              
              {!explanation && (
                <Button variant="secondary" onClick={handleGetExplanation} disabled={isExplainLoading}>
                  {isExplainLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                  {t('getExplanation')}
                </Button>
              )}

            </CardContent>
            {explanation && (
                <CardFooter>
                    <div className="w-full space-y-2">
                        <h3 className="font-semibold flex items-center gap-2"><FileText className="h-5 w-5 text-accent" /> {t('aiExplanation')}</h3>
                        <p className="text-muted-foreground bg-muted p-4 rounded-md">{explanation}</p>
                    </div>
                </CardFooter>
            )}
          </Card>
        )}
      </div>
    </div>
  );
}
