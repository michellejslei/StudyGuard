import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';

import Navbar from './components/Navbar';
import Home from './pages/Home';
import Study from './pages/Study';
import Login from './pages/Login';
import About from './pages/About';
import Footer from './components/Footer';

const App = () => {
  return (
    <main className="bg-slate-300/20">
        <Router>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/study" element={<Study />} />
                <Route path="/login" element={<Login />} />
                <Route path="/about" element={<About />} />
            </Routes>
            {/* <Footer /> */}
        </Router>
    </main>
  )
}

export default App