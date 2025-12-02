export function simulateWeather({ time = 0, preset = "clear" }) {
  const weather = {
    preset,
    rain: 0,
    snow: 0,
    fog: 0,
    wind: [0, 0],
  };
  if (preset === "rain") weather.rain = 0.7;
  if (preset === "snow") weather.snow = 0.6;
  if (preset === "fog") weather.fog = 0.5;
  if (preset === "windy") weather.wind = [0.6, 0.2];
  return { time, weather };
}
