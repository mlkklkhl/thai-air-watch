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

export const ForecastCard = ({ title, date, pm25, trend = "stable" }: ForecastCardProps) => {
  const { level, color } = getAQILevel(pm25);

  const TrendIcon = trend === "up" ? TrendingUp : trend === "down" ? TrendingDown : Minus;
  const trendColor = trend === "up" ? "text-aqi-unhealthy" : trend === "down" ? "text-aqi-good" : "text-muted-foreground";

  return (
    <Card 
      className="p-6 hover:shadow-md transition-shadow duration-200 border border-border relative overflow-hidden"
      style={{
        backgroundImage: `linear-gradient(${color.replace('bg-', 'hsl(var(--')}/ 0.3), ${color.replace('bg-', 'hsl(var(--')}/ 0.3)), url(${mermaidBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundBlendMode: 'multiply'
      }}
    >
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
    </Card>
  );
};
