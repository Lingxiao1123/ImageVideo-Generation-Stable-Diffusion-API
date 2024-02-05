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
    </div>
  );
};
