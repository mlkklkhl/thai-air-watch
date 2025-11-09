import { Card } from "@/components/ui/card";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { getAQILevel } from "./AQIBadge";
import samilaMermaid from "@/assets/samila-mermaid.png";

interface WeeklyForecastProps {
  data: Array<{ day: string; pm25: number }>;
}

const getHueRotation = (colorClass: string): number => {
  const rotations: Record<string, number> = {
    'bg-aqi-good': 120,
    'bg-aqi-moderate': 60,
    'bg-aqi-unhealthySensitive': 30,
    'bg-aqi-unhealthy': 0,
    'bg-aqi-veryUnhealthy': 280,
    'bg-aqi-hazardous': 320,
  };
  return rotations[colorClass] || 0;
};

export const WeeklyForecast = ({ data }: WeeklyForecastProps) => {
  const averagePM25 = data.reduce((sum, item) => sum + item.pm25, 0) / data.length;
  const { color } = getAQILevel(averagePM25);
  const hueRotation = getHueRotation(color);

  return (
    <Card className="relative overflow-hidden border-border">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `url(${samilaMermaid})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 0.3,
          filter: `hue-rotate(${hueRotation}deg) saturate(1.5)`,
        }}
      />
      <div className="relative z-10 p-6">
        <h3 className="text-xl font-bold text-foreground mb-4">Next 7 Days Forecast</h3>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={data}>
            <defs>
              <linearGradient id="colorPm25" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0.1}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
            <XAxis 
              dataKey="day" 
              stroke="hsl(var(--muted-foreground))"
              tick={{ fill: 'hsl(var(--foreground))' }}
            />
            <YAxis 
              stroke="hsl(var(--muted-foreground))"
              tick={{ fill: 'hsl(var(--foreground))' }}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'hsl(var(--card))', 
                border: '1px solid hsl(var(--border))',
                borderRadius: '6px'
              }}
              labelStyle={{ color: 'hsl(var(--foreground))' }}
            />
            <Area 
              type="monotone" 
              dataKey="pm25" 
              stroke="hsl(var(--primary))" 
              strokeWidth={2}
              fill="url(#colorPm25)" 
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};
