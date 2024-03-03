import { cities, type City } from "./stores";
import { createQuery } from "@tanstack/svelte-query";

type Latidude = number;
type Longitude = number;

type SunRiseData = {
  date: Date;
  sunrise: string;
  sunset: string;
};

export const getSunRiseDetails = async (data: [Latidude, Longitude]): Promise<SunRiseData> => {
  const url = new URL("https://api.sunrisesunset.io/json");
  url.searchParams.set("lat", String(data[0]));
  url.searchParams.set("lng", String(data[0]));

  const response = await fetch(url.toString());
  const json = await response.json();

  return {
    sunrise: json.results.sunrise,
    sunset: json.results.sunset,
    date: new Date(json.results.date)
  };
};

type WeatherData = {
  temp: number;
  pressure: number;
  humidity: number;
  wind: { speed: number; deg: number };
  cloud: number;
  sunrise: number;
  sunset: number;
  visibility: number;
};

export const getWeatherDetails = async (data: [Latidude, Longitude]): Promise<WeatherData> => {
  const url = new URL("https://api.openweathermap.org/data/2.5/weather");
  url.searchParams.set("lat", String(data?.[0]));
  url.searchParams.set("lon", String(data?.[0]));
  url.searchParams.set("appid", "b85fbaaae73c3ed27bd3e39ddbeba6d1");

  const response = await fetch(url.toString());
  const json = await response.json();

  console.log(json);

  return {
    sunrise: Number(json?.sys?.sunrise),
    sunset: Number(json?.sys?.sunset),
    temp: Number(json?.main?.temp) - 273.15,
    pressure: Number(json?.main?.pressure),
    humidity: Number(json?.main?.humidity),
    wind: { speed: Number(json?.wind?.speed), deg: Number(json?.wind?.deg) },
    visibility: Number(json?.visibility),
    cloud: Number(json?.clouds?.all)
  };

  // return {
  //   sunrise: json.results.sunrise,
  //   sunset: json.results.sunset,
  //   date: new Date(json.results.date)
  // };
};

export const createWeatherQuery = (city: City) => {
  return createQuery({
    queryKey: ["weathers-api", city],
    queryFn: () => getWeatherDetails(cities[city])
  });
};
