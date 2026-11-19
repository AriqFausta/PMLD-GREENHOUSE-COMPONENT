
import {
  Thermometer,
  Droplets,
  Sprout,
  Sun,
} from "lucide-react";

// DATA SIMULASI THRESHOLD GREENHOUSE
// Nilai ini hanya contoh selama API Back-End belum tersedia.

export const initialThresholds = [
  {
    id: "temperature",
    name: "Temperature",
    description: "Batas suhu udara greenhouse",
    unit: "°C",
    min: "20",
    max: "35",
    icon: Thermometer,
    color: "orange",
  },
  {
    id: "humidity",
    name: "Humidity",
    description: "Batas kelembapan udara",
    unit: "%",
    min: "60",
    max: "80",
    icon: Droplets,
    color: "blue",
  },
  {
    id: "soilMoisture",
    name: "Soil Moisture",
    description: "Batas kelembapan tanah",
    unit: "%",
    min: "40",
    max: "70",
    icon: Sprout,
    color: "green",
  },
  {
    id: "brightness",
    name: "Brightness",
    description: "Batas intensitas cahaya",
    unit: "lux",
    min: "500",
    max: "1000",
    icon: Sun,
    color: "yellow",
  },
];