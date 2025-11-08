import { CurrentConditions } from "@/components/CurrentConditions";
import { ForecastCard } from "@/components/ForecastCard";
import { Cloud } from "lucide-react";

const Index = () => {
  // Mock data - replace with actual API calls
  const currentData = {
    location: "Hat Yai, Songkhla",
    pm25: 165.4,
    pm10: 185.5,
    temperature: 32,
    humidity: 65,
    windSpeed: 2.5,
    windDirection: "NE",
    rainfall: 0.2,
  };

  const forecasts = [
    { title: "Tomorrow", date: "Nov 9, 2025", pm25: 8.5, trend: "down" as const },
    { title: "In 2 Days", date: "Nov 10, 2025", pm25: 28.1, trend: "up" as const },
    { title: "Next Week", date: "Nov 15, 2025", pm25: 260.8, trend: "up" as const },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-3">
            <Cloud className="w-8 h-8 text-primary" />
            <div>
              <h1 className="text-2xl font-bold text-foreground">Hat Yai Air Quality</h1>
              <p className="text-sm text-muted-foreground">PM2.5 Forecasting System</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 space-y-8">
        {/* Current Conditions */}
        <section>
          <CurrentConditions {...currentData} />
        </section>

        {/* Forecasts */}
        <section>
          <h2 className="text-2xl font-bold text-foreground mb-6">Forecast</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {forecasts.map((forecast, index) => (
              <ForecastCard key={index} {...forecast} />
            ))}
          </div>
        </section>

        {/* Information */}
        <section className="bg-card border border-border rounded-lg p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">About AQI Levels</h3>
          <div className="space-y-3 text-sm">
            <div className="flex items-center gap-3">
              <div className="w-4 h-4 rounded-full bg-aqi-good"></div>
              <span className="text-foreground font-medium">Good (0-12):</span>
              <span className="text-muted-foreground">Air quality is satisfactory</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-4 h-4 rounded-full bg-aqi-moderate"></div>
              <span className="text-foreground font-medium">Moderate (12.1-35.4):</span>
              <span className="text-muted-foreground">Acceptable for most people</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-4 h-4 rounded-full bg-aqi-unhealthySensitive"></div>
              <span className="text-foreground font-medium">Unhealthy for Sensitive (35.5-55.4):</span>
              <span className="text-muted-foreground">Sensitive groups may experience effects</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-4 h-4 rounded-full bg-aqi-unhealthy"></div>
              <span className="text-foreground font-medium">Unhealthy (55.5-150.4):</span>
              <span className="text-muted-foreground">Everyone may experience effects</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-4 h-4 rounded-full bg-aqi-veryUnhealthy"></div>
              <span className="text-foreground font-medium">Very Unhealthy (150.5-250.4):</span>
              <span className="text-muted-foreground">Health alert</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-4 h-4 rounded-full bg-aqi-hazardous"></div>
              <span className="text-foreground font-medium">Hazardous (250.5+):</span>
              <span className="text-muted-foreground">Health warning of emergency conditions</span>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-border mt-12">
        <div className="container mx-auto px-4 py-6 text-center text-sm text-muted-foreground">
          <p>Data updates every hour. Last updated: {new Date().toLocaleString()}</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
