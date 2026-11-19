
import "./Threshold.css";
import { useState } from "react";
import {
  RotateCcw,
  Save,
  X,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";

import { initialThresholds } from "../data/thresholdMock";

function Threshold() {
  const [thresholds, setThresholds] = useState(initialThresholds);
  const [savedThresholds, setSavedThresholds] = useState(initialThresholds);
  const [modalType, setModalType] = useState(null);
  const [message, setMessage] = useState("");

  // Memeriksa apakah ada nilai yang berubah.
  const hasChanges = thresholds.some((item, index) => {
    const savedItem = savedThresholds[index];

    return (
      item.min !== savedItem?.min ||
      item.max !== savedItem?.max
    );
  });

  // Mengubah nilai minimum atau maksimum.
  const handleChange = (id, field, value) => {
    setThresholds((current) =>
      current.map((item) =>
        item.id === id
          ? { ...item, [field]: value }
          : item
      )
    );
  };

  // Memeriksa validitas seluruh nilai threshold.
  const validateThresholds = () => {
    for (const item of thresholds) {
      if (item.min === "" || item.max === "") {
        return `Batas ${item.name} tidak boleh kosong.`;
      }

      if (
        !Number.isFinite(Number(item.min)) ||
        !Number.isFinite(Number(item.max))
      ) {
        return `Batas ${item.name} harus berupa angka.`;
      }

      if (Number(item.min) >= Number(item.max)) {
        return `Batas minimum ${item.name} harus lebih kecil dari maksimum.`;
      }
    }

    return null;
  };

  // Memeriksa nilai sebelum membuka konfirmasi simpan.
  const handleSave = () => {
    const error = validateThresholds();

    if (error) {
      setMessage(error);
      setModalType("error");
      return;
    }

    setModalType("save");
  };

  // Menyimpan perubahan sementara di Front-End.
  const confirmSave = () => {
    setSavedThresholds(
      thresholds.map((item) => ({ ...item }))
    );

    setMessage("Pengaturan threshold berhasil disimpan.");
    setModalType("success");
  };

  // Mengembalikan seluruh nilai ke pengaturan awal.
  const handleReset = () => {
    setThresholds(
      initialThresholds.map((item) => ({ ...item }))
    );

    setSavedThresholds(
      initialThresholds.map((item) => ({ ...item }))
    );

    setMessage("Pengaturan berhasil dikembalikan ke nilai awal.");
    setModalType("success");
  };

  return (
    <div className="threshold-page">

      {/* JUDUL HALAMAN */}
      <div className="threshold-heading">
        <div>
          <h2>Threshold Greenhouse</h2>
          <p>
            Atur batas minimum dan maksimum untuk setiap parameter sensor.
          </p>
        </div>
      </div>

      {/* INFORMASI */}
      <div className="threshold-information">
        <AlertCircle size={19} />

        <p>
          Nilai threshold di bawah merupakan data simulasi dan dapat
          disesuaikan dengan kebutuhan greenhouse.
        </p>
      </div>

      {/* DAFTAR PENGATURAN */}
      <div className="threshold-grid">
        {thresholds.map((item) => {
          const Icon = item.icon;

          return (
            <div className="threshold-card" key={item.id}>
              <div className="threshold-card-heading">
                <div className={`sensor-icon ${item.color}`}>
                  <Icon size={23} />
                </div>

                <div>
                  <h3>{item.name}</h3>
                  <p>{item.description}</p>
                </div>
              </div>

              <div className="threshold-input-grid">
                <div className="threshold-form-group">
                  <label htmlFor={`${item.id}-min`}>
                    Minimum ({item.unit})
                  </label>

                  <input
                    id={`${item.id}-min`}
                    type="number"
                    step="any"
                    value={item.min}
                    onChange={(event) =>
                      handleChange(
                        item.id,
                        "min",
                        event.target.value
                      )
                    }
                    placeholder="Nilai minimum"
                  />
                </div>

                <div className="threshold-form-group">
                  <label htmlFor={`${item.id}-max`}>
                    Maksimum ({item.unit})
                  </label>

                  <input
                    id={`${item.id}-max`}
                    type="number"
                    step="any"
                    value={item.max}
                    onChange={(event) =>
                      handleChange(
                        item.id,
                        "max",
                        event.target.value
                      )
                    }
                    placeholder="Nilai maksimum"
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* TOMBOL AKSI */}
      <div className="threshold-actions">
        {hasChanges && (
          <span className="threshold-unsaved">
            Ada perubahan yang belum disimpan
          </span>
        )}

        <button
          type="button"
          className="threshold-reset-button"
          onClick={handleReset}
          disabled={!hasChanges}
        >
          <RotateCcw size={16} />
          Reset
        </button>

        <button
          type="button"
          className="threshold-save-button"
          onClick={handleSave}
          disabled={!hasChanges}
        >
          <Save size={16} />
          Save Changes
        </button>
      </div>

      {/* MODAL KONFIRMASI */}
      {modalType && (
        <div
          className="threshold-modal-overlay"
          onClick={() => setModalType(null)}
        >
          <div
            className="threshold-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="threshold-modal-title"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              className="threshold-modal-close"
              onClick={() => setModalType(null)}
              aria-label="Tutup"
            >
              <X size={19} />
            </button>

            {modalType === "save" && (
              <>
                <div className="threshold-modal-icon warning">
                  <Save size={25} />
                </div>

                <h3 id="threshold-modal-title">
                  Simpan Pengaturan?
                </h3>

                <p>
                  Apakah kamu yakin ingin menyimpan perubahan nilai
                  threshold greenhouse?
                </p>

                <div className="threshold-modal-actions">
                  <button
                    type="button"
                    className="threshold-cancel-button"
                    onClick={() => setModalType(null)}
                  >
                    Batal
                  </button>

                  <button
                    type="button"
                    className="threshold-confirm-button"
                    onClick={confirmSave}
                  >
                    Ya, Simpan
                  </button>
                </div>
              </>
            )}

            {modalType === "success" && (
              <>
                <div className="threshold-modal-icon success">
                  <CheckCircle2 size={27} />
                </div>

                <h3 id="threshold-modal-title">
                  Berhasil!
                </h3>

                <p>{message}</p>

                <button
                  type="button"
                  className="threshold-confirm-button full"
                  onClick={() => setModalType(null)}
                >
                  Mengerti
                </button>
              </>
            )}

            {modalType === "error" && (
              <>
                <div className="threshold-modal-icon error">
                  <AlertCircle size={27} />
                </div>

                <h3 id="threshold-modal-title">
                  Pengaturan Tidak Valid
                </h3>

                <p>{message}</p>

                <button
                  type="button"
                  className="threshold-confirm-button full"
                  onClick={() => setModalType(null)}
                >
                  Periksa Kembali
                </button>
              </>
            )}
          </div>
        </div>
      )}

    </div>
  );
}

export default Threshold;