const API_URL = "http://localhost:3000/api";

export const captureRequest = (image) =>
  fetch(`${API_URL}/webcam`, {
    method: "POST",
    body: JSON.stringify(image),
    headers: {
      "Content-Type": "application/json",
    },
  });

export const getPhotosRequest = () => fetch(`${API_URL}/webcam`);
