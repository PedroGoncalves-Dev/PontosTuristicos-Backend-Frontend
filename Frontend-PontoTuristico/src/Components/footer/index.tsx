import { Github, Linkedin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="flex flex-col items-center justify-center gap-5 bg-orange-900 h-36">
      <div className="flex gap-2 ">
        <a href="https://github.com/PedroGoncalves-Dev">
          <div className="w-10 p-2 rounded-full bg-[#fafafa5d] hover:scale-105 transition-transform duration-200 ease-in-out">
            <Github color="#000" />
          </div>
        </a>

        <a href="https://www.linkedin.com/in/pedrodev-goncalves">
          <div className="w-10 p-2 rounded-full bg-[#fafafa5d] hover:scale-105 transition-transform duration-200 ease-in-out">
            <Linkedin color="#000" />
          </div>
        </a>
      </div>

      <p>&copy; 2025 - Pedro Henrique Gonçalves</p>
    </footer>
  );
};

export default Footer;
