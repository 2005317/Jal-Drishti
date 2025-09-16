import ForecastClient from './forecast-client';
import { forecastGroundwaterAvailability, explainGroundwaterForecast } from '@/ai/flows';

export default function ForecastPage() {
  return (
    <ForecastClient 
      forecastAction={forecastGroundwaterAvailability}
      explainAction={explainGroundwaterForecast}
    />
  );
}
