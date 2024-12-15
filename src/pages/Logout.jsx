// components/Logout.jsx
import { useDispatch } from "react-redux";
import { logoutUser } from "../redux/userSlice"; // مطمئن شوید که مسیر درست است
import { useNavigate } from "react-router-dom";

function Logout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");

    dispatch(logoutUser());

    navigate("/login");
  };

  return <button onClick={handleLogout}>Logout</button>;
}

export default Logout;
