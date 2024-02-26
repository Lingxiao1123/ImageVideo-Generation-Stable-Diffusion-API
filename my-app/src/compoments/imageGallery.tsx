import React from "react";
import { photos } from "./photoArray";
import Gallery from "react-photo-gallery";
import "./imageGallery.css";

const ImageGallery = () => {
  // Your code here

  return (
    <div>
      <div className="custom-gallery">
        <Gallery photos={photos} direction={"column"} margin={2} />;
      </div>
    </div>
  );
};

export default ImageGallery;
