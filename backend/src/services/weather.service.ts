import { db } from '../models/database.js';
import { WeatherData } from '../types/index.js';

export class WeatherService {
  public static getCurrentWeather(location?: string): WeatherData {
    return db.weather;
  }

  public static getSprayingAdvisory() {
    return db.weather.sprayingAdvisory;
  }

  public static getIrrigationAdvisory() {
    return db.weather.irrigationAdvisory;
  }

  public static getForecast() {
    return db.weather.forecast;
  }
}
