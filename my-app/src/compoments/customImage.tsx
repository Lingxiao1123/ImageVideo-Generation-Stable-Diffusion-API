export const CustomImage = ({ photo, margin }: { photo: any; margin: any }) => {
  const numericMargin = margin ? parseInt(margin, 10) : 0;

  return (
    <div className="custom-image-container" style={{ margin: numericMargin }}>
      <img
        src={photo.src}
        alt={photo.alt}
        width={photo.width}
        height={photo.height}
      />
      <div className="custom-image-alt">{photo.alt}</div>
    </div>
  );
};
