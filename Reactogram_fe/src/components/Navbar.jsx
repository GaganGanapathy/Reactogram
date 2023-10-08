import "../styles/navbar.css"
import logo from "../assets/logo.png"
import { NavLink, useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import { loginError } from "../redux/userSlice"

function Navbar() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const logout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    dispatch(loginError())
    navigate("/login")
  }

  return (
    <div>
      <nav className="navbar bg-body-tertiary shadow-sm">
        <div className="container-fluid">
          <NavLink className="navbar-brand ms-5" to="/">
            <img src={logo} alt="logo" height="45px" />
          </NavLink>
          <form className="d-flex me-md-5 align-items-center" role="search">
            <input
              className="searchbox form-control me-2 text-muted"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
            <a href="#" className="nav-link text-dark fs-5 ms-3 searchIcon ">
              <i className="fa-solid fa-magnifying-glass"></i>
            </a>
            <NavLink to="/posts" className="nav-link text-dark fs-5 ms-3">
              <i className="fa-solid fa-house"></i>
            </NavLink>
            <a href="#" className="nav-link text-dark fs-5 ms-3">
              <i className="fa-regular fa-heart"></i>
            </a>
            <div className="dropdown ms-3">
              <a type="button" data-bs-toggle="dropdown">
                <img
                  className="navbar-profile-pic"
                  src="https://images.unsplash.com/photo-1692432825053-db5c844fa91f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDE3fEJuLURqcmNCcndvfHxlbnwwfHx8fHw%3D&auto=format&fit=crop&w=400&q=60"
                  alt="more action"
                />
              </a>

              <ul className="dropdown-menu">
                <li>
                  <a className="dropdown-item" onClick={()=>{navigate("/myprofile")}}>
                    My profile
                  </a>
                </li>
                <li>
                  <a
                    className="dropdown-item"
                    href="#"
                    onClick={() => logout()}
                  >
                    Logout
                  </a>
                </li>
              </ul>
            </div>
          </form>
        </div>
      </nav>
    </div>
  )
}

export default Navbar
