import "./App.css";
import { IoCloudDownload } from "react-icons/io5";
import { IoQrCode } from "react-icons/io5";
import { useState } from "react";
import loadingLogo from "./square-loading.json";
import Lottie from "lottie-react";

function App() {
  const [img, setImg] = useState("");
  const [loading, setLoading] = useState(false);
  const [qrData, setQrData] = useState("");
  const [qrSize, setQrSize] = useState("");

  const generateQR = (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const generateQrData = `https://api.qrserver.com/v1/create-qr-code/?size=${qrSize}*${qrSize}&data=${encodeURIComponent(
        qrData
      )}`;
      setImg(generateQrData);

      setQrData("");
      setQrSize("");
    } catch (error) {
      console.log(`Error generate QR code : ${error.message}`);
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 2000);
    }
  };
  const downloadQR = async () => {
    if (img) {
      try {
        const response = await fetch(img);
        const data = await response.blob();
        const link = document.createElement("a");
        link.href = URL.createObjectURL(data);
        link.download = "qrcode.png";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        setQrData("");
        setQrSize("");
      } catch (error) {
        console.log(`Error download QR code : ${error.message}`);
      }
    }
  };
  return (
    <div className="app-container">
      <div className="app">
        <h1>QR CODE GENERATOR</h1>
        {loading ? (
          <div className="loadingText">
            <Lottie animationData={loadingLogo} className="loadingLogo" />
            <p>Please wait...</p>
          </div>
        ) : (
          img && <img src={img} alt="qr-code" className="qr-img" />
        )}

        <form className="form" onSubmit={generateQR}>
          <label htmlFor="dataInput" className="input-label">
            Data for QR code:
          </label>
          <input
            type="text"
            required
            id="dataInput"
            placeholder="Enter data for QR code"
            value={qrData}
            onChange={(e) => setQrData(e.target.value)}
          />

          <label htmlFor="sizeInput" className="input-label">
            Image size (e.g., 150):
          </label>
          <input
            type="text"
            required
            id="sizeInput"
            placeholder="Enter Image size"
            value={qrSize}
            onChange={(e) => setQrSize(e.target.value)}
          />
          <div className="button-container">
            <button
              className="generate-button"
              disabled={loading}
              type="submit"
            >
              <IoQrCode />
              <span>Generate QR code</span>
            </button>
            <button
              className="download-button"
              type="button"
              onClick={downloadQR}
            >
              <IoCloudDownload />
              <span>Download QR code </span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default App;
