import React, { useState } from "react";
import { QrReader } from "react-qr-reader";
import invertColor from "invert-color";

const QRCodeScanner = () => {
  const [result, setResult] = useState(null);
  const [camera, setCamera] = useState(true);
  const [color, setColor] = useState(true);

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
    delay: 300,
    legacyMode: false
  };

  return (
    <div>
      <QrReader
        {...scannerConfig}
        onError={handleError}
        onScan={handleScan}
        constraints={{
          facingMode: camera ? "environment" : "user" // Use a câmera traseira, se disponível
        }}
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
              backgroundColor: invertColor(color ? "#ffffff" : "#000000", true),
              padding: "10px",
              color: invertColor(color ? "#000000" : "#ffffff", true),
              fontWeight: "bold"
            }}
          >
            {JSON.stringify(result)}
          </div>
        </div>
      )}
      <button
        style={{
          padding: 10,
          margin: 10,
          borderRadius: 4,
          background: "tomato",
          color: "white",
          border: "none"
        }}
        onClick={() => setCamera(!camera)}
      >{`Camera running ${camera}`}</button>
      <button
        style={{
          padding: 10,
          margin: 10,
          borderRadius: 4,
          background: "tomato",
          color: "white",
          border: "none"
        }}
        onClick={() => setColor(!color)}
      >{`Set color to ${color ? "white" : "black"}`}</button>
    </div>
  );
};

export default QRCodeScanner;
