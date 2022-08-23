import logo from './logo.svg';
import TshirtsDirectory from './content/main/mainpage'
import Navbar from "./content/navbar/navbar";
import About from './content/about/about'
import Shipping from './content/shipping/shipping'
import TshirtPage from './content/tshirts/tshirt'
import './App.css';
import {
    BrowserRouter,
    Routes,
    Route,
} from "react-router-dom";

function App() {
  return (
      <BrowserRouter>

      <div className="background2" >
          <div className="container main">
              <Navbar/>
              <Routes>
                  <Route path="/" element={<TshirtsDirectory/>} />
                  <Route path="/about" element={<About/>} />
                  <Route path="/shipping" element={<Shipping/>} />
                  {/*<Route path="/tshirt" element={<TshirtPage/>} />*/}
                  <Route path="/tshirts/:id" element={<TshirtPage/>} />
              </Routes>



          </div>
      </div>
      </BrowserRouter>
  );
}

export default App;
