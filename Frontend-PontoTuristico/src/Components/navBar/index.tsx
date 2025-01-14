import { UseSheetNovoPonto } from "@/Context/localizacaoNovoPonto";
import { useLocation } from "react-router-dom";
import { Separator } from "../ui/separator";

const NavBar = () => {
  const location = useLocation();

  const { localNovoPonto } = UseSheetNovoPonto();
  return (
    <header className="flex items-center h-20 bg-orange-800">
      <div className="container flex items-center justify-between ">
        <div className="hidden sm:flex">
          <nav className="flex flex-col space-y-2 ">
            <ul className="flex gap-4 font-semibold text-slate-300">
              <li
                className={`${
                  location.pathname === "/" &&
                  !localNovoPonto &&
                  "text-white scale-125 text-shadow-xl transition duration-300 ease-in-out"
                }`}
              >
                Home
              </li>
              <li
                className={`${
                  localNovoPonto &&
                  "text-white scale-125 text-shadow-xl px-3 transition duration-300 ease-in-out"
                }`}
              >
                Novo ponto turístico
              </li>
              <li>Sobre</li>
            </ul>
            <Separator color="#a3a3a3" />
          </nav>
        </div>
        <img src="/turismo-smart.png" className="w-20 " />
      </div>
    </header>
  );
};

export default NavBar;
