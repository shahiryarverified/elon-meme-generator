import "./App.css";
import background from "./background.webp";
import { useState } from "react";
import html2canvas from "html2canvas"; // Import html2canvas

// Import all images from the /images folder
const imageCount = 46; // Adjust this based on the number of images you have
const images = Array.from({ length: imageCount }, (_, index) =>
  require(`./images/${index + 1}.webp`)
);

function App() {
  const [currentImage, setCurrentImage] = useState(images[0]); // Set initial image
  const [editableText, setEditableText] = useState(""); // Initial text
  const [imageHistory, setImageHistory] = useState([]); // Track shown images
  const [loading, setLoading] = useState(false); // Loading state

  const handleSpinClick = () => {
    setLoading(true); // Set loading to true when the button is clicked

    if (imageHistory.length === images.length) {
      // Reset history if all images have been shown
      setImageHistory([]);
    }

    let randomIndex;
    do {
      randomIndex = Math.floor(Math.random() * images.length);
    } while (imageHistory.includes(randomIndex)); // Ensure the image hasn't been shown

    // Simulate a delay for loading the new image
    setTimeout(() => {
      setCurrentImage(images[randomIndex]); // Change to a random image
      setImageHistory((prev) => [...prev, randomIndex]); // Add to history
      setLoading(false); // Set loading to false after the image is set
    }, 1000); // Adjust the delay as needed
  };

  const handleHomeClick = () => {
    window.location.href = "https://smokincat.io"; // Redirect to smokincat.io
  };

  const handleShareClick = () => {
    const element = document.getElementById("capture"); // Get the element to capture
    html2canvas(element).then((canvas) => {
      // Convert canvas to image URL
      const imageData = canvas.toDataURL("image/png");

      // Create a link for downloading the image
      const link = document.createElement("a");
      link.href = imageData; // Set the image data as the link href
      link.download = "meme.png"; // Set the download filename
      link.click(); // Trigger the download

      // Prepare to share on Twitter
      const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
        editableText
      )}`;

      // Open the Twitter share URL in a new window
      window.open(twitterUrl, "_blank");
    });
  };

  return (
    <div className="background-container">
      {loading ? (
        <div className="loading-spinner"></div> // Show loading spinner
      ) : (
        <div className="background-container-inner">
          <img src={background} alt="background" className="background-image" />
          <img src={currentImage} alt="random" className="random-image" />
          <textarea
            value={editableText}
            placeholder="Write your Meme Text..."
            onChange={(e) => setEditableText(e.target.value)}
            className="editable-textarea"
            maxLength={150} // Limit to 150 characters
          />
          <button
            className="top-left-button"
            onClick={handleHomeClick}
          ></button>
          <button
            className="top-right-button"
            onClick={handleShareClick}
          ></button>
          <button className="spin-button" onClick={handleSpinClick}></button>
        </div>
      )}
      {/* Capture div for generating the image */}
      <div
        id="capture"
        style={{
          position: "absolute",
          top: "-9999px",
          left: "-9999px",
        }}
      >
        <img src={background} alt="background" className="background-image" />
        <img
          src={currentImage}
          alt="random"
          className="random-image"
          style={{ marginTop: "-42%" }}
        />
        <div className="editable-textarea">{editableText}</div>
      </div>
    </div>
  );
}

export default App;
