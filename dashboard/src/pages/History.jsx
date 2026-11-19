
import "./History.css";
import { useMemo, useState } from "react";
import {
  CalendarDays,
  Filter,
  Thermometer,
  Download,
} from "lucide-react";

import { historyData } from "../data/historyMock";

function History() {
  const [parameter, setParameter] = useState("All");
  const [device, setDevice] = useState("All");
  const [startDate, setStartDate] = useState("2026-11-11");
  const [endDate, setEndDate] = useState("2026-11-12");

  // Memfilter data berdasarkan pilihan pengguna.
  const filteredData = useMemo(() => {
    return historyData.filter((item) => {
      const matchParameter =
        parameter === "All" || item.parameter === parameter;

      const matchDevice =
        device === "All" || item.device === device;

      const matchStartDate =
        !startDate || item.date >= startDate;

      const matchEndDate =
        !endDate || item.date <= endDate;

      return (
        matchParameter &&
        matchDevice &&
        matchStartDate &&
        matchEndDate
      );
    });
  }, [parameter, device, startDate, endDate]);

  // Grafik hanya menggunakan satu jenis parameter.
  const chartData = useMemo(() => {
    if (parameter === "All") return [];

    return filteredData.slice(0, 9);
  }, [filteredData, parameter]);

  // Menghitung posisi titik grafik berdasarkan nilai sensor.
  const points = useMemo(() => {
    if (chartData.length === 0) return [];

    const values = chartData.map((item) => Number(item.value));
    const minValue = Math.min(...values);
    const maxValue = Math.max(...values);
    const range = maxValue - minValue;

    return chartData.map((item, index) => {
      const x =
        chartData.length === 1
          ? 150
          : 10 + index * (280 / (chartData.length - 1));

      const y =
        range === 0
          ? 60
          : 95 - ((Number(item.value) - minValue) / range) * 70;

      return { x, y };
    });
  }, [chartData]);

  const linePoints = points
    .map((point) => `${point.x},${point.y}`)
    .join(" ");

  // Mengembalikan filter ke kondisi awal.
  const resetFilters = () => {
    setParameter("All");
    setDevice("All");
    setStartDate("2026-11-11");
    setEndDate("2026-11-12");
  };

  // Mengunduh data hasil filter dalam format CSV.
  const exportCSV = () => {
    const header = [
      "Tanggal",
      "Waktu",
      "Parameter",
      "Nilai",
      "Perangkat",
    ];

    const escapeCSV = (value) => {
      const text = String(value ?? "");
      return `"${text.replace(/"/g, '""')}"`;
    };

    const rows = filteredData.map((item) => [
      item.date,
      item.time,
      item.parameter,
      `${item.value} ${item.unit}`,
      item.device,
    ]);

    const csv = [header, ...rows]
      .map((row) => row.map(escapeCSV).join(","))
      .join("\r\n");

    const blob = new Blob(["\uFEFF" + csv], {
      type: "text/csv;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = "history-greenhouse.csv";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    URL.revokeObjectURL(url);
  };

  return (
    <div className="history-page">

      {/* JUDUL HALAMAN */}
      <div className="history-heading">
        <div>
          <h2>History Greenhouse</h2>
          <p>
            Lihat dan pantau riwayat data sensor greenhouse.
          </p>
        </div>
      </div>

      {/* FILTER DATA */}
      <div className="history-filter-card">
        <div className="history-section-title">
          <div className="history-title-icon">
            <Filter size={18} />
          </div>

          <div>
            <h3>Filter Data</h3>
            <p>Sesuaikan data yang ingin ditampilkan.</p>
          </div>
        </div>

        <div className="history-filter-grid">

          <div className="history-form-group">
            <label>Parameter Sensor</label>
            <select
              value={parameter}
              onChange={(event) =>
                setParameter(event.target.value)
              }
            >
              <option value="All">Semua Parameter</option>
              <option value="Temperature">Temperature</option>
              <option value="Humidity">Humidity</option>
              <option value="Soil Moisture">Soil Moisture</option>
            </select>
          </div>

          <div className="history-form-group">
            <label>Perangkat</label>
            <select
              value={device}
              onChange={(event) =>
                setDevice(event.target.value)
              }
            >
              <option value="All">Semua Perangkat</option>
              <option value="SENSOR 1">SENSOR 1</option>
              <option value="SENSOR 2">SENSOR 2</option>
              <option value="SENSOR 3">SENSOR 3</option>
            </select>
          </div>

          <div className="history-form-group">
            <label>Tanggal Mulai</label>
            <div className="history-date-input">
              <CalendarDays size={16} />

              <input
                type="date"
                value={startDate}
                max={endDate || undefined}
                onChange={(event) =>
                  setStartDate(event.target.value)
                }
              />
            </div>
          </div>

          <div className="history-form-group">
            <label>Tanggal Akhir</label>
            <div className="history-date-input">
              <CalendarDays size={16} />

              <input
                type="date"
                value={endDate}
                min={startDate || undefined}
                onChange={(event) =>
                  setEndDate(event.target.value)
                }
              />
            </div>
          </div>

        </div>

        <div className="history-filter-actions">
          <button
            className="history-reset-button"
            onClick={resetFilters}
          >
            Reset Filter
          </button>

          <span>{filteredData.length} data ditemukan</span>
        </div>
      </div>

      {/* GRAFIK RIWAYAT */}
      <div className="history-chart-card">
        <div className="history-chart-heading">
          <div>
            <h3>Sensor History Chart</h3>
            <p>
              {parameter === "All"
                ? "Pilih parameter untuk melihat grafik sensor."
                : `Riwayat ${parameter}`}
            </p>
          </div>

          <div className="history-chart-icon">
            <Thermometer size={20} />
          </div>
        </div>

        {parameter === "All" ? (
          <div className="history-empty-chart">
            Pilih parameter sensor terlebih dahulu untuk menampilkan grafik.
          </div>
        ) : chartData.length > 0 ? (
          <div className="history-chart-area">
            <svg
              viewBox="0 0 300 120"
              className="history-svg-chart"
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
                  stroke="#42a69a"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              )}

              {points.map((point, index) => (
                <circle
                  key={chartData[index].id}
                  cx={point.x}
                  cy={point.y}
                  r="4"
                  fill="#42a69a"
                />
              ))}
            </svg>

            <div className="history-chart-labels">
              {chartData.map((item) => (
                <span key={item.id}>{item.time}</span>
              ))}
            </div>
          </div>
        ) : (
          <div className="history-empty-chart">
            Tidak ada data untuk filter yang dipilih.
          </div>
        )}
      </div>

      {/* TABEL RIWAYAT */}
      <div className="history-table-card">
        <div className="history-table-heading">
          <div>
            <h3>Data History</h3>
            <p>
              Daftar hasil pemantauan sensor greenhouse.
            </p>
          </div>

          <button
            className="history-export-button"
            onClick={exportCSV}
            disabled={filteredData.length === 0}
          >
            <Download size={15} />
            Export CSV
          </button>
        </div>

        <div className="history-table-wrapper">
          <table className="history-table">
            <thead>
              <tr>
                <th>No.</th>
                <th>Tanggal</th>
                <th>Waktu</th>
                <th>Parameter</th>
                <th>Nilai</th>
                <th>Perangkat</th>
              </tr>
            </thead>

            <tbody>
              {filteredData.length > 0 ? (
                filteredData.map((item, index) => (
                  <tr key={item.id}>
                    <td>{index + 1}</td>
                    <td>{item.date}</td>
                    <td>{item.time}</td>
                    <td>{item.parameter}</td>
                    <td className="history-value">
                      {item.value} {item.unit}
                    </td>
                    <td>{item.device}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="6"
                    className="history-no-data"
                  >
                    Tidak ada data yang sesuai dengan filter.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}

export default History;