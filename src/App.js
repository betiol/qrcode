import React, { useState, useEffect, useRef } from "react";
import decodeQRCode from "jsqr";

const QRCodeScanner = () => {
  const [result, setResult] = useState(null);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const scanInterval = 1000;

  useEffect(() => {
    const videoConfig = {
      video: { facingMode: "environment" }
    };

    navigator.mediaDevices
      .getUserMedia(videoConfig)
      .then((stream) => {
        videoRef.current.srcObject = stream;
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  useEffect(() => {
    const scanTimer = setInterval(() => {
      handleScan();
    }, scanInterval);

    return () => {
      clearInterval(scanTimer);
    };
  }, []);

  const handleScan = () => {
    if (videoRef.current && videoRef.current.videoWidth > 0) {
      canvasRef.current.width = videoRef.current.videoWidth;
      canvasRef.current.height = videoRef.current.videoHeight;
      const ctx = canvasRef.current.getContext("2d");
      ctx.drawImage(videoRef.current, 0, 0);
      const imageData = ctx.getImageData(
        0,
        0,
        canvasRef.current.width,
        canvasRef.current.height
      );
      const code = decodeQRCode(
        imageData.data,
        imageData.width,
        imageData.height
      );

      if (code) {
        setResult(code.data);
      }
    }
  };

  return (
    <div>
      <video ref={videoRef} onPlay={handleScan} autoPlay playsInline />
      {/* <canvas ref={canvasRef} /> */}
      {result && (
        <div>
          <p>QR Code data:</p>
          <p>{result}</p>
        </div>
      )}
    </div>
  );
};

export default QRCodeScanner;
