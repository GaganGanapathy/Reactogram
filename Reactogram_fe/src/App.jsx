import Login from "./components/Login"
import Signup from "./components/Signup"
import Navbar from "./components/Navbar"
import PostOverview from "./components/PostOverview"
import Profile from "./components/Profile"
import { useSelector } from "react-redux"
import { Routes, BrowserRouter as Router, Route } from "react-router-dom"

// React-Bootstrap
import "bootstrap/dist/css/bootstrap.min.css"

function App() {
  const user = useSelector((state) => state.user.user)

  return (
    <div className="app-bg">
      <Router>
        {Object.entries(user).length !== 0 ? <Navbar /> : ""}
        <Routes>
          <Route exact path="/" element={<Login />}></Route>
          <Route exact path="/login" element={<Login />}></Route>
          <Route exact path="/signup" element={<Signup />}></Route>
          <Route exact path="/posts" element={<PostOverview />}></Route>
          <Route exact path="/myprofile" element={<Profile />}></Route>
        </Routes>
      </Router>
    </div>
  )
}

export default App
