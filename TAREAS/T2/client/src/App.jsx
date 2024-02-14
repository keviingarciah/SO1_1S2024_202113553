import WebCam from "./components/WebCam";
import PhotoList from "./components/PhotoList";

function App() {
  return (
    <main className="bg-zinc-900 h-screen">
      <div className="container mx-auto p-10">
        <WebCam />
        <PhotoList />
      </div>
    </main>
  );
}

export default App;
