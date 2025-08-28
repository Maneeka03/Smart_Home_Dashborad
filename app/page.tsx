"use client";

import { useEffect, useState, useRef } from "react";
import { useTheme } from "next-themes"; // Import useTheme for theme toggling

// Corrected import paths for custom components
import { Header } from "@/components/dashboard/header";
import { Sidebar } from "@/components/dashboard/sidebar";
import { HomeOverview } from "@/components/dashboard/home-overview";
import { SecurityAlerts } from "@/components/dashboard/security-alerts"; // Keep import for SecurityAlerts
import { DailyInsight } from "@/components/dashboard/daily-insight";
import { QuickActions } from "@/components/dashboard/quick-actions";
import { RoomStatus } from "@/components/dashboard/room-status";
// Removed: import { EnergyConsumption } from "@/components/dashboard/energy-consumption"
// Removed: import { UpcomingEvents } from "@/components/dashboard/upcoming-events"

interface Quote {
  text: string;
  author: string;
  condition:
    | "cold"
    | "mild"
    | "warm"
    | "hot"
    | "cloudy"
    | "sunny"
    | "rainy"
    | "general";
}

const quotes: Quote[] = [
  {
    text: "The best way to predict the future is to create it.",
    author: "Peter Drucker",
    condition: "general",
  },
  {
    text: "It is during our darkest moments that we must focus to see the light.",
    author: "Aristotle",
    condition: "general",
  },
  {
    text: "Winter is not a season, it's a celebration.",
    author: "Anamika Mishra",
    condition: "cold",
  },
  {
    text: "The sun always shines brightest after the rain.",
    author: "Unknown",
    condition: "mild",
  },
  {
    text: "Live in the sunshine, swim the sea, drink the wild air.",
    author: "Ralph Waldo Emerson",
    condition: "warm",
  },
  {
    text: "Into each life some rain must fall.",
    author: "Henry Wadsworth Longfellow",
    condition: "rainy",
  },
  {
    text: "The early bird catches the worm.",
    author: "Proverb",
    condition: "general",
  },
  {
    text: "The only way to do great work is to love what you do.",
    author: "Steve Jobs",
    condition: "general",
  },
  {
    text: "Believe you can and you're halfway there.",
    author: "Theodore Roosevelt",
    condition: "general",
  },
  {
    text: "The future belongs to those who believe in the beauty of their dreams.",
    author: "Eleanor Roosevelt",
    condition: "general",
  },
  {
    text: "It's a beautiful day to save lives.",
    author: "Grey's Anatomy",
    condition: "sunny",
  },
  {
    text: "A little bit of summer is what the whole year is all about.",
    author: "John Mayer",
    condition: "hot",
  },
  {
    text: "Autumn is a second spring when every leaf is a flower.",
    author: "Albert Camus",
    condition: "mild",
  },
  {
    text: "There's no such thing as bad weather, only inappropriate clothing.",
    author: "Sir Ranulph Fiennes",
    condition: "cold",
  },
];

export default function Dashboard() {
  const { theme, setTheme } = useTheme(); // Use useTheme hook
  const [temperature, setTemperature] = useState(21.5);
  const [energyUsage, setEnergyUsage] = useState(42);
  const [humidity, setHumidity] = useState(45);
  const [securityStatus, setSecurityStatus] = useState(100);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isLoading, setIsLoading] = useState(true);
  const [deviceStatus, setDeviceStatus] = useState({
    livingRoomLights: true,
    kitchenLights: false,
    bedroomLights: false,
    thermostat: true,
    frontDoor: true,
    backDoor: true,
    garageDoor: true,
    tv: false,
    speaker: false,
    coffeeMaker: false,
  });

  const [outsideTemperature, setOutsideTemperature] = useState(18);
  const [outsideWeather, setOutsideWeather] = useState("Cloudy");
  const [currentQuote, setCurrentQuote] = useState<Quote | null>(null);
  const [quoteFade, setQuoteFade] = useState(true);

  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Simulate data loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  // Update time (kept for internal use if needed, but not displayed in Home Time section)
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Simulate changing data
  useEffect(() => {
    const interval = setInterval(() => {
      setTemperature(
        (prev) => +(prev + (Math.random() * 0.6 - 0.3)).toFixed(1)
      );
      setEnergyUsage(Math.floor(Math.random() * 20) + 35);
      setHumidity(Math.floor(Math.random() * 5) + 43);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  // Simulate outside temperature and weather changes
  useEffect(() => {
    const interval = setInterval(() => {
      const newTemp = Math.floor(Math.random() * 25) + 5; // 5-30°C
      setOutsideTemperature(newTemp);

      const weatherOptions = [
        "Sunny",
        "Cloudy",
        "Rainy",
        "Partly Cloudy",
        "Clear",
      ];
      const newWeather =
        weatherOptions[Math.floor(Math.random() * weatherOptions.length)];
      setOutsideWeather(newWeather);
    }, 15000); // Change outside conditions every 15 seconds

    return () => clearInterval(interval);
  }, []);

  // Quote logic
  const getTemperatureCondition = (temp: number) => {
    if (temp <= 10) return "cold";
    if (temp > 10 && temp <= 20) return "mild";
    if (temp > 20 && temp <= 28) return "warm";
    return "hot";
  };

  const getWeatherCondition = (weather: string) => {
    if (weather.toLowerCase().includes("cloudy")) return "cloudy";
    if (
      weather.toLowerCase().includes("sunny") ||
      weather.toLowerCase().includes("clear")
    )
      return "sunny";
    if (weather.toLowerCase().includes("rain")) return "rainy";
    return "general";
  };

  useEffect(() => {
    const updateQuote = () => {
      setQuoteFade(false); // Start fade out
      setTimeout(() => {
        const tempCondition = getTemperatureCondition(outsideTemperature);
        const weatherCondition = getWeatherCondition(outsideWeather);

        const relevantQuotes = quotes.filter(
          (q) =>
            q.condition === tempCondition ||
            q.condition === weatherCondition ||
            q.condition === "general"
        );

        const randomIndex = Math.floor(Math.random() * relevantQuotes.length);
        setCurrentQuote(relevantQuotes[randomIndex]);
        setQuoteFade(true); // Start fade in
      }, 500); // Half of the transition duration
    };

    // Initial quote
    updateQuote();

    const interval = setInterval(updateQuote, 10000); // Change quote every 10 seconds

    return () => clearInterval(interval);
  }, [outsideTemperature, outsideWeather]); // Depend on outside conditions to re-evaluate quotes

  // Particle effect
  useEffect(() => {
    const canvas = canvasRef.current!;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    const particles: Particle[] = [];
    const particleCount = 100;

    class Particle {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      color: string;

      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 3 + 1;
        this.speedX = (Math.random() - 0.5) * 0.5;
        this.speedY = (Math.random() - 0.5) * 0.5;
        this.color = `rgba(${Math.floor(Math.random() * 100) + 100}, ${
          Math.floor(Math.random() * 100) + 150
        }, ${Math.floor(Math.random() * 55) + 200}, ${
          Math.random() * 0.5 + 0.2
        })`;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x > canvas.width) this.x = 0;
        if (this.x < 0) this.x = canvas.width;
        if (this.y > canvas.height) this.y = 0;
        if (this.y < 0) this.y = canvas.height;
      }

      draw() {
        if (!ctx) return;
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    function animate() {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (const particle of particles) {
        particle.update();
        particle.draw();
      }

      requestAnimationFrame(animate);
    }

    animate();

    const handleResize = () => {
      if (!canvas) return;
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Toggle theme
  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  // Toggle device status
  const toggleDevice = (device: keyof typeof deviceStatus) => {
    setDeviceStatus((prev) => ({
      ...prev,
      [device]: !prev[device],
    }));
  };

  return (
    <div
      className={`${theme} min-h-screen bg-gradient-to-br from-black to-slate-900 text-slate-100 relative overflow-hidden`}
    >
      {/* Background particle effect */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full opacity-30"
      />

      {/* Loading overlay */}
      {isLoading && (
        <div className="absolute inset-0 bg-black/80 flex items-center justify-center z-50">
          <div className="flex flex-col items-center">
            <div className="relative w-24 h-24">
              <div className="absolute inset-0 border-4 border-cyan-500/30 rounded-full animate-ping"></div>
              <div className="absolute inset-2 border-4 border-t-cyan-500 border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin"></div>
              <div className="absolute inset-4 border-4 border-r-purple-500 border-t-transparent border-b-transparent border-l-transparent rounded-full animate-spin-slow"></div>
              <div className="absolute inset-6 border-4 border-b-blue-500 border-t-transparent border-r-transparent border-l-transparent rounded-full animate-spin-slower"></div>
              <div className="absolute inset-8 border-4 border-l-green-500 border-t-transparent border-r-transparent border-b-transparent rounded-full animate-spin"></div>
            </div>
            <div className="mt-4 text-cyan-500 font-mono text-sm tracking-wider">
              SMART HOME INITIALIZING
            </div>
          </div>
        </div>
      )}

      <div className="container mx-auto p-4 relative z-10">
        <Header
          theme={(theme as "dark") || "light"}
          toggleTheme={toggleTheme}
        />

        <div className="grid grid-cols-12 gap-6">
          {/* Sidebar */}
          <div className="col-span-12 md:col-span-3 lg:col-span-2">
            <Sidebar temperature={0} securityStatus={0} energyUsage={0} />
          </div>

          {/* Main dashboard */}
          <div className="col-span-12 md:col-span-9 lg:col-span-7">
            <div className="grid gap-6">
              <HomeOverview
                temperature={temperature}
                energyUsage={energyUsage}
                humidity={humidity}
                deviceStatus={deviceStatus}
                toggleDevice={toggleDevice}
              />
              {/* Removed SecurityAlerts from here */}
            </div>
          </div>

          {/* Right sidebar */}
          <div className="col-span-12 lg:col-span-3">
            <div className="grid gap-6">
              <DailyInsight
                currentQuote={currentQuote}
                quoteFade={quoteFade}
                outsideTemperature={outsideTemperature}
                outsideWeather={outsideWeather}
                currentTime={currentTime}
              />

              <QuickActions />

              <RoomStatus deviceStatus={deviceStatus} />

              {/* Security Status section moved here */}
              <SecurityAlerts
                securityStatus={securityStatus}
                deviceStatus={deviceStatus}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
