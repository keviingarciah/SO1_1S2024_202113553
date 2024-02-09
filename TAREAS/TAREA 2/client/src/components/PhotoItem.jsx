function PhotoItem({ photo }) {
  return (
    <div className="bg-zinc-800 p-4 rounded-md">
      <img src={`data:image/jpeg;base64, ${photo.base64}`} alt="Photo" />
    </div>
  );
}

export default PhotoItem;
