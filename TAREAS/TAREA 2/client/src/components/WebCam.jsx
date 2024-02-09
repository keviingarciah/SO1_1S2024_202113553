import React, { useRef, useState, useEffect } from "react";
import Webcam from "react-webcam";
import imageCompression from "browser-image-compression";
import { captureRequest } from "../api/photos";

const WebcamCapture = () => {
  const webcamRef = useRef(null);
  const [imgSrc, setImgSrc] = useState(null);

  const capture = React.useCallback(async () => {
    const imageSrc = webcamRef.current.getScreenshot();

    // Convert base64 to File
    const imageFile = await fetch(imageSrc)
      .then((res) => res.blob())
      .then((blob) => new File([blob], "image.jpg", { type: "image/jpeg" }));

    // Compress the image
    const options = {
      maxSizeMB: 0.1, // Reduce this value
      maxWidthOrHeight: 720, // Reduce this value
      useWebWorker: true,
    };
    const compressedFile = await imageCompression(imageFile, options);

    // Convert compressed image back to base64
    const reader = new FileReader();
    reader.readAsDataURL(compressedFile);
    reader.onloadend = function () {
      const base64Compressed = reader.result;
      console.log(base64Compressed);

      const base64Image = base64Compressed.split(",")[1]; // Extract the base64 image data
      setImgSrc({ base64: base64Image });
    };
  }, [webcamRef]);

  useEffect(() => {
    if (imgSrc) {
      captureRequest(imgSrc);
    }
  }, [imgSrc]);

  return (
    <div>
      <div className="flex justify-center">
        <Webcam audio={false} ref={webcamRef} screenshotFormat="image/jpeg" />
      </div>
      <div className="flex justify-center">
        <button
          className="bg-green-500 hover:bg-green-700 text-white text-2xl font-bold mt-7 py-2 px-4 border rounded"
          onClick={capture}
        >
          Tomar Foto
        </button>
      </div>
    </div>
  );
};

export default WebcamCapture;
