
import { useMemo, useState } from "react";
import "./Dashboard.css";

import {
  Thermometer,
  Droplets,
  Sprout,
  Sun,
  Waves,
  Lightbulb,
  Fan,
  Power,
  CalendarDays,
} from "lucide-react";

import {
  sensorData,
  extraSensorData,
  chartData,
  deviceData,
} from "../data/dashboardMock";

// Daftar ikon sensor dan perangkat
const iconMap = {
  temperature: Thermometer,
  humidity: Droplets,
  soil: Sprout,
  brightness: Sun,
  water: Waves,
  light: Lightbulb,
  fan: Fan,
  power: Power,
};

// Filter periode grafik
const periodOptions = ["Daily", "Monthly", "Yearly"];

// Mengambil data grafik berdasarkan periode
function getChartValues(chart, period) {
  if (period === "Daily") {
    return chart.values;
  }

  if (period === "Monthly") {
    return chart.monthlyValues || chart.values;
  }

  if (period === "Yearly") {
    return chart.yearlyValues || chart.values;
  }

  return chart.values;
}

// Komponen grafik sensor
function SensorChart({ chart }) {
  const [period, setPeriod] = useState("Daily");

  const values = useMemo(
    () => getChartValues(chart, period),
    [chart, period]
  );

  const validValues = values.filter((value) =>
    Number.isFinite(value)
  );

  const points = useMemo(() => {
    if (validValues.length === 0) return [];

    const minValue = Math.min(...validValues);
    const maxValue = Math.max(...validValues);
    const range = maxValue - minValue;

    return validValues.map((value, index) => {
      const x =
        validValues.length === 1
          ? 150
          : 10 + index * (280 / (validValues.length - 1));

      const y =
        range === 0
          ? 60
          : 95 - ((value - minValue) / range) * 70;

      return { x, y };
    });
  }, [validValues]);

  const linePoints = points
    .map((point) => `${point.x},${point.y}`)
    .join(" ");

  const labels = {
    Daily: ["06:00", "09:00", "12:00", "15:00", "18:00"],
    Monthly: ["Minggu 1", "Minggu 2", "Minggu 3", "Minggu 4"],
    Yearly: ["Jan", "Apr", "Jul", "Okt", "Des"],
  };

  return (
    <div className="chart-card">
      <div className="dashboard-card-heading">
        <div>
          <h3>{chart.title}</h3>
          <p>Monitoring sensor</p>
        </div>

        <div className="chart-filter-group">
          {periodOptions.map((option) => (
            <button
              key={option}
              type="button"
              className={`chart-filter ${
                period === option ? "active" : ""
              }`}
              onClick={() => setPeriod(option)}
            >
              {option}
            </button>
          ))}
        </div>
      </div>

      <div className="chart-area">
        <div className="chart-unit">{chart.unit}</div>

        {validValues.length > 0 ? (
          <>
            <svg
              viewBox="0 0 300 120"
              className="sensor-chart"
              preserveAspectRatio="none"
            >
              {[20, 45, 70, 95].map((y) => (
                <line
                  key={y}
                  x1="10"
                  y1={y}
                  x2="290"
                  y2={y}
                  stroke="#e9e9ef"
                  strokeDasharray="4 4"
                />
              ))}

              {points.length > 1 && (
                <polyline
                  points={linePoints}
                  fill="none"
                  stroke={chart.color}
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              )}

              {points.map((point, index) => (
                <circle
                  key={index}
                  cx={point.x}
                  cy={point.y}
                  r="3.5"
                  fill={chart.color}
                />
              ))}
            </svg>

            <div className="chart-labels">
              {labels[period].map((label) => (
                <span key={label}>{label}</span>
              ))}
            </div>
          </>
        ) : (
          <p>Belum ada data grafik.</p>
        )}
      </div>
    </div>
  );
}

// Halaman Dashboard
function Dashboard() {
  return (
    <div className="dashboard-page">
      {/* HEADER DASHBOARD */}
      <div className="dashboard-welcome">
        <div>
          <h2>Dashboard Greenhouse</h2>
          <p>Selamat datang di Smart Agro.</p>
        </div>

        <span className="dashboard-live">
          <span className="live-dot"></span>
          Demo Data
        </span>
      </div>

      {/* KARTU SENSOR UTAMA */}
      <div className="sensor-grid">
        {sensorData.map((sensor) => {
          const Icon = iconMap[sensor.icon];

          return (
            <div className="sensor-card" key={sensor.title}>
              <div className={`sensor-icon ${sensor.color}`}>
                {Icon && <Icon size={23} />}
              </div>

              <div>
                <p className="sensor-title">{sensor.title}</p>

                <div className="sensor-value">
                  {sensor.value}
                  <span>{sensor.unit}</span>
                </div>

                <p className="sensor-description">
                  {sensor.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* GRAFIK SENSOR */}
      <div className="chart-grid">
        {chartData.map((chart) => (
          <SensorChart key={chart.title} chart={chart} />
        ))}
      </div>

      {/* SENSOR TAMBAHAN DAN STATUS PERANGKAT */}
      <div className="bottom-grid">
        <div className="extra-sensor-grid">
          {extraSensorData.map((sensor) => {
            const Icon = iconMap[sensor.icon];

            return (
              <div className="extra-sensor-card" key={sensor.title}>
                <div className={`sensor-icon ${sensor.color}`}>
                  {Icon && <Icon size={23} />}
                </div>

                <p>{sensor.title}</p>

                <div className="sensor-value">
                  {sensor.value}
                  <span>{sensor.unit}</span>
                </div>

                <span className="extra-description">
                  {sensor.description}
                </span>
              </div>
            );
          })}
        </div>

        {/* STATUS PERANGKAT */}
        <div className="device-card">
          <div className="dashboard-card-heading">
            <div>
              <h3>Device Status</h3>
              <p>Status perangkat greenhouse</p>
            </div>
          </div>

          <div className="device-list">
            {deviceData.map((device) => {
              const Icon = iconMap[device.icon];

              return (
                <div className="device-item" key={device.name}>
                  <div className="device-icon">
                    {Icon && <Icon size={20} />}
                  </div>

                  <div className="device-info">
                    <strong>{device.name}</strong>
                    <span>{device.description}</span>
                  </div>

                  <span
                    className={`device-status ${
                      device.status === "Online"
                        ? "online"
                        : "offline"
                    }`}
                  >
                    {device.status}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;