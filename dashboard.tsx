"use client";

import { useEffect, useState, useRef } from "react";

// Corrected import paths for custom components
import { Header } from "./components/dashboard/header";
import { Sidebar } from "@/components/dashboard/sidebar"; // Updated import
import { HomeOverview } from "@/components/dashboard/home-overview";
import { SecurityAlerts } from "@/components/dashboard/security-alerts";
import { DailyInsight } from "@/components/dashboard/daily-insight";
import { QuickActions } from "@/components/dashboard/quick-actions";
import { RoomStatus } from "@/components/dashboard/room-status";
import { EnergyConsumption } from "@/components/dashboard/energy-consumption";

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

export default function Dashboard() {
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [temperature, setTemperature] = useState(21.5);
  const [energyUsage, setEnergyUsage] = useState(42);
  const [humidity, setHumidity] = useState(45);
  const [securityStatus] = useState(100);
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

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

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
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
          <div className="relative flex flex-col items-center">
            {/* Spinner */}
            <div className="relative w-24 h-24 mb-6">
              <div className="absolute inset-0 border-4 border-cyan-500/30 rounded-full animate-ping"></div>
              <div className="absolute inset-2 border-4 border-t-cyan-500 border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin"></div>
              <div className="absolute inset-4 border-4 border-r-purple-500 border-t-transparent border-b-transparent border-l-transparent rounded-full animate-spin-slow"></div>
              <div className="absolute inset-6 border-4 border-b-blue-500 border-t-transparent border-r-transparent border-l-transparent rounded-full animate-spin-slower"></div>
              <div className="absolute inset-8 border-4 border-l-green-500 border-t-transparent border-r-transparent border-b-transparent rounded-full animate-spin"></div>
            </div>

            {/* Text */}
            <div className="text-cyan-500 font-mono text-sm tracking-wider">
              SMART HOME INITIALIZING
            </div>
          </div>
        </div>
      )}

      <div className="container mx-auto p-4 relative z-10">
        <Header theme={theme} toggleTheme={toggleTheme} />

        <div className="grid grid-cols-12 gap-6">
          {/* Sidebar */}
          <div className="col-span-12 md:col-span-3 lg:col-span-2">
            <Sidebar
              temperature={temperature}
              securityStatus={securityStatus}
              energyUsage={energyUsage}
            />
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

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <SecurityAlerts
                  securityStatus={securityStatus}
                  deviceStatus={deviceStatus}
                />
              </div>
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

              <EnergyConsumption energyUsage={energyUsage} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
