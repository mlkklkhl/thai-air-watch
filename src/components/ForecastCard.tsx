import { Card } from "@/components/ui/card";
import { AQIBadge, getAQILevel } from "./AQIBadge";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import mermaidBg from "@/assets/samila-mermaid.png";

interface ForecastCardProps {
  title: string;
  date: string;
  pm25: number;
  trend?: "up" | "down" | "stable";
}

const getHueRotation = (colorClass: string): number => {
  // Map AQI colors to hue rotations to tint the green mermaid image
  if (colorClass.includes('good')) return 0; // Keep green
  if (colorClass.includes('moderate')) return 60; // Yellow
  if (colorClass.includes('unhealthySensitive')) return 30; // Orange
  if (colorClass.includes('unhealthy') && !colorClass.includes('very')) return 0; // Red
  if (colorClass.includes('veryUnhealthy')) return 300; // Purple
  if (colorClass.includes('hazardous')) return 330; // Maroon
  return 0;
};

export const ForecastCard = ({ title, date, pm25, trend = "stable" }: ForecastCardProps) => {
  const { level, color } = getAQILevel(pm25);

  const TrendIcon = trend === "up" ? TrendingUp : trend === "down" ? TrendingDown : Minus;
  const trendColor = trend === "up" ? "text-aqi-unhealthy" : trend === "down" ? "text-aqi-good" : "text-muted-foreground";

  return (
    <Card 
      className="p-6 hover:shadow-md transition-shadow duration-200 border border-border relative overflow-hidden"
    >
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url(${mermaidBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 0.3,
          filter: `hue-rotate(${getHueRotation(color)}deg) saturate(1.5)`
        }}
      />
      <div className="relative z-10">
      <div className="space-y-4">
        <div>
          <h3 className="font-semibold text-foreground">{title}</h3>
          <p className="text-sm text-muted-foreground">{date}</p>
        </div>

        <div className="flex items-end justify-between">
          <div>
            <p className="text-4xl font-bold text-foreground">{pm25}</p>
            <p className="text-xs text-muted-foreground mt-1">μg/m³ PM2.5</p>
          </div>
          <TrendIcon className={`w-6 h-6 ${trendColor}`} />
        </div>

        <AQIBadge value={pm25} />
      </div>
      </div>
    </Card>
  );
};
