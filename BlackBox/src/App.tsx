import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Componenets/Home/Home";
import Navbar from "./Componenets/navbar/Navbar";
import Cover from "./Componenets/Cover/Cover";

function App() {
  return (
    <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home />}>

        </Route>
        <Route path="TestCoverage" element={<Cover />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
