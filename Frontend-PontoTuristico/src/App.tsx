import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";

import "./App.css";
import NavBar from "./Components/navBar";
import Footer from "./Components/footer";
import Home from "./Pages/Home";
import Sobre from "./Pages/Sobre";

const MainLayout = () => {
  return (
    <>
      <NavBar />
      <main className="min-h-[calc(100vh-5rem)] py-7">
        <Outlet />
      </main>
      <Footer />
    </>
  );
};
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/sobre" element={<Sobre />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
