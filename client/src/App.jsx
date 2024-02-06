import { BrowserRouter,Route,Routes } from "react-router-dom"
import Home from "./pages/Home"
import Profile from "./pages/Profile"
// import Signin from "./pages/Signin"
import Signup from "./pages/Signup"
import About from "./pages/About"
import Signout from "./pages/signout"
import Header from "./components/Header"
import Signinn from "./pages/Signinn"
import PrivateRoute from "./components/PrivateRoute"

function App() {
  return (
    <div>
      <BrowserRouter>
      <Header></Header>
      <Routes>
        <Route path="/Home" element={<Home></Home>}> </Route>
        <Route path="/signup" element={<Signup></Signup>}></Route>
        <Route element={<PrivateRoute/>}>
        <Route path="/profile" element={<Profile></Profile>}></Route>
        </Route>
        <Route path="/about" element={<About></About>}></Route>
        <Route path="/signinn" element={<Signinn></Signinn>}></Route>
        <Route path="/signout" element={<Signout></Signout>}></Route>
      </Routes>
      </BrowserRouter>

    </div>
  )
}

export default App