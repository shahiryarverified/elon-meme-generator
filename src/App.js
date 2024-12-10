import "./App.css";
import background from "./background.webp";
import { useState } from "react";

// Import all images from the /images folder
const imageCount = 10; // Adjust this based on the number of images you have
const images = Array.from({ length: imageCount }, (_, index) =>
  require(`./images/${index + 1}.webp`)
);

function App() {
  const [currentImage, setCurrentImage] = useState(images[0]); // Set initial image
  const [editableText, setEditableText] = useState(""); // Initial text

  const handleSpinClick = () => {
    const randomIndex = Math.floor(Math.random() * images.length);
    setCurrentImage(images[randomIndex]); // Change to a random image
  };

  return (
    <div className="background-container">
      <div className="background-container-inner">
        <img src={background} alt="background" className="background-image" />
        <img src={currentImage} alt="random" className="random-image" />
        <textarea
          value={editableText}
          placeholder="Write your Meme Text..."
          onChange={(e) => setEditableText(e.target.value)}
          className="editable-textarea"
          maxLength={150}
        />
        <button className="top-left-button"></button>
        <button className="top-right-button"></button>
        <button className="spin-button" onClick={handleSpinClick}></button>
      </div>
    </div>
  );
}

export default App;
