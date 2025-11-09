import { Card } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from "recharts";
import { getAQILevel } from "./AQIBadge";
import samilaMermaid from "@/assets/samila-mermaid.png";

interface TrendChartProps {
  data: Array<{ date: string; pm25: number }>;
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

export const TrendChart = ({ data }: TrendChartProps) => {
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
        <h3 className="text-xl font-bold text-foreground mb-4">Past 30 Days PM2.5 Trend</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
            <XAxis 
              dataKey="date" 
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
            <ReferenceLine y={12} stroke="hsl(142, 76%, 36%)" strokeDasharray="3 3" label="Good" />
            <ReferenceLine y={35.4} stroke="hsl(47, 91%, 54%)" strokeDasharray="3 3" label="Moderate" />
            <ReferenceLine y={55.4} stroke="hsl(25, 95%, 53%)" strokeDasharray="3 3" label="Unhealthy" />
            <Line 
              type="monotone" 
              dataKey="pm25" 
              stroke="hsl(var(--primary))" 
              strokeWidth={2}
              dot={{ fill: 'hsl(var(--primary))' }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};
