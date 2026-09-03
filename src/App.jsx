
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import Home from "./pages/Home";
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Agents from "./pages/Agents";
import Maps from "./pages/Maps";
import Login from "./pages/Login";
import Conta from "./pages/Conta";

function App() {
  return (
  <>
    
    <BrowserRouter>
    <Header/>
          <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="Agents" element={<Agents/>}/>
        <Route path="Maps" element={<Maps/>}/>
        <Route path="Login" element={<Login/>} />
        <Route path="Conta" element={<Conta/>} />
          </Routes>
    </BrowserRouter>

    <Footer/>
  </>

  );
}
export default App