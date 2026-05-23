
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import Home from "./pages/Home";
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Agents from "./pages/Agents";
function App() {
  return (
  <>
    
    <BrowserRouter>
    <Header/>
          <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="Agents" element={<Agents/>}/>
          </Routes>
    </BrowserRouter>

    <Footer/>
  </>

  );
}
export default App