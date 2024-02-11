// App.tsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { TextToImageForm } from "./compoments/textToImage";
import { ImageToImageForm } from "./compoments/imageToImage";
import { ImageToVideoForm } from "./compoments/imageToVideo";
import { MainPage } from "./compoments/mainPage";

function App() {
  return (
    <Router>
      <div></div>
      <Routes>
        <Route path="/text-to-image" element={<TextToImageForm />} />
        <Route path="/image-to-image" element={<ImageToImageForm />} />
        <Route path="/image-to-video" element={<ImageToVideoForm />} />
        <Route path="/" element={<MainPage />} />
      </Routes>
    </Router>
  );
}
// ReactDOM.render(<App />, document.getElementById("root"));
export default App;
