import "../styles/login.css"
import socialDesktop from "../assets/social-desktop.png"
import socialMobile from "../assets/social-mobile.png"
import { Link, useNavigate } from "react-router-dom"
import { useState } from "react"
import axios from "axios"
import "dotenv/config"
import swal2 from "sweetalert2"
import { useDispatch } from "react-redux"
import { loginSuccess } from "../redux/userSlice"

const Login = () => {
  // state variables
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const login = async (e) => {
    try {
      e.preventDefault()
      setLoading(true)
      const result = await axios.post(`${process.env.API_BASE_URL}/login`, {
        email,
        password,
      })
      if (result.status == 200) {
        setLoading(false)
        localStorage.setItem("token", result.data.result.token)
        localStorage.setItem("user", JSON.stringify(result.data.result.user))
        dispatch(loginSuccess(result.data.result.user))
        setLoading(false)
        navigate("/myprofile")
      }
      setEmail("")
      setPassword("")
    } catch (error) {
      setLoading(false)
      console.log(error)
      swal2.fire({
        icon: "error",
        title: error.response.data.error,
      })
    }
  }

  return (
    <div className="container login_container">
      <div className="row">
        {/* images */}
        <div className="col-md-7 col-sm-12 d-flex justify-content-center align-items-center">
          <img
            className="socialDesktop"
            style={{ height: "85%" }}
            src={socialDesktop}
            alt="logo"
          />
          <img className="socialMobile" src={socialMobile} alt="logo" />
        </div>
        {/* login form */}
        <div className="col-md-5 col-sm-12">
          {loading && (
            <div className="col-12 text-center mb-3">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          )}
          <div className="card shadow ">
            <div className="card-body px-5">
              <h4 className="card-title text-center mt-3 fw-bold">Log In</h4>
              <form onSubmit={login}>
                <input
                  type="text"
                  className="p-2 mt-4 mb-2 form-control input-bg"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <input
                  type="password"
                  className="p-2 mb-2 form-control input-bg"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <div className="mt-3 d-grid">
                  <button type="submit" className="custom-btn custom-btn-blue">
                    Log In
                  </button>
                </div>
                <div className="mt-3 d-flex justify-content-center align-items-center">
                  <hr className="text-muted flex-grow-1" />
                  <h5 className="text-muted text-center mb-0 mx-2">OR</h5>
                  <hr className="text-muted flex-grow-1" />
                </div>
                <div className="mt-3 mb-5 d-grid">
                  <button type="submit" className="custom-btn custom-btn-white">
                    <span className="text-muted f5-6">
                      Don't have an acoount?{" "}
                    </span>
                    <Link
                      to="/signup"
                      style={{ textDecoration: "none" }}
                      className="text-info fw-bold"
                    >
                      Signup
                    </Link>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
