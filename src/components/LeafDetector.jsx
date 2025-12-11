import React, { useState } from "react";

export default function LeafDetector() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    setSelectedImage(file);
    setPreviewImage(URL.createObjectURL(file));
  };

  const handlePredict = async () => {
    if (!selectedImage) {
      alert("Please upload an image first");
      return;
    }

    setLoading(true);

    const formData = new FormData();
    formData.append("image", selectedImage); // 🔥 must match your backend

    try {
      const response = await fetch("http://localhost:5001/detect", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      setResult(data);
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to get prediction");
    }

    setLoading(false);
  };

  return (
    <div
      style={{
        width: "500px",
        margin: "20px auto",
        padding: "20px",
        borderRadius: "10px",
        background: "#f4f4f4",
        boxShadow: "0 0 10px rgba(0,0,0,0.1)",
        textAlign: "center",
      }}
    >
      <h2>🌿 Leaf Disease Detection</h2>

      <input type="file" accept="image/*" onChange={handleImageUpload} />

      {previewImage && (
        <div style={{ marginTop: "20px" }}>
          <img
            src={previewImage}
            alt="Uploaded Leaf"
            style={{ width: "300px", borderRadius: "10px" }}
          />
        </div>
      )}

      <button
        onClick={handlePredict}
        style={{
          marginTop: "20px",
          padding: "10px 20px",
          background: "#2ecc71",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        {loading ? "Analyzing..." : "Detect Disease"}
      </button>

      {result && (
        <div
          style={{
            marginTop: "25px",
            padding: "20px",
            background: "white",
            borderRadius: "10px",
            textAlign: "left",
          }}
        >
          <h3>🧪 Prediction Result</h3>

          <p>
            <strong>Disease:</strong> {result.disease}
          </p>

          <p>
            <strong>Confidence:</strong>{" "}
            {(result.confidence * 100).toFixed(2)}%
          </p>

          <h4>🌱 Recommended Treatment</h4>
          <p>{result.treatment}</p>
        </div>
      )}
    </div>
  );
}
