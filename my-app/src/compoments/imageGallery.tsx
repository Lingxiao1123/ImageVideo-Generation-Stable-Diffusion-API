import React from "react";
import { photos } from "./photoArray";
import Gallery, { RenderImageProps } from "react-photo-gallery";
import { CustomImage } from "./customImage";
import "./imageGallery.css";

const ImageGallery = () => {
  const renderImage = (props: RenderImageProps) => {
    const { photo, margin } = props;
    return <CustomImage photo={photo} margin={margin} />;
  };

  return (
    <div>
      <div className="custom-gallery">
        <Gallery
          photos={photos}
          direction={"column"}
          // margin={2}
          renderImage={renderImage}
        />
      </div>
    </div>
  );
};

export default ImageGallery;
