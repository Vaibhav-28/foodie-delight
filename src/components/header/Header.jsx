import { useNavigate } from "react-router-dom";
import "./Header.css";

const Header = () => {
  const navigate = useNavigate();
  return (
    <header onClick={() => navigate("/")} className="header">
      <h1 className="title">FOODIE DELIGHT</h1>
    </header>
  );
};

export default Header;
