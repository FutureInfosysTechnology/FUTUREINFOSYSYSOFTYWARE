import { Link } from "react-router-dom";
import "./Login1.css";
import { useState } from "react";
import { IoLockOpen, IoLockClosed } from "react-icons/io5";
import { FaUser } from "react-icons/fa";
import bike from "../../Assets/Images/bike3.png"
import logo from "../../Assets/Images/LOGO.jfif"
import Swal from "sweetalert2";
import { getApi } from "../Admin Master/Area Control/Zonemaster/ServicesApi";
import { useNavigate } from "react-router-dom";
const Login = () => {
    const navigate = useNavigate();
    const [login, setLogin] = useState(true);
    const [lock, setLock] = useState(true);
    const [formData, setFormData] = useState({ userName: "", password: "" });
    const handleSaveLogin = async (e) => {
        e.preventDefault();

        const { userName, password } = formData;

        if (!userName || !password) {
            Swal.fire("Error", "Username and Password are required", "error");
            return;
        }

        try {
            const response = await getApi(
                `/Master/UserContllor?UserName=${encodeURIComponent(
                    userName
                )}&Password=${encodeURIComponent(password)}`
            );

            if (response.status === 1) {
                Swal.fire("Success", "Login successful!", "success");
                localStorage.setItem("Login", JSON.stringify(response.userData));

                // ✅ HASHROUTER SAFE
                navigate("/dashboard");
            } else {
                Swal.fire("Error", "Invalid credentials", "error");
            }
        } catch (err) {
            console.error("Login Error:", err);
            Swal.fire(
                "Error",
                "Invalid username or password. Please try again.",
                "error"
            );
        }
    };
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));

    };
    return (
        <div className="contain">
            <div className="left ">
                <img src={logo} alt="" className="logo animate-left" />
                <div className="bike animate-left"><img src={bike} alt="" />
                </div>
                <div className="logo-secion animate-left">
                    <div className="logo-name">AS LOGISTICS EXPRESS PVT LTD</div>
                    <div className="logo-text">As Logistics Express Pvt Ltd is a next-gen tech-driven express and
                        e-commerce Logistics solution provider.</div>
                </div>
            </div>
            <div className="right">
                
                <div className="form-page">
                    <div className="mobile-logo">
        <img src={logo} alt="Logo" />
    </div>
                    <div className="tital animate-rtl">{login ? "Login Page" : "Signup Page"}</div>
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            if (login) {
                                handleSaveLogin(e);
                            }
                        }}
                    >
                        <div className="input-div animate-rtl">
                            <label htmlFor="user">User Name</label>
                            <input type="text" id="userName" name="userName" placeholder="Enter User name"
                                value={formData.userName}
                                onChange={handleInputChange} />
                            <FaUser className="userLogo" />
                        </div>
                        <div className="input-div animate-rtl">
                            <label htmlFor="pass">Password</label>
                            <input type={!lock ? "text" : "password"} id="password" name="password" placeholder="Enter Password"
                                value={formData.password}
                                onChange={handleInputChange} />
                            <div onClick={() => setLock(p => !p)}>{!lock ? <IoLockOpen className="passLogo" /> :
                                <IoLockClosed className="passLogo" />}</div>
                        </div>
                        <button className="animate-rtl" >{login ? "Login" : "Signup"}</button>
                    </form>
                    <div className="account">{login ? "Don't have an account ?" : "Already Registered ?"}
                        <span onClick={() => setLogin((p) => !p)}>{login ? "Signup" : "Login"}</span></div>
                </div>
            </div>
        </div>
    )
}

export default Login
