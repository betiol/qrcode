import React, { useState } from "react";
import { QrReader } from "react-qr-reader";
import invertColor from "invert-color";

const QRCodeScanner = () => {
  const [result, setResult] = useState(null);

  const handleScan = (data) => {
    if (data) {
      setResult(data);
    }
  };

  const handleError = (err) => {
    console.error(err);
  };

  const qrReaderStyle = {
    width: "100%"
  };

  const scannerConfig = {
    facingMode: "environment", // Use a câmera traseira, se disponível
    delay: 300,
    legacyMode: false, // Use o modo moderno para melhor desempenho
    constraints: {
      video: {
        facingMode: "environment",
        brightness: { ideal: 1, min: 0.5, max: 2 },
        contrast: { ideal: 1, min: 0.5, max: 2 }
      }
    }
  };

  return (
    <div>
      <QrReader
        {...scannerConfig}
        onError={handleError}
        onResult={handleScan}
        style={qrReaderStyle}
      />
      {result && (
        <div style={{ marginTop: "20px" }}>
          <p>Conteúdo do QR code:</p>
          <div
            style={{
              backgroundColor: "white",
              padding: "10px",
              color: "black",
              fontWeight: "bold"
            }}
          >
            {JSON.stringify(result)}
          </div>
          <div
            style={{
              marginTop: "20px",
              backgroundColor: invertColor("white", true),
              padding: "10px",
              color: invertColor("black", true),
              fontWeight: "bold"
            }}
          >
            {JSON.stringify(result)}
          </div>
        </div>
      )}
    </div>
  );
};

export default QRCodeScanner;
