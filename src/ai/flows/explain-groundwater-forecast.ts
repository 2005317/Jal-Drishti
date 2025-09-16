// This is a server-side file.
'use server';

/**
 * @fileOverview This file defines a Genkit flow for explaining the reasoning behind a groundwater forecast.
 *
 * - explainGroundwaterForecast - A function that initiates the groundwater forecast explanation flow.
 * - ExplainGroundwaterForecastInput - The input type for the explainGroundwaterForecast function, including weather patterns, usage, and DWLR data.
 * - ExplainGroundwaterForecastOutput - The output type for the explainGroundwaterForecast function, providing a detailed explanation of the forecast.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ExplainGroundwaterForecastInputSchema = z.object({
  weatherPatterns: z.string().describe('Historical and predicted weather patterns including rainfall, temperature, and humidity.'),
  usageData: z.string().describe('Data on water usage including agricultural, industrial, and residential consumption.'),
  dwlrData: z.string().describe('Dynamic Water Level Recorder data showing current and past groundwater levels.'),
});
export type ExplainGroundwaterForecastInput = z.infer<typeof ExplainGroundwaterForecastInputSchema>;

const ExplainGroundwaterForecastOutputSchema = z.object({
  explanation: z.string().describe('A detailed explanation of the factors influencing the groundwater forecast, including weather patterns, usage data, and DWLR data.'),
});
export type ExplainGroundwaterForecastOutput = z.infer<typeof ExplainGroundwaterForecastOutputSchema>;

export async function explainGroundwaterForecast(input: ExplainGroundwaterForecastInput): Promise<ExplainGroundwaterForecastOutput> {
  return explainGroundwaterForecastFlow(input);
}

const prompt = ai.definePrompt({
  name: 'explainGroundwaterForecastPrompt',
  input: {schema: ExplainGroundwaterForecastInputSchema},
  output: {schema: ExplainGroundwaterForecastOutputSchema},
  prompt: `You are an AI assistant that explains groundwater forecasts based on various data sources.

  Provide a detailed explanation of the groundwater forecast, factoring in weather patterns, usage data, and DWLR data.
  Explain how each factor influences the prediction.

  Weather Patterns: {{{weatherPatterns}}}
  Usage Data: {{{usageData}}}
  DWLR Data: {{{dwlrData}}}
  `,
});

const explainGroundwaterForecastFlow = ai.defineFlow(
  {
    name: 'explainGroundwaterForecastFlow',
    inputSchema: ExplainGroundwaterForecastInputSchema,
    outputSchema: ExplainGroundwaterForecastOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
