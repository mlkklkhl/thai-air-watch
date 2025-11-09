import { Card } from "@/components/ui/card";
import { Shield, Wind, Home, Heart, AlertTriangle, CheckCircle2 } from "lucide-react";
import { getAQILevel } from "./AQIBadge";
import samilaMermaid from "@/assets/samila-mermaid.png";

interface AdaptationGuideProps {
  currentPM25: number;
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

const getAdaptationAdvice = (pm25: number) => {
  if (pm25 <= 12) {
    return {
      level: "Good Air Quality",
      icon: CheckCircle2,
      recommendations: [
        { icon: Wind, title: "Outdoor Activities", desc: "Perfect time for outdoor exercise and activities" },
        { icon: Home, title: "Ventilation", desc: "Open windows to improve indoor air quality" },
        { icon: Heart, title: "Health", desc: "No health concerns for the general population" },
      ]
    };
  } else if (pm25 <= 35.4) {
    return {
      level: "Moderate Air Quality",
      icon: Shield,
      recommendations: [
        { icon: Wind, title: "Light Activities", desc: "Outdoor activities are generally safe" },
        { icon: Shield, title: "Sensitive Groups", desc: "Sensitive individuals should limit prolonged outdoor exertion" },
        { icon: Home, title: "Indoor Air", desc: "Ventilate during cleaner times of day" },
      ]
    };
  } else if (pm25 <= 55.4) {
    return {
      level: "Unhealthy for Sensitive Groups",
      icon: AlertTriangle,
      recommendations: [
        { icon: Shield, title: "Wear Masks", desc: "N95 masks recommended for sensitive groups outdoors" },
        { icon: Home, title: "Stay Indoors", desc: "Children, elderly, and those with respiratory issues should limit outdoor time" },
        { icon: Wind, title: "Air Purifiers", desc: "Use HEPA air purifiers indoors" },
      ]
    };
  } else if (pm25 <= 150.4) {
    return {
      level: "Unhealthy Air Quality",
      icon: AlertTriangle,
      recommendations: [
        { icon: Shield, title: "Protective Gear", desc: "Everyone should wear N95 or better masks outdoors" },
        { icon: Home, title: "Minimize Exposure", desc: "Avoid outdoor activities, stay indoors with air purifiers" },
        { icon: Heart, title: "Health Monitoring", desc: "Monitor symptoms, especially for at-risk groups" },
      ]
    };
  } else if (pm25 <= 250.4) {
    return {
      level: "Very Unhealthy",
      icon: AlertTriangle,
      recommendations: [
        { icon: Shield, title: "Essential Only", desc: "Only go outside for essential activities with proper protection" },
        { icon: Home, title: "Seal Indoors", desc: "Keep windows closed, use air purifiers with HEPA filters" },
        { icon: Heart, title: "Medical Alert", desc: "Seek medical attention if experiencing symptoms" },
      ]
    };
  } else {
    return {
      level: "Hazardous",
      icon: AlertTriangle,
      recommendations: [
        { icon: Shield, title: "Emergency Measures", desc: "Stay indoors, avoid all outdoor activities" },
        { icon: Home, title: "Air Quality Control", desc: "Run air purifiers continuously, seal all openings" },
        { icon: Heart, title: "Health Emergency", desc: "High-risk groups should relocate to safer areas if possible" },
      ]
    };
  }
};

export const AdaptationGuide = ({ currentPM25 }: AdaptationGuideProps) => {
  const { color } = getAQILevel(currentPM25);
  const hueRotation = getHueRotation(color);
  const advice = getAdaptationAdvice(currentPM25);
  const IconComponent = advice.icon;

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
        <div className="flex items-center gap-3 mb-6">
          <IconComponent className="w-8 h-8 text-primary" />
          <h3 className="text-xl font-bold text-foreground">Air Quality Adaptation Guide</h3>
        </div>
        
        <div className="mb-6">
          <h4 className="text-lg font-semibold text-foreground mb-2">Current Status: {advice.level}</h4>
          <p className="text-sm text-muted-foreground">PM2.5: {currentPM25} µg/m³</p>
        </div>

        <div className="space-y-4">
          <h4 className="font-semibold text-foreground">Recommended Actions:</h4>
          {advice.recommendations.map((rec, index) => {
            const RecIcon = rec.icon;
            return (
              <div key={index} className="flex gap-4 p-4 bg-background/60 rounded-lg backdrop-blur-sm">
                <RecIcon className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h5 className="font-semibold text-foreground mb-1">{rec.title}</h5>
                  <p className="text-sm text-muted-foreground">{rec.desc}</p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-6 p-4 bg-background/60 rounded-lg backdrop-blur-sm">
          <h4 className="font-semibold text-foreground mb-2">General Protection Tips:</h4>
          <ul className="text-sm text-muted-foreground space-y-2">
            <li>• Monitor air quality regularly through this dashboard</li>
            <li>• Keep emergency masks (N95 or better) readily available</li>
            <li>• Create a clean air room in your home with air purifiers</li>
            <li>• Stay hydrated and maintain a healthy diet to support your immune system</li>
            <li>• Plan outdoor activities during times with better air quality</li>
          </ul>
        </div>
      </div>
    </Card>
  );
};
