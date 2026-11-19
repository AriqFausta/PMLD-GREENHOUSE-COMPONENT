
// DATA SIMULASI DASHBOARD SMART AGRO
// Data ini hanya digunakan selama API Back-End belum tersedia.

// Sensor utama
export const sensorData = [
  {
    title: "Temperature",
    value: "28.5",
    unit: "°C",
    description: "Suhu udara greenhouse",
    icon: "temperature",
    color: "orange",
  },
  {
    title: "Humidity",
    value: "75",
    unit: "%",
    description: "Kelembapan udara",
    icon: "humidity",
    color: "blue",
  },
  {
    title: "Soil Moisture",
    value: "62",
    unit: "%",
    description: "Kelembapan tanah",
    icon: "soil",
    color: "green",
  },
];

// Sensor tambahan
export const extraSensorData = [
  {
    title: "Brightness",
    value: "850",
    unit: "lux",
    description: "Intensitas cahaya",
    icon: "brightness",
    color: "yellow",
  },
  {
    title: "Water Level",
    value: "80",
    unit: "%",
    description: "Ketinggian air",
    icon: "water",
    color: "blue",
  },
];

// Data grafik
export const chartData = [
  {
    title: "Temperature History",
    color: "#e98b72",
    values: [35, 48, 43, 60, 52, 70, 62, 75, 68],
    unit: "°C",
  },
  {
    title: "Humidity History",
    color: "#43a6b9",
    values: [55, 65, 58, 72, 67, 80, 72, 85, 78],
    unit: "%",
  },
];

// Status perangkat
export const deviceData = [
  {
    name: "LIGHT",
    description: "Lampu greenhouse",
    status: "Online",
    icon: "light",
  },
  {
    name: "FAN",
    description: "Kipas pendingin",
    status: "Online",
    icon: "fan",
  },
  {
    name: "PUMP",
    description: "Pompa air",
    status: "Offline",
    icon: "power",
  },
];