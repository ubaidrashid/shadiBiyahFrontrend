
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Nav from './Components/Nav/Index.js';
import Login from './pages/Login/index.js';
import SignUp from './pages/Signup/index.js';
import Home from './pages/Home/index.js';
import Halls from './pages/Halls/index.js';
import Contact from './pages/Contact/index.js';
import "./App.css";

function App() {
  const user = JSON.parse(localStorage.getItem("user"));
  return (
    <main>
      <Router>
        <Nav user={user}/>
        <Routes>
          <Route path="/" element={<Navigate to={user ? "/home" : "/login"} />} />
          <Route path="/login" element={user ? <Navigate to="/home" /> : <Login />} />
          <Route path="/signup" element={user ? <Navigate to="/home" /> : <SignUp />} />
          <Route path="/home" element={user ? <Home /> : <Navigate to="/login" />} />
          <Route path="/halls" element={user ? <Halls /> : <Navigate to="/login" />} />
          <Route path="/contact" element={user ? <Contact /> : <Navigate to="/login" />} />
        </Routes>
      </Router>
    </main>
  );
}

export default App;
