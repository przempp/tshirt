import logo from './logo.svg';
import Dupa from './content/main/mainpage'
import Navbar from "./content/navbar/navbar";
import About from './content/about/about'
import Shipping from './content/shipping/shipping'
import './App.css';
import {
    BrowserRouter,
    Routes,
    Route,
    Link
} from "react-router-dom";
import { Parallax, Background } from 'react-parallax';

function App() {
  return (
      <BrowserRouter>

      <div className="background2">
          <div className="container main">
              <Navbar/>
              <Routes>
                  <Route path="/" element={<Dupa/>} />
                  <Route path="/about" element={<About/>} />
                  <Route path="/shipping" element={<Shipping/>} />
              </Routes>



          </div>
      </div>
      </BrowserRouter>
  );
}

export default App;
