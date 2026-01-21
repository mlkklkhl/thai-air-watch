import { cn } from "@/lib/utils";

interface AQIBadgeProps {
  value: number;
  className?: string;
}

export const getAQILevel = (pm25: number) => {
  if (pm25 <= 9.0) return { level: "Good", color: "bg-aqi-good", textColor: "text-white" };
  if (pm25 <= 35.4) return { level: "Moderate", color: "bg-aqi-moderate", textColor: "text-foreground" };
  if (pm25 <= 55.4) return { level: "Unhealthy for Sensitive Groups", color: "bg-aqi-unhealthySensitive", textColor: "text-white" };
  if (pm25 <= 125.4) return { level: "Unhealthy", color: "bg-aqi-unhealthy", textColor: "text-white" };
  if (pm25 <= 225.4) return { level: "Very Unhealthy", color: "bg-aqi-veryUnhealthy", textColor: "text-white" };
  return { level: "Hazardous", color: "bg-aqi-hazardous", textColor: "text-white" };
};

export const AQIBadge = ({ value, className }: AQIBadgeProps) => {
  const { level, color, textColor } = getAQILevel(value);

  return (
    <div className={cn("inline-flex items-center gap-2", className)}>
      <span className={cn("px-4 py-2 rounded-full font-semibold text-sm", color, textColor)}>
        {level}
      </span>
    </div>
  );
};
