"use client";

import { Card, CardContent } from "@/components/ui/card";
import { useState, useEffect } from "react";

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

export interface DailyInsightProps {
  currentQuote: Quote | null;
  quoteFade: boolean;
  outsideTemperature: number;
  outsideWeather: string;
  currentTime: Date;
}

export function DailyInsight({
  currentQuote,
  quoteFade,
  currentTime,
}: DailyInsightProps) {
  const [typedQuoteText, setTypedQuoteText] = useState("");
  const [typedQuoteAuthor, setTypedQuoteAuthor] = useState("");
  const [outsideTemperature, setOutsideTemperature] = useState<number | null>(
    null
  );
  const [outsideWeather, setOutsideWeather] = useState<string>("");
  const [forecastTemperature, setForecastTemperature] = useState<number | null>(
    null
  );
  const [forecastWeather, setForecastWeather] = useState<string>("");

  const typingSpeed = 30; // ms per character

  // Fetch weather data from WeatherAPI
  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const apiKey = "05a6fd9ade344e3d9d0130904240208";
        const city = "Delhi";
        const url = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}&days=1&aqi=no&alerts=no`;

        const res = await fetch(url);
        const data = await res.json();
        console.log("Weather data:", data);

        if (data.current) {
          setOutsideTemperature(Math.round(data.current.temp_c));
          setOutsideWeather(data.current.condition.text);
        }

        if (data.forecast?.forecastday?.[0]?.hour) {
          const targetHour =
            currentTime.getHours() + 2 > 23 ? 0 : currentTime.getHours() + 2;
          const forecast = data.forecast.forecastday[0].hour[targetHour];
          setForecastTemperature(Math.round(forecast.temp_c));
          setForecastWeather(forecast.condition.text);
        }
      } catch (error) {
        console.error("Error fetching weather:", error);
      }
    };

    fetchWeather();
  }, [currentTime]);

  // Typing effect for quotes
  useEffect(() => {
    if (!currentQuote) {
      setTypedQuoteText("");
      setTypedQuoteAuthor("");
      return;
    }

    setTypedQuoteText(currentQuote.text);
    setTypedQuoteAuthor(currentQuote.author);
  }, [currentQuote]);

  return (
    <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm overflow-hidden">
      <CardContent className="p-0">
        <div className="bg-gradient-to-br from-slate-800 to-slate-900 p-6 border-b border-slate-700/50">
          <div className="text-center h-24 flex flex-col justify-center">
            <div className="text-xs text-slate-500 mb-1 font-mono">
              DAILY INSIGHT
            </div>
            <div
              className={`transition-opacity duration-500 ${
                quoteFade ? "opacity-100" : "opacity-0"
              }`}
            >
              <div className="text-lg font-mono text-cyan-400 mb-1 break-words whitespace-pre-line text-center leading-relaxed px-2">
                {typedQuoteText}
              </div>
              <div className="text-sm text-slate-400 text-center px-2">
                {typedQuoteAuthor ? `- ${typedQuoteAuthor}` : ""}
              </div>
            </div>
          </div>
        </div>
        <div className="p-4">
          <div className="grid grid-cols-2 gap-3">
            {/* Outside Weather */}
            <div className="bg-slate-800/50 rounded-md p-3 border border-slate-700/50">
              <div className="text-xs text-slate-500 mb-1">Outside</div>
              <div className="text-sm font-mono text-slate-200">
                {outsideTemperature !== null
                  ? `${outsideTemperature}°C | ${outsideWeather}`
                  : "Loading..."}
              </div>
            </div>

            {/* Forecast (2 hours later) */}
            <div className="bg-slate-800/50 rounded-md p-3 border border-slate-700/50">
              <div className="text-xs text-slate-500 mb-1">Forecast</div>
              <div className="text-sm font-mono text-slate-200">
                {forecastTemperature !== null
                  ? `${forecastTemperature}°C | ${forecastWeather} at ${
                      currentTime.getHours() + 2 > 23
                        ? "00"
                        : currentTime.getHours() + 2
                    }:00`
                  : "Loading..."}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
