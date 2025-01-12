import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";

import "./App.css";
import NavBar from "./Components/navBar";
import Footer from "./Components/footer";
import Home from "./Pages/Home";

const MainLayout = () => {
  return (
    <>
      <NavBar />
      <main className="min-h-[calc(100vh-3rem)]">
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
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
