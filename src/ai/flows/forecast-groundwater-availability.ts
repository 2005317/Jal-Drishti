// forecast-groundwater-availability.ts
'use server';

/**
 * @fileOverview A groundwater availability forecasting AI agent.
 *
 * - forecastGroundwaterAvailability - A function that handles the groundwater availability forecasting process.
 * - ForecastGroundwaterAvailabilityInput - The input type for the forecastGroundwaterAvailability function.
 * - ForecastGroundwaterAvailabilityOutput - The return type for the forecastGroundwaterAvailability function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ForecastGroundwaterAvailabilityInputSchema = z.object({
  location: z
    .string()
    .describe(
      'The geographic location for which to forecast groundwater availability (e.g., village, district, state).'
    ),
  timeHorizon: z
    .string()
    .describe(
      'The time horizon for the forecast (e.g., next month, next season, next year).'
    ),
  weatherPatterns: z
    .string()
    .describe(
      'Observed weather patterns in the location (e.g., rainfall, temperature, humidity).'
    ),
  usageData: z
    .string()
    .describe(
      'Water usage data for the location (e.g., agricultural, industrial, domestic).'
    ),
  dwlrData: z
    .string()
    .describe(
      'Dynamic Water Level Recorder (DWLR) data for the location, if available.'
    ),
});
export type ForecastGroundwaterAvailabilityInput = z.infer<
  typeof ForecastGroundwaterAvailabilityInputSchema
>;

const ForecastGroundwaterAvailabilityOutputSchema = z.object({
  forecast: z
    .string()
    .describe('The AI-powered forecast of groundwater availability.'),
  explanation: z
    .string()
    .describe(
      'An explanation of the factors and reasoning behind the forecast.'
    ),
  confidenceLevel: z
    .string()
    .describe(
      'The confidence level of the forecast (e.g., high, medium, low).'
    ),
});
export type ForecastGroundwaterAvailabilityOutput = z.infer<
  typeof ForecastGroundwaterAvailabilityOutputSchema
>;

export async function forecastGroundwaterAvailability(
  input: ForecastGroundwaterAvailabilityInput
): Promise<ForecastGroundwaterAvailabilityOutput> {
  return forecastGroundwaterAvailabilityFlow(input);
}

const prompt = ai.definePrompt({
  name: 'forecastGroundwaterAvailabilityPrompt',
  input: {schema: ForecastGroundwaterAvailabilityInputSchema},
  output: {schema: ForecastGroundwaterAvailabilityOutputSchema},
  prompt: `You are an AI expert in predicting groundwater availability.

You will generate a forecast of groundwater availability based on the following information:

Location: {{{location}}}
Time Horizon: {{{timeHorizon}}}
Weather Patterns: {{{weatherPatterns}}}
Usage Data: {{{usageData}}}
DWLR Data: {{{dwlrData}}}

Provide both a forecast and an explanation of the factors and reasoning behind the forecast. Also, state the confidence level of the forecast.

Forecast:
Explanation:
Confidence Level:`,
});

const forecastGroundwaterAvailabilityFlow = ai.defineFlow(
  {
    name: 'forecastGroundwaterAvailabilityFlow',
    inputSchema: ForecastGroundwaterAvailabilityInputSchema,
    outputSchema: ForecastGroundwaterAvailabilityOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
