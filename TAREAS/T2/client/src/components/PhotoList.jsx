import { useEffect, useState } from "react";
import PhotoItem from "./PhotoItem";
import { getPhotosRequest } from "../api/photos";

function PhotoList() {
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    getPhotosRequest()
      .then((response) => response.json())
      .then((data) => setPhotos(data));
  }, []);

  return (
    <div className="grid grid-cols-4 gap gap-2 mt-10">
      {photos.map((photo) => (
        <PhotoItem photo={photo} key={photo._id} />
      ))}
    </div>
  );
}

export default PhotoList;
