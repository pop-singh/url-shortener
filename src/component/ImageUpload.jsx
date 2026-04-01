import React, { useState, useRef } from "react";
import axios from "axios";
import "./ImageUpload.css";
import { useNavigate } from "react-router-dom";

function ImageUpload() {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState("");
  const [message, setMessage] = useState("");
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  // handle file selection
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    if (selectedFile) {
      setPreview(URL.createObjectURL(selectedFile));
    }
    setMessage("");
  };

  // remove selected file & preview
  const handleRemove = () => {
    setFile(null);
    setPreview("");
    setMessage("");
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  // reset everything
  const handleReset = () => {
    setFile(null);
    setPreview("");
    setMessage("");
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  // upload image
  const handleUpload = async () => {
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post(
        "http://localhost:8080/api/upload",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      setMessage("Upload successful ✅");
      console.log(response.data);
    } catch (error) {
      console.error(error);
      setMessage("Upload failed ❌");
    }
  };

  return (
    <div className="upload-container">
      <h2>Upload Image</h2>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
      />

      {preview && (
        <div className="preview">
          <img src={preview} alt="preview" />
          <button className="remove-button" onClick={handleRemove}>
            ✕ Remove
          </button>
        </div>
      )}

      <div className="button-row">
        <button className="reset-button" onClick={handleReset}>
          Reset
        </button>
        <button onClick={handleUpload}>Upload</button>
      </div>

      {message && <p className="message">{message}</p>}

      <button className="back-button" onClick={() => navigate("/")}>
        ← Back to URL Shortener
      </button>
    </div>
  );
}

export default ImageUpload;