import './styles/App.css';
import Navbar from './components/navbar';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Data from './pages/data';
import About from './pages/about';
import Project from './pages/project'
import DropZone from './components/DropZone';


function App() {
  return (
    <Router>
        <div className="App">
          <Navbar></Navbar>
          <Routes>
              <Route path="/" element={<Project></Project>} />
              <Route path="/data" element={<Data></Data>} />
              <Route path="/project" element={<div>Project Page</div>} />
              <Route path="/about" element={<About></About>} />
          </Routes>
       </div>
    </Router>
    
  );
}

export default App;
