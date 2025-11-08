import { Card } from "@/components/ui/card";
import { AQIBadge, getAQILevel } from "./AQIBadge";
import { Thermometer, Droplets, Wind, CloudRain, Navigation } from "lucide-react";

interface CurrentConditionsProps {
  pm25: number;
  pm10: number;
  temperature: number;
  humidity: number;
  windSpeed: number;
  windDirection: string;
  rainfall: number;
  location: string;
}

export const CurrentConditions = ({
  pm25,
  pm10,
  temperature,
  humidity,
  windSpeed,
  windDirection,
  rainfall,
  location,
}: CurrentConditionsProps) => {
  const { level, color } = getAQILevel(pm25);

  return (
    <Card className="p-6 md:p-8 bg-gradient-to-br from-card to-card/80 shadow-lg border-0">
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h2 className="text-sm font-medium text-muted-foreground mb-1">Current Air Quality</h2>
            <p className="text-2xl font-bold text-foreground">{location}</p>
          </div>
          <AQIBadge value={pm25} />
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div>
            <p className="text-sm text-muted-foreground mb-2">PM2.5</p>
            <p className="text-5xl md:text-6xl font-bold text-foreground">{pm25}</p>
            <p className="text-sm text-muted-foreground mt-1">μg/m³</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground mb-2">PM10</p>
            <p className="text-5xl md:text-6xl font-bold text-foreground">{pm10}</p>
            <p className="text-sm text-muted-foreground mt-1">μg/m³</p>
          </div>
        </div>

        <div className="pt-6 border-t border-border">
          <h3 className="text-sm font-semibold text-foreground mb-4">Meteorological Factors</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div className="flex items-center gap-3">
              <Thermometer className="w-5 h-5 text-primary" />
              <div>
                <p className="text-xs text-muted-foreground">Temperature</p>
                <p className="text-sm font-semibold text-foreground">{temperature}°C</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Droplets className="w-5 h-5 text-primary" />
              <div>
                <p className="text-xs text-muted-foreground">Humidity</p>
                <p className="text-sm font-semibold text-foreground">{humidity}%</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Wind className="w-5 h-5 text-primary" />
              <div>
                <p className="text-xs text-muted-foreground">Wind Speed</p>
                <p className="text-sm font-semibold text-foreground">{windSpeed} m/s</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Navigation className="w-5 h-5 text-primary" />
              <div>
                <p className="text-xs text-muted-foreground">Wind Direction</p>
                <p className="text-sm font-semibold text-foreground">{windDirection}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <CloudRain className="w-5 h-5 text-primary" />
              <div>
                <p className="text-xs text-muted-foreground">Rainfall</p>
                <p className="text-sm font-semibold text-foreground">{rainfall} mm</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};
