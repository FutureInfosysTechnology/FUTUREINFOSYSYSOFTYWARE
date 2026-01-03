// import React, { useEffect, useState } from "react";
// import './login.css';
// import { useNavigate } from "react-router-dom";
// import Swal from "sweetalert2";
// import { getApi } from "../Admin Master/Area Control/Zonemaster/ServicesApi";
// import { ImEye } from "react-icons/im";
// import { ImEyeBlocked } from "react-icons/im";

// function NewLogin () {

//     const [login, setLogin] = useState({ userName: '', password: '' });
//     const navigate = useNavigate();
//     const [eye, setEye] = useState(true);
//     const [eyeDis, setEyeDis] = useState(false);
//     const togglePass = () => {
//         setEye((eye) => !eye);
//     }


//     useEffect(() => {
//         const container = document.getElementById('container');
//         const overlayBtn = document.getElementById('overlayBtn');

//         const handleOverlayClick = () => {
//             container.classList.toggle('right-panel-active');
//             overlayBtn.classList.remove('btnScaled');
//             window.requestAnimationFrame(() => {
//                 overlayBtn.classList.add('btnScaled');
//             });
//         };
//         overlayBtn.addEventListener('click', handleOverlayClick);
//         return () => {
//             overlayBtn.removeEventListener('click', handleOverlayClick);
//         };
//     }, []);


//     const handleInputChange = (e) => {
//         const { name, value } = e.target;
//         setLogin(prevState => ({ ...prevState, [name]: value }));
//     };

//     const handleNavigation = () => {
//         navigate('/signup');
//     };
//     useEffect(() => {
//         if (!login.password) {
//             setEyeDis(true);
//         }
//         else {
//             setEyeDis(false);
//         }
//     }, [login.password])
//     const handleSaveLogin = async (e) => {
//         e.preventDefault();
//         const { userName, password } = login;
//         if (!userName || !password) {
//             Swal.fire('Error', 'Username and Password are required', 'error');
//             return;
//         }
//         try {
//             const response = await getApi(`/Master/UserContllor?UserName=${encodeURIComponent(userName)}&Password=${encodeURIComponent(password)}`);
//             if (response.status === 1) {
//                 Swal.fire('Success', 'Login successful!', 'success');
//                 localStorage.setItem("Login", JSON.stringify(response.userData));
//                 navigate('/dashboard');
//             }
//         } catch (err) {
//             console.error('Login Error:', err);
//             Swal.fire('Error', 'Invalid username or password. Please try again.', 'error');
//         }
//     };


//     return (
//         <div className="login-body">
//             <div className="login-container" id="container">
//                 <div className="form-container sign-up-container">
//                     <form action="#" className="login-form">
//                         <h1>Create Account</h1>

//                         <span className="login-span">or use your email for registration </span>
//                         <div className="infield">
//                             <label htmlFor="">Full Name</label>
//                             <input className="login-input" type="text" placeholder="Full Name" />
//                             <label className="login-label" htmlFor=""></label>
//                         </div>

//                         <div className="infield">
//                             <label htmlFor="">Email</label>
//                             <input className="login-input" type="email" placeholder="Email" />

//                         </div>

//                         <div className="infield">
//                             <label htmlFor="">Password</label>
//                             <input className="login-input" type="password" placeholder="Password" />

//                         </div>
//                         <button className="login-button">Sign Up</button>

//                         <div className="social-container">
//                             <a href="#" className="social">
//                                 <i className="bi bi-facebook" style={{ color: "blue" }}></i>
//                             </a>

//                             <a href="#" className="social">
//                                 <i className="bi bi-google" style={{ color: "orange" }}></i>
//                             </a>

//                             <a href="#" className="social">
//                                 <i className="bi bi-linkedin" style={{ color: "blue" }}></i>
//                             </a>
//                         </div>
//                     </form>
//                 </div>

//                 <div className="form-container sign-in-container">
//                     <form action="#" className="login-form" onSubmit={handleSaveLogin}>
//                         <h1>Sign In</h1>

//                         <span className="login-span">or use your email for registration </span>

//                         <div className="infield">
//                             <label htmlFor="">User Name</label>
//                             <input className="login-input" type="text" name="userName"
//                                 value={login.userName}
//                                 onChange={handleInputChange}
//                                 placeholder="Username" />
//                             <label className="login-label" htmlFor=""></label>
//                         </div>

//                         <div className="infield">
//                             <label htmlFor="">Password</label>
//                             <div style={{ position: "relative" }}>
//                                 <input className="login-input" type={eye ? "password" : "text"}
//                                     name="password"
//                                     value={login.password}
//                                     onChange={handleInputChange}
//                                     placeholder="Password" />
//                                 <div style={{
//                                     opacity: eyeDis ? 0 : 1, // fade instead of display: none
//                                     visibility: eyeDis ? "hidden" : "visible", //
//                                     position: "absolute",
//                                     top: "10%",
//                                     right: "5%",
//                                     fontSize: "25px",
//                                     cursor: "pointer",
//                                     transition: "opacity 0.3s ease, visibility 0.3s ease"
//                                 }} onClick={togglePass}>

//                                     {eye ? <ImEye /> : <ImEyeBlocked />}
//                                 </div></div>
//                             <label className="login-label" htmlFor=""></label>
//                         </div>

//                         <a href="#" className="forgot" style={{ fontSize: "12px" }}>Forgot password?</a>
//                         <button className="login-button">Sign In</button>

//                         <div className="bottom-div">
//                             <a href="#" className="forgot">Don't have an account? Create new account</a>
//                             <button className="login-button" onClick={handleNavigation}> Sign Up</button>
//                         </div>

//                         <div className="social-container">
//                             <a href="#" className="social">
//                                 <i className="bi bi-facebook" style={{ color: "blue" }}></i>
//                             </a>

//                             <a href="#" className="social">
//                                 <i className="bi bi-google" style={{ color: "orange" }}></i>
//                             </a>

//                             <a href="#" className="social">
//                                 <i className="bi bi-linkedin" style={{ color: "blue" }}></i>
//                             </a>
//                         </div>
//                     </form>
//                 </div>

//                 <div className="overlay-container" id="overlayCon">
//                     <div className="overlay">
//                         <div className="overlay-panel overlay-left">
//                             {/* <h1>Welcome Back!</h1> */}
//                             {/* <p>To keep connected with us please login with your personal info</p> */}
//                             <button className="login-button">Sign In</button>
//                         </div>

//                         <div className="overlay-panel overlay-right">
//                             <button className="login-button">Sign Up</button>
//                         </div>
//                     </div>

//                     <button className="login-button" id="overlayBtn"></button>

//                 </div>
//             </div>
//         </div>
//     )
// }

// export default NewLogin;

import React, { useEffect, useState } from "react";
import "./login.css";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { getApi } from "../Admin Master/Area Control/Zonemaster/ServicesApi";
import { ImEye, ImEyeBlocked } from "react-icons/im";

function NewLogin() {
  const [login, setLogin] = useState({ userName: "", password: "" });
  const [eye, setEye] = useState(true);
  const [eyeDis, setEyeDis] = useState(false);

  const navigate = useNavigate();

  /* =========================
     PASSWORD TOGGLE
     ========================= */
  const togglePass = () => {
    setEye((prev) => !prev);
  };

  /* =========================
     OVERLAY ANIMATION (SAFE)
     ========================= */
  useEffect(() => {
    const container = document.getElementById("container");
    const overlayBtn = document.getElementById("overlayBtn");

    if (!container || !overlayBtn) return; // ✅ VERY IMPORTANT

    const handleOverlayClick = () => {
      container.classList.toggle("right-panel-active");
      overlayBtn.classList.remove("btnScaled");
      window.requestAnimationFrame(() => {
        overlayBtn.classList.add("btnScaled");
      });
    };

    overlayBtn.addEventListener("click", handleOverlayClick);

    return () => {
      overlayBtn.removeEventListener("click", handleOverlayClick);
    };
  }, []);

  /* =========================
     INPUT CHANGE
     ========================= */
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLogin((prev) => ({ ...prev, [name]: value }));
  };

  /* =========================
     PASSWORD ICON VISIBILITY
     ========================= */
  useEffect(() => {
    setEyeDis(!login.password);
  }, [login.password]);

  /* =========================
     LOGIN SUBMIT
     ========================= */
  const handleSaveLogin = async (e) => {
    e.preventDefault();

    const { userName, password } = login;

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

  /* =========================
     SIGNUP NAVIGATION
     ========================= */
  const handleNavigation = () => {
    navigate("/signup");
  };

  return (
    <div className="login-body">
      <div className="login-container" id="container">
        {/* ================= SIGN UP ================= */}
        <div className="form-container sign-up-container">
          <form className="login-form">
            <h1>Create Account</h1>
            <span className="login-span">
              or use your email for registration
            </span>

            <div className="infield">
              <input
                className="login-input"
                type="text"
                placeholder="Full Name"
              />
            </div>

            <div className="infield">
              <input
                className="login-input"
                type="email"
                placeholder="Email"
              />
            </div>

            <div className="infield">
              <input
                className="login-input"
                type="password"
                placeholder="Password"
              />
            </div>

            <button className="login-button" type="button">
              Sign Up
            </button>
          </form>
        </div>

        {/* ================= SIGN IN ================= */}
        <div className="form-container sign-in-container">
          <form className="login-form" onSubmit={handleSaveLogin}>
            <h1>Sign In</h1>
            <span className="login-span">
              or use your email for registration
            </span>

            <div className="infield">
              <input
                className="login-input"
                type="text"
                name="userName"
                value={login.userName}
                onChange={handleInputChange}
                placeholder="Username"
              />
            </div>

            <div className="infield">
              <div style={{ position: "relative" }}>
                <input
                  className="login-input"
                  type={eye ? "password" : "text"}
                  name="password"
                  value={login.password}
                  onChange={handleInputChange}
                  placeholder="Password"
                />

                {!eyeDis && (
                  <div
                    style={{
                      position: "absolute",
                      top: "25%",
                      right: "10px",
                      fontSize: "22px",
                      cursor: "pointer",
                    }}
                    onClick={togglePass}
                  >
                    {eye ? <ImEye /> : <ImEyeBlocked />}
                  </div>
                )}
              </div>
            </div>

            <button className="login-button" type="submit">
              Sign In
            </button>

            <div className="bottom-div">
              <span className="forgot">
                Don&apos;t have an account?
              </span>
              <button
                type="button"
                className="login-button"
                onClick={handleNavigation}
              >
                Sign Up
              </button>
            </div>
          </form>
        </div>

        {/* ================= OVERLAY ================= */}
        <div className="overlay-container">
          <div className="overlay">
            <div className="overlay-panel overlay-left"></div>
            <div className="overlay-panel overlay-right"></div>
          </div>
          <button className="login-button" id="overlayBtn"></button>
        </div>
      </div>
    </div>
  );
}

export default NewLogin;
