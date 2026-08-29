import { db } from '../models/database.js';
import { IoTDevice } from '../types/index.js';

export class IoTService {
  public static getAllDevices(): IoTDevice[] {
    return Array.from(db.iotDevices.values());
  }

  public static getDeviceById(id: string): IoTDevice | undefined {
    return db.iotDevices.get(id);
  }

  public static createDevice(data: Omit<IoTDevice, 'id' | 'lastPing' | 'status'>): IoTDevice {
    const id = `iot-${Date.now()}`;
    const device: IoTDevice = {
      ...data,
      id,
      lastPing: 'Just now',
      status: 'Normal'
    };
    db.iotDevices.set(id, device);
    return device;
  }

  public static getDeviceReadings(id: string) {
    const device = db.iotDevices.get(id);
    const baseMoisture = device?.metrics.soilMoisture ?? 58;
    const baseTemp = device?.metrics.soilTemp ?? 24.5;
    const baseWater = device?.metrics.waterLevel ?? 82;

    // Generate real-time telemetry array with simulated sensor data
    const readings = Array.from({ length: 12 }, (_, i) => {
      const time = new Date(Date.now() - (11 - i) * 3600000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      return {
        timestamp: time,
        soilMoisture: Math.round(baseMoisture + Math.sin(i / 2) * 4),
        soilTemp: Number((baseTemp + Math.cos(i / 2) * 1.5).toFixed(1)),
        airTemperature: Number((28 + Math.sin(i / 3) * 3).toFixed(1)),
        humidity: Math.round(75 + Math.cos(i / 3) * 6),
        waterLevel: Math.round(baseWater - i * 0.3),
        rainSensor: i > 8 ? 1 : 0,
        lightIntensity: Math.round(45000 + Math.sin(i / 2) * 12000)
      };
    });

    return {
      deviceId: id,
      deviceName: device?.name || 'IoT Telemetry Probe',
      isDemoMode: true,
      current: {
        soilMoisture: baseMoisture,
        soilTemperature: baseTemp,
        airTemperature: 29.4,
        humidity: 76,
        waterLevel: baseWater,
        rainSensor: 0,
        lightIntensity: 48200
      },
      telemetryHistory: readings
    };
  }
}
