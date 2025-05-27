import { Routes, Route, Link } from 'react-router-dom'
import Home from './pages/home'
import About from './pages/about'

import "../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js"
import { Images } from './pages/images'

export default function App() {
    return (
        <div>
            <nav>
                <Link to="/">Home</Link> |
                <Link to="/images">Images</Link> | 
                <Link to="/about">About</Link>
            </nav>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/images" element={<Images />} />
            </Routes>
        </div>
    )
}
