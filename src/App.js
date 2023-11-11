import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navbar2 from "./components/Navbar2";
import InputForm from "./components/InputForm";
import ComicStrip from "./components/ComicStrip";
import "./App.css";
import Home from "./components/Home";

function App() {
  const [comicStrip, setComicStrip] = useState([]);
  const addToStrip = (e) => {
    const temp = comicStrip;
    temp.push(e);
    console.log(temp);
    setComicStrip(temp);
  };

  return (
    <div className="App" >
      {/* <BrowserRouter>
          <Navbar2 />
          <Routes>
            <Route path="/" element={<Home/>}>
              <Route path="/input"  element={<InputForm addToStrip={addToStrip} />} />
              <Route path="/comics"  element={<ComicStrip comicStrip={comicStrip} setComicStrip={setComicStrip} />}/>
            </Route>
          </Routes>
      </BrowserRouter> */}


      <BrowserRouter>
        <Routes>
          <Route path="/" >
            <Route index element={<Home />} />
            <Route path="/input"  element={<InputForm addToStrip={addToStrip} />} />
            <Route path="/comics"  element={<ComicStrip comicStrip={comicStrip} setComicStrip={setComicStrip} />}/>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
