import { Link } from "react-router-dom";
export const MainPage: React.FC = () => {
  return (
    <div>
      <h1>Main Page</h1>
      <Link to="/text-to-image">
        <button>Text-to-Image</button>
      </Link>
      <Link to="/image-to-image">
        <button>Image-to-Image</button>
      </Link>
      <Link to="/image-to-video">
        <button>Image-to-video</button>
      </Link>
      <Link to="/tex-to-pdf">
        <button>tex-to-pdf</button>
      </Link>
      <Link to="/imageGallery">
        <button>Image Gallery</button>
      </Link>
    </div>
  );
};
