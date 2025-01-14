import { UseSheetNovoPonto } from "@/Context/localizacaoNovoPonto";
import { useLocation } from "react-router-dom";
import { Separator } from "../ui/separator";
import { Link } from "react-router-dom";

const NavBar = () => {
  const location = useLocation();

  const { localNovoPonto, setLocalNovoPonto } = UseSheetNovoPonto();
  return (
    <header className="flex items-center h-20 bg-orange-800">
      <div className="container flex items-center justify-between ">
        <div className="hidden sm:flex">
          <nav className="flex flex-col space-y-2 ">
            <ul className="flex gap-4 font-semibold transition duration-300 ease-out text-slate-300">
              <Link to={"/"}>
                <li
                  className={`${
                    location.pathname === "/" &&
                    !localNovoPonto &&
                    "text-white scale-125 text-shadow-xl transition-transform duration-300 ease-in-out"
                  } cursor-pointer hover:text-slate-400 transition-colors duration-300 ease-in-out`}
                >
                  Home
                </li>
              </Link>
              <li
                className={`${
                  localNovoPonto &&
                  "text-white scale-125 text-shadow-xl px-3 transition-transform duration-300 ease-in-out"
                } ${
                  location.pathname === "/sobre" && "hidden"
                } cursor-pointer hover:text-slate-400 transition-colors duration-300 ease-in-out`}
                onClick={() => setLocalNovoPonto(true)}
              >
                Novo ponto turístico
              </li>
              <Link to={"/sobre"}>
                <li
                  className={`${
                    location.pathname === "/sobre" &&
                    "text-white scale-125 text-shadow-xl transition-transform duration-300 ease-in-out"
                  } transition-colors duration-300 ease-in-out cursor-pointer hover:text-slate-400`}
                >
                  Sobre
                </li>
              </Link>
            </ul>
            <Separator color="#a3a3a3" />
          </nav>
        </div>
        <img src="/turismo-smart.png" className="w-24 " />
      </div>
    </header>
  );
};

export default NavBar;
